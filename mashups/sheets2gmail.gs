/**
 * Sends an email for every row in a spreadsheet. This code assumes that the
 * data is in the first sheet (workbook) in the spreadsheet and has the columns
 * "Subject", "HTML Message", and "Emails" in that order, with multiple email
 * addresses separated by a comma.
 */
function sendEmailsFromSpreadsheet() {
  // Open the spreadsheet and get the data.
  const ss = SpreadsheetApp.openByUrl("ENTER SPREADSHEET URL HERE");
  const sheet = ss.getSheets()[0];
  /** @type {string[][]} */
  const data = sheet.getDataRange().getValues();

  // Remove any frozen rows from the data, since they contain headers.
  data.splice(sheet.getFrozenRows());

  // Send an email for each row.
  data.forEach((row) => {
    const subject = row[0];
    const htmlMessage = row[1];
    const emails = row[2];

    // Send the email.
    GmailApp.sendEmail(emails, subject, "", {
      htmlBody: htmlMessage,
    });
  });
}
