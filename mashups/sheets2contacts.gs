/**
 * Create a new contact for every row in a spreadsheet. This code assumes that
 * the data is in the first sheet (workbook) in the spreadsheet and has the
 * columns "First Name", "Last Name", and "Email" in that order.
 */
function createContactsFromSpreadsheet() {
  // Open the spreadsheet and get the data.
  const ss = SpreadsheetApp.openByUrl("ENTER SPREADSHEET URL HERE");
  const sheet = ss.getSheets()[0];
  const data = sheet.getDataRange().getValues();

  // Remove any frozen rows from the data, since they contain headers.
  data.splice(sheet.getFrozenRows());

  // Send a contact for each row.
  for (const row of data) {
    const firstName = row[0];
    const lastName = row[1];
    const email = row[2];
    ContactsApp.createContact(firstName, lastName, email);
  }
}
