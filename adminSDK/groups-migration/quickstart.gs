function insertEmailIntoGroup() {
  var groupId = 'YOUR_GROUP_EMAIL_ADDRESS_HERE';
  var threads = GmailApp.getInboxThreads();
  if (!threads || threads.length == 0) {
    throw 'Error: No threads in inbox.';
  }
  var thread = threads[0];
  var message = thread.getMessages().pop();
  var content = message.getRawContent();
  var contentBlob = Utilities.newBlob(content, 'message/rfc822');
  var response = AdminGroupsMigration.Archive.insert(groupId, contentBlob);
  Logger.log('Response code: %s', response.responseCode);
}
