// To learn how to use this script, refer to the documentation:
// https://developers.google.com/apps-script/samples/automations/equipment-requests

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

// Update this variable with the email address you want to send equipment requests to.
const REQUEST_NOTIFICATION_EMAIL = 'request_intake@example.com';

// Update the following variables with your own equipment options.
const AVAILABLE_LAPTOPS = [
  '15" high Performance Laptop (OS X)',
  '15" high Performance Laptop (Windows)',
  '15" high performance Laptop (Linux)',
  '13" lightweight laptop (Windows)',
];
const AVAILABLE_DESKTOPS = [
  'Standard workstation (Windows)',
  'Standard workstation (Linux)',
  'High performance workstation (Windows)',
  'High performance workstation (Linux)',
  'Mac Pro (OS X)',
];
const AVAILABLE_MONITORS = [
  'Single 27"',
  'Single 32"',
  'Dual 24"',
];

// Form field titles, used for creating the form and as keys when handling
// responses.
/**
 * Adds a custom menu to the spreadsheet.
 */
function onOpen() {
  SpreadsheetApp.getUi().createMenu('Equipment requests')
      .addItem('Set up', 'setup_')
      .addItem('Clean up', 'cleanup_')
      .addToUi();
}

/**
 * Creates the form and triggers for the workflow.
 */
function setup_() {
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  if (ss.getFormUrl()) {
    let msg = 'Form already exists. Unlink the form and try again.';
    SpreadsheetApp.getUi().alert(msg);
    return;
  }
  let form = FormApp.create('Equipment Requests')
      .setCollectEmail(true)
      .setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId())
      .setLimitOneResponsePerUser(false);
  form.addTextItem().setTitle('Employee name').setRequired(true);
  form.addTextItem().setTitle('Desk location').setRequired(true);
  form.addDateItem().setTitle('Due date').setRequired(true);
  form.addListItem().setTitle('Laptop').setChoiceValues(AVAILABLE_LAPTOPS);
  form.addListItem().setTitle('Desktop').setChoiceValues(AVAILABLE_DESKTOPS);
  form.addListItem().setTitle('Monitor').setChoiceValues(AVAILABLE_MONITORS);

  // Hide the raw form responses.
  ss.getSheets().forEach(function(sheet) {
    if (sheet.getFormUrl() == ss.getFormUrl()) {
      sheet.hideSheet();
    }
  });
  // Start workflow on each form submit
  ScriptApp.newTrigger('onFormSubmit_')
      .forForm(form)
      .onFormSubmit()
      .create();
  // Archive completed items every 5m.
  ScriptApp.newTrigger('processCompletedItems_')
      .timeBased()
      .everyMinutes(5)
      .create();
}

/**
 * Cleans up the project (stop triggers, form submission, etc.)
 */
function cleanup_() {
  let formUrl = SpreadsheetApp.getActiveSpreadsheet().getFormUrl();
  if (!formUrl) {
    return;
  }
  ScriptApp.getProjectTriggers().forEach(function(trigger) {
    ScriptApp.deleteTrigger(trigger);
  });
  FormApp.openByUrl(formUrl)
      .deleteAllResponses()
      .setAcceptingResponses(false);
}

/**
 * Handles new form submissions to trigger the workflow.
 *
 * @param {Object} event - Form submit event
 */
function onFormSubmit_(event) {
  let response = mapResponse_(event.response);
  sendNewEquipmentRequestEmail_(response);
  let equipmentDetails = Utilities.formatString('%s\n%s\n%s',
      response['Laptop'],
      response['Desktop'],
      response['Monitor']);
  let row = ['New',
    '',
    response['Due date'],
    response['Employee name'],
    response['Desk location'],
    equipmentDetails,
    response['email']];
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('Pending requests');
  sheet.appendRow(row);
}

/**
 * Sweeps completed and cancelled requests, notifying the requestors and archiving them
 * to the completed sheet.
 *
 * @param {Object} event
 */
function processCompletedItems_() {
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let pending = ss.getSheetByName('Pending requests');
  let completed = ss.getSheetByName('Completed requests');
  let rows = pending.getDataRange().getValues();
    for (let i = rows.length; i >= 2; i--) {
      let row = rows[i -1];
      let status = row[0];
      if (status === 'Completed' || status == 'Cancelled') {
          pending.deleteRow(i);
          completed.appendRow(row);
          console.log("Deleted row: " + i);
          sendEquipmentRequestCompletedEmail_({
            'Employee name': row[3],
            'Desk location': row[4],
            'email': row[6],
          });
        }
      };
}

/**
 * Sends an email notification that a new equipment request has been submitted.
 *
 * @param {Object} request - Request details
 */
function sendNewEquipmentRequestEmail_(request) {
  let template = HtmlService.createTemplateFromFile('new-equipment-request.html');
  template.request = request;
  template.sheetUrl = SpreadsheetApp.getActiveSpreadsheet().getUrl();
  let msg = template.evaluate();
  MailApp.sendEmail({
    to: REQUEST_NOTIFICATION_EMAIL,
    subject: 'New equipment request',
    htmlBody: msg.getContent(),
  });
}

/**
 * Sends an email notifying the requestor that the request is complete.
 *
 * @param {Object} request - Request details
 */
function sendEquipmentRequestCompletedEmail_(request) {
  let template = HtmlService.createTemplateFromFile('request-complete.html');
  template.request = request;
  let msg = template.evaluate();
  MailApp.sendEmail({
    to: request.email,
    subject: 'Equipment request completed',
    htmlBody: msg.getContent(),
  });
}

/**
 * Converts a form response to an object keyed by the item titles. Allows easier
 * access to response values.
 *
 * @param {FormResponse} response
 * @return {Object} Form values keyed by question title
 */
function mapResponse_(response) {
  let initialValue = {
    email: response.getRespondentEmail(),
    timestamp: response.getTimestamp(),
  };
  return response.getItemResponses().reduce(function(obj, itemResponse) {
    let key = itemResponse.getItem().getTitle();
    obj[key] = itemResponse.getResponse();
    return obj;
  }, initialValue);
}

