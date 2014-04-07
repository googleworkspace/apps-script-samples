// Copyright 2014 Google Inc. All Rights Reserved.
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
 * @fileoverview Provides the custom functions DATEADD and DATESUBTRACT and
 * the helper functions that they use.
 */

/*
 * Load the Moment library for date manipulation. Include it in your script
 * using the project key "MHMchiX6c1bwSqGM1PZiW_PxhMjh3Sh48".
 */
var moment = Moment.load();

/**
 * The list of valid unit identifiers.
 */
var VALID_UNITS = ['year', 'month', 'week', 'day', 'hour', 'minute', 'second',
    'millisecond'];

/**
 * Runs when the add-on is installed.
 */
function onInstall() {
  onOpen();
}

/**
 * Runs when the document is opened, creating the add-on's menu. Custom function
 * add-ons need at least one menu item, since the add-on is only enabled in the
 * current spreadsheet when a function is run.
 */
function onOpen() {
  SpreadsheetApp.getUi().createAddonMenu()
      .addItem('Use in this spreadsheet', 'use')
      .addToUi();
}

/**
 * Enables the add-on on for the current spreadsheet (simply by running) and
 * shows a popup informing the user of the new functions that are available.
 */
function use() {
  var title = 'Date Custom Functions';
  var message = 'The functions DATEADD and DATESUBTRACT are now available in ' +
      'this spreadsheet. More information is available in the function help ' +
      'box that appears when you start using them in a formula.';
  var ui = SpreadsheetApp.getUi();
  ui.alert(title, message, ui.ButtonSet.OK);
}

/**
 * Adds some amount of time to a date.
 * @param {Date} date The date to add to.
 * @param {string} unit The unit of time to add. Possible values include:
 *    `years`, `months`, `weeks`, `days`, `hours`, `minutes`, `seconds`, and
 *    `milliseconds`. You can also use the shorthand notation for these units
 *    which are `y`, `M`, `w`, `d`, `h`, `m`, `s`, `ms` respectively.
 * @param {number} amount The amount of the specified unit to add.
 * @return {Date} The new date.
 * @customFunction
 */
function DATEADD(date, unit, amount) {
  validateParameters(date, unit, amount);
  return moment(date).add(unit, amount).toDate();
}

/**
 * Subtracts some amount of time from a date.
 * @param {Date} date The date to subtract from.
 * @param {string} unit The unit of time to subtract. Possible values include:
 *    `years`, `months`, `weeks`, `days`, `hours`, `minutes`, `seconds`, and
 *    `milliseconds`. You can also use the shorthand notation for these units
 *    which are `y`, `M`, `w`, `d`, `h`, `m`, `s`, `ms` respectively.
 * @param {number} amount The amount of the specified unit to subtract.
 * @return {Date} The new date.
 * @customFunction
 */
function DATESUBTRACT(date, unit, amount) {
  validateParameters(date, unit, amount);
  return moment(date).subtract(unit, amount).toDate();
}

/**
 * Validates that the date, unit, and amount supplied are compatible with
 * Moment, throwing an exception if any of the parameters are invalid.
 * @param {Date} date The date to add to or subtract from.
 * @param {string} unit The unit of time to add/subtract.
 * @param {number} amount The amount of the specified unit to add/subtract.
 */
function validateParameters(date, unit, amount) {
  if (date == undefined || typeof date == 'number' || !moment(date).isValid()) {
    throw Utilities.formatString('Parameter 1 expects a date value, but "%s" ' +
        'cannot be coerced to a date.', date);
  }
  if (VALID_UNITS.indexOf(moment.normalizeUnits(unit)) < 0) {
    throw Utilities.formatString('Parameter 2 expects a unit identifier, but ' +
        '"%s" is not a valid identifier.', unit);
  }
  if (isNaN(Number(amount))) {
    throw Utilities.formatString('Parameter 3 expects a number value, but ' +
        '"%s" cannot be coerced to a number.', amount);
  }
}
