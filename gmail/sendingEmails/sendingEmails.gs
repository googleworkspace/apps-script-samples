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

// [START gmail_send_emails]
/**
 * Sends emails with data from the current spreadsheet.
 */
function sendEmails() {
  try {
    // Get the active sheet in spreadsheet
    const sheet = SpreadsheetApp.getActiveSheet();
    const startRow = 2; // First row of data to process
    const numRows = 2; // Number of rows to process
    // Fetch the range of cells A2:B3
    const dataRange = sheet.getRange(startRow, 1, numRows, 2);
    // Fetch values for each row in the Range.
    const data = dataRange.getValues();
    for (const row of data) {
      const emailAddress = row[0]; // First column
      const message = row[1]; // Second column
      const subject = 'Sending emails from a Spreadsheet';
      // Send emails to emailAddresses which are presents in First column
      MailApp.sendEmail(emailAddress, subject, message);
    }
  } catch (err) {
    Logger.log(err);
  }
}
// [END gmail_send_emails]

// [START gmail_send_non_duplicate_emails]
// This constant is written in column C for rows for which an email
// has been sent successfully.
const EMAIL_SENT = 'EMAIL_SENT';

/**
 * Sends non-duplicate emails with data from the current spreadsheet.
 */
function sendNonDuplicateEmails() {
  try {
    // Get the active sheet in spreadsheet
    const sheet = SpreadsheetApp.getActiveSheet();
    const startRow = 2; // First row of data to process
    const numRows = 2; // Number of rows to process
    // Fetch the range of cells A2:B3
    const dataRange = sheet.getRange(startRow, 1, numRows, 3);
    // Fetch values for each row in the Range.
    const data = dataRange.getValues();
    for (let i = 0; i < data.length; ++i) {
      const row = data[i];
      const emailAddress = row[0]; // First column
      const message = row[1]; // Second column
      const emailSent = row[2]; // Third column
      if (emailSent === EMAIL_SENT) {
        return;
      }
      const subject = 'Sending emails from a Spreadsheet';
      // Send emails to emailAddresses which are presents in First column
      MailApp.sendEmail(emailAddress, subject, message);
      sheet.getRange(startRow + i, 3).setValue(EMAIL_SENT);
      // Make sure the cell is updated right away in case the script is interrupted
      SpreadsheetApp.flush();
    }
  } catch (err) {
    Logger.log(err);
  }
}
// [END gmail_send_non_duplicate_emails]
