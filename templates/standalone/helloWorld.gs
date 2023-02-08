/**
 * Copyright 2018 Google Inc. All Rights Reserved.
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
// [START apps_script_hello_world]
/**
 * Creates a Google Doc and sends an email to the current user with a link to the doc.
 */
function createAndSendDocument() {
  try {
    // Create a new Google Doc named 'Hello, world!'
    const doc = DocumentApp.create('Hello, world!');

    // Access the body of the document, then add a paragraph.
    doc.getBody().appendParagraph('This document was created by Google Apps Script.');

    // Get the URL of the document.
    const url = doc.getUrl();

    // Get the email address of the active user - that's you.
    const email = Session.getActiveUser().getEmail();

    // Get the name of the document to use as an email subject line.
    const subject = doc.getName();

    // Append a new string to the "url" variable to use as an email body.
    const body = 'Link to your doc: ' + url;

    // Send yourself an email with a link to the document.
    GmailApp.sendEmail(email, subject, body);
  } catch (err) {
    // TODO (developer) - Handle exception
    console.log('Failed with error %s', err.message);
  }
}
// [END apps_script_hello_world]
