/**
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @OnlyCurrentDoc  Limits the script to only accessing the current spreadsheet.
 */

const _ = Underscore.load();

/**
 * TODO: Replace the following with the name of the service you are importing
 * from and the name of the add-on you are building, respectively.
 */
const DATA_ALIAS = "MyDataSource";
const ADDON_NAME = "YOUR_ADDON_NAME_HERE";
const SIDEBAR_TITLE = "Import Control Center";
const MAX_SCHEDULED_REPORTS = 24;
const IMPORT_PAGE_SIZE = 30;

/**
 * Error code enum; this gets passed to the sidebar for use there as well.
 */
const ERROR_CODES = {
  AUTO_UPDATE_LIMIT: 1,
  ILLEGAL_EDIT: 2,
  ILLEGAL_DELETE: 3,
  IMPORT_FAILED: 4,
};

/**
 * Adds a custom menu with items to show the sidebar.
 * @param {Object} e The event parameter for a simple onOpen trigger.
 */
function onOpen(e) {
  SpreadsheetApp.getUi()
    .createAddonMenu()
    .addItem("Import control center", "showSidebar")
    .addToUi();
}

/**
 * Runs when the add-on is installed; calls onOpen() to ensure menu creation and
 * any other initializion work is done immediately.
 * @param {Object} e The event parameter for a simple onInstall trigger.
 */
function onInstall(e) {
  onOpen(e);
}

/**
 * Opens a sidebar. The sidebar structure is described in the Sidebar.html
 * project file.
 */
function showSidebar() {
  const service = getService();
  const template = HtmlService.createTemplateFromFile("Sidebar");
  template.user = Session.getEffectiveUser().getEmail();
  template.dataSource = DATA_ALIAS;
  template.isAuthorized = service.hasAccess();
  template.authorizationUrl = null;
  if (!template.isAuthorized) {
    template.authorizationUrl = service.getAuthorizationUrl();
  }
  const page = template.evaluate().setTitle(SIDEBAR_TITLE);
  SpreadsheetApp.getUi().showSidebar(page);
}

/**
 * Return data needed to build the sidebar UI: a list of the names of the
 * currently saved report configurations and the list of potential
 * column choices.
 * @return {Object} a collection of saved report data and column options.
 */
function getInitialDataForSidebar() {
  const reportSet = getAllReports();
  const reportList = [];
  _.each(reportSet, (val, key) => {
    reportList.push({ name: val, reportId: key });
  });
  reportList.sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  });
  return { reports: reportList, columns: getColumnOptions() };
}

/**
 * Get the report configuration for the given report and, if a sheet
 * exists for it, activate that sheet.
 * @param {String} reportId a report ID.
 * @return {object} The report config.
 */
function switchToReport(reportId) {
  const config = getReportConfig(reportId);
  activateById(config.sheetId);
  return config;
}

/**
 * Import data to the spreadsheet according to the given report
 * configuration.
 * @param {string} reportId the report identifier.
 * @return {object} the (possibly updated) report configuration.
 */
function runImport(reportId) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let config = getReportConfig(reportId);

  // Acquire the sheet to place the import results in,
  // then clear and format it.
  // Update the saved config with sheet/time information.
  const sheet = activateReportSheet(config);
  const columnIds = getColumnIds(config);
  const lastRun = new Date().toString();
  config = updateOnImport(config, sheet, lastRun);

  // Call for pages of API information to place in the sheet, one
  // page at a time.
  let pageNumber = 0;
  let firstRow = 2;
  try {
    let page;
    do {
      page = getDataPage(columnIds, pageNumber, IMPORT_PAGE_SIZE, config);
      if (page) {
        sheet
          .getRange(firstRow, 1, page.length, page[0].length)
          .setValues(page);
        firstRow += page.length;
        pageNumber++;
        SpreadsheetApp.flush();
      }
    } while (page != null);
  } catch (e) {
    // Ensure a new sheet Id, if created, is preserved.
    throw ERROR_CODES.IMPORT_FAILED;
  }

  for (let i = 1; i <= sheet.getLastColumn(); i++) {
    sheet.autoResizeColumn(i);
  }
  ss.toast(`Report ${config.name} updated.`);
  return config;
}

/**
 * Save the given report configuration.
 * @param {Object} config a report configuration to save.
 * @return {Object} the updated report configuration.
 */
function saveReport(config) {
  const existingConfig = getReportConfig(config.reportId);
  if (existingConfig != null) {
    activateById(existingConfig.sheetId);
    // Check: users are not allowed to save edits to reports
    // created by other users if those reports have been marked
    // for auto-update.
    if (!canEditReport(existingConfig)) {
      throw ERROR_CODES.ILLEGAL_EDIT;
    }
  }
  // Check against max number of scheduled reports.
  if (isOverScheduleLimit(config)) {
    throw ERROR_CODES.AUTO_UPDATE_LIMIT;
  }

  const result = saveReportConfig(config);
  adjustScheduleTrigger();
  return result;
}

