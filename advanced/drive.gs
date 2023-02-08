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

// [START drive_upload_file]
/**
 * Uploads a new file to the user's Drive.
 */
function uploadFile() {
  try {
    // Makes a request to fetch a URL.
    const image = UrlFetchApp.fetch('http://goo.gl/nd7zjB').getBlob();
    let file = {
      title: 'google_logo.png',
      mimeType: 'image/png'
    };
    // Insert new files to user's Drive
    file = Drive.Files.insert(file, image);
    console.log('ID: %s, File size (bytes): %s', file.id, file.fileSize);
  } catch (err) {
    // TODO (developer) - Handle exception
    console.log('Failed to upload file with error %s', err.message);
  }
}
// [END drive_upload_file]

// [START drive_list_root_folders]
/**
 * Lists the top-level folders in the user's Drive.
 */
function listRootFolders() {
  const query = '"root" in parents and trashed = false and ' +
    'mimeType = "application/vnd.google-apps.folder"';
  let folders;
  let pageToken = null;
  do {
    try {
      folders = Drive.Files.list({
        q: query,
        maxResults: 100,
        pageToken: pageToken
      });
      if (!folders.items || folders.items.length === 0) {
        console.log('No folders found.');
        return;
      }
      for (let i = 0; i < folders.items.length; i++) {
        const folder = folders.items[i];
        console.log('%s (ID: %s)', folder.title, folder.id);
      }
      pageToken = folders.nextPageToken;
    } catch (err) {
      // TODO (developer) - Handle exception
      console.log('Failed with error %s', err.message);
    }
  } while (pageToken);
}
// [END drive_list_root_folders]

// [START drive_add_custom_property]
/**
 * Adds a custom property to a file. Unlike Apps Script's DocumentProperties,
 * Drive's custom file properties can be accessed outside of Apps Script and
 * by other applications (if the visibility is set to PUBLIC).
 * @param {string} fileId The ID of the file to add the property to.
 */
function addCustomProperty(fileId) {
  try {
    const property = {
      key: 'department',
      value: 'Sales',
      visibility: 'PUBLIC'
    };
    // Adds a property to a file
    Drive.Properties.insert(property, fileId);
  } catch (err) {
    // TODO (developer) - Handle exception
    console.log('Failed with error %s', err.message);
  }
}
// [END drive_add_custom_property]

// [START drive_list_revisions]
/**
 * Lists the revisions of a given file. Note that some properties of revisions
 * are only available for certain file types. For example, Google Workspace
 * application files do not consume space in Google Drive and thus list a file
 * size of 0.
 * @param {string} fileId The ID of the file to list revisions for.
 */
function listRevisions(fileId) {
  try {
    const revisions = Drive.Revisions.list(fileId);
    if (!revisions.items || revisions.items.length === 0) {
      console.log('No revisions found.');
      return;
    }
    for (let i = 0; i < revisions.items.length; i++) {
      const revision = revisions.items[i];
      const date = new Date(revision.modifiedDate);
      console.log('Date: %s, File size (bytes): %s', date.toLocaleString(),
          revision.fileSize);
    }
  } catch (err) {
    // TODO (developer) - Handle exception
    console.log('Failed with error %s', err.message);
  }
}

// [END drive_list_revisions]
