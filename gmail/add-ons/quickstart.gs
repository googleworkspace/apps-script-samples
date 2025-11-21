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

// [START apps_script_gmail_quick_start]
/**
 * @typedef {Object} Card
 */

/**
 * This is a partial definition of the a Gmail add-on event object.
 * For the full list of properties, see:
 * https://developers.google.com/workspace/add-ons/concepts/event-objects
 *
 * @typedef {Object} gmailEvent
 * @property {Object} messageMetadata
 * @property {string} messageMetadata.accessToken
 * @property {string} messageMetadata.messageId
 * @property {Object} formInputs
 * @property {string[]} formInputs.labels
 */

/**
 * Returns the array of cards that should be rendered for the current
 * e-mail thread. The name of this function is specified in the
 * manifest 'onTriggerFunction' field, indicating that this function
 * runs every time the add-on is started.
 *
 * @param {gmailEvent} e The data provided by the Gmail UI.
 * @return {Card[]}
 */
function buildAddOn(e) {
  // Activate temporary Gmail add-on scopes.
  var accessToken = e.messageMetadata.accessToken;
  GmailApp.setCurrentMessageAccessToken(accessToken);

  var messageId = e.messageMetadata.messageId;
  var message = GmailApp.getMessageById(messageId);
  
  // Get user and thread labels as arrays to enable quick sorting and indexing.
  var threadLabels = message.getThread().getLabels();
  var labels = getLabelArray(GmailApp.getUserLabels());
  var labelsInUse = getLabelArray(threadLabels);
  
  // Create a section for that contains all user Labels.
  var section = CardService.newCardSection()
    .setHeader("<font color=\"#1257e0\"><b>Available User Labels</b></font>");       

  // Create a checkbox group for user labels that are added to prior section.
  var checkboxGroup = CardService.newSelectionInput()
    .setType(CardService.SelectionInputType.CHECK_BOX)
    .setFieldName('labels')
    .setOnChangeAction(CardService.newAction().setFunctionName('toggleLabel'));
  
  // Add checkbox with name and selected value for each User Label.
  for(var i = 0; i < labels.length; i++) {
    checkboxGroup.addItem(labels[i], labels[i], labelsInUse.indexOf(labels[i])!= -1);
  }
  
  // Add the checkbox group to the section.
  section.addWidget(checkboxGroup);
  
  // Build the main card after adding the section.
  var card = CardService.newCardBuilder()
    .setHeader(CardService.newCardHeader()
    .setTitle('Quick Label')
    .setImageUrl('https://www.gstatic.com/images/icons/material/system/1x/label_googblue_48dp.png'))
    .addSection(section) 
    .build();
  
  return [card];
} 

/**
 * Updates the labels on the current thread based on 
 * user selections. Runs via the OnChangeAction for
 * each CHECK_BOX created.
 *
 * @param {gmailEvent} e The data provided by the Gmail UI.
*/
function toggleLabel(e) {
  var selected = e.formInputs.labels;
  
  // Activate temporary Gmail add-on scopes.
  var accessToken = e.messageMetadata.accessToken;
  GmailApp.setCurrentMessageAccessToken(accessToken);

  var messageId = e.messageMetadata.messageId;
  var message = GmailApp.getMessageById(messageId);
  var thread = message.getThread();
  
  if (selected != null){
    for (const label of GmailApp.getUserLabels()) {
      if (selected.indexOf(label.getName()) != -1) {
        thread.addLabel(label);
      } else {
        thread.removeLabel(label);
      }
    }
  } else {
    for (const label of GmailApp.getUserLabels()) {
      thread.removeLabel(label);
    }
  }
}


/**
 * Converts a GmailLabel object to a array of strings.
 * Used for easy sorting and to determine if a value exists.
 *
 * @param {GoogleAppsScript.Gmail.GmailLabel[]} labelsObjects
 * @return {string[]} An array of labels names as strings.
*/
function getLabelArray(labelsObjects) {
  var labels = [];
  for(var i = 0; i < labelsObjects.length; i++) {
    labels[i] = labelsObjects[i].getName();
  }
  labels.sort();
  return labels;
}

// [END apps_script_gmail_quick_start]
