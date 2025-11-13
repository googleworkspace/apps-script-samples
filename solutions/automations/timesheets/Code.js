// To learn how to use this script, refer to the documentation:
// https://developers.google.com/apps-script/samples/automations/timesheets

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

// Global variables representing the index of certain columns.
let COLUMN_NUMBER = {
  EMAIL: 2,
  HOURS_START: 4,
  HOURS_END: 8,
  HOURLY_PAY: 9,
  TOTAL_HOURS: 10,
  CALC_PAY: 11,
  APPROVAL: 12,
  NOTIFY: 13,
};

// Global variables:
let APPROVED_EMAIL_SUBJECT = 'Weekly Timesheet APPROVED';
let REJECTED_EMAIL_SUBJECT = 'Weekly Timesheet NOT APPROVED';
let APPROVED_EMAIL_MESSAGE = 'Your timesheet has been approved.';
let REJECTED_EMAIL_MESSAGE = 'Your timesheet has not been approved.';

/** 
 * Creates the menu item "Timesheets" for user to run scripts on drop-down.
 */
function onOpen() {
  let ui = SpreadsheetApp.getUi();
  ui.createMenu('Timesheets')
      .addItem('Form setup', 'setUpForm')
      .addItem('Column setup', 'columnSetup')
      .addItem('Notify employees', 'checkApprovedStatusToNotify')
      .addToUi();
}

/** 
 * Adds "WEEKLY PAY" column with calculated values using array formulas. 
 * Adds an "APPROVAL" column at the end of the sheet, containing 
 * drop-down menus to either approve/disapprove employee timesheets.  
 * Adds a "NOTIFIED STATUS" column indicating whether or not an
 * employee has yet been e mailed.
 */
function columnSetup() {
  let sheet = SpreadsheetApp.getActiveSheet();
  let lastCol = sheet.getLastColumn();
  let lastRow = sheet.getLastRow();
  let frozenRows = sheet.getFrozenRows();
  let beginningRow = frozenRows + 1;
  let numRows = lastRow - frozenRows;

  // Calls helper functions to add new columns.
  addCalculatePayColumn(sheet, beginningRow);
  addApprovalColumn(sheet, beginningRow, numRows);
  addNotifiedColumn(sheet, beginningRow, numRows);
}

/**
 * Adds TOTAL HOURS and CALCULATE PAY columns and automatically calculates
 * every employee's weekly pay.
 *
 * @param {Object} sheet Spreadsheet object of current sheet.
 * @param {Integer} beginningRow Index of beginning row.
 */
function addCalculatePayColumn(sheet, beginningRow) {
  sheet.insertColumnAfter(COLUMN_NUMBER.HOURLY_PAY);
  sheet.getRange(1, COLUMN_NUMBER.TOTAL_HOURS).setValue('TOTAL HOURS');
  sheet.getRange(1, COLUMN_NUMBER.CALC_PAY).setValue('WEEKLY PAY');

  // Calculates weekly total hours.
  sheet.getRange(beginningRow, COLUMN_NUMBER.TOTAL_HOURS)
      .setFormula('=ArrayFormula(D2:D+E2:E+F2:F+G2:G+H2:H)');
  // Calculates weekly pay.
  sheet.getRange(beginningRow, COLUMN_NUMBER.CALC_PAY)
      .setFormula('=ArrayFormula(I2:I * J2:J)');
}

/**
 * Adds an APPROVAL column allowing managers to approve/
 * disapprove of each employee's timesheet.
 *
 * @param {Object} sheet Spreadsheet object of current sheet.
 * @param {Integer} beginningRow Index of beginning row.
 * @param {Integer} numRows Number of rows currently in use.
 */
function addApprovalColumn(sheet, beginningRow, numRows) {
  sheet.insertColumnAfter(COLUMN_NUMBER.CALC_PAY);
  sheet.getRange(1, COLUMN_NUMBER.APPROVAL).setValue('APPROVAL');

  // Make sure approval column is all drop-down menus.
  let approvalColumnRange = sheet.getRange(beginningRow, COLUMN_NUMBER.APPROVAL,
      numRows, 1);
  let dropdownValues = ['APPROVED', 'NOT APPROVED', 'IN PROGRESS'];
  let rule = SpreadsheetApp.newDataValidation().requireValueInList(dropdownValues)
      .build();
  approvalColumnRange.setDataValidation(rule);
  approvalColumnRange.setValue('IN PROGRESS');
}

/**
 * Adds a NOTIFIED column allowing managers to see which employees
 * have/have not yet been notified of their approval status.
 *
 * @param {Object} sheet Spreadsheet object of current sheet.
 * @param {Integer} beginningRow Index of beginning row.
 * @param {Integer} numRows Number of rows currently in use.
 */
function addNotifiedColumn(sheet, beginningRow, numRows) {
  sheet.insertColumnAfter(COLUMN_NUMBER.APPROVAL); // global
  sheet.getRange(1, COLUMN_NUMBER.APPROVAL + 1).setValue('NOTIFIED STATUS');

  // Make sure notified column is all drop-down menus.
  let notifiedColumnRange = sheet.getRange(beginningRow, COLUMN_NUMBER.APPROVAL
      + 1, numRows, 1);
  dropdownValues = ['NOTIFIED', 'PENDING'];
  rule = SpreadsheetApp.newDataValidation().requireValueInList(dropdownValues)
      .build();
  notifiedColumnRange.setDataValidation(rule);
  notifiedColumnRange.setValue('PENDING');  
}

