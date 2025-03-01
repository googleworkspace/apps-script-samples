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
      name: 'google_logo.png',
      mimeType: 'image/png'
    };
    // Create a file in the user's Drive.
    file = Drive.Files.create(file, image, {'fields': 'id,size'});
    console.log('ID: %s, File size (bytes): %s', file.id, file.size);
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
        pageSize: 100,
        pageToken: pageToken
      });
      if (!folders.files || folders.files.length === 0) {
        console.log('All folders found.');
        return;
      }
      for (let i = 0; i < folders.files.length; i++) {
        const folder = folders.files[i];
        console.log('%s (ID: %s)', folder.name, folder.id);
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
 * Adds a custom app property to a file. Unlike Apps Script's DocumentProperties,
 * Drive's custom file properties can be accessed outside of Apps Script and
 * by other applications; however, appProperties are only visible to the script.
 * @param {string} fileId The ID of the file to add the app property to.
 */
function addAppProperty(fileId) {
  try {
    let file = {
      'appProperties': {
        'department': 'Sales'
      }
    };
    // Updates a file to add an app property.
    file = Drive.Files.update(file, fileId, null, {'fields': 'id,appProperties'});
    console.log(
        'ID: %s, appProperties: %s',
        file.id,
        JSON.stringify(file.appProperties, null, 2));
  } catch (err) {
    // TODO (developer) - Handle exception
    console.log('Failed with error %s', err.message);
  }
}
// [END drive_add_custom_property]

// [START drive_list_revisions]
/**
 * Lists the revisions of a given file.
 * @param {string} fileId The ID of the file to list revisions for.
 */
function listRevisions(fileId) {
  let revisions;
  const pageToken = null;
  do {
    try {
      revisions = Drive.Revisions.list(
          fileId,
          {'fields': 'revisions(modifiedTime,size),nextPageToken'});
      if (!revisions.revisions || revisions.revisions.length === 0) {
        console.log('All revisions found.');
        return;
      }
      for (let i = 0; i < revisions.revisions.length; i++) {
        const revision = revisions.revisions[i];
        const date = new Date(revision.modifiedTime);
        console.log('Date: %s, File size (bytes): %s', date.toLocaleString(),
            revision.size);
      }
      pageToken = revisions.nextPageToken;
    } catch (err) {
      // TODO (developer) - Handle exception
      console.log('Failed with error %s', err.message);
    }
  } while (pageToken);
}

// [END drive_list_revisions]
