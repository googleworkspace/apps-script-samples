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

var _ = Underscore.load();

/**
 * TODO: Replace the following with the name of the service you are importing
 * from and the name of the add-on you are building, respectively.
 */
var DATA_ALIAS = 'MyDataSource';
var ADDON_NAME = "YOUR_ADDON_NAME_HERE";
var SIDEBAR_TITLE = 'Import Control Center';
var MAX_SCHEDULED_REPORTS = 24;
var IMPORT_PAGE_SIZE = 30;

/**
 * Error code enum; this gets passed to the sidebar for use there as well.
 */
var ERROR_CODES = {
  AUTO_UPDATE_LIMIT: 1,
  ILLEGAL_EDIT: 2,
  ILLEGAL_DELETE: 3,
  IMPORT_FAILED: 4
}

/**
 * Adds a custom menu with items to show the sidebar.
 * @param {Object} e The event parameter for a simple onOpen trigger.
 */
function onOpen(e) {
  SpreadsheetApp.getUi()
      .createAddonMenu()
      .addItem('Import control center', 'showSidebar')
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
  var service = getService();
  var template = HtmlService.createTemplateFromFile('Sidebar');
  template.user = Session.getEffectiveUser().getEmail();
  template.dataSource = DATA_ALIAS;
  template.isAuthorized = service.hasAccess();
  template.authorizationUrl = null;
  if (!template.isAuthorized) {
    template.authorizationUrl = service.getAuthorizationUrl();
  }
  var page = template.evaluate()
      .setTitle(SIDEBAR_TITLE)
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  SpreadsheetApp.getUi().showSidebar(page);
}

/**
 * Return data needed to build the sidebar UI: a list of the names of the
 * currently saved report configurations and the list of potential
 * column choices.
 * @return {Object} a collection of saved report data and column options.
 */
function getInitialDataForSidebar() {
  var reportSet = getAllReports();
  var reportList = [];
  _.each(reportSet, function(val, key) {
    reportList.push({'name': val, 'reportId': key});
  });
  reportList.sort(function (a, b) {
    if (a.name > b.name) { return 1; }
    if (a.name < b.name) { return -1; }
    return 0;
  });
  return {reports: reportList, columns: getColumnOptions()};
}

/**
 * Get the report configuration for the given report and, if a sheet
 * exists for it, activate that sheet.
 * @param {String} reportId a report ID.
 */
function switchToReport(reportId) {
  var config = getReportConfig(reportId);
  activateById(config.sheetId);
  return config;
}

/**
 * Import data to the spreadsheet according to the given report
 * configuration.
 * @param {String} reportId the report identifier.
 * @return {Object} the (possibly updated) report configuration.
 */
function runImport(reportId) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var config = getReportConfig(reportId);

  // Acquire the sheet to place the import results in,
  // then clear and format it.
  // Update the saved config with sheet/time information.
  var sheet = activateReportSheet(config);
  var columnIds = getColumnIds(config);
  var lastRun = new Date().toString();
  config = updateOnImport(config, sheet, lastRun);

  // Call for pages of API information to place in the sheet, one
  // page at a time.
  var pageNumber = 0;
  var firstRow = 2;
  try {
    var page;
    do {
      page = getDataPage(columnIds, pageNumber, IMPORT_PAGE_SIZE, config);
      if (page) {
        sheet.getRange(firstRow, 1, page.length, page[0].length).setValues(page);
        firstRow += page.length;
        pageNumber++;
        SpreadsheetApp.flush();
      }
    } while (page != null);
  } catch (e) {
    // Ensure a new sheet Id, if created, is preserved.
    throw ERROR_CODES.IMPORT_FAILED;
  }

  for (var i = 1; i <= sheet.getLastColumn(); i++) {
    sheet.autoResizeColumn(i);
  }
  ss.toast('Report ' + config.name + ' updated.');
  return config;
}

/**
 * Save the given report configuration.
 * @param {Object} config a report configuration to save.
 * @return {Object} the updated report configuration.
 */
function saveReport(config) {
  var existingConfig = getReportConfig(config.reportId);
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
  
  var result = saveReportConfig(config);
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
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = getSheetById(ss, parseInt(config.sheetId));
  if (sheet == null) {
    sheet = ss.insertSheet();
    sheet.setName(getUniqueSheetName(ss, config.name));
  }
  sheet.activate();

  var headers = _.map(config.columns, function(col) {
    return col.label;
  });
  sheet.clear();
  sheet.clearNotes();
  sheet.setFrozenRows(1);
  sheet.getRange('1:1')
    .setFontWeight('bold')
    .setBackground('#000000')
    .setFontColor('#ffffff');
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
  var authInfo = ScriptApp.getAuthorizationInfo(ScriptApp.AuthMode.FULL);
  // Check if the actions of the trigger require authorizations that have not
  // been supplied yet -- if so, warn the active user via email (if possible).
  // This check is required when using triggers with add-ons to maintain
  // functional triggers.
  if (authInfo.getAuthorizationStatus() ==
      ScriptApp.AuthorizationStatus.REQUIRED) {
    // Re-authorization is required. In this case, the user needs to be alerted
    // that they need to reauthorize; the normal trigger action is not
    // conducted, since it authorization needs to be provided first. Send at
    // most one 'Authorization Required' email a day, to avoid spamming users
    // of the add-on.
    sendReauthorizationRequest();
  } else {
    var potentials = getScheduledReports(Session.getEffectiveUser().getEmail());
    for (var i = 0; i < potentials.length; i++) {
      var lastRun = potentials[i].lastRun;
      if (!lastRun || isOlderThanADay(lastRun) ) {
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
  var authInfo = ScriptApp.getAuthorizationInfo(ScriptApp.AuthMode.FULL);
  var properties = PropertiesService.getUserProperties();
  var LAST_AUTH_EMAIL_KEY = 'Import.reauth.lastAuthEmailDate';
  var lastAuthEmailDate = properties.getProperty(LAST_AUTH_EMAIL_KEY);
  var today = new Date().toDateString();
  if (lastAuthEmailDate != today) {
    if (MailApp.getRemainingDailyQuota() > 0) {
      var template =
          HtmlService.createTemplateFromFile('AuthorizationEmail');
      template.url = authInfo.getAuthorizationUrl();
      template.addonName = ADDON_NAME;
      var message = template.evaluate();
      MailApp.sendEmail(Session.getEffectiveUser().getEmail(),
        'Add-on Authorization Required',
        message.getContent(), {
          name: ADDON_NAME,
          htmlBody: message.getContent()
      });
    }
    properties.setProperty(LAST_AUTH_EMAIL_KEY, today);
  }
}

/**
 * Turn on the scheduling trigger if scheduled reports owned
 * by the current user are present; turn it off otherwise.
 */
function adjustScheduleTrigger() {
  var existingTriggerId = getTriggerId();
  var user = Session.getEffectiveUser().getEmail();
  var triggerNeeded = getScheduledReports(user).length > 0;

  // Create a new trigger if required; delete existing trigger
  // if it is not needed.
  if (triggerNeeded && existingTriggerId == null) {
    var trigger = ScriptApp.newTrigger('respondToHourlyTrigger')
        .timeBased()
        .everyHours(1)
        .create();
    saveTriggerId(trigger);
  } else if (!triggerNeeded && existingTriggerId != null) {
    var existingTrigger = getUserTriggerById(
        SpreadsheetApp.getActiveSpreadsheet(),
        existingTriggerId);
    if (existingTrigger != null) {
      ScriptApp.deleteTrigger(existingTrigger);
    }
    removeTriggerId();
  }
}
