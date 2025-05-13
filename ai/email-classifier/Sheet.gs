/**
 * Copyright 2025 Google LLC
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
 * Creates a spreadsheet with the given headers.
 * @param {!Array<string>} headers The headers for the spreadsheet.
 * @return {!Spreadsheet} The created spreadsheet.
 */
function createSheetWithHeaders(headers) {
  const today = new Date().toLocaleString();
  const spreadsheet = SpreadsheetApp.create(`Emails from ${today}`);
  const sheet = spreadsheet.getActiveSheet();
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  addTable(spreadsheet);
  console.log(`Successfully created spreadsheet: ${spreadsheet.getUrl()}`);
  return spreadsheet;
}

/**
 * Adds data to the spreadsheet.
 * @param {!Spreadsheet} spreadsheet The spreadsheet to add data to.
 * @param {string} subject The subject of the email.
 * @param {string} classification The classification of the email.
 * @param {string} reason The reason for the classification.
 */
function addDataToSheet(spreadsheet, subject, classification, reason) {
  const sheet = spreadsheet.getActiveSheet();
  const newRow = [subject, classification, reason];
  sheet.appendRow(newRow);
}

/**
 * Creates a hyperlink for the given thread.
 * @param {!GmailThread} thread The thread to create a hyperlink for.
 * @return {string} The hyperlink.
 */
function hyperlink(thread) {
  const link = `https://mail.google.com/mail/u/0/#inbox/${thread.getId()}`;
  return `=HYPERLINK("${link}", "${thread.getFirstMessageSubject()}")`;
}

/**
 * Adds a table to the spreadsheet with a dropdown for classification.
 * @param {!Spreadsheet} ss The spreadsheet to add the table to.
 */
function addTable(ss) {
  const values = Object.keys(classificationLabels).map(label => {
    return { userEnteredValue: label };
  });
  const addTableRequest = {
    requests: [{
      addTable: {
        table: {
          name: 'Email classification',
          range: {
            sheetId: 0,
            startColumnIndex: 0,
            endColumnIndex: 2,
          },
          columnProperties: [{
            columnIndex: 1,
            columnType: 'DROPDOWN',
            dataValidationRule: { condition: { type: 'ONE_OF_LIST', values: values } }
          }],
        }
      }
    }]
  };

  Sheets.Spreadsheets.batchUpdate(addTableRequest, ss.getId());
}
