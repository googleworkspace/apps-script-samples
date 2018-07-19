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
// [START apps_script_drive_upload_file]
/**
 * Uploads a new file to the user's Drive.
 */
function uploadFile() {
  var image = UrlFetchApp.fetch('http://goo.gl/nd7zjB').getBlob();
  var file = {
    title: 'google_logo.png',
    mimeType: 'image/png',
  };
  file = Drive.Files.insert(file, image);
  Logger.log('ID: %s, File size (bytes): %s', file.id, file.fileSize);
}
// [END apps_script_drive_upload_file]

// [START apps_script_drive_list_root_folders]
/**
 * Lists the top-level folders in the user's Drive.
 */
function listRootFolders() {
  var query = '"root" in parents and trashed = false and ' +
      'mimeType = "application/vnd.google-apps.folder"';
  var folders;
  var pageToken;
  do {
    folders = Drive.Files.list({
      q: query,
      maxResults: 100,
      pageToken: pageToken,
    });
    if (folders.items && folders.items.length > 0) {
      for (var i = 0; i < folders.items.length; i++) {
        var folder = folders.items[i];
        Logger.log('%s (ID: %s)', folder.title, folder.id);
      }
    } else {
      Logger.log('No folders found.');
    }
    pageToken = folders.nextPageToken;
  } while (pageToken);
}
// [END apps_script_drive_list_root_folders]

// [START apps_script_drive_add_custom_property]
/**
 * Adds a custom property to a file. Unlike Apps Script's DocumentProperties,
 * Drive's custom file properties can be accessed outside of Apps Script and by
 * other applications (if the visibility is set to PUBLIC).
 * @param {string} fileId The ID of the file to add the property to.
 */
function addCustomProperty(fileId) {
  var property = {
    key: 'department',
    value: 'Sales',
    visibility: 'PUBLIC',
  };
  Drive.Properties.insert(property, fileId);
}
// [END apps_script_drive_add_custom_property]

// [START apps_script_drive_list_revisions]
/**
 * Lists the revisions of a given file. Note that some properties of revisions
 * are only available for certain file types. For example, G Suite application
 * files do not consume space in Google Drive and thus list a file size of 0.
 * @param {string} fileId The ID of the file to list revisions for.
 */
function listRevisions(fileId) {
  var revisions = Drive.Revisions.list(fileId);
  if (revisions.items && revisions.items.length > 0) {
    for (var i = 0; i < revisions.items.length; i++) {
      var revision = revisions.items[i];
      var date = new Date(revision.modifiedDate);
      Logger.log('Date: %s, File size (bytes): %s', date.toLocaleString(),
          revision.fileSize);
    }
  } else {
    Logger.log('No revisions found.');
  }
}
// [END apps_script_drive_list_revisions]
