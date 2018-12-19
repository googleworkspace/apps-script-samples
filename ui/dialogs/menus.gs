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

// [START apps_script_menu]
/**
 * Handler for when a user opens the spreadsheet.
 * Creates a custom menu.
 */
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  // Or DocumentApp or FormApp.
  ui.createMenu('Custom Menu')
    .addItem('First item', 'menuItem1')
    .addSeparator()
    .addSubMenu(ui.createMenu('Sub-menu')
      .addItem('Second item', 'menuItem2'))
    .addToUi();
}

/**
 * Handler for when menu item 1 is clicked.
 */
function menuItem1() {
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
    .alert('You clicked the first menu item!');
}

/**
 * Handler for when menu item 2 is clicked.
 */
function menuItem2() {
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
    .alert('You clicked the second menu item!');
}
// [END apps_script_menu]

// [START apps_script_show_message_box]
/**
 * Shows a message box to the user.
 */
function showMessageBox() {
  Browser.msgBox('You clicked it!');
}
// [END apps_script_show_message_box]

// [START apps_script_sites_link]
/**
 * A function that can be invoked from a Google Sites link.
 */
function sitesLink() {
  var recipient = Session.getActiveUser().getEmail();
  GmailApp.sendEmail(recipient, 'Email from your site', 'You clicked a link!');
}
// [END apps_script_sites_link]
