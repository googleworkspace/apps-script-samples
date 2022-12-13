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

// [START docs_create_document]
/**
 * Create a new document.
 * @see https://developers.google.com/docs/api/reference/rest/v1/documents/create
 * @return {string} documentId
 */
function createDocument() {
  try {
    // Create document with title
    const document = Docs.Documents.create({'title': 'My New Document'});
    console.log('Created document with ID: ' + document.documentId);
    return document.documentId;
  } catch (e) {
    // TODO (developer) - Handle exception
    console.log('Failed with error %s', e.message);
  }
}
// [END docs_create_document]

// [START docs_find_and_replace_text]
/**
 * Performs "replace all".
 * @param {string} documentId The document to perform the replace text operations on.
 * @param {Object} findTextToReplacementMap A map from the "find text" to the "replace text".
 * @return {Object} replies
 * @see https://developers.google.com/docs/api/reference/rest/v1/documents/batchUpdate
 */
function findAndReplace(documentId, findTextToReplacementMap) {
  const requests = [];
  for (const findText in findTextToReplacementMap) {
    const replaceText = findTextToReplacementMap[findText];
    const request = {
      replaceAllText: {
        containsText: {
          text: findText,
          matchCase: true
        },
        replaceText: replaceText
      }
    };
    requests.push(request);
  }
  try {
    const response = Docs.Documents.batchUpdate({'requests': requests}, documentId);
    const replies = response.replies;
    for (const [index] of replies.entries()) {
      const numReplacements = replies[index].replaceAllText.occurrencesChanged || 0;
      console.log('Request %s performed %s replacements.', index, numReplacements);
    }
    return replies;
  } catch (e) {
    // TODO (developer) - Handle exception
    console.log('Failed with error : %s', e.message);
  }
}
// [END docs_find_and_replace_text]

// [START docs_insert_and_style_text]
/**
 * Insert text at the beginning of the document and then style the inserted
 * text.
 * @param {string} documentId The document the text is inserted into.
 * @param {string} text The text to insert into the document.
 * @return {Object} replies
 * @see https://developers.google.com/docs/api/reference/rest/v1/documents/batchUpdate
 */
function insertAndStyleText(documentId, text) {
  const requests = [{
    insertText: {
      location: {
        index: 1
      },
      text: text
    }
  },
  {
    updateTextStyle: {
      range: {
        startIndex: 1,
        endIndex: text.length + 1
      },
      textStyle: {
        fontSize: {
          magnitude: 12,
          unit: 'PT'
        },
        weightedFontFamily: {
          fontFamily: 'Calibri'
        }
      },
      fields: 'weightedFontFamily, fontSize'
    }
  }];
  try {
    const response =Docs.Documents.batchUpdate({'requests': requests}, documentId);
    return response.replies;
  } catch (e) {
    // TODO (developer) - Handle exception
    console.log('Failed with an error %s', e.message);
  }
}
// [END docs_insert_and_style_text]

// [START docs_read_first_paragraph]
/**
 * Read the first paragraph of the body of a document.
 * @param {string} documentId The ID of the document to read.
 * @return {Object} paragraphText
 * @see https://developers.google.com/docs/api/reference/rest/v1/documents/get
 */
function readFirstParagraph(documentId) {
  try {
    // Get the document using document ID
    const document = Docs.Documents.get(documentId);
    const bodyElements = document.body.content;
    for (let i = 0; i < bodyElements.length; i++) {
      const structuralElement = bodyElements[i];
      // Print the first paragraph text present in document
      if (structuralElement.paragraph) {
        const paragraphElements = structuralElement.paragraph.elements;
        let paragraphText = '';

        for (let j = 0; j < paragraphElements.length; j++) {
          const paragraphElement = paragraphElements[j];
          if (paragraphElement.textRun !== null) {
            paragraphText += paragraphElement.textRun.content;
          }
        }
        console.log(paragraphText);
        return paragraphText;
      }
    }
  } catch (e) {
    // TODO (developer) - Handle exception
    console.log('Failed with error %s', e.message);
  }
}
// [END docs_read_first_paragraph]
