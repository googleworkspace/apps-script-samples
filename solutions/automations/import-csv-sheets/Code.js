// To learn more about this script, refer to the documentation: 
// https://developers.google.com/apps-script/samples/automations/import-csv-sheets

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

/** 
 * This file contains the main functions that import data from CSV files into a Google Spreadsheet.
 */

// Application constants
const APP_TITLE = 'Trigger-driven CSV import [App Script Sample]'; // Application name
const APP_FOLDER = '[App Script sample] Import CSVs'; // Application primary folder
const SOURCE_FOLDER = 'Inbound CSV Files'; // Folder for the update files.
const PROCESSED_FOLDER = 'Processed CSV Files'; // Folder to hold processed files.
const SHEET_REPORT_NAME = 'Import CSVs'; // Name of destination spreadsheet.

// Application settings
const CSV_HEADER_EXIST = true;  // Set to true if CSV files have a header row, false if not.
const HANDLER_FUNCTION = 'updateApplicationSheet'; // Function called by installable trigger to run data processing.

/**
 * Installs a time-driven trigger that runs daily to import CSVs into the main application spreadsheet.
 * Prior to creating a new instance, removes any existing triggers to avoid duplication.
 * 
 * Called by setupSample() or run directly setting up the application.
 */
function installTrigger() {

  // Checks for an existing trigger to avoid creating duplicate instances.
  // Removes existing if found.
  const projectTriggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < projectTriggers.length; i++) {
    if (projectTriggers[i].getHandlerFunction() == HANDLER_FUNCTION) {
      console.log(`Existing trigger with Handler Function of '${HANDLER_FUNCTION}' removed.`);
      ScriptApp.deleteTrigger(projectTriggers[i]);
    }
  }
  // Creates the new trigger.
  let newTrigger = ScriptApp.newTrigger(HANDLER_FUNCTION)
    .timeBased()
    .atHour(23)   // Runs at 11 PM in the time zone of this script.
    .everyDays(1) // Runs once per day.
    .create();
  console.log(`New trigger with Handler Function of '${HANDLER_FUNCTION}' created.`);
}

/**
 * Handler function called by the trigger created with the "installTrigger" function.
 * Run this directly to execute the entire automation process of the application with a trigger.
 * 
 * Process: Iterates through CSV files located in the source folder (SOURCE_FOLDER),
 * and appends them to the end of destination spreadsheet (SHEET_REPORT_NAME).
 * Successfully processed CSV files are moved to the processed folder (PROCESSED_FOLDER) to avoid duplication.
 * Sends summary email with status of the import.
 */
function updateApplicationSheet() {

  // Gets application & supporting folders.
  const folderAppPrimary = getApplicationFolder_(APP_FOLDER);
  const folderSource = getFolder_(SOURCE_FOLDER);
  const folderProcessed = getFolder_(PROCESSED_FOLDER);

  // Gets the application's destination spreadsheet {Spreadsheet object}
  let objSpreadSheet = getSpreadSheet_(SHEET_REPORT_NAME, folderAppPrimary)

  // Creates arrays to track every CSV file, categorized as processed sucessfully or not.
  let filesProcessed = [];
  let filesNotProcessed = [];

  // Gets all CSV files found in the source folder.
  let cvsFiles = folderSource.getFilesByType(MimeType.CSV);

  // Iterates through each CSV file.
  while (cvsFiles.hasNext()) {

    let csvFile = cvsFiles.next();
    let isSuccess;

    // Appends the unprocessed CSV data into the Google Sheets spreadsheet.
    isSuccess = processCsv_(objSpreadSheet, csvFile);

    if (isSuccess) {
      // Moves the processed file to the processed folder to prevent future duplicate data imports.
      csvFile.moveTo(folderProcessed);
      // Logs the successfully processed file to the filesProcessed array.
      filesProcessed.push(csvFile.getName());
      console.log(`Successfully processed: ${csvFile.getName()}`);

    } else if (!isSuccess) {
      // Doesn't move the unsuccesfully processed file so that it can be corrected and reprocessed later.
      // Logs the unsuccessfully processed file to the filesNotProcessed array.
      filesNotProcessed.push(csvFile.getName());
      console.log(`Not processed: ${csvFile.getName()}`);
    }
  }
  
  // Prepares summary email.
  // Gets variables to link to this Apps Script project.
  const scriptId = ScriptApp.getScriptId();
  const scriptUrl = DriveApp.getFileById(scriptId).getUrl();
  const scriptName = DriveApp.getFileById(scriptId).getName();

  // Gets variables to link to the main application spreadsheet.
  const sheetUrl = objSpreadSheet.getUrl()
  const sheetName = objSpreadSheet.getName()   

  // Gets user email and timestamp.
  const emailTo = Session.getEffectiveUser().getEmail();
  const timestamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm:ss zzzz");

  // Prepares lists and counts of processed CSV files.
  let processedList = "";
  const processedCount = filesProcessed.length
  for (const processed of filesProcessed) {
    processedList += processed + '<br>'
  };

  const unProcessedCount = filesNotProcessed.length
  let unProcessedList = "";
  for (const unProcessed of filesNotProcessed) {
    unProcessedList += unProcessed + '\n'
  };

  // Assembles email body as html.
  const eMailBody = `${APP_TITLE} ran an automated process at ${timestamp}.<br><br>` +
    `<b>Files successfully updated:</b> ${processedCount}<br>` +
    `${processedList}<br>` +
    `<b>Files not updated:</b> ${unProcessedCount}<br>` +
    `${unProcessedList}<br>` +
    `<br>View all updates in the Google Sheets spreadsheet ` +
    `<b><a href= "${sheetUrl}" target=\"_blank\">${sheetName}</a></b>.<br>` +
    `<br>*************<br>` +
    `<br>This email was generated by Google Apps Script. ` +
    `To learn more about this application or make changes, open the script project below: <br>` +
    `<a href= "${scriptUrl}" target=\"_blank\">${scriptName}</a>`

  MailApp.sendEmail({
    to: emailTo,
    subject: `Automated email from ${APP_TITLE}`,
    htmlBody: eMailBody
  });
  console.log(`Email sent to ${emailTo}`);
}

/**
 * Parses CSV data into an array and appends it after the last row in the destination spreadsheet.
 * 
 * @return {boolean} true if the update is successful, false if unexpected errors occur.
 */
function processCsv_(objSpreadSheet, csvFile) {

  try {
    // Gets the first sheet of the destination spreadsheet.
    let sheet = objSpreadSheet.getSheets()[0];

    // Parses CSV file into data array.
    let data = Utilities.parseCsv(csvFile.getBlob().getDataAsString());

    // Omits header row if application variable CSV_HEADER_EXIST is set to 'true'.
    if (CSV_HEADER_EXIST) {
      data.splice(0, 1);
    }
    // Gets the row and column coordinates for next available range in the spreadsheet. 
    let startRow = sheet.getLastRow() + 1;
    let startCol = 1;
    // Determines the incoming data size.
    let numRows = data.length;
    let numColumns = data[0].length;

    // Appends data into the sheet.
    sheet.getRange(startRow, startCol, numRows, numColumns).setValues(data);
    return true; // Success.

  } catch {
    return false; // Failure. Checks for CSV data file error.
  }
}
