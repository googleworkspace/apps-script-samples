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

// [START apps_script_upload_files_setup]
// TODO You must run the setUp() function before you start using this sample.

/** 
 * The setUp() function performs the following:
 *  - Creates a Google Drive folder named by the APP_FOLDER_NAME
 *    variable in the Code.gs file.
 *  - Creates a trigger to handle onFormSubmit events.
 */
function setUp() {
  // Ensures the root destination folder exists.
  const appFolder = getFolder_(APP_FOLDER_NAME);
  if (appFolder !== null) {
    console.log(`Application folder setup.
    Name: ${appFolder.getName()}
    ID: ${appFolder.getId()}
    URL: ${appFolder.getUrl()}`)
  }
  else {
    console.log(`Could not setup application folder.`)
  }
  // Calls the function that creates the Forms onSubmit trigger.
  installTrigger_();
}

/** 
 * Returns a folder to store uploaded files in the same location
 * in Drive where the form is located. First, it checks if the folder
 * already exists, and creates it if it doesn't.
 *
 * @param {string} folderName - Name of the Drive folder. 
 * @return {object} Google Drive Folder
 */
function getFolder_(folderName) {

  // Gets the Drive folder where the form is located.
  const ssId = FormApp.getActiveForm().getId();
  const parentFolder = DriveApp.getFileById(ssId).getParents().next();

  // Iterates through the subfolders to check if folder already exists.
  // The script checks for the folder name specified in the APP_FOLDER_NAME variable.
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
    .setDescription(`Created by ${APP_TITLE} application to store uploaded files.`);
}

/**
 * Installs trigger to capture onFormSubmit event when a form is submitted.
 * Ensures that the trigger is only installed once.
 * Called by setup().
 */
function installTrigger_() {
  // Ensures existing trigger doesn't already exist.
  let propTriggerId = PropertiesService.getScriptProperties().getProperty('triggerUniqueId')
  if (propTriggerId !== null) {
    const triggers = ScriptApp.getProjectTriggers();
    for (let t in triggers) {
      if (triggers[t].getUniqueId() === propTriggerId) {
        console.log(`Trigger with the following unique ID already exists: ${propTriggerId}`);
        return;
      }
    }
  }
  // Creates the trigger if one doesn't exist.
  let triggerUniqueId = ScriptApp.newTrigger('onFormSubmit')
    .forForm(FormApp.getActiveForm())
    .onFormSubmit()
    .create()
    .getUniqueId();
  PropertiesService.getScriptProperties().setProperty('triggerUniqueId', triggerUniqueId);
  console.log(`Trigger with the following unique ID was created: ${triggerUniqueId}`);
}

/**
 * Removes all script properties and triggers for the project.
 * Use primarily to test setup routines.
 */
function removeTriggersAndScriptProperties() {
  PropertiesService.getScriptProperties().deleteAllProperties();
  // Removes all triggers associated with project.
  const triggers = ScriptApp.getProjectTriggers();
  for (let t in triggers) {
    ScriptApp.deleteTrigger(triggers[t]);
  }
}

/**
 * Removes all form responses to reset the form.
 */
function deleteAllResponses() {
  FormApp.getActiveForm().deleteAllResponses();
}

// [END apps_script_upload_files_setup]
