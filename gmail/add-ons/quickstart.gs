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
 * Returns the array of cards that should be rendered for the current
 * e-mail thread. The name of this function is specified in the
 * manifest 'onTriggerFunction' field, indicating that this function
 * runs every time the add-on is started.
 *
 * @param {Object} e The data provided by the Gmail UI.
 * @return {Card[]}
 */
function buildAddOn(e) {
  // Activate temporary Gmail add-on scopes.
  const accessToken = e.messageMetadata.accessToken;
  GmailApp.setCurrentMessageAccessToken(accessToken);

  const messageId = e.messageMetadata.messageId;
  const message = GmailApp.getMessageById(messageId);

  // Get user and thread labels as arrays to enable quick sorting and indexing.
  const threadLabels = message.getThread().getLabels();
  const labels = getLabelArray(GmailApp.getUserLabels());
  const labelsInUse = getLabelArray(threadLabels);

  // Create a section for that contains all user Labels.
  const section = CardService.newCardSection().setHeader(
    '<font color="#1257e0"><b>Available User Labels</b></font>',
  );

  // Create a checkbox group for user labels that are added to prior section.
  const checkboxGroup = CardService.newSelectionInput()
    .setType(CardService.SelectionInputType.CHECK_BOX)
    .setFieldName("labels")
    .setOnChangeAction(CardService.newAction().setFunctionName("toggleLabel"));

  // Add checkbox with name and selected value for each User Label.
  for (let i = 0; i < labels.length; i++) {
    checkboxGroup.addItem(
      labels[i],
      labels[i],
      labelsInUse.indexOf(labels[i]) !== -1,
    );
  }

  // Add the checkbox group to the section.
  section.addWidget(checkboxGroup);

  // Build the main card after adding the section.
  const card = CardService.newCardBuilder()
    .setHeader(
      CardService.newCardHeader()
        .setTitle("Quick Label")
        .setImageUrl(
          "https://www.gstatic.com/images/icons/material/system/1x/label_googblue_48dp.png",
        ),
    )
    .addSection(section)
    .build();

  return [card];
}

/**
 * Updates the labels on the current thread based on
 * user selections. Runs via the OnChangeAction for
 * each CHECK_BOX created.
 *
 * @param {Object} e The data provided by the Gmail UI.
 */
function toggleLabel(e) {
  const selected = e.formInputs.labels;

  // Activate temporary Gmail add-on scopes.
  const accessToken = e.messageMetadata.accessToken;
  GmailApp.setCurrentMessageAccessToken(accessToken);

  const messageId = e.messageMetadata.messageId;
  const message = GmailApp.getMessageById(messageId);
  const thread = message.getThread();

  if (selected != null) {
    for (const label of GmailApp.getUserLabels()) {
      if (selected.indexOf(label.getName()) !== -1) {
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
 * Converts an GmailLabel object to a array of strings.
 * Used for easy sorting and to determine if a value exists.
 *
 * @param {labelsObjects} A GmailLabel object array.
 * @return {lables[]} An array of labels names as strings.
 */
function getLabelArray(labelsObjects) {
  const labels = [];

  for (let i = 0; i < labelsObjects.length; i++) {
    labels[i] = labelsObjects[i].getName();
  }
  labels.sort();
  return labels;
}

// [END apps_script_gmail_quick_start]
