/**
 * Uploads a new file to the user's Drive.
 */
// [START uploadFile]
function uploadFile() {
  var image = UrlFetchApp.fetch('http://goo.gl/nd7zjB').getBlob();
  var file = {
    title: 'google_logo.png',
    mimeType: 'image/png'
  };
  file = Drive.Files.insert(file, image);
  Logger.log('ID: %s, File size (bytes): %s', file.id, file.fileSize);
}
// [END uploadFile]

/**
 * Lists the top-level folders in the user's Drive.
 */
// [START listRootFolders]
function listRootFolders() {
  var query = '"root" in parents and trashed = false and ' +
      'mimeType = "application/vnd.google-apps.folder"';
  var folders, pageToken;
  do {
    folders = Drive.Files.list({
      q: query,
      maxResults: 100,
      pageToken: pageToken
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
// [END listRootFolders]

/**
 * Adds a custom property to a file. Unlike Apps Script's DocumentProperties,
 * Drive's custom file properties can be accessed outside of Apps Script and by
 * other applications (if the visibility is set to PUBLIC).
 * @param {string} fileId The ID of the file to add the property to.
 */
// [START addCustomProperty]
function addCustomProperty(fileId) {
  var property = {
    key: 'department',
    value: 'Sales',
    visibility: 'PUBLIC'
  };
  Drive.Properties.insert(property, fileId);
}
// [END addCustomProperty]

/**
 * Lists the revisions of a given file. Note that some properties of revisions
 * are only available for certain file types. For example, G Suite application
 * files do not consume space in Google Drive and thus list a file size of 0.
 * @param {string} fileId The ID of the file to list revisions for.
 */
// [START listRevisions]
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
// [END listRevisions]
