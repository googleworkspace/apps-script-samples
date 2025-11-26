/**
 * Copyright 2025 Google LLC
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

const classificationLabels = {
  "action-required": {
    name: "🚨 Action Required",
    textColor: "#ffffff",
    backgroundColor: "#1c4587",
  },
  "needs-response": {
    name: "↪️ Needs Response",
    textColor: "#ffffff",
    backgroundColor: "#16a765",
  },
  "for-your-info": {
    name: "ℹ️ For Your Info",
    textColor: "#000000",
    backgroundColor: "#fad165",
  },
};

/**
 * Creates Gmail labels based on the classification labels defined in the `classificationLabels` object.
 * If a label already exists, it updates the color. Otherwise, it creates a new label.
 * After creating or updating labels, it logs a message to the console and returns the homepage card.
 * @returns {!CardService.Card} The homepage card.
 */
function createLabels() {
  for (const labelName in classificationLabels) {
    const classificationLabel = classificationLabels[labelName];
    const { name, textColor, backgroundColor } = classificationLabel;
    let gmailLabel = GmailApp.getUserLabelByName(name);

    if (!gmailLabel) {
      gmailLabel = GmailApp.createLabel(name);
      Gmail.Users.Labels.update(
        {
          name: name,
          color: {
            textColor: textColor,
            backgroundColor: backgroundColor,
          },
        },
        "me",
        fetchLabelId(name),
      );
    }

    classificationLabel.gmailLabel = gmailLabel;
  }

  console.log("Labels created.");
  return buildHomepageCard();
}

/**
 * Checks if all classification labels exist in Gmail.
 * @returns {boolean} True if all labels exist, false otherwise.
 */
function labelsCreated() {
  for (const labelName in classificationLabels) {
    const { name } = classificationLabels[labelName];
    const gmailLabel = GmailApp.getUserLabelByName(name);

    if (!gmailLabel) {
      return false;
    }
  }

  return true;
}

/**
 * Fetches the ID of a Gmail label by its name.
 * @param {string} name The name of the label.
 * @returns {string} The ID of the label.
 */
function fetchLabelId(name) {
  return Gmail.Users.Labels.list("me").labels.find((_) => _.name === name).id;
}

/**
 * Removes all classification labels from Gmail.
 * After removing labels, it logs a message to the console and returns the homepage card.
 * @returns {!CardService.Card} The homepage card.
 */
function removeLabels() {
  for (const labelName in classificationLabels) {
    const classificationLabel = classificationLabels[labelName];
    const gmailLabel = GmailApp.getUserLabelByName(classificationLabel.name);

    if (gmailLabel) {
      gmailLabel.deleteLabel();
      classificationLabel.gmailLabel = undefined;
    }
  }
  console.log("Labels removed.");
  return buildHomepageCard();
}
