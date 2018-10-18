/**
 * Sends an email for every row in a spreadsheet. This code assumes that the
 * data is in the first sheet (workbook) in the spreadsheet and has the columns
 * "Subject", "HTML Message", and "Emails" in that order, with multiple email
 * addresses separated by a comma.
 */
function sendEmailsFromSpreadsheet() {
  // Open the spreadsheet and get the data.
  var ss = SpreadsheetApp.openByUrl('ENTER SPREADSHEET URL HERE');
  var sheet = ss.getSheets()[0];
  var data = sheet.getDataRange().getValues();

  // Remove any frozen rows from the data, since they contain headers.
  data.splice(sheet.getFrozenRows());

  // Send an email for each row.
  data.forEach(function(row) {
    var subject = row[0];
    var htmlMessage = row[1];
    var emails = row[2];

    // Send the email.
    GmailApp.sendEmail(emails, subject, null, {
      htmlBody: htmlMessage
    });
  });
}
