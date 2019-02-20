// [START apps_script_logging]
/**
 * Logs the time taken to execute 'myFunction'.
 */
function measuringExecutionTime() {
  // A simple INFO log message, using sprintf() formatting.
  console.info('Timing the %s function (%d arguments)', 'myFunction', 1);

  // Log a JSON object at a DEBUG level. The log is labeled
  // with the message string in the log viewer, and the JSON content
  // is displayed in the expanded log structure under "structPayload".
  var parameters = {
      isValid: true,
      content: 'some string',
      timestamp: new Date()
  };
  console.log({message: 'Function Input', initialData: parameters});

  var label = 'myFunction() time'; // Labels the timing log entry.
  console.time(label); // Starts the timer.
  try {
    myFunction(parameters); // Function to time.
  } catch (e) {
    // Logs an ERROR message.
    console.error('myFunction() yielded an error: ' + e);
  }
  console.timeEnd(label); // Stops the timer, logs execution duration.
}
// [END apps_script_logging]

// [START apps_script_logging_2]
/**
 * Logs Google Sheet information.
 * @param {number} rowNumber The spreadsheet row number.
 * @param {string} email The email to send with the row data.
 */
function emailDataRow(rowNumber, email) {
  Logger.log('Emailing data row ' + rowNumber + ' to ' + email);
  var sheet = SpreadsheetApp.getActiveSheet();
  var data = sheet.getDataRange().getValues();
  var rowData = data[rowNumber-1].join(" ");
  Logger.log('Row ' + rowNumber + ' data: ' + rowData);
  MailApp.sendEmail(email,
                    'Data in row ' + rowNumber,
                    rowData);
}
// [END apps_script_logging_2]
