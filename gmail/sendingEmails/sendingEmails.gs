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
    const sheet = SpreadsheetApp.getActiveSheet(); // Get the active sheet in spreadsheet
    const startRow = 2; // First row of data to process
    const numRows = 2; // Number of rows to process
    const dataRange = sheet.getRange(startRow, 1, numRows, 2); // Fetch the range of cells A2:B3
    const data = dataRange.getValues(); // Fetch values for each row in the Range.
    for (const row of data) {
      const emailAddress = row[0]; // First column
      const message = row[1]; // Second column
      const subject = 'Sending emails from a Spreadsheet';
      MailApp.sendEmail(emailAddress, subject, message); // Send emails to emailAddresses which are presents in First column
    }
  } catch (err) {
    console.log(err);
  }
}
// [END gmail_send_emails]

// [START gmail_send_non_duplicate_emails]
/**
 * Sends non-duplicate emails with data from the current spreadsheet.
 */
function sendNonDuplicateEmails() {
  const EMAIL_SENT = 'email sent'; //This constant is used to write the message in Column C of Sheet
  try {
    const sheet = SpreadsheetApp.getActiveSheet(); // Get the active sheet in spreadsheet
    const startRow = 2; // First row of data to process
    const numRows = 2; // Number of rows to process
    const dataRange = sheet.getRange(startRow, 1, numRows, 3); // Fetch the range of cells A2:B3
    const data = dataRange.getValues(); // Fetch values for each row in the Range.
    for (let i = 0; i < data.length; ++i) {
      const row = data[i];
      const emailAddress = row[0]; // First column
      const message = row[1]; // Second column
      const emailSent = row[2]; // Third column
      if (emailSent === EMAIL_SENT) {
        console.log('Email already sent');
        return;
      }
      const subject = 'Sending emails from a Spreadsheet';
      MailApp.sendEmail(emailAddress, subject, message);// Send emails to emailAddresses which are presents in First column
      sheet.getRange(startRow + i, 3).setValue(EMAIL_SENT);
      SpreadsheetApp.flush(); // Make sure the cell is updated right away in case the script is interrupted
    }
  } catch (err) {
    console.log(err);
  }
}
// [END gmail_send_non_duplicate_emails]
