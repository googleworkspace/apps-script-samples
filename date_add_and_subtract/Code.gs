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
 * @OnlyCurrentDoc
 */

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
      'box that appears when you start using them in a forumula.';
  var ui = SpreadsheetApp.getUi();
  ui.alert(title, message, ui.ButtonSet.OK);
}

/**
 * Adds some amount of time to a date.
 * @param {Date|Range} date The date to add to, or a range of dates.
 * @param {string|Range} unit The unit of time to add, or a range of units.
 *    Possible values include:
 *    `years`, `months`, `weeks`, `days`, `hours`, `minutes`, `seconds`, and
 *    `milliseconds`. You can also use the shorthand notation for these units
 *    which are `y`, `M`, `w`, `d`, `h`, `m`, `s`, `ms` respectively.
 * @param {number|Range} amount The amount of the specified unit to add, or a
 *    range of amounts.
 * @return {Date} The new date.
 * @customFunction
 */
function DATEADD(date, unit, amount) {
  var args = toArray(arguments);
  return multimap(args, function(date, unit, amount) {
    validateParameters(date, unit, amount);
    return moment(date).add(unit, amount).toDate();
  });
}

/**
 * @customFunction
 */
function DATETEST(date, unit, amount) {
  return JSON.stringify(DATEADD(date, unit, amount));
}

/**
 * Subtracts some amount of time from a date.
 * @param {Date|Range} date The date to subtract from, or a range of dates.
 * @param {string|Range} unit The unit of time to subtract, or a range of units.
 *    Possible values include:
 *    `years`, `months`, `weeks`, `days`, `hours`, `minutes`, `seconds`, and
 *    `milliseconds`. You can also use the shorthand notation for these units
 *    which are `y`, `M`, `w`, `d`, `h`, `m`, `s`, `ms` respectively.
 * @param {number|Range} amount The amount of the specified unit to subtract, or
 *     a range of amounts.
 * @return {Date} The new date.
 * @customFunction
 */
function DATESUBTRACT(date, unit, amount) {
  var args = toArray(arguments);
  return multimap(args, function(date, unit, amount) {
    validateParameters(date, unit, amount);
    return moment(date).subtract(unit, amount).toDate();
  });
}

/**
 * Validates that the date, unit, and amount supplied are compatible with
 * Momnent, throwing an exception if any of the parameters are invalid.
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

/**
 * Applies a function to a set of arguments, looping over arrays in those
 * arguments. Similar to Array.map, except that it can map the function across
 * multiple arrays, passing forward non-array values.
 * @param {Array} args The arguments to map against.
 * @param {Function} func The function to apply.
 * @return {Array} The results of the mapping.
 */
function multimap(args, func) {
  // Determine the length of the arrays.
  var lengths = args.map(function(arg) {
    if (arg instanceof Array) {
      return arg.length;
    } else {
      return 0;
    }
  });
  var max = Math.max.apply(null, lengths);

  // If there aren't any arrays, just call the function.
  if (max == 0) {
    return func.apply(null, args);
  }

  // Ensure all the arrays are the same length.
  // Arrays of length 1 are exempted, since they are assumed to be rows/columns
  // that should apply to each row/column in the other sets.
  lengths.forEach(function(length) {
    if (length != max && length > 1) {
      throw 'All input ranges must be the same size: ' + max;
    }
  });

  // Recursively apply the map function to each element in the arrays.
  var result = []
  for (var i = 0; i < max; i++) {
    var params = args.map(function(arg) {
      if (arg instanceof Array) {
        return arg.length == 1 ? arg[0] : arg[i];
      } else {
        return arg;
      }
    });
    result.push(multimap(params, func));
  }
  return result;
}

/**
 * Convert the array-like arguments object into a real array.
 * @param {Arguments} args The arguments object to convert.
 * @return {Array} The equivalent array.
 */
function toArray(args) {
  return Array.prototype.slice.call(args);
}
