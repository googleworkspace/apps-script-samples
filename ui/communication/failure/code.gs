function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index');
}

function getUnreadEmails() {
  // 'got' instead of 'get' will throw an error.
  return GmailApp.gotInboxUnreadCount();
}