/** 
 * This file contains the functions that build the custom menu.
 */
// Menu constants for easy access to update.
const MENU = {
  NAME: 'Import summaries',
  IMPORT: 'Import summaries',
  SETUP: 'Configure',
  NEW_INSTANCE: 'Setup new instance',
  TEMPLATE: 'Create starter template',
  SAMPLES: 'Run demo setup with sample documents'
}

/**
 * Creates custom menu when the document is opened.
 */
function onOpen() {
  const ui = DocumentApp.getUi();
  ui.createMenu(MENU.NAME)
    .addItem(MENU.IMPORT, 'performImport')
    .addSeparator()
    .addSubMenu(ui.createMenu(MENU.SETUP)
      .addItem(MENU.NEW_INSTANCE, 'setupConfig')
      .addItem(MENU.TEMPLATE, 'createSampleFile')
      .addSeparator()
      .addItem(MENU.SAMPLES, 'setupWithSamples'))
    .addItem('About', 'aboutApp')
    .addToUi()
}

/**
 * About box for context and contact.
 * TODO: Personalize
 */
function aboutApp() {
  const msg = `
  ${APP_TITLE}
  Version: 1.0
  Contact: <Developer Email goes here>`

  const ui = DocumentApp.getUi();
  ui.alert("About this application", msg, ui.ButtonSet.OK);
}
