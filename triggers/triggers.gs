// [START create_time_driven_triggers]
/**
 * Creates a two time-driven triggers.
 */
function createTimeDrivenTriggers() {
  // Trigger every 6 hours.
  ScriptApp.newTrigger('myFunction')
      .timeBased()
      .everyHours(6)
      .create();

  // Trigger every Monday at 09:00.
  ScriptApp.newTrigger('myFunction')
      .timeBased()
      .onWeekDay(ScriptApp.WeekDay.MONDAY)
      .atHour(9)
      .create();
}
// [END create_time_driven_triggers]

// [START create_preadsheet_open_trigger]
/**
 * Creates a trigger for when a spreadsheet opens.
 */
function createSpreadsheetOpenTrigger() {
  var ss = SpreadsheetApp.getActive();
  ScriptApp.newTrigger('myFunction')
      .forSpreadsheet(ss)
      .onOpen()
      .create();
}
// [END create_preadsheet_open_trigger]

// [START delete_trigger]
/**
 * Deletes a trigger.
 * @param {string} triggerId The Trigger ID.
 */
function deleteTrigger(triggerId) {
  // Loop over all triggers.
  var allTriggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < allTriggers.length; i++) {
    // If the current trigger is the correct one, delete it.
    if (allTriggers[i].getUniqueId() == triggerId) {
      ScriptApp.deleteTrigger(allTriggers[i]);
      break;
    }
  }
}
// [END delete_trigger]

