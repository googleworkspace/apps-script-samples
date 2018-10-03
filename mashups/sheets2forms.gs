/**
 * Create a new form for every row in a spreadsheet. This code assumes that the
 * data is in the first sheet (workbook) in the spreadsheet and has the
 * columns "Title", "Question", and "Emails" in that order, with multiple email
 * addresses separated by a comma.
 */
function createFormsFromSpreadsheet() {
  // Open the spreadsheet and get the data.
  var ss = SpreadsheetApp.openByUrl('ENTER SPREADSHEET URL HERE');
  var sheet = ss.getSheets()[0];
  var data = sheet.getDataRange().getValues();

  // Remove any frozen rows from the data, since they contain headers.
  data.splice(sheet.getFrozenRows());

  // Create a form for each row.
  data.forEach(function(row) {
    var title = row[0];
    var question = row[1];
    var emails = row[2];

    // Split the emails into an array and remove extra whitespace.
    emails = emails.split(',').map(function(email) {
      return email.trim();
    });

    // Create the form, append the question, and share it out.
    var form = FormApp.create(title);
    form.addTextItem().setTitle(question);
    form.addEditors(emails);
  });
}
