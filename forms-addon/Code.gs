/**
 * Copyright 2014 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @OnlyCurrentDoc  Limits the script to only accessing the current form.
 */

var DIALOG_TITLE = 'Example Dialog';
var SIDEBAR_TITLE = 'Example Sidebar';

/**
 * Adds a custom menu with items to show the sidebar and dialog.
 *
 * @param {Object} e The event parameter for a simple onOpen trigger.
 */
function onOpen(e) {
  FormApp.getUi()
      .createAddonMenu()
      .addItem('Show sidebar', 'showSidebar')
      .addItem('Show dialog', 'showDialog')
      .addToUi();
}

/**
 * Runs when the add-on is installed; calls onOpen() to ensure menu creation and
 * any other initializion work is done immediately.
 *
 * @param {Object} e The event parameter for a simple onInstall trigger.
 */
function onInstall(e) {
  onOpen(e);
}

/**
 * Opens a sidebar. The sidebar structure is described in the Sidebar.html
 * project file.
 */
function showSidebar() {
  var ui = HtmlService.createTemplateFromFile('Sidebar')
      .evaluate()
      .setTitle(SIDEBAR_TITLE)
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  FormApp.getUi().showSidebar(ui);
}

/**
 * Opens a dialog. The dialog structure is described in the Dialog.html
 * project file.
 */
function showDialog() {
  var ui = HtmlService.createTemplateFromFile('Dialog')
      .evaluate()
      .setWidth(350)
      .setHeight(180)
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  FormApp.getUi().showModalDialog(ui, DIALOG_TITLE);
}

/**
 * Appends a new form item to the current form.
 *
 * @param {Object} itemData a collection of String data used to
 *     determine the exact form item created.
 */
function addFormItem(itemData) {
  // Use data collected from sidebar to manipulate the form.
  var form = FormApp.getActiveForm();
  switch (itemData.type) {
    case 'Date':
      form.addDateItem().setTitle(itemData.name);
      break;
    case 'Scale':
      form.addScaleItem().setTitle(itemData.name);
      break;
    case 'Text':
      form.addTextItem().setTitle(itemData.name);
      break;
  }
}

/**
 * Queries the form DocumentProperties to determine whether the formResponse
 * trigger is enabled or not.
 *
 * @return {Boolean} True if the form submit trigger is enabled; false
 *     otherwise.
 */
function getTriggerState() {
  // Retrieve and return the information requested by the dialog.
  var properties = PropertiesService.getDocumentProperties();
  return properties.getProperty('triggerId') != null;
}

/**
 * Turns the form submit trigger on or off based on the given argument.
 *
 * @param {Boolean} enableTrigger whether to turn on the form submit
 *     trigger or not
 */
function adjustFormSubmitTrigger(enableTrigger) {
  // Use data collected from dialog to manipulate form.

  // Determine existing state of trigger on the server.
  var form = FormApp.getActiveForm();
  var properties = PropertiesService.getDocumentProperties();
  var triggerId = properties.getProperty('triggerId');

  if (!enableTrigger && triggerId != null) {
    // Delete the existing trigger.
    var triggers = ScriptApp.getUserTriggers(form);
    for (var i = 0; i < triggers.length; i++) {
      if (triggers[i].getUniqueId() == triggerId) {
        ScriptApp.deleteTrigger(triggers[i]);
        break;
      }
    }
    properties.deleteProperty('triggerId');
  } else if (enableTrigger && triggerId == null) {
    // Create a new trigger.
    var trigger = ScriptApp.newTrigger('respondToFormSubmit')
        .forForm(form)
        .onFormSubmit()
        .create();
    properties.setProperty('triggerId', trigger.getUniqueId());
  }
}

/**
 * Responds to form submit events if a form summit trigger is enabled.
 * Collects some form information and sends it as an email to the form creator.
 *
 * @param {Object} e The event parameter created by a form
 *      submission; see
 *      https://developers.google.com/apps-script/understanding_events
 */
function respondToFormSubmit(e) {
  if (MailApp.getRemainingDailyQuota() > 0) {
    var form = FormApp.getActiveForm();
    var message = 'There have been ' + form.getResponses().length +
        ' response(s) so far. Latest Response:\n';
    var itemResponses = e.response.getItemResponses();
    for (var i = 0; i < itemResponses.length; i++) {
      var itemTitle = itemResponses[i].getItem().getTitle();
      var itemResponse = JSON.stringify(itemResponses[i].getResponse());
      message += itemTitle + ': ' + itemResponse + '\n';
    }
    MailApp.sendEmail(
        Session.getEffectiveUser().getEmail(),
        'Form response received for form ' + form.getTitle(),
        message,
        {name: 'Forms Add-on Template'});
  }
}
