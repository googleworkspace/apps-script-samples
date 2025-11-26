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
 * Main function to process emails, classify them, and update a spreadsheet.
 * This function searches for unread emails in the inbox from the last 7 days,
 * classifies them based on their subject and content, adds labels to the emails,
 * creates draft responses for emails that need a response, and logs the
 * classification results in a spreadsheet.
 * @return {string} The URL of the spreadsheet.
 */
function main() {
  // Calculate the date 7 days ago
  const today = new Date();
  const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

  // Create a Sheet
  const headers = ["Subject", "Classification", "Reason"];
  const spreadsheet = createSheetWithHeaders(headers);

  // Format the date for the Gmail search query (YYYY/MM/DD)
  // Using Utilities.formatDate ensures correct formatting based on script
  // timezone
  const formattedDate = Utilities.formatDate(
    sevenDaysAgo,
    Session.getScriptTimeZone(),
    "yyyy/MM/dd",
  );

  // Construct the search query
  const query = `is:unread after:${formattedDate} in:inbox`;
  console.log("Searching for emails with query: " + query);

  // Search for threads matching the query
  // Note: GmailApp.search() returns threads where *at least one* message
  // matches
  const threads = GmailApp.search(query);
  createLabels();

  for (const thread of threads) {
    const messages = thread.getMessages();
    const subject = thread.getFirstMessageSubject();
    const { classification, reason } = classifyEmail(subject, messages);
    console.log(`Classification: ${classification}, Reason: ${reason}`);

    thread.addLabel(classificationLabels[classification].gmailLabel);

    if (classification === "needs-response") {
      const draft = draftEmail(subject, messages);
      thread.createDraftReplyAll(null, { htmlBody: draft });
    }

    addDataToSheet(spreadsheet, hyperlink(thread), classification, reason);
  }

  return showSpreadsheetLink(spreadsheet.getUrl());
}
