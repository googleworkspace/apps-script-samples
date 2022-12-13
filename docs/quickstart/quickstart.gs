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
// [START docs_quickstart]
/**
 * Prints the title of the sample document:
 * https://docs.google.com/document/d/195j9eDD3ccgjQRttHhJPymLJUCOUjs-jmwTrekvdjFE/edit
 * @see https://developers.google.com/docs/api/reference/rest/v1/documents/get
 */
function printDocTitle() {
  const documentId = '195j9eDD3ccgjQRttHhJPymLJUCOUjs-jmwTrekvdjFE';
  try {
    // Get the document using document id
    const doc = Docs.Documents.get(documentId);
    // Log the title  of document.
    console.log('The title of the doc is: %s', doc.title);
  } catch (err) {
    // TODO (developer) - Handle exception from Docs API
    console.log('Failed to found document with an error %s', err.message);
  }
}
// [END docs_quickstart]
