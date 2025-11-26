/**
 * Create a new form for every row in a spreadsheet. This code assumes that the
 * data is in the first sheet (workbook) in the spreadsheet and has the
 * columns "Title", "Question", and "Emails" in that order, with multiple email
 * addresses separated by a comma.
 */
function createFormsFromSpreadsheet() {
  // Open the spreadsheet and get the data.
  const ss = SpreadsheetApp.openByUrl("ENTER SPREADSHEET URL HERE");
  const sheet = ss.getSheets()[0];
  /** @type {string[][]} */
  const data = sheet.getDataRange().getValues();

  // Remove any frozen rows from the data, since they contain headers.
  data.splice(sheet.getFrozenRows());

  // Create a form for each row.
  for (const row of data) {
    const title = row[0];
    const question = row[1];
    const emailsStr = row[2];

    // Split the emails into an array and remove extra whitespace.
    const emails = emailsStr.split(",").map((email) => email.trim());

    // Create the form, append the question, and share it out.
    const form = FormApp.create(title);
    form.addTextItem().setTitle(question);
    form.addEditors(emails);
  }
}
