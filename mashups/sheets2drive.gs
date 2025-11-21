/**
 * Create a PDF file in Google Drive for every row in a spreadsheet. This
 * code assumes that the data is in the first sheet (workbook) in the
 * spreadsheet and has the columns "File Name", "HTML Content", and "Emails" in that
 * order, with multiple email addresses separated by a comma.
 */
function createDriveFilesFromSpreadsheet() {
  // Open the spreadsheet and get the data.
  const ss = SpreadsheetApp.openByUrl('ENTER SPREADSHEET URL HERE');
  const sheet = ss.getSheets()[0];
  /** @type {string[][]} */
  const data = sheet.getDataRange().getValues();

  // Remove any frozen rows from the data, since they contain headers.
  data.splice(sheet.getFrozenRows());

  // Create a PDF in Google Drive for each row.
  data.forEach(function(row) {
    const fileName = row[0];
    const htmlContent = row[1];
    const emailsStr = row[2];

    // Split the emails into an array and remove extra whitespace.
    const emails = emailsStr.split(',').map(function(email) {
      return email.trim();
    });

    // Convert the HTML content to PDF.
    const html = Utilities.newBlob(htmlContent, 'text/html');
    const pdf = html.getAs('application/pdf');

    // Create the Drive file and share it out.
    const file = DriveApp.createFile(pdf).setName(fileName);
    file.addEditors(emails);
  });
}
