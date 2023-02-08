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

/**
 * create test spreadsheets
 * @return {string} spreadsheet
 */
function createTestSpreadsheet() {
  const spreadsheet = SpreadsheetApp.create('Test Spreadsheet');
  for (let i = 0; i < 3; ++i) {
    spreadsheet.appendRow([1, 2, 3]);
  }
  return spreadsheet.getId();
}

/**
 * populate the created spreadsheet with values
 * @param {string} spreadsheetId
 */
function populateValues(spreadsheetId) {
  const batchUpdateRequest = Sheets.newBatchUpdateSpreadsheetRequest();
  const repeatCellRequest = Sheets.newRepeatCellRequest();

  const values = [];
  for (let i = 0; i < 10; ++i) {
    values[i] = [];
    for (let j = 0; j < 10; ++j) {
      values[i].push('Hello');
    }
  }
  const range = 'A1:J10';
  SpreadsheetApp.openById(spreadsheetId).getRange(range).setValues(values);
  SpreadsheetApp.flush();
}

/**
 * Test emailDataRow of logging.gs
 */
function itShouldEmailDataRow() {
  console.log('> itShouldEmailDataRow');
  const email = Session.getActiveUser().getEmail();
  const spreadsheetId = createTestSpreadsheet();
  populateValues(spreadsheetId);
  const data = Spreadsheet.openById();
  emailDataRow(1, email);
}

/**
 * runs all the functions of logging.gs
 */
function RUN_ALL_TESTS() {
  console.log('> itShouldMeasureExecutionTime');
  measuringExecutionTime();
  itShouldEmailDataRow();
}
