function doGet() {
  return HtmlService.createHtmlOutputFromFile("Index");
}

function processForm(formObject) {
  const formBlob = formObject.myFile;
  const driveFile = DriveApp.createFile(formBlob);
  return driveFile.getUrl();
}
