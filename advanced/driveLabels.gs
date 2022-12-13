/**
 * Copyright 2022 Google LLC
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

// [START apps_script_drive_labels_list_labels]
/**
 * List labels available to the user.
 */
function listLabels() {
  let pageToken = null;
  let labels = [];
  do {
    try {
      const response = DriveLabels.Labels.list({
        publishedOnly: true,
        pageToken: pageToken
      });
      pageToken = response.nextPageToken;
      labels = labels.concat(response.labels);
    } catch (err) {
      // TODO (developer) - Handle exception
      console.log('Failed to list labels with error %s', err.message);
    }
  } while (pageToken != null);

  console.log('Found %d labels', labels.length);
}
// [END apps_script_drive_labels_list_labels]

// [START apps_script_drive_labels_get_label]
/**
 * Get a label by name.
 * @param {string} labelName The label name.
 */
function getLabel(labelName) {
  try {
    const label = DriveLabels.Labels.get(labelName, {view: 'LABEL_VIEW_FULL'});
    const title = label.properties.title;
    const fieldsLength = label.fields.length;
    console.log(`Fetched label with title: '${title}' and ${fieldsLength} fields.`);
  } catch (err) {
    // TODO (developer) - Handle exception
    console.log('Failed to get label with error %s', err.message);
  }
}
// [END apps_script_drive_labels_get_label]

// [START apps_script_drive_labels_list_labels_on_drive_item]
/**
 * List Labels on a Drive Item
 * Fetches a Drive Item and prints all applied values along with their to their
 * human-readable names.
 *
 * @param {string} fileId The Drive File ID
 */
function listLabelsOnDriveItem(fileId) {
  try {
    const appliedLabels = Drive.Files.listLabels(fileId);

    console.log('%d label(s) are applied to this file', appliedLabels.items.length);

    appliedLabels.items.forEach((appliedLabel) => {
      // Resource name of the label at the applied revision.
      const labelName = 'labels/' + appliedLabel.id + '@' + appliedLabel.revisionId;

      console.log('Fetching Label: %s', labelName);
      const label = DriveLabels.Labels.get(labelName, {view: 'LABEL_VIEW_FULL'});

      console.log('Label Title: %s', label.properties.title);

      Object.keys(appliedLabel.fields).forEach((fieldId) => {
        const fieldValue = appliedLabel.fields[fieldId];
        const field = label.fields.find((f) => f.id == fieldId);

        console.log(`Field ID: ${field.id}, Display Name: ${field.properties.displayName}`);
        switch (fieldValue.valueType) {
          case 'text':
            console.log('Text: %s', fieldValue.text[0]);
            break;
          case 'integer':
            console.log('Integer: %d', fieldValue.integer[0]);
            break;
          case 'dateString':
            console.log('Date: %s', fieldValue.dateString[0]);
            break;
          case 'user':
            const user = fieldValue.user.map((user) => {
              return `${user.emailAddress}: ${user.displayName}`;
            }).join(', ');
            console.log(`User: ${user}`);
            break;
          case 'selection':
            const choices = fieldValue.selection.map((choiceId) => {
              return field.selectionOptions.choices.find((choice) => choice.id === choiceId);
            });
            const selection = choices.map((choice) => {
              return `${choice.id}: ${choice.properties.displayName}`;
            }).join(', ');
            console.log(`Selection: ${selection}`);
            break;
          default:
            console.log('Unknown: %s', fieldValue.valueType);
            console.log(fieldValue.value);
        }
      });
    });
  } catch (err) {
    // TODO (developer) - Handle exception
    console.log('Failed with error %s', err.message);
  }
}
// [END apps_script_drive_labels_list_labels_on_drive_item]