/**
 * Delete the given report configuration.
 * @param {String} reportId indicates the report to delete.
 * @return {String} the report ID deleted.
 */
function removeReport(reportId) {
  // Check: users are not allowed to delete reports created by
  // other users if those reports have been marked for auto-update.
  if (!canEditReport(getReportConfig(reportId))) {
    throw ERROR_CODES.ILLEGAL_DELETE;
  }
  deleteReportConfig(reportId);
  adjustScheduleTrigger();
  return reportId;
}

/**
 * Activate, clear, format and return the sheet associated with the
 * specified report configuration. If the sheet does not exist, create,
 * format and activate it.
 * @param {Object} config the report configuration.
 * @return {Sheet}
 */
function activateReportSheet(config) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = getSheetById(ss, Number.parseInt(config.sheetId));
  if (sheet == null) {
    sheet = ss.insertSheet();
    sheet.setName(getUniqueSheetName(ss, config.name));
  }
  sheet.activate();

  const headers = _.map(config.columns, (col) => col.label);
  sheet.clear();
  sheet.clearNotes();
  sheet.setFrozenRows(1);
  sheet
    .getRange("1:1")
    .setFontWeight("bold")
    .setBackground("#000000")
    .setFontColor("#ffffff");
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  return sheet;
}

/**
 * On an hourly trigger, search through scheduled reports, find one
 * that hasn't been run in 24 hours or more (or never), and run
 * an import for that one. With <= 24 scheduled reports, this pattern
 * ensures that every scheduled report will be updated once a day.
 */
function respondToHourlyTrigger() {
  const authInfo = ScriptApp.getAuthorizationInfo(ScriptApp.AuthMode.FULL);
  // Check if the actions of the trigger require authorizations that have not
  // been supplied yet -- if so, warn the active user via email (if possible).
  // This check is required when using triggers with add-ons to maintain
  // functional triggers.
  if (
    authInfo.getAuthorizationStatus() === ScriptApp.AuthorizationStatus.REQUIRED
  ) {
    // Re-authorization is required. In this case, the user needs to be alerted
    // that they need to reauthorize; the normal trigger action is not
    // conducted, since it authorization needs to be provided first. Send at
    // most one 'Authorization Required' email a day, to avoid spamming users
    // of the add-on.
    sendReauthorizationRequest();
  } else {
    const potentials = getScheduledReports(
      Session.getEffectiveUser().getEmail(),
    );
    for (let i = 0; i < potentials.length; i++) {
      const lastRun = potentials[i].lastRun;
      if (!lastRun || isOlderThanADay(lastRun)) {
        runImport(potentials[i].reportId);
        return;
      }
    }
  }
}

/**
 * Called when the user needs to reauthorize. Sends the user of the
 * add-on an email explaining the need to reauthorize and provides
 * a link for the user to do so. Capped to send at most one email
 * a day to prevent spamming the users of the add-on.
 */
function sendReauthorizationRequest() {
  const authInfo = ScriptApp.getAuthorizationInfo(ScriptApp.AuthMode.FULL);
  const properties = PropertiesService.getUserProperties();
  const LAST_AUTH_EMAIL_KEY = "Import.reauth.lastAuthEmailDate";
  const lastAuthEmailDate = properties.getProperty(LAST_AUTH_EMAIL_KEY);
  const today = new Date().toDateString();
  if (lastAuthEmailDate !== today) {
    if (MailApp.getRemainingDailyQuota() > 0) {
      const template = HtmlService.createTemplateFromFile("AuthorizationEmail");
      template.url = authInfo.getAuthorizationUrl();
      template.addonName = ADDON_NAME;
      const message = template.evaluate();
      MailApp.sendEmail(
        Session.getEffectiveUser().getEmail(),
        "Add-on Authorization Required",
        message.getContent(),
        {
          name: ADDON_NAME,
          htmlBody: message.getContent(),
        },
      );
    }
    properties.setProperty(LAST_AUTH_EMAIL_KEY, today);
  }
}

/**
 * Turn on the scheduling trigger if scheduled reports owned
 * by the current user are present; turn it off otherwise.
 */
function adjustScheduleTrigger() {
  const existingTriggerId = getTriggerId();
  const user = Session.getEffectiveUser().getEmail();
  const triggerNeeded = getScheduledReports(user).length > 0;

  // Create a new trigger if required; delete existing trigger
  // if it is not needed.
  if (triggerNeeded && existingTriggerId == null) {
    const trigger = ScriptApp.newTrigger("respondToHourlyTrigger")
      .timeBased()
      .everyHours(1)
      .create();
    saveTriggerId(trigger);
  } else if (!triggerNeeded && existingTriggerId != null) {
    const existingTrigger = getUserTriggerById(
      SpreadsheetApp.getActiveSpreadsheet(),
      existingTriggerId,
    );
    if (existingTrigger != null) {
      ScriptApp.deleteTrigger(existingTrigger);
    }
    removeTriggerId();
  }
}
