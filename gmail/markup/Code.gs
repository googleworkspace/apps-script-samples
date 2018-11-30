// [START apps_script_gmail_markup]
/**
 * Tests the schema.
 */
function testSchemas() {
  var htmlBody = HtmlService.createHtmlOutputFromFile('mail_template').getContent();

  MailApp.sendEmail({
    to: Session.getActiveUser().getEmail(),
    subject: 'Test Email markup - ' + new Date(),
    htmlBody: htmlBody,
  });
}
// [END apps_script_gmail_markup]
