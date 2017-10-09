// [START mail_merge]
function sendEmails() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var dataSheet = ss.getSheets()[0];
  // [START dataRange]
  var dataRange = dataSheet.getRange(2, 1, dataSheet.getMaxRows() - 1, 4);
  // [END dataRange]

  // [START template]
  var templateSheet = ss.getSheets()[1];
  var emailTemplate = templateSheet.getRange("A1").getValue();
  // [END template]

  // [START objects]
  // Create one JavaScript object per row of data.
  var objects = getRowsData(dataSheet, dataRange);
  // [END objects]

  // For every row object, create a personalized email from a template and send
  // it to the appropriate person.
  for (var i = 0; i < objects.length; ++i) {
    // Get a row object
    var rowData = objects[i];

    // [START emailText]
    // Generate a personalized email.
    // Given a template string, replace markers (for instance ${"First Name"}) with
    // the corresponding value in a row object (for instance rowData.firstName).
    var emailText = fillInTemplateFromObject(emailTemplate, rowData);
    // [END emailText]
    var emailSubject = "Tutorial: Simple Mail Merge";

    // [START sendEmail]
    MailApp.sendEmail(rowData.emailAddress, emailSubject, emailText);
    // [END sendEmail]
  }
}

// Replaces markers in a template string with values define in a JavaScript data object.
// Arguments:
//   - template: string containing markers, for instance ${"Column name"}
//   - data: JavaScript object with values to that will replace markers. For instance
//           data.columnName will replace marker ${"Column name"}
// Returns a string without markers. If no data is found to replace a marker, it is
// simply removed.
function fillInTemplateFromObject(template, data) {
  var email = template;
  // [START templateVars]
  // Search for all the variables to be replaced, for instance ${"Column name"}
  var templateVars = template.match(/\$\{\"[^\"]+\"\}/g);
  // [END templateVars]

  // Replace variables from the template with the actual values from the data object.
  // If no value is available, replace with the empty string.
  for (var i = 0; i < templateVars.length; ++i) {
    // normalizeHeader ignores ${"} so we can call it directly here.
    // [START variableData]
    var variableData = data[normalizeHeader(templateVars[i])];
    // [END variableData]
    // [START replace]
    email = email.replace(templateVars[i], variableData || "");
    // [END replace]
  }

  return email;
}
// [END mail_merge]
