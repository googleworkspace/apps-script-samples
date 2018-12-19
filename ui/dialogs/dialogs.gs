/**
 * Copyright Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// [START apps_script_alert_dialogs]
/**
 * Creates a custom menu when a user opens a Spreadsheet.
 */
function onOpen() {
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
    .createMenu('Custom Menu')
    .addItem('Show alert', 'showAlert')
    .addToUi();
}

/**
 * Shows an alert dialog.
 */
function showAlert() {
  var ui = SpreadsheetApp.getUi(); // Same variations.

  var result = ui.alert(
    'Please confirm',
    'Are you sure you want to continue?',
    ui.ButtonSet.YES_NO);

  // Process the user's response.
  if (result === ui.Button.YES) {
    // User clicked "Yes".
    ui.alert('Confirmation received.');
  } else {
    // User clicked "No" or X in the title bar.
    ui.alert('Permission denied.');
  }
}
// [END apps_script_alert_dialogs]

// [START apps_script_prompt_dialog]
/**
 * Creates a custom menu when a user opens a Spreadsheet.
 */
function onOpen() {
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
    .createMenu('Custom Menu')
    .addItem('Show prompt', 'showPrompt')
    .addToUi();
}

/**
 * Shows a prompt dialog.
 */
function showPrompt() {
  var ui = SpreadsheetApp.getUi(); // Same variations.

  var result = ui.prompt(
    'Let\'s get to know each other!',
    'Please enter your name:',
    ui.ButtonSet.OK_CANCEL);

  // Process the user's response.
  var button = result.getSelectedButton();
  var text = result.getResponseText();
  if (button === ui.Button.OK) {
    // User clicked "OK".
    ui.alert('Your name is ' + text + '.');
  } else if (button === ui.Button.CANCEL) {
    // User clicked "Cancel".
    ui.alert('I didn\'t get your name.');
  } else if (button === ui.Button.CLOSE) {
    // User clicked X in the title bar.
    ui.alert('You closed the dialog.');
  }
}
// [END apps_script_prompt_dialog]

// [START apps_script_custom_dialog]
/**
 * Creates a custom menu when a user opens a Spreadsheet.
 */
function onOpen() {
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
    .createMenu('Custom Menu')
    .addItem('Show dialog', 'showDialog')
    .addToUi();
}

/**
 * Shows a custom dialog.
 */
function showDialog() {
  var html = HtmlService.createHtmlOutputFromFile('Page')
    .setWidth(400)
    .setHeight(300);
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
    .showModalDialog(html, 'My custom dialog');
}
// [END apps_script_custom_dialog]

// [START apps_script_custom_sidebar]
/**
 * Creates a custom sidebar when a user opens a Spreadsheet.
 */
function onOpen() {
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
    .createMenu('Custom Menu')
    .addItem('Show sidebar', 'showSidebar')
    .addToUi();
}

/**
 * Shows a custom sidebar.
 */
function showSidebar() {
  var html = HtmlService.createHtmlOutputFromFile('Page')
    .setTitle('My custom sidebar')
    .setWidth(300);
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
    .showSidebar(html);
}
// [END apps_script_custom_sidebar]
