/**
 * Lists the names and IDs of up to 10 files.
 */
function listFiles() {
  var files = Drive.Files.list({
    fields: "nextPageToken, files(id, name)",
    pageSize: 10
  }).files;
  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    Logger.log('%s (%s)', file.name, file.id);
  }
}
