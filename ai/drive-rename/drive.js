/*
Copyright 2024 Google LLC

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
 * Renames a file based on user selection / updates card.
 * 
 * @param {!Event} e Add-on event context
 * @return {!Card}
 */
function renameFile(e) {

  const newName = e.formInput.names
  const id = e.drive.activeCursorItem.id
  DriveApp.getFileById(id).setName(newName)

  const eUpdated =
  {
    hostApp: 'drive',
    drive:
    {
      selectedItems: [[Object]],
      activeCursorItem:
      {
        title: newName,
        id: id,
        iconUrl: e.drive.activeCursorItem.iconUrl,
        mimeType: e.drive.activeCursorItem.mimeType
      },
      commonEventObject: { hostApp: 'DRIVE', platform: 'WEB' },
      clientPlatform: 'web'
    }
  }

  return onCardUpdate(eUpdated)

}

/**
 * Redraws the same card to force AI to refresh its data.
 * 
 * @param {!Event} e Add-on event context
 * @return {!Card}
 */
function updateCard(e) {

  const id = e.drive.activeCursorItem.id

  const eConverted =
  {
    hostApp: 'drive',
    drive:
    {
      selectedItems: [[Object]],
      activeCursorItem:
      {
        title: DriveApp.getFileById(id).getName(),
        id: id,
        iconUrl: e.drive.activeCursorItem.iconUrl,
        mimeType: e.drive.activeCursorItem.mimeType
      },
      commonEventObject: { hostApp: 'DRIVE', platform: 'WEB' },
      clientPlatform: 'web'
    }
  }

  return onCardUpdate(eConverted)
}

/**
 * Fetches the body of given document, using DocumentApp.
 * 
 * @param {string} id The Google Document file ID.
 * @return {string} The body of the Google Document.
 */
function getDocumentBody(id) {

  var doc = DocumentApp.openById(id);
  var body = doc.getBody();
  var text = body.getText();

  return text;
}

/**
 * Fetches the body of given document, using DocsApi.
 * 
 * @param {string} id The Google Document file ID.
 * @return {string} The body of the Google Document.
 */
function getDocAPIBody(id) {

  // Call DOC API REST endpoint to get the file
  let url = `https://docs.googleapis.com/v1/documents/${id}`;

  var response = UrlFetchApp.fetch(url, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + ScriptApp.getOAuthToken(),
    },
    muteHttpExceptions: true
  });

  if (response.getResponseCode() !== 200) {
    throw new Error(`Drive API returned error \
    ${response.getResponseCode()} :\
     ${response.getContentText()}`);
  }

  let file = response.getContentText();
  let data = JSON.parse(file);

  return data.body.content;
}

/**
 * Sends the given document to the trash folder.
 * 
 * @param {!Event} e Add-on event context
 */
function moveFileToTrash(e) {

  const id = e.drive.activeCursorItem.id
  const file = DriveApp.getFileById(id);
  file.setTrashed(true);
}