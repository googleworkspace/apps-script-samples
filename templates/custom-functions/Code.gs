/**
 * Copyright 2014 Google Inc. All Rights Reserved.
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
 * @OnlyCurrentDoc Limits the script to only accessing the current spreadsheet.
 */

/**
 * A function that takes a single input value and returns a single value.
 * Returns a simple concatenation of Strings.
 *
 * @param {String} name A name to greet.
 * @return {String} A greeting.
 * @customfunction
 */
function SAY_HELLO(name) {
  return 'Hello ' + name;
}

/**
 * A function that takes an input cell or range of cells and returns a cell or
 * range of cells.
 * Returns a range with all the input values incremented by one.
 *
 * @param {Array} input The range of numbers to increment.
 * @return {Array} The incremented values.
 * @customfunction
 */
function INCREMENT(input) {
  if (input instanceof Array) {
    // Recurse to process an array.
    return input.map(INCREMENT);
  } else if (!(typeof input == 'number')) {
    throw 'Input contains a cell value that is not a number';
  }
  // Otherwise process as a single value.
  return input + 1;
}

/**
 * A function that takes an range of values and returns a single value.
 * Returns the sum the corner values in the range; for a single cell,
 * this is equal to (4 * the cell value).
 *
 * @param {Array} input The Range of numbers to sum the corners of.
 * @return {Number} The calculated sum.
 * @customfunction
 */
function CORNER_SUM(input) {
  if (!(input instanceof Array)) {
    // Handle non-range inputs by putting them in an array.
    return CORNER_SUM([[input]]);
  }
  // Range processing here.
  var maxRowIndex = input.length - 1;
  var maxColIndex = input[0].length - 1;
  return input[0][0] + input[0][maxColIndex] +
      input[maxRowIndex][0] + input[maxRowIndex][maxColIndex];
}

/**
 * A function that takes a single value and returns a range of values.
 * Returns a range consisting of the first 10 powers and roots of that
 * number (with column headers).
 *
 * @param {Number} input The number to calculate from.
 * @return {Array} The first ten powers and roots of that number,
 *     with associated labels.
 * @customfunction
 */
function POWERS_AND_ROOTS(input) {
  if (input instanceof Array) {
    throw 'Invalid: Range input not permitted';
  }
  // Value processing and range generation here.
  var headers = ['x', input + '^x', input + '^(1/x)'];
  var result = [headers];
  for (var i = 1; i <= 10; i++) {
    result.push([i, Math.pow(input, i), Math.pow(input, 1/i)]);
  }
  return result;
}

/**
 * A function that takes a single input cell that is Date- or Date time-formatted.
 * Returns the day of the year represented by the provided date.
 *
 * @param {Date} date A Date to examine.
 * @return {Number} The day of year for that date.
 * @customfunction
 */
function GET_DAY_OF_YEAR(date) {
  if (!(date instanceof Date)) {
    throw 'Invalid: Date input required';
  }
  // Date processing here.
  var firstOfYear = new Date(date.getFullYear(), 0, 0);
  var diff = date - firstOfYear;
  var oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

/**
 * A function that takes a single input cell that is Duration-formatted.
 * Returns the number of seconds measured by that duration.
 *
 * @param {Date} duration A duration to convert.
 * @return {Number} Number of seconds in that duration.
 * @customfunction
 */
function CONVERT_DURATION_TO_SECONDS(duration) {
  if (!(duration instanceof Date)) {
    throw 'Invalid: Duration input required';
  }

  // Getting elapsed times from duration-formatted cells in Sheets requires
  // subtracting the reference date from the cell value (while correcting for
  // timezones).
  var spreadsheetTimezone =
      SpreadsheetApp.getActiveSpreadsheet().getSpreadsheetTimeZone();
  var dateString = Utilities.formatDate(duration, spreadsheetTimezone,
      'EEE, d MMM yyyy HH:mm:ss');
  var date = new Date(dateString);
  var epoch = new Date('Dec 30, 1899 00:00:00');
  var durationInMilliseconds = date.getTime() - epoch.getTime();

  // Duration processing here.
  return Math.round(durationInMilliseconds / 1000);
}
