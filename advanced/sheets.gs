/**
 * Copyright Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var spreadsheetId = '1LcjJcCdM6OGrJtJEkHegV-rH5bWZ-mCukEMMCKYtUkc';
var sheetId = 371977894;
var pivotSourceDataSheetId = 371977894;
var destinationSheetId = 1428299768;

// [START readRange]
/**
 * Read a range (A1:D5) of data values. Logs the values.
 * @param {string} spreadsheetId The spreadsheet ID to read from.
 */
function readRange(spreadsheetId) {
  var response = Sheets.Spreadsheets.Values.get(spreadsheetId, 'Sheet1!A1:D5');
  Logger.log(response.values);
}
// [END readRange]

// [START writeToMultipleRanges]
/**
 * Write to multiple, disjoint data ranges.
 * @param {string} spreadsheetId The spreadsheet ID to write to.
 */
function writeToMultipleRanges(spreadsheetId) {
  // Specify some values to write to the sheet.
  var columnAValues = [
    ['Item', 'Wheel', 'Door', 'Engine'],
  ];
  var rowValues = [
    ['Cost', 'Stocked', 'Ship Date'],
    ['$20.50', '4', '3/1/2016'],
  ];

  var request = {
    'valueInputOption': 'USER_ENTERED',
    'data': [
      {
        'range': 'Sheet1!A1:A4',
        'majorDimension': 'COLUMNS',
        'values': columnAValues,
      },
      {
        'range': 'Sheet1!B1:D2',
        'majorDimension': 'ROWS',
        'values': rowValues,
      },
    ],
  };

  var response = Sheets.Spreadsheets.Values.batchUpdate(request, spreadsheetId);
  Logger.log(response);
}
// [END writeToMultipleRanges]

// [START addSheet]
/**
 * Add a new sheet with some properties.
 * @param {string} spreadsheetId The spreadsheet ID.
 */
function addSheet(spreadsheetId) {
  var requests = [{
    'addSheet': {
      'properties': {
        'title': 'Deposits',
        'gridProperties': {
          'rowCount': 20,
          'columnCount': 12,
        },
        'tabColor': {
          'red': 1.0,
          'green': 0.3,
          'blue': 0.4,
        },
      },
    },
  }];

  var response =
      Sheets.Spreadsheets.batchUpdate({'requests': requests}, spreadsheetId);
  Logger.log('Created sheet with ID: ' +
      response.replies[0].addSheet.properties.sheetId);
}
// [END addSheet]

// [START addPivotTable]
/**
 * Add a pivot table.
 * @param {string} spreadsheetId The spreadsheet ID to add the pivot table to.
 * @param {string} pivotSourceDataSheetId The sheet ID to get the data from.
 * @param {string} destinationSheetId The sheet ID to add the pivot table to.
 */
function addPivotTable(
    spreadsheetId, pivotSourceDataSheetId, destinationSheetId) {
  var requests = [{
    'updateCells': {
      'rows': {
        'values': [
          {
            'pivotTable': {
              'source': {
                'sheetId': pivotSourceDataSheetId,
                'startRowIndex': 0,
                'startColumnIndex': 0,
                'endRowIndex': 20,
                'endColumnIndex': 7,
              },
              'rows': [
                {
                  'sourceColumnOffset': 0,
                  'showTotals': true,
                  'sortOrder': 'ASCENDING',
                  'valueBucket': {
                    'buckets': [
                      {
                        'stringValue': 'West',
                      },
                    ],
                  },
                },
                {
                  'sourceColumnOffset': 1,
                  'showTotals': true,
                  'sortOrder': 'DESCENDING',
                  'valueBucket': {},
                },
              ],
              'columns': [
                {
                  'sourceColumnOffset': 4,
                  'sortOrder': 'ASCENDING',
                  'showTotals': true,
                  'valueBucket': {},
                },
              ],
              'values': [
                {
                  'summarizeFunction': 'SUM',
                  'sourceColumnOffset': 3,
                },
              ],
              'valueLayout': 'HORIZONTAL',
            },
          },
        ],
      },
      'start': {
        'sheetId': destinationSheetId,
        'rowIndex': 49,
        'columnIndex': 0,
      },
      'fields': 'pivotTable',
    },
  }];

  var response =
      Sheets.Spreadsheets.batchUpdate({'requests': requests}, spreadsheetId);
  // The Pivot table will appear anchored to cell A50 of the destination sheet.
}
// [END addPivotTable]
