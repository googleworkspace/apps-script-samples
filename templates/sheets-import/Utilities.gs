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
 * Includes the given project HTML file in the current HTML project file.
 * Also used to include JavaScript.
 * @param {String} filename Project file name.
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/**
 * Returns true if the given date string represents a date that is
 * more than 24 hours in the past; returns false otherwise.
 * @param {String} dateStr a date string.
 * @return {Boolean}
 */
function isOlderThanADay(dateStr) {
  var now = (new Date()).getTime();
  var then = Date.parse(dateStr);
  return (then + 24 * 60 * 60 * 1000) < now;
}

/**
 * Given an object and a string prefix, save every value in that object
 * to the Document properties service as a JSONified string. The property
 * key for each object key will be: prefix.<object_key>
 * @param {String} prefix a common string to label each added property.
 * @param {Object} obj a collection of key-values to save as
 *   user properties.
 */
function saveObjectToProperties(prefix, obj) {
  var properties = PropertiesService.getDocumentProperties();
  _.each(obj, function(val, key) {
      var propKey = prefix + '.' + key;
      properties.setProperty(propKey, JSON.stringify(val));
  });
}

/**
 * Given a string prefix, fetch from the Document properties service all
 * properties whose keys start with that prefix, and return the (JSON-parsed)
 * values in an object. The keys of the returned object will be the
 * same as the property keys with the leading "prefix." removed.
 * @param {String} prefix label of requested properties.
 * @return {Object} collection of key-value pairs taken from the
 *   properties service. Will return null if the prefix is unrecognized.
 */
function getObjectFromProperties(prefix) {
  var properties = PropertiesService.getDocumentProperties();
  var obj = {};
  _.each(properties.getProperties(), function(val, key) {
    if (key.indexOf(prefix) > -1) {
      obj[key.substr(prefix.length + 1)] = JSON.parse(val);
    }
  });
  if (_.keys(obj).length == 0) {
    return null;
  }
  return obj;
}

/**
 * Given a string prefix, remove from the Document properties service all
 * properties whose keys start with that prefix.
 * @param {String} prefix label of properties to remove.
 */
function deleteObjectFromProperties(prefix) {
  var properties = PropertiesService.getDocumentProperties();
  _.each(properties.getProperties(), function(val, key) {
    if (key.indexOf(prefix) > -1) {
      properties.deleteProperty(key);
    }
  });
}

/**
 * Generate a random alphanumeric string.
 * @return {String} report ID string.
 */
function newReportId() {
  return Math.random().toString(36).substring(2);
}

/**
 * Sheets-specific utility. Find a sheet within a spreadsheet with
 * the given id. If not present, return null.
 * @param {Object} ss a Spreadsheet object.
 * @param {Number} sheetId a Sheet id.
 * @return {Object} a Sheet object, or null if not found.
 */
function getSheetById(ss, sheetId) {
  if (sheetId === null) {
    return null;
  }
  var sheets = ss.getSheets();
  for (var i = 0; i < sheets.length; i++) {
    if (sheets[i].getSheetId() === sheetId) {
      return sheets[i];
    }
  }
  return null;
}

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
function getUniqueSheetName(spreadsheet, baseName) {
  var sheetName = baseName;
  var i = 2;
  while (spreadsheet.getSheetByName(sheetName) != null) {
      sheetName = baseName + ' ' + i++;
  }
  return sheetName;
}

/**
 * Sheets-specific utility. Given a spreadsheet and a triggerId string,
 * return the user trigger that corresponds to that ID. Returns null
 * if no such trigger exists.
 * @param {Spreadsheet} spreadsheet container of the user triggers.
 * @param {String} triggerId trigger ID string.
 * @return {Trigger} corresponding user trigger, or null if not found.
 */
function getUserTriggerById(spreadsheet, triggerId) {
  var triggers = ScriptApp.getUserTriggers(spreadsheet);
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getUniqueId() == triggerId) {
      return triggers[i];
    }
  }
  return null;
}

/**
 * Sheets-specific utility. Given a String sheet id, activate that
 * sheet if it exists.
 * @param {String} sheetId the sheet ID.
 */
function activateById(sheetId) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = getSheetById(ss, parseInt(sheetId));
  if (sheet != null) {
    sheet.activate();
  }
}
