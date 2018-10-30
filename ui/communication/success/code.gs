function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index');
}

function getUnreadEmails() {
  return GmailApp.getInboxUnreadCount();
}