/**
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** 
 * This file contains functions that set up the folders and sample files used to demo the application.
 * 
 * Sample data for the application is stored in the SampleData.gs file.
 */

// Global variables for sample setup.
const INCLUDE_SAMPLE_DATA_FILES = true; // Set to true to create sample data files, false to skip.

/**
 * Runs the setup for the sample. 
 * 1) Creates the application folder and subfolders for unprocessed/processed CSV files.
 *    from global variables APP_FOLDER | SOURCE_FOLDER | PROCESSED_FOLDER
 * 2) Creates the sample Sheets spreadsheet in the application folder.
 *    from global variable SHEET_REPORT_NAME 
 * 3) Creates CSV files from sample data in the unprocessed files folder. 
 *    from variable SAMPLE_DATA in SampleData.gs.
 * 4) Creates an installable trigger to run process automatically at a specified time interval.
 */
function setupSample() {

  console.log(`Application setup for: ${APP_TITLE}`)

  // Creates application folder.
  const folderAppPrimary = getApplicationFolder_(APP_FOLDER);
  // Creates supporting folders.
  const folderSource = getFolder_(SOURCE_FOLDER);
  const folderProcessed = getFolder_(PROCESSED_FOLDER);

  console.log(`Application folders: ${folderAppPrimary.getName()}, ${folderSource.getName()}, ${folderProcessed.getName()}`)

  if (INCLUDE_SAMPLE_DATA_FILES) {

    // Sets up primary destination spreadsheet
    const sheet = setupPrimarySpreadsheet_(folderAppPrimary);

    // Gets the CSV files data - refer to the SampleData.gs file to view.
    const csvFiles = getCSVFilesData();

    // Processes each CSV file.
    for (const file of csvFiles) {
      // Creates CSV file in source folder if it doesn't exist.
      if (!fileExists_(file.name, folderSource)) {
        let csvFileId = DriveApp.createFile(file.name, file.csv, MimeType.CSV);
        console.log(`Created Sample CSV: ${file.name}`)
        csvFileId.moveTo(folderSource);
      }
    }
  }
  // Installs (or recreates) project trigger
  installTrigger()

  console.log(`Setup completed for: ${APP_TITLE}`)
}

/**
 * 
 */
function setupPrimarySpreadsheet_(folderAppPrimary) {

  // Creates the report destination spreadsheet if doesn't exist.
  if (!fileExists_(SHEET_REPORT_NAME, folderAppPrimary)) {

    // Creates new destination spreadsheet (report) with cell size of 20 x 10. 
    const sheet = SpreadsheetApp.create(SHEET_REPORT_NAME, 20, 10);

    // Adds the sample data headings.
    let sheetHeadings = getHeadings();
    sheet.getSheets()[0].getRange(1, 1, 1, sheetHeadings[0].length).setValues(sheetHeadings);
    SpreadsheetApp.flush();
    // Moves to primary application root folder.
    DriveApp.getFileById(sheet.getId()).moveTo(folderAppPrimary)

    console.log(`Created file: ${SHEET_REPORT_NAME} In folder: ${folderAppPrimary.getName()}.`)
    return sheet;
  }
}

/**
 * Moves sample content to Drive trash & uninstalls trigger.
 * This function removes all folders and content related to this application.
 */
function removeSample() {
  getApplicationFolder_(APP_FOLDER).setTrashed(true);
  console.log(`'${APP_FOLDER}' contents have been moved to Drive Trash folder.`)

  // Removes existing trigger if found.
  const projectTriggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < projectTriggers.length; i++) {
    if (projectTriggers[i].getHandlerFunction() == HANDLER_FUNCTION) {
      console.log(`Existing trigger with handler function of '${HANDLER_FUNCTION}' removed.`);
      ScriptApp.deleteTrigger(projectTriggers[i]);
    }
  }
}