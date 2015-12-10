// Copyright 2015 Google Inc. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


/**
 * Composes the correct URL to open a Google Sheet from Drive by URL.
 * @private
 * @param {String} fileId Drive file ID for the spreadsheet.
 * @param {String} gid The sheet ID to open.
 *     Value is in "gid=" param in the URL.
 * @return {String} Full URL to open the spreadsheet on Drive.
 */
function getSpreadsheetUrl_(fileId, gid) {
  return 'https://docs.google.com/spreadsheets/d/' + fileId +
      '/edit#gid=' + gid;
}



/**
 * Assists in working in a standalone project that may be dynamically bound to
 * a Spreadsheet (as an add-on), but also may run separate (testing, Execution
 * API, etc.).
 * @constructor
 * @param {myproj.json.Configuration} config a valid configuration object
 *    instance.
 */
function SheetsUtilitiesLibrary(config) {
  this.config = config;
}


/**
 * Returns a Spreadsheet instance. Instance is retrieved by ID if an ID
 * has been set by test code in the configuration.
 * @return {SpreadSheet}
 */
SheetsUtilitiesLibrary.prototype.getCurrentActiveSpreadsheet = function() {
  var loadLocal = ((typeof this.config.sheets !== 'undefined') &&
      (typeof this.config.sheets.debugSpreadsheetId !== 'undefined') &&
      (this.config.sheets.debugSpreadsheetId !== ''));
  if (loadLocal) {
    return SpreadsheetApp.openById(this.config.sheets.debugSpreadsheetId);
  } else {
    return SpreadsheetApp.getActiveSpreadsheet();
  }
};


/**
 * Shows a toast message in the current active spreadsheet.
 * @param {String} msg The message to display.
 * @param {String} title The title of the toast.
 */
SheetsUtilitiesLibrary.prototype.showToast = function(msg, title) {
  this.getCurrentActiveSpreadsheet().toast(msg, title, 4);
};


/**
 * Returns true if the current user is the owner of the current spreadsheet.
 * @this {SheetsUtilitiesLibrary} current instance
 * @return {Boolean} True if the current user is the owner of the Drive file.
 */
SheetsUtilitiesLibrary.prototype.currentUserIsOwner = function() {
  var ownerEmail = this.getCurrentActiveSpreadsheet().getOwner().getEmail();
  return (ownerEmail === Session.getEffectiveUser().getEmail());
};


/**
 * Sheets-specific utility. Find a sheet within a spreadsheet with
 * the given id. If not present, return null.
 * @param {Object} spreadsheet a Spreadsheet object.
 * @param {Number} sheetId a Sheet id.
 * @return {Object} a Sheet object, or null if not found.
 */
SheetsUtilitiesLibrary.prototype.getSheetById = function(spreadsheet, sheetId) {
  if ((typeof sheet === 'undefined') || (!sheetId)) {
    return null;
  }
  var sheets = spreadsheet.getSheets();
  for (var i = 0; i < sheets.length; i++) {
    if (sheets[i].getSheetId() === sheetId) {
      return sheets[i];
    }
  }
  return null;
};


/**
 * Sheets-specific utility. Given a base title for a sheet, check
 * for that it is unique in the spreadsheet. If not, find an integer
 * suffix to append to it to make it unique and return. This function
 * is used to avoid name collisions while adding or renaming sheets
 * automatically.
 * @param {Object} spreadsheet a Spreadsheet.
 * @param {String} baseName the initial suggested title for a sheet.
 * @return {String} a unique title for the sheet, based on the
 *     given base title.
 */
SheetsUtilitiesLibrary.prototype.getUniqueSheetName =
    function(spreadsheet, baseName) {
  var sheetName = baseName;
  var i = 2;
  while (spreadsheet.getSheetByName(sheetName) !== null) {
    sheetName = baseName + ' ' + i++;
  }
  return sheetName;
};


/**
 * Sheets-specific utility. Given a spreadsheet and a triggerId string,
 * return the user trigger that corresponds to that ID. Returns null
 * if no such trigger exists.
 * @param {Spreadsheet} spreadsheet container of the user triggers.
 * @param {String} triggerId trigger ID string.
 * @return {Trigger} corresponding user trigger, or null if not found.
 */
SheetsUtilitiesLibrary.prototype.getUserTriggerById =
    function(spreadsheet, triggerId) {
  var triggers = ScriptApp.getUserTriggers(spreadsheet);
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getUniqueId() === triggerId) {
      return triggers[i];
    }
  }
};


/**
 * Sheets-specific utility. Given a String sheet id, activate that
 * sheet if it exists.
 * @this {SheetsUtilitiesLibrary} current instance
 * @param {String} sheetId the sheet ID.
 */
SheetsUtilitiesLibrary.prototype.activateById = function(sheetId)  {
  var spreadsheet = this.getCurrentActiveSpreadsheet;
  var sheet = this.getSheetById(spreadsheet, parseInt(sheetId));
  if (sheet !== null) {
    sheet.activate();
  }
};

