/**
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** 
 * This file contains functions that create the template and sample documents.
 */

/**
 * Runs full setup configuration, with option to include samples.
 * 
 * Called from menu & setupWithSamples()
 * 
 * @param {boolean} includeSamples - Optional, if true creates samples files. * 
 */
function setupConfig(includeSamples) {

  // Gets folder to store documents in.
  const folder = getFolderByName_(PROJECT_FOLDER_NAME)

  let msg =
    `\nDrive Folder for Documents: '${PROJECT_FOLDER_NAME}'
   \nURL: \n${folder.getUrl()}`

  // Creates sample documents for testing.
  // Remove sample document creation and add your own process as needed.
  if (includeSamples) {
    let filesCreated = 0;
    for (let doc of samples.documents) {
      filesCreated += createGoogleDoc(doc, folder, true);
    }
    msg += `\n\nFiles Created: ${filesCreated}`
  }
  const ui = DocumentApp.getUi();
  ui.alert(`${APP_TITLE} [Setup]`, msg, ui.ButtonSet.OK);

}

/**
 * Creates a single document instance in the application folder.
 * Includes import settings already created [Heading | Keywords | Table]
 * 
 * Called from menu. 
 */
function createSampleFile() {

  // Creates a new Google Docs document.
  const templateName = `[Template] ${APP_TITLE}`;
  const doc = DocumentApp.create(templateName);
  const docId = doc.getId();

  const msg = `\nDocument created: '${templateName}'
  \nURL: \n${doc.getUrl()}`

  // Adds template content to the body.
  const body = doc.getBody();

  body.setText(templateName);
  body.getParagraphs()[0].setHeading(DocumentApp.ParagraphHeading.TITLE);
  body.appendParagraph('Description').setHeading(DocumentApp.ParagraphHeading.HEADING1);
  body.appendParagraph('');

  const dateString = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'MMMM dd, yyyy');
  body.appendParagraph(`${FIND_TEXT_KEYWORDS} - ${dateString}`).setHeading(APP_STYLE);
  body.appendTable().appendTableRow().appendTableCell('TL;DR');
  body.appendParagraph("");

  // Gets folder to store documents in.
  const folder = getFolderByName_(PROJECT_FOLDER_NAME)

  // Moves document to application folder.
  DriveApp.getFileById(docId).moveTo(folder);

  const ui = DocumentApp.getUi();
  ui.alert(`${APP_TITLE} [Template]`, msg, ui.ButtonSet.OK);
}

/**
 * Configures application for demonstration by setting it up with sample documents.
 * 
 * Called from menu | Calls setupConfig with option set to true. 
 */
function setupWithSamples() {
  setupConfig(true)
}

/** 
 * Sample document names and demo content. 
 * {object} samples[]
*/
const samples = {
  'documents': [
    {
      'name': 'Project GHI',
      'description': 'Google Workspace Add-on inventory review.',
      'content': 'Reviewed all of the currently in-use and proposed Google Workspace Add-ons. Will perform an assessment on how we can reduce overlap, reduce licensing costs, and limit security exposures. \n\nNext week\'s goal is to report findings back to the Corp Ops team.'
    },
    {
      'name': 'Project DEF',
      'description': 'Improve IT networks within the main corporate building.',
      'content': 'Primarily focused on 2nd thru 5th floors in the main corporate building evaluating the network infrastructure. Benchmarking tests were performed and results are being analyzed. \n\nWill submit all findings, analysis, and recommendations next week for committee review.'
    },
    {
      'name': 'Project ABC',
      'description': 'Assess existing Google Chromebook inventory and recommend upgrades where necessary.',
      'content': 'Concluded a pilot program with the Customer Service department to perform inventory and update inventory records with Chromebook hardware, Chrome OS versions, and installed apps. \n\nScheduling a work plan and seeking necessary go-forward approvals for next week.'
    },
  ],
  'common': 'This sample document is configured to work with the Import summaries custom menu. For the import to work, the source documents used must contain a specific keyword (currently set to "Summary"). The keyword must reside in a paragraph with a set style (currently set to "Heading 3") that is directly followed by a single-cell table. The table contains the contents to be imported into the primary document.\n\nWhile those rules might seem precise, it\'s how the application programmatically determines what content is meant to be imported and what can be ignored. Once a summary has been imported, the script updates the heading font to a new color (currently set to Green, hex \'#2e7d32\') to ensure the app ignores it in future imports. You can change these settings in the Apps Script code.'
}

/**
 * Creates a sample document in application folder.
 * Includes import settings already created [Heading | Keywords | Table].
 * Inserts demo data from samples[].
 * 
 * Called from menu. 
 */
function createGoogleDoc(document, folder, duplicate) {

  // Checks for duplicates.
  if (!duplicate) {
    // Doesn't create file of same name if one already exists.
    if (folder.getFilesByName(document.name).hasNext()) {
      return 0 // File not created.
    }
  }

  // Creates a new Google Docs document.
  const doc = DocumentApp.create(document.name).setName(document.name);
  const docId = doc.getId();

  // Adds boilerplate content to the body.
  const body = doc.getBody();

  body.setText(document.name);
  body.getParagraphs()[0].setHeading(DocumentApp.ParagraphHeading.TITLE);
  body.appendParagraph("Description").setHeading(DocumentApp.ParagraphHeading.HEADING1);
  body.appendParagraph(document.description);
  body.appendParagraph("Usage Instructions").setHeading(DocumentApp.ParagraphHeading.HEADING1);
  body.appendParagraph(samples.common);

  const dateString = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'MMMM dd, yyyy');
  body.appendParagraph(`${FIND_TEXT_KEYWORDS} - ${dateString}`).setHeading(APP_STYLE);
  body.appendTable().appendTableRow().appendTableCell(document.content);
  body.appendParagraph("");

  // Moves document to application folder.
  DriveApp.getFileById(docId).moveTo(folder);

  // Returns if successfully created.
  return 1
}