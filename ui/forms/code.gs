function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index');
}

/**
 * @typedef {{myFile: any}} FormObject
 */

/**
 * Processes a form submission with a file upload.
 *
 * @param {FormObject} formObject The form object submitted by the user.
 * @return {string} The URL of the uploaded file.
 */
function processForm(formObject) {
  var formBlob = formObject.myFile;
  var driveFile = DriveApp.createFile(formBlob);
  return driveFile.getUrl();
}