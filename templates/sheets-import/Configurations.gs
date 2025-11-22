// @ts-nocheck
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

// @ts-nocheck
var REPORT_SET_KEY = 'Import.ReportSet';
var SCHEDULE_TRIGGER_ID = 'Import.scheduled.triggerId';

/**
 * Update type enum used when adding or deleting a report.
 */
var UPDATE_TYPE = {
  ADD: 1,
  REMOVE: 2
};

/**
 * @typedef {{
 *   reportId: string,
 *   sheetId: string,
 *   sheetName: string,
 *   name: string,
 *   lastRun: string,
 *   owner: string,
 *   scheduled: boolean,
 *   columns: any[],
 * }} ReportConfig
 */

/**
 * @typedef {{
 *  [reportId: string]: string
 * }} Report
 */

/**
 * Return the report configuration for the report with the given
 * ID; returns an empty Object if no such report name exists.
 * @param {string} reportId a report ID.
 * @return {ReportConfig|null} a report configuration corresponding to that ID,
 *   or null if no such report exists.
 */
function getReportConfig(reportId) {
  var config = getObjectFromProperties(reportId);
  if (!config) {
    return null;
  }
  // Sheet name may have been changed manually, so
  // get the current one.
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = getSheetById(ss, parseInt(config.sheetId));
  config.sheetName = !sheet ? '' : sheet.getName();
  return /** @type {ReportConfig} */ (config);
}

/**
 * Given a report configuration, save it.
 * @param {ReportConfig} config the report configuration.
 * @return {ReportConfig} The saved configuration.
 */
function saveReportConfig(config) {
  if (typeof _ === 'undefined') {
    throw new Error('Underscore library not found. Have you added it?');
  }
  var previous = getReportConfig(config.reportId);
  if (config.reportId === 'new-report') {
    config.reportId = newReportId();
    config.lastRun = '';
    config.owner = Session.getEffectiveUser().getEmail() || '';
  }
  saveObjectToProperties(config.reportId, config);
  updateReportSet(UPDATE_TYPE.ADD, config.reportId, config.name);
  if (previous == null) {
    return config;
  }
  return _.extend(previous, config);
}

/**
 * Delete the report specified by the given ID.
 * @param {string} reportId indicates the report to delete.
 */
function deleteReportConfig(reportId) {
  deleteObjectFromProperties(reportId);
  updateReportSet(UPDATE_TYPE.REMOVE, reportId);
}

/**
 * Returns true if the current user is allowed to edit the
 * report associated with the given config.
 * @param {ReportConfig} config a report configuration.
 * @return {boolean} True if the user can edit the report.
 */
function canEditReport(config) {
  if (!config) {
    return false;
  }
  return config.scheduled == false ||
    Session.getEffectiveUser().getEmail() == config.owner;
}

/**
 * Given a new report configuration, return true if it saving this report would mean the limit on
 * scheduled reports would be exceeded.
 * @param {ReportConfig} config a report configuration to be saved.
 * @return {boolean} If it saving this report would mean the limit on scheduled reports
 * would be exceeded.
 */
function isOverScheduleLimit(config) {
  var previous = getReportConfig(config.reportId);
  var currentUser = Session.getEffectiveUser().getEmail();
  var isScheduled = config == null ? false : config.scheduled;
  var wasScheduled = previous == null ? false : previous.scheduled;
  return (isScheduled && wasScheduled != true &&
    getScheduledReports(currentUser).length >= MAX_SCHEDULED_REPORTS);
}

/**
 * Return a set of all saved reports (reportIds as keys, report
 * names as values).
 * @return {Report}
 */
function getAllReports() {
  var properties = PropertiesService.getDocumentProperties();
  var reports = properties.getProperty(REPORT_SET_KEY);
  if (reports) {
    return JSON.parse(reports);
  }
  return {};
}

/**
 * Get a set of report configurations that all have been marked
 * for scheduled imports.
 * @param {string} opt_user optional user email; if provided, returned
 *   results will only include reports that user is the owner of.
 * @return {ReportConfig[]} collection of configuration object for scheduled
 *   reports.
 */
function getScheduledReports(opt_user) {
  const scheduledReports = [];
  if (typeof _ === 'undefined') {
    throw new Error('Underscore library not found. Have you added it?');
  }
  var allReports = getAllReports();
  if (allReports) {
    Object.keys(allReports).forEach(function(reportId) {
      var config = getReportConfig(reportId);
      if (
        config &&
        config.scheduled &&
        (!opt_user || opt_user == config.owner)
      ) {
        scheduledReports.push(config);
      }
    });
  }
  return scheduledReports;
}

/**
 * Updates the current report list (adding or removing a given
 * report name and id).
 * @param {number} updateType Enum: either UPDATE_TYPE.ADD or
 *   UPDATE_TYPE.REMOVE.
 * @param {string} reportId report to add or remove.
 * @param {string=} reportName report name (only needed for ADD).
 */
function updateReportSet(updateType, reportId, reportName) {
  var properties = PropertiesService.getDocumentProperties();
  var lock = LockService.getDocumentLock();
  lock.waitLock(2000);
  var reportSet = getAllReports();
  if (reportSet == null) {
    reportSet = {};
  }
  if (updateType == UPDATE_TYPE.ADD) {
    reportSet[reportId] = reportName;
  } else if (updateType == UPDATE_TYPE.REMOVE) {
    delete reportSet[reportId];
  }
  properties.setProperty(REPORT_SET_KEY, JSON.stringify(reportSet));
  lock.releaseLock();
}

/**
 * Update a report configuration with a sheetId and last runtime
 * information, save and return it. Include but do not save the
 * sheet name.
 * @param {ReportConfig} config the report configuration.
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet the report's sheet.
 * @param {string} lastRun the datetime string indicating the last
 *   time the report was run.
 * @return {ReportConfig} the updated report configuration.
 */
function updateOnImport(config, sheet, lastRun) {
  if (typeof _ === 'undefined') {
    throw new Error('Underscore library not found. Have you added it?');
  }
  var update = {
    sheetId: sheet.getSheetId().toString(),
    lastRun: lastRun,
  };
  saveObjectToProperties(config.reportId, update);
  config.sheetId = update.sheetId;
  config.lastRun = update.lastRun;
  config.sheetName = sheet.getName();
  return config;
}

/**
 * Return the array of column IDs used by the given report
 * configuration.
 * @param {ReportConfig} config the report configuration.
 * @return {string[]} column ID strings.
 */
function getColumnIds(config) {
  if (typeof _ === 'undefined') {
    throw new Error('Underscore library not found. Have you added it?');
  }
  return _.map(config.columns, function(col) {
    return col.column;
  });
}

/**
 * Return the saved trigger ID of the scheduling trigger for this user.
 * @return {string|null} the trigger ID or null if the trigger is not set.
 */
function getTriggerId() {
  var properties = PropertiesService.getUserProperties();
  return properties.getProperty(SCHEDULE_TRIGGER_ID);
}

/**
 * Save the trigger ID of the scheduling trigger for this user.
 * @param {object} trigger the trigger whose ID should be saved.
 */
function saveTriggerId(trigger) {
  var properties = PropertiesService.getUserProperties();
  properties.setProperty(SCHEDULE_TRIGGER_ID, trigger.getUniqueId());
}

/**
 * Remove the saved trigger ID.
 */
function removeTriggerId() {
  var properties = PropertiesService.getUserProperties();
  properties.deleteProperty(SCHEDULE_TRIGGER_ID);
}
