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
// TODO (developer)- Replace the spreadsheet ID and sheet ID with yours values.
const yourspreadsheetId = '1YdrrmXSjpi4Tz-UuQ0eUKtdzQuvpzRLMoPEz3niTTVU';
const yourpivotSourceDataSheetId = 635809130;
const yourdestinationSheetId = 83410180;
// [START sheets_read_range]
/**
 * Read a range (A1:D5) of data values. Logs the values.
 * @param {string} spreadsheetId The spreadsheet ID to read from.
 * @see https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/get
 */
function readRange(spreadsheetId = yourspreadsheetId) {
  try {
    const response = Sheets.Spreadsheets.Values.get(spreadsheetId, 'Sheet1!A1:D5');
    if (response.values) {
      console.log(response.values);
      return;
    }
    console.log('Failed to get range of values from spreadsheet');
  } catch (e) {
    // TODO (developer) - Handle exception
    console.log('Failed with error %s', e.message);
  }
}
// [END sheets_read_range]

// [START sheets_write_range]
/**
 * Write to multiple, disjoint data ranges.
 * @param {string} spreadsheetId The spreadsheet ID to write to.
 * @see https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/batchUpdate
 */
function writeToMultipleRanges(spreadsheetId = yourspreadsheetId) {
  // Specify some values to write to the sheet.
  const columnAValues = [
    ['Item', 'Wheel', 'Door', 'Engine']
  ];
  const rowValues = [
    ['Cost', 'Stocked', 'Ship Date'],
    ['$20.50', '4', '3/1/2016']
  ];

  const request = {
    'valueInputOption': 'USER_ENTERED',
    'data': [
      {
        'range': 'Sheet1!A1:A4',
        'majorDimension': 'COLUMNS',
        'values': columnAValues
      },
      {
        'range': 'Sheet1!B1:D2',
        'majorDimension': 'ROWS',
        'values': rowValues
      }
    ]
  };
  try {
    const response = Sheets.Spreadsheets.Values.batchUpdate(request, spreadsheetId);
    if (response) {
      console.log(response);
      return;
    }
    console.log('response null');
  } catch (e) {
    // TODO (developer) - Handle  exception
    console.log('Failed with error %s', e.message);
  }
}
// [END sheets_write_range]

// [START sheets_add_new_sheet]
/**
 * Add a new sheet with some properties.
 * @param {string} spreadsheetId The spreadsheet ID.
 * @see https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/batchUpdate
 */
function addSheet(spreadsheetId = yourspreadsheetId) {
  const requests = [{
    'addSheet': {
      'properties': {
        'title': 'Deposits',
        'gridProperties': {
          'rowCount': 20,
          'columnCount': 12
        },
        'tabColor': {
          'red': 1.0,
          'green': 0.3,
          'blue': 0.4
        }
      }
    }
  }];
  try {
    const response =
      Sheets.Spreadsheets.batchUpdate({'requests': requests}, spreadsheetId);
    console.log('Created sheet with ID: ' +
      response.replies[0].addSheet.properties.sheetId);
  } catch (e) {
    // TODO (developer) - Handle exception
    console.log('Failed with error %s', e.message);
  }
}
// [END sheets_add_new_sheet]

// [START sheets_add_pivot_table]
/**
 * Add a pivot table.
 * @param {string} spreadsheetId The spreadsheet ID to add the pivot table to.
 * @param {string} pivotSourceDataSheetId The sheet ID to get the data from.
 * @param {string} destinationSheetId The sheet ID to add the pivot table to.
 * @see https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/batchUpdate
 */
function addPivotTable(
    spreadsheetId = yourspreadsheetId,
    pivotSourceDataSheetId= yourpivotSourceDataSheetId,
    destinationSheetId= yourdestinationSheetId) {
  const requests = [{
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
                'endColumnIndex': 7
              },
              'rows': [
                {
                  'sourceColumnOffset': 0,
                  'showTotals': true,
                  'sortOrder': 'ASCENDING',
                  'valueBucket': {
                    'buckets': [
                      {
                        'stringValue': 'West'
                      }
                    ]
                  }
                },
                {
                  'sourceColumnOffset': 1,
                  'showTotals': true,
                  'sortOrder': 'DESCENDING',
                  'valueBucket': {}
                }
              ],
              'columns': [
                {
                  'sourceColumnOffset': 4,
                  'sortOrder': 'ASCENDING',
                  'showTotals': true,
                  'valueBucket': {}
                }
              ],
              'values': [
                {
                  'summarizeFunction': 'SUM',
                  'sourceColumnOffset': 3
                }
              ],
              'valueLayout': 'HORIZONTAL'
            }
          }
        ]
      },
      'start': {
        'sheetId': destinationSheetId,
        'rowIndex': 49,
        'columnIndex': 0
      },
      'fields': 'pivotTable'
    }
  }];
  try {
    const response = Sheets.Spreadsheets.batchUpdate({'requests': requests}, spreadsheetId);
    // The Pivot table will appear anchored to cell A50 of the destination sheet.
  } catch (e) {
    // TODO (developer) - Handle exception
    console.log('Failed with error %s', e.message);
  }
}
// [END sheets_add_pivot_table]
