// To learn how to use this script, refer to the documentation:
// https://developers.google.com/apps-script/samples/automations/employee-certificate

/*
Copyright 2022 Google LLC

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

const slideTemplateId = 'PRESENTATION_ID';
const tempFolderId = 'FOLDER_ID'; // Create an empty folder in Google Drive

/**
 * Creates a custom menu "Appreciation" in the spreadsheet
 * with drop-down options to create and send certificates
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Appreciation')
      .addItem('Create certificates', 'createCertificates')
      .addSeparator()
      .addItem('Send certificates', 'sendCertificates')
      .addToUi();
}

/**
 * Creates a personalized certificate for each employee
 * and stores every individual Slides doc on Google Drive
 */
function createCertificates() {
  // Load the Google Slide template file
  const template = DriveApp.getFileById(slideTemplateId);

  // Get all employee data from the spreadsheet and identify the headers
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const values = sheet.getDataRange().getValues();
  const headers = values[0];
  const empNameIndex = headers.indexOf('Employee Name');
  const dateIndex = headers.indexOf('Date');
  const managerNameIndex = headers.indexOf('Manager Name');
  const titleIndex = headers.indexOf('Title');
  const compNameIndex = headers.indexOf('Company Name');
  const empEmailIndex = headers.indexOf('Employee Email');
  const empSlideIndex = headers.indexOf('Employee Slide');
  const statusIndex = headers.indexOf('Status');

  // Iterate through each row to capture individual details
  for (let i = 1; i < values.length; i++) {
    const rowData = values[i];
    const empName = rowData[empNameIndex];
    const date = rowData[dateIndex];
    const managerName = rowData[managerNameIndex];
    const title = rowData[titleIndex];
    const compName = rowData[compNameIndex];

    // Make a copy of the Slide template and rename it with employee name
    const tempFolder = DriveApp.getFolderById(tempFolderId);
    const empSlideId = template.makeCopy(tempFolder).setName(empName).getId();
    const empSlide = SlidesApp.openById(empSlideId).getSlides()[0];

    // Replace placeholder values with actual employee related details
    empSlide.replaceAllText('Employee Name', empName);
    empSlide.replaceAllText('Date', 'Date: ' + Utilities.formatDate(date, Session.getScriptTimeZone(), 'MMMM dd, yyyy'));
    empSlide.replaceAllText('Your Name', managerName);
    empSlide.replaceAllText('Title', title);
    empSlide.replaceAllText('Company Name', compName);

    // Update the spreadsheet with the new Slide Id and status
    sheet.getRange(i + 1, empSlideIndex + 1).setValue(empSlideId);
    sheet.getRange(i + 1, statusIndex + 1).setValue('CREATED');
    SpreadsheetApp.flush();
  }
}

/**
 * Send an email to each individual employee
 * with a PDF attachment of their appreciation certificate
 */
function sendCertificates() {
  // Get all employee data from the spreadsheet and identify the headers
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const values = sheet.getDataRange().getValues();
  const headers = values[0];
  const empNameIndex = headers.indexOf('Employee Name');
  const dateIndex = headers.indexOf('Date');
  const managerNameIndex = headers.indexOf('Manager Name');
  const titleIndex = headers.indexOf('Title');
  const compNameIndex = headers.indexOf('Company Name');
  const empEmailIndex = headers.indexOf('Employee Email');
  const empSlideIndex = headers.indexOf('Employee Slide');
  const statusIndex = headers.indexOf('Status');

  // Iterate through each row to capture individual details
  for (let i = 1; i < values.length; i++) {
    const rowData = values[i];
    const empName = rowData[empNameIndex];
    const date = rowData[dateIndex];
    const managerName = rowData[managerNameIndex];
    const title = rowData[titleIndex];
    const compName = rowData[compNameIndex];
    const empSlideId = rowData[empSlideIndex];
    const empEmail = rowData[empEmailIndex];

    // Load the employee's personalized Google Slide file
    const attachment = DriveApp.getFileById(empSlideId);

    // Setup the required parameters and send them the email
    const senderName = 'CertBot';
    const subject = empName + ', you\'re awesome!';
    const body = 'Please find your employee appreciation certificate attached.' +
    '\n\n' + compName + ' team';
    GmailApp.sendEmail(empEmail, subject, body, {
      attachments: [attachment.getAs(MimeType.PDF)],
      name: senderName
    });

    // Update the spreadsheet with email status
    sheet.getRange(i + 1, statusIndex + 1).setValue('SENT');
    SpreadsheetApp.flush();
  }
}
