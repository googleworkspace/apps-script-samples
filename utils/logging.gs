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

// [START apps_script_logging_execution_time]
/**
 * Logs the time taken to execute 'myFunction'.
 */
function measuringExecutionTime() {
  // A simple INFO log message, using sprintf() formatting.
  console.info('Timing the %s function (%d arguments)', 'myFunction', 1);

  // Log a JSON object at a DEBUG level. The log is labeled
  // with the message string in the log viewer, and the JSON content
  // is displayed in the expanded log structure under "jsonPayload".
  const parameters = {
    isValid: true,
    content: 'some string',
    timestamp: new Date()
  };
  console.log({message: 'Function Input', initialData: parameters});
  const label = 'myFunction() time'; // Labels the timing log entry.
  console.time(label); // Starts the timer.
  try {
    myFunction(parameters); // Function to time.
  } catch (e) {
    // Logs an ERROR message.
    console.error('myFunction() yielded an error: ' + e);
  }
  console.timeEnd(label); // Stops the timer, logs execution duration.
}
// [END apps_script_logging_execution_time]

// [START apps_script_logging_sheet_information]
/**
 * Logs Google Sheet information.
 * @param {number} rowNumber The spreadsheet row number.
 * @param {string} email The email to send with the row data.
 */
function emailDataRow(rowNumber, email) {
  console.log('Emailing data row ' + rowNumber + ' to ' + email);
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const data = sheet.getDataRange().getValues();
    const rowData = data[rowNumber - 1].join(' ');
    console.log('Row ' + rowNumber + ' data: ' + rowData);
    MailApp.sendEmail(email, 'Data in row ' + rowNumber, rowData);
  } catch (err) {
    // TODO (developer) - Handle exception
    console.log('Failed with error %s', err.message);
  }
}
// [END apps_script_logging_sheet_information]
