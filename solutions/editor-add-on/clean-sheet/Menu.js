/**
 * Creates a menu entry in the Google Sheets Extensions menu when the document is opened.
 *
 * @param {object} e The event parameter for a simple onOpen trigger. 
 */
function onOpen(e) {
  // Builds a menu that displays under the Extensions menu in Sheets.
  let menu = SpreadsheetApp.getUi().createAddonMenu()

  menu
    .addItem('Delete blank rows (from selected rows only)', 'deleteEmptyRows')
    .addItem('Delete blank columns (from selected columns only)', 'deleteEmptyColumns')
    .addItem('Crop sheet to data range', 'cropSheet')
    .addSeparator()
    .addItem('Fill in blank rows below', 'fillDownData')
    .addSeparator()
    .addItem('About', 'aboutApp')
    .addToUi();
}

/**
 * Runs when the add-on is installed; calls onOpen() to ensure menu creation and
 * any other initializion work is done immediately. This method is only used by 
 * the desktop add-on and is never called by the mobile version.
 *
 * @param {object} e The event parameter for a simple onInstall trigger. 
 */
function onInstall(e) {
  onOpen(e);
}

/**
 * About box for context and developer contact information.
 * TODO: Personalize
 */
function aboutApp() {
  const msg = `
  Name: ${APP_TITLE}
  Version: 1.0
  Contact: <Developer Email Goes Here>`

  const ui = SpreadsheetApp.getUi();
  ui.alert("About this application", msg, ui.ButtonSet.OK);
}