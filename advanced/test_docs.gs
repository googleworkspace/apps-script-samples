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
// TODO (developer) - Replace with your documentId
const documentId='1EaLpBfuo3bMUeP6_P34auuQroh3bCWi6hLDppY6J6us';
/**
 * A simple exists assertion check. Expects a value to exist. Errors if DNE.
 * @param {any} value A value that is expected to exist.
 */
function expectToExist(value) {
  if (!value) {
    console.log('DNE');
    return;
  }
  console.log('TEST: Exists');
}

/**
 * A simple exists assertion check for primatives (no nested objects).
 * Expects actual to equal expected. Logs the output.
 * @param {any} expected The actual value.
 * @param {any} actual  The expected value.
 */
function expectToEqual(expected, actual) {
  if (actual !== expected) {
    console.log('TEST: actual: %s = expected: %s', actual, expected);
    return;
  }
  console.log('TEST: actual: %s = expected: %s', actual, expected);
}


/**
 * Runs all tests.
 */
function RUN_ALL_TESTS() {
  itShouldCreateDocument();
  itShouldInsertTextWithStyle();
  itShouldReplaceText();
  itShouldReadFirstParagraph();
}

/**
 * Creates a presentation.
 */
function itShouldCreateDocument() {
  const documentId = createDocument();
  expectToExist(documentId);
  deleteFileOnCleanup(documentId);
}


/**
 * Insert text with style.
 */
function itShouldInsertTextWithStyle() {
  const documentId = createDocument();
  expectToExist(documentId);
  const text='This is the sample document';
  const replies=insertAndStyleText(documentId, text);
  expectToEqual(2, replies.length);
  deleteFileOnCleanup(documentId);
}

/**
 * Find and Replace the text.
 */
function itShouldReplaceText() {
  const documentId = createDocument();
  expectToExist(documentId);
  const text='This is the sample document';
  const response=insertAndStyleText(documentId, text);
  expectToEqual(2, response.replies.length);
  const findTextToReplacementMap={'sample': 'test', 'document': 'Doc'};
  const replies=findAndReplace(documentId, findTextToReplacementMap);
  expectToEqual(2, replies.length);
  deleteFileOnCleanup(documentId);
}

/**
 * Read first paragraph
 */
function itShouldReadFirstParagraph() {
  const paragraphText=readFirstParagraph(documentId);
  expectToExist(paragraphText);
  expectToEqual(89, paragraphText.length);
}
/**
 * Delete the file
 * @param {string} id Document ID
 */
function deleteFileOnCleanup(id) {
  Drive.Files.remove(id);
}
