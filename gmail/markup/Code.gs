// [START gmail_markup]
/**
 * Send an email with schemas in order to test email markup.
 */
function testSchemas() {
  try{
  const htmlBody = HtmlService.createHtmlOutputFromFile('mail_template').getContent();

  MailApp.sendEmail({
    to: Session.getActiveUser().getEmail(),
    subject: 'Test Email markup - ' + new Date(),
    htmlBody: htmlBody,
  });
  }
  catch(err){
    Logger.log(err)
  }
}
// [END gmail_markup]
