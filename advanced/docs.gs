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

// [START apps_script_docs_create_document]
/**
 * Create a new document.
 */
function createDocument() {
  var document = Docs.Documents.create({'title': 'My New Document'});
  Logger.log('Created document with ID: ' + document.documentId);
}
// [END apps_script_docs_create_document]

// [START apps_script_docs_find_and_replace]
/**
 * Performs "replace all".
 * @param {string} documentId The document to perform the replace text
 *     operations on.
 * @param {Object} findTextToReplacementMap A map from the "find text" to the
 *     "replace text".
 */
function findAndReplace(documentId, findTextToReplacementMap) {
  var requests = [];
  for (var findText in findTextToReplacementMap) {
    var replaceText = findTextToReplacementMap[findText];
    var request = {
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

  var response = Docs.Documents.batchUpdate({'requests': requests}, documentId);
  var replies = response.replies;
  for (var i = 0; i < replies.length; i++) {
    var reply = replies[i];
    var numReplacements = reply.replaceAllText.occurrencesChanged || 0;
    Logger.log('Request %s performed %s replacements.', i, numReplacements);
  }
}
// [END apps_script_docs_find_and_replace]

// [START apps_script_docs_insert_and_style_text]
/**
 * Insert text at the beginning of the document and then style the inserted
 * text.
 * @param {string} documentId The document the text is inserted into.
 * @param {string} text The text to insert into the document.
 */
function insertAndStyleText(documentId, text) {
  var requests = [{
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
      text_style: {
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
  Docs.Documents.batchUpdate({'requests': requests}, documentId);
}
// [END apps_script_docs_insert_and_style_text]

// [START apps_script_docs_read_first_paragraph]
/**
 * Read the first paragraph of the body of a document.
 * @param {string} documentId The ID of the document to read.
 */
function readFirstParagraph(documentId) {
  var document = Docs.Documents.get(documentId);
  var bodyElements = document.body.content;

  for (var i = 0; i < bodyElements.length; i++) {
    var structuralElement = bodyElements[i];
    if (structuralElement.paragraph !== null) {
      var paragraphElements = structuralElement.paragraph.elements;
      var paragraphText = '';

      for (var j = 0; j < paragraphElements.length; j++) {
        var paragraphElement = paragraphElements[j];
        if (paragraphElement.textRun !== null) {
          paragraphText += paragraphElement.textRun.content;
        }
      }

      Logger.log(paragraphText);
      return;
    }
  }
}
// [END apps_script_docs_read_first_paragraph]
