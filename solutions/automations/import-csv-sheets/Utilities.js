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
 * This file contains utility functions that work with application's folder and files.
 */

/**
 * Gets application destination spreadsheet from a given folder
 * Returns new sample version if orignal is not found. 
 * 
 * @param {string} fileName - Name of the file to test for.
 * @param {object} objFolder - Folder object in which to search.
 * @return {object} Spreadsheet object.
 */
function getSpreadSheet_(fileName, objFolder) {

  let files = objFolder.getFilesByName(fileName);

  while (files.hasNext()) {
    let file = files.next();
    let fileId = file.getId();

    const existingSpreadsheet = SpreadsheetApp.openById(fileId);
    return existingSpreadsheet;
  }

  // If application destination spreadsheet is missing, creates a new sample version.
  const folderAppPrimary = getApplicationFolder_(APP_FOLDER);
  const sampleSheet = setupPrimarySpreadsheet_(folderAppPrimary);
  return sampleSheet;
}

/**
 * Tests if a file exists within a given folder.
 * 
 * @param {string} fileName - Name of the file to test for.
 * @param {object} objFolder - Folder object in which to search.
 * @return {boolean} true if found in folder, false if not.
 */
function fileExists_(fileName, objFolder) {

  let files = objFolder.getFilesByName(fileName);

  while (files.hasNext()) {
    let file = files.next();
    console.log(`${file.getName()} already exists.`)
    return true;
  }
  return false;
}

/** 
 * Returns folder named in folderName parameter. 
 * Checks if folder already exists,  creates it if it doesn't.
 *
 * @param {string} folderName - Name of the Drive folder. 
 * @return {object} Google Drive Folder
 */
function getFolder_(folderName) {

  // Gets the primary folder for the application.
  const parentFolder = getApplicationFolder_();

  // Iterates subfolders to check if folder already exists.
  const subFolders = parentFolder.getFolders();
  while (subFolders.hasNext()) {
    let folder = subFolders.next();

    // Returns the existing folder if found.
    if (folder.getName() === folderName) {
      return folder;
    }
  }
  // Creates a new folder if one doesn't already exist.
  return parentFolder.createFolder(folderName)
    .setDescription(`Supporting folder created by ${APP_TITLE}.`);
}

/** 
 * Returns the primary folder as named by the APP_FOLDER variable in the Code.gs file.
 * Checks if folder already exists to avoid duplication.
 * Creates new instance if existing folder not found.
 *
 * @return {object} Google Drive Folder
 */
function getApplicationFolder_() {

  // Gets root folder, currently set to 'My Drive'
  const parentFolder = DriveApp.getRootFolder();

  // Iterates through the subfolders to check if folder already exists.
  const subFolders = parentFolder.getFolders();
  while (subFolders.hasNext()) {
    let folder = subFolders.next();

    // Returns the existing folder if found.
    if (folder.getName() === APP_FOLDER) {
      return folder;
    }
  }
  // Creates a new folder if one doesn't already exist.
  return parentFolder.createFolder(APP_FOLDER)
    .setDescription(`Main application folder created by ${APP_TITLE}.`);
}

/**
 * Tests getApplicationFolder_ and getFolder_
 * @logs details of created Google Drive folder.
 */
function test_getFolderByName() {

  let folder = getApplicationFolder_()
  console.log(`Name: ${folder.getName()}\rID: ${folder.getId()}\rURL:${folder.getUrl()}\rDescription: ${folder.getDescription()}`)
  // Uncomment the following to automatically delete test folder.
  // folder.setTrashed(true);

  folder = getFolder_(SOURCE_FOLDER);
  console.log(`Name: ${folder.getName()}\rID: ${folder.getId()}\rURL:${folder.getUrl()}\rDescription: ${folder.getDescription()}`)
  // Uncomment the following to automatically delete test folder.
  // folder.setTrashed(true);

  folder = getFolder_(PROCESSED_FOLDER);
  console.log(`Name: ${folder.getName()}\rID: ${folder.getId()}\rURL:${folder.getUrl()}\rDescription: ${folder.getDescription()}`)
  // Uncomment the following to automatically delete test folder.
  // folder.setTrashed(true);


}