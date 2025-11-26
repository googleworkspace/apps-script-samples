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

// [START apps_script_prompt_dialog]
/**
 * Creates a custom menu when a user opens a Spreadsheet.
 */
function onOpen() {
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
    .createMenu("Custom Menu")
    .addItem("Show prompt", "showPrompt")
    .addToUi();
}

/**
 * Shows a prompt dialog.
 */
function showPrompt() {
  const ui = SpreadsheetApp.getUi(); // Same variations.

  const result = ui.prompt(
    "Let's get to know each other!",
    "Please enter your name:",
    ui.ButtonSet.OK_CANCEL,
  );

  // Process the user's response.
  const button = result.getSelectedButton();
  const text = result.getResponseText();
  if (button === ui.Button.OK) {
    // User clicked "OK".
    ui.alert(`Your name is ${text}.`);
  } else if (button === ui.Button.CANCEL) {
    // User clicked "Cancel".
    ui.alert("I didn't get your name.");
  } else if (button === ui.Button.CLOSE) {
    // User clicked X in the title bar.
    ui.alert("You closed the dialog.");
  }
}
// [END apps_script_prompt_dialog]
