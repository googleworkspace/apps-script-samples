// To learn how to use this script, refer to the documentation:
// https://developers.google.com/apps-script/samples/automations/aggregate-document-content

/*
Copyright 2022 Google LLC

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

/** 
 * This file containts the main application functions that import data from
 * summary documents into the body of the main document.
 */

// Application constants
const APP_TITLE = 'Document summary importer'; // Application name
const PROJECT_FOLDER_NAME = 'Project statuses'; // Drive folder for the source files.

// Below are the parameters used to identify which content to import from the source documents
// and which content has already been imported.
const FIND_TEXT_KEYWORDS = 'Summary'; // String that must be found in the heading above the table (case insensitive).
const APP_STYLE = DocumentApp.ParagraphHeading.HEADING3; // Style that must be applied to heading above the table.
const TEXT_COLOR = '#2e7d32'; // Color applied to heading after import to avoid duplication.

/**
 * Updates the main document, importing content from the source files.
 * Uses the above parameters to locate content to be imported.
 * 
 * Called from menu option.
 */
function performImport() {
  // Gets the folder in Drive associated with this application.
  const folder = getFolderByName_(PROJECT_FOLDER_NAME);
  // Gets the Google Docs files found in the folder. 
  const files = getFiles(folder);

  // Warns the user if the folder is empty.
  const ui = DocumentApp.getUi();
  if (files.length === 0) {
    const msg =
      `No files found in the folder '${PROJECT_FOLDER_NAME}'.
      Run '${MENU.SETUP}' | '${MENU.SAMPLES}' from the menu
      if you'd like to create samples files.`
    ui.alert(APP_TITLE, msg, ui.ButtonSet.OK);
    return;
  }

  /** Processes main document */
  // Gets the active document and body section.
  const docTarget = DocumentApp.getActiveDocument();
  const docTargetBody = docTarget.getBody();

  // Appends import summary section to the end of the target document. 
  // Adds a horizontal line and a header with today's date and a title string.
  docTargetBody.appendHorizontalRule();
  const dateString = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'MMMM dd, yyyy');
  const headingText = `Imported: ${dateString}`;
  docTargetBody.appendParagraph(headingText).setHeading(APP_STYLE);
  // Appends a blank paragraph for spacing.
  docTargetBody.appendParagraph(" ");

  /** Process source documents */
  // Iterates through each source document in the folder.
  // Copies and pastes new updates to the main document.
  let noContentList = [];
  let numUpdates = 0;
  for (let id of files) {

    // Opens source document; get info and body.
    const docOpen = DocumentApp.openById(id);
    const docName = docOpen.getName();
    const docHtml = docOpen.getUrl();
    const docBody = docOpen.getBody();

    // Gets summary content from document and returns as object {content:content}
    const content = getContent(docBody);

    // Logs if document doesn't contain content to be imported.
    if (!content) {
      noContentList.push(docName);
      continue;
    }
    else {
      numUpdates++
      // Inserts content into the main document.
      // Appends a title/url reference link back to source document.
      docTargetBody.appendParagraph('').appendText(`${docName}`).setLinkUrl(docHtml);
      // Appends a single-cell table and pastes the content.
      docTargetBody.appendTable(content);
    }
    docOpen.saveAndClose()
  }
  /** Provides an import summary */
  docTarget.saveAndClose();
  let msg = `Number of documents updated: ${numUpdates}`
  if (noContentList.length != 0) {
    msg += `\n\nThe following documents had no updates:`
    for (let file of noContentList) {
      msg += `\n ${file}`;
    }
  }
  ui.alert(APP_TITLE, msg, ui.ButtonSet.OK);
}

/**
 * Updates the main document drawing content from source files.
 * Uses the parameters at the top of this file to locate content to import.
 * 
 * Called from performImport().
 */
function getContent(body) {

  // Finds the heading paragraph with matching style, keywords and !color.
  var parValidHeading;
  const searchType = DocumentApp.ElementType.PARAGRAPH;
  const searchHeading = APP_STYLE;
  let searchResult = null;

  // Gets and loops through all paragraphs that match the style of APP_STYLE.
  while (searchResult = body.findElement(searchType, searchResult)) {
    let par = searchResult.getElement().asParagraph();
    if (par.getHeading() == searchHeading) {
      // If heading style matches, searches for text string (case insensitive).
      let findPos = par.findText('(?i)' + FIND_TEXT_KEYWORDS);
      if (findPos !== null) {

        // If text color is green, then the paragraph isn't a new summary to copy.
        if (par.editAsText().getForegroundColor() != TEXT_COLOR) {
          parValidHeading = par;
        }
      }
    }
  }

  if (!parValidHeading) {
    return;
  } else {
    // Updates the heading color to indicate that the summary has been imported.     
    let style = {};
    style[DocumentApp.Attribute.FOREGROUND_COLOR] = TEXT_COLOR;
    parValidHeading.setAttributes(style);
    parValidHeading.appendText(" [Exported]");

    // Gets the content from the table following the valid heading.
    let elemObj = parValidHeading.getNextSibling().asTable();
    let content = elemObj.copy();

    return content;
  }
}

/**
 * Gets the IDs of the Docs files within the folder that contains source files.
 * 
 * Called from function performImport().
 */
function getFiles(folder) {
  // Only gets Docs files.
  const files = folder.getFilesByType(MimeType.GOOGLE_DOCS);
  let docIDs = [];
  while (files.hasNext()) {
    let file = files.next();
    docIDs.push(file.getId());
  }
  return docIDs;
}