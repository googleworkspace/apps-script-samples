// [START apps_script_triggers_onopen]
/**
 * The event handler triggered when opening the spreadsheet.
 * @param {Event} e The onOpen event.
 */
function onOpen(e) {
  // Add a custom menu to the spreadsheet.
  SpreadsheetApp.getUi() // Or DocumentApp, SlidesApp, or FormApp.
      .createMenu('Custom Menu')
      .addItem('First item', 'menuItem1')
      .addToUi();
}
// [END apps_script_triggers_onopen]

// [START apps_script_triggers_onselectionchange]
/**
 * The event handler triggered when selection changes in the spreadsheet.
 * @param {Event} e The onSelectionChange event.
 */
function onSelectionChange(e) {
  // Set background to red if a single empty cell is selected.
  var range = e.range;
  if(range.getNumRows() == 1 
      && range.getNumColumns() == 1 
      && range.getCell(1, 1).getValue() == "") {
    range.setBackground("red");
  }
}
// [END apps_script_triggers_onselectionchange]

// [START apps_script_triggers_onedit]
/**
 * The event handler triggered when editing the spreadsheet.
 * @param {Event} e The onEdit event.
 */
function onEdit(e) {
  // Set a comment on the edited cell to indicate when it was changed.
  var range = e.range;
  range.setNote('Last modified: ' + new Date());
}
// [END apps_script_triggers_onedit]

// [START apps_script_triggers_oninstall]
/**
 * The event handler triggered when installing the add-on.
 * @param {Event} e The onInstall event.
 */
function onInstall(e) {
  onOpen(e);
}
// [END apps_script_triggers_oninstall]

// [START apps_script_triggers_time]
/**
 * Creates two time-driven triggers.
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
// [END apps_script_triggers_time]

// [START apps_script_triggers_open]
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
// [END apps_script_triggers_open]

// [START apps_script_triggers_delete]
/**
 * Deletes a trigger.
 * @param {string} triggerId The Trigger ID.
 */
function deleteTrigger(triggerId) {
  // Loop over all triggers.
  var allTriggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < allTriggers.length; i++) {
    // If the current trigger is the correct one, delete it.
    if (allTriggers[i].getUniqueId() === triggerId) {
      ScriptApp.deleteTrigger(allTriggers[i]);
      break;
    }
  }
}
// [END apps_script_triggers_delete]
