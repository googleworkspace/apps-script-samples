function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index');
}

function getEmail() {
  return Session.getActiveUser().getEmail();
}