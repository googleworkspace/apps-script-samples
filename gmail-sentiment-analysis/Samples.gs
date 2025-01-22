/**
 * Create sample emails
 */
function generateSampleEmails() {
  // Get active user's email
  var userEmail = Session.getActiveUser().getEmail();

  // Send emails
  GmailApp.sendEmail(
    userEmail,
    "Thank you for amazing service!",
    "Hi, I really enjoyed working with you. Thank you again!",
    {
      name: 'Customer A',
    },
  );

  GmailApp.sendEmail(
    userEmail,
    "Request for information",
    "Hello, I need more information on your recent product launch. Thank you.",
    {
      name: 'Customer B',
    },
  );

  GmailApp.sendEmail(
    userEmail,
    "Complaint!",
    "Hello, You are late in delivery, again. Please contact me ASAP before I cancel our subscription.",
    {
      name: 'Customer C',
    },
  );

  console.log("Sample email generation completed.")
}
