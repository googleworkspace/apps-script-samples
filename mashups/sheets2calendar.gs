/**
 * Create a new calendar event for every row in a spreadsheet. This code assumes
 * that the data is in the first sheet (workbook) in the spreadsheet and has the
 * columns "Title", "Description", and "Emails" in that order, with multiple
 * email addresses separated by a comma.
 */
function createEventsFromSpreadsheet() {
  // Open the spreadsheet and get the data.
  var ss = SpreadsheetApp.openByUrl('ENTER SPREADSHEET URL HERE');
  var sheet = ss.getSheets()[0];
  var data = sheet.getDataRange().getValues();

  // Remove any frozen rows from the data, since they contain headers.
  data.splice(sheet.getFrozenRows());

  // Create an event for each row.
  data.forEach(function(row) {
    var title = row[0];
    var description = row[1];
    var emails = row[2];

    // Split the emails into an array and remove extra whitespace.
    emails = emails.split(',').map(function(email) {
      return email.trim();
    });

    var now = new Date();
    // Start the event at the next hour mark.
    var start = new Date(now);
    start.setHours(start.getHours() + 1);
    start.setMinutes(0);
    start.setSeconds(0);
    start.setMilliseconds(0);
    // End the event after 30 minutes.
    var end = new Date(start);
    end.setMinutes(end.getMinutes() + 30);

    // Create the calendar event and invite the guests.
    var event = CalendarApp.createEvent(title, start, end)
        .setDescription(description);
    emails.forEach(function(email) {
      event.addGuest(email);
    });

    // Add yourself as a guest and mark yourself as attending.
    event.addGuest(Session.getActiveUser().getEmail());
    event.setMyStatus(CalendarApp.GuestStatus.YES);
  });
}
