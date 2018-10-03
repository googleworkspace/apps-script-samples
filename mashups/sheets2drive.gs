/**
 * Create a PDF file in Google Drive for every row in a spreadsheet. This
 * code assumes that the data is in the first sheet (workbook) in the
 * spreadsheet and has the columns "File Name", "HTML Content", and "Emails" in that
 * order, with multiple email addresses separated by a comma.
 */
function createDriveFilesFromSpreadsheet() {
  // Open the spreadsheet and get the data.
  var ss = SpreadsheetApp.openByUrl('ENTER SPREADSHEET URL HERE');
  var sheet = ss.getSheets()[0];
  var data = sheet.getDataRange().getValues();

  // Remove any frozen rows from the data, since they contain headers.
  data.splice(sheet.getFrozenRows());

  // Create a PDF in Google Drive for each row.
  data.forEach(function(row) {
    var fileName = row[0];
    var htmlContent = row[1];
    var emails = row[2];

    // Split the emails into an array and remove extra whitespace.
    emails = emails.split(',').map(function(email) {
      return email.trim();
    });

    // Convert the HTML content to PDF.
    var html = Utilities.newBlob(htmlContent, 'text/html');
    var pdf = html.getAs('application/pdf');

    // Create the Drive file and share it out.
    var file = DriveApp.createFile(pdf).setName(fileName);
    file.addEditors(emails);
  });
}
