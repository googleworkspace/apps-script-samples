// To learn how to use this script, refer to the documentation:
// https://developers.google.com/apps-script/samples/automations/upload-files

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

// [START apps_script_upload_files]
// TODO Before you start using this sample, you must run the setUp() 
// function in the Setup.gs file.

// Application constants
const APP_TITLE = "Upload files to Drive from Forms";
const APP_FOLDER_NAME = "Upload files to Drive (File responses)";

// Identifies the subfolder form item
const APP_SUBFOLDER_ITEM = "Subfolder";
const APP_SUBFOLDER_NONE = "<None>";


/**
 * Gets the file uploads from a form response and moves files to the corresponding subfolder.
 *  
 * @param {object} event - Form submit.
 */
function onFormSubmit(e) {
  try {
    // Gets the application root folder.
    var destFolder = getFolder_(APP_FOLDER_NAME);
    
    // Gets all form responses.
    let itemResponses = e.response.getItemResponses();

    // Determines the subfolder to route the file to, if any.
    var subFolderName;
    let dest = itemResponses.filter((itemResponse) =>
      itemResponse.getItem().getTitle().toString() === APP_SUBFOLDER_ITEM);
    
    // Gets the destination subfolder name, but ignores if APP_SUBFOLDER_NONE was selected;
    if (dest.length > 0) {
      if (dest[0].getResponse() != APP_SUBFOLDER_NONE) {
        subFolderName = dest[0].getResponse();
      }
    }
    // Gets the subfolder or creates it if it doesn't exist.
    if (subFolderName != undefined) {
      destFolder = getSubFolder_(destFolder, subFolderName)
    }
    console.log(`Destination folder to use:
    Name: ${destFolder.getName()}
    ID: ${destFolder.getId()}
    URL: ${destFolder.getUrl()}`)

    // Gets the file upload response as an array to allow for multiple files.
    let fileUploads = itemResponses.filter((itemResponse) => itemResponse.getItem().getType().toString() === "FILE_UPLOAD")
      .map((itemResponse) => itemResponse.getResponse())
      .reduce((a, b) => [...a, ...b], []);

    // Moves the files to the destination folder.
    if (fileUploads.length > 0) {
      fileUploads.forEach((fileId) => {
        DriveApp.getFileById(fileId).moveTo(destFolder);
        console.log(`File Copied: ${fileId}`)
      });
    }
  }
  catch (err) {
    console.log(err);
  }
}


/**
 * Returns a Drive folder under the passed in objParentFolder parent
 * folder. Checks if folder of same name exists before creating, returning 
 * the existing folder or the newly created one if not found.
 *
 * @param {object} objParentFolder - Drive folder as an object.
 * @param {string} subFolderName - Name of subfolder to create/return.
 * @return {object} Drive folder
 */
function getSubFolder_(objParentFolder, subFolderName) {

  // Iterates subfolders of parent folder to check if folder already exists.
  const subFolders = objParentFolder.getFolders();
  while (subFolders.hasNext()) {
    let folder = subFolders.next();

    // Returns the existing folder if found.
    if (folder.getName() === subFolderName) {
      return folder;
    }
  }
  // Creates a new folder if one doesn't already exist.
  return objParentFolder.createFolder(subFolderName)
    .setDescription(`Created by ${APP_TITLE} application to store uploaded Forms files.`);
}

// [END apps_script_upload_files]
