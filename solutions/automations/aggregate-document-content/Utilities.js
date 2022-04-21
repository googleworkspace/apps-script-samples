/** 
 * This file contains common utility functions.
 */

/**
 * Returns a Drive folder located in same folder that the application document is located.
 * Checks if the folder exists and returns that folder, or creates new one if not found.
 *
 * @param {string} folderName - Name of the Drive folder. 
 * @return {object} Google Drive folder
 */
function getFolderByName_(folderName) {
  // Gets the Drive folder where the current document is located.
  const docId = DocumentApp.getActiveDocument().getId();
  const parentFolder = DriveApp.getFileById(docId).getParents().next();

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
    .setDescription(`Created by ${APP_TITLE} application to store documents to process`);
}

/**
 * Test function to run getFolderByName_.
 * @logs details of created Google Drive folder.
 */
function test_getFolderByName() {

  // Gets the folder in Drive associated with this application.
  const folder = getFolderByName_(PROJECT_FOLDER_NAME);

  console.log(`Name: ${folder.getName()}\rID: ${folder.getId()}\rURL:${folder.getUrl()}\rDescription: ${folder.getDescription()}`)
  // Uncomment the following to automatically delete the test folder.
  // folder.setTrashed(true);
}