// [START gmail_send_email_with_markup]
/**
 * Send an email with schemas in order to test email markup.
 */
function testSchemas() {
  try {
    const htmlBody = HtmlService.createHtmlOutputFromFile('mail_template').getContent();

    MailApp.sendEmail({
      to: Session.getActiveUser().getEmail(),
      subject: 'Test Email markup - ' + new Date(),
      htmlBody: htmlBody
    });
  } catch (err) {
    console.log(err.message);
  }
}
// [END gmail_send_email_with_markup]

