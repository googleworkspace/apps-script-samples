
/**
 *
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */

/**
 * Runs when the document opens, populating the menu.
 */
function onOpen() {
  DocumentApp.getUi().createMenu('Sidebar')
      .addItem('Show', 'showSidebar')
      .addToUi();
}

/**
 * Shows the sidebar in the document.
 */
function showSidebar() {
  var page = HtmlService.createTemplateFromFile('Sidebar')
      .evaluate()
      .setTitle('Sidebar')
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  DocumentApp.getUi().showSidebar(page);
}

/**
 * Open a dialog in the document.
 */
function openDialog() {
  var dialogId = Utilities.base64Encode(Math.random());
  var template = HtmlService.createTemplateFromFile('Dialog');
  template.dialogId = dialogId;
  var page = template.evaluate()
      .setTitle('Dialog')
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  DocumentApp.getUi().showDialog(page);
  return dialogId;
}

/**
 * Include the contents of the given file into the HTML content.
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