/**
 * Sets the notification status to NOTIFIED for employees
 * who have received a notification email.
 *
 * @param {Object} sheet Current Spreadsheet.
 * @param {Object} notifiedValues Array of notified values.
 * @param {Integer} i Current status in the for loop.
 * @parma {Integer} beginningRow Row where iterations began.
 */
function updateNotifiedStatus(sheet, notifiedValues, i, beginningRow) {
  // Update notification status.
  notifiedValues[i][0] = 'NOTIFIED';
  sheet.getRange(i + beginningRow, COLUMN_NUMBER.NOTIFY).setValue('NOTIFIED');
}

/** 
 * Checks the approval status of every employee, and calls helper functions
 * to notify employees via email & update their notification status.
 */
function checkApprovedStatusToNotify() {
  let sheet = SpreadsheetApp.getActiveSheet();
  let lastRow = sheet.getLastRow();
  let lastCol = sheet.getLastColumn();
  // lastCol here is the NOTIFIED column.
  let frozenRows = sheet.getFrozenRows();
  let beginningRow = frozenRows + 1;
  let numRows = lastRow - frozenRows;

  // Gets ranges of email, approval, and notified values for every employee.
  let emailValues = sheet.getRange(beginningRow, COLUMN_NUMBER.EMAIL, numRows, 1).getValues();
  let approvalValues = sheet.getRange(beginningRow, COLUMN_NUMBER.APPROVAL,
      lastRow - frozenRows, 1).getValues();
  let notifiedValues = sheet.getRange(beginningRow, COLUMN_NUMBER.NOTIFY, numRows,
      1).getValues();

  // Traverses through employee's row.
  for (let i = 0; i < numRows; i++) {
    // Do not notify twice.
    if (notifiedValues[i][0] == 'NOTIFIED') {
      continue;
    }
    let emailAddress = emailValues[i][0];
    let approvalValue = approvalValues[i][0];

    // Sends notifying emails & update status.
    if (approvalValue == 'IN PROGRESS') {
      continue;
    } else if (approvalValue == 'APPROVED') {
      MailApp.sendEmail(emailAddress, APPROVED_EMAIL_SUBJECT, APPROVED_EMAIL_MESSAGE);
      updateNotifiedStatus(sheet, notifiedValues, i, beginningRow);
    } else if (approvalValue == 'NOT APPROVED') {
      MailApp.sendEmail(emailAddress,REJECTED_EMAIL_SUBJECT, REJECTED_EMAIL_MESSAGE);
      updateNotifiedStatus(sheet, notifiedValues, i, beginningRow);
    }  
  }
}

/** 
 * Set up the Timesheets Responses form, & link the form's trigger to 
 * send manager an email when a new request is submitted.
 */
function setUpForm() {
  let sheet = SpreadsheetApp.getActiveSpreadsheet();
  if (sheet.getFormUrl()) {
    let msg = 'Form already exists. Unlink the form and try again.';
    SpreadsheetApp.getUi().alert(msg);
    return;
  }
  
  // Create the form.
  let form = FormApp.create('Weekly Timesheets')
      .setCollectEmail(true)
      .setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId())
      .setLimitOneResponsePerUser(false);
  form.addTextItem().setTitle('Employee Name:').setRequired(true);
  form.addTextItem().setTitle('Monday Hours:').setRequired(true);
  form.addTextItem().setTitle('Tuesday Hours:').setRequired(true);
  form.addTextItem().setTitle('Wednesday Hours:').setRequired(true);
  form.addTextItem().setTitle('Thursday Hours:').setRequired(true);
  form.addTextItem().setTitle('Friday Hours:').setRequired(true);
  form.addTextItem().setTitle('HourlyWage:').setRequired(true);
 
  // Set up on form submit trigger.
  ScriptApp.newTrigger('onFormSubmit')
      .forForm(form)
      .onFormSubmit()
      .create(); 
}

/**
 * Handle new form submissions to trigger the workflow.
 *
 * @param {Object} event Form submit event
 */
function onFormSubmit(event) {
  let response = getResponsesByName(event.response);
  
  // Load form responses into a new row.
  let row = ['New',
    '',
    response['Emoloyee Email:'],
    response['Employee Name:'],
    response['Monday Hours:'],
    response['Tuesday Hours:'],
    response['Wednesday Hours:'],
    response['Thursday Hours:'],
    response['Friday Hours:'],
    response['Hourly Wage:']];
  let sheet = SpreadsheetApp.getActiveSpreadsheet();
  sheet.appendRow(row);
}

/**
 * Converts a form response to an object keyed by the item titles. Allows easier
 * access to response values.
 *
 * @param {FormResponse} response
 * @return {Object} Form values keyed by question title
 */
function getResponsesByName(response) {
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