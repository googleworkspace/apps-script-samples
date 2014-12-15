/**
 * Serves HTML of the application for HTTP GET requests.
 * If folderId is provided as a URL parameter, the web app will list
 * the contents of that folder (if permissions allow). Otherwise
 * the web app will list the contents of the root folder.
 *
 * @param {Object} e event parameter that can contain information
 *     about any URL parameters provided.
 */
function doGet(e) {
  var template = HtmlService.createTemplateFromFile('Index');

  // Retrieve and process any URL parameters, as necessary.
  if (e.parameter.folderId) {
    template.folderId = e.parameter.folderId;
  } else {
    template.folderId = 'root';
  }

  // Build and return HTML in IFRAME sandbox mode.
  return template.evaluate()
      .setTitle('Web App Window Title')
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
}

/**
 * Return an array of up to 20 filenames contained in the
 * folder previously specified (or the root folder by default).
 *
 * @param {String} folderId String ID of folder whose contents
 *     are to be retrieved; if this is 'root', the
 *     root folder is used.
 * @return {Object} list of content filenames, along with
 *     the root folder name.
 */
function getFolderContents(folderId) {
  var topFolder;
  var contents = {
      children: []
  };

  if (folderId == 'root') {
    topFolder = DriveApp.getRootFolder();
  } else {
    // May throw exception if the folderId is invalid or app
    // doesn't have permission to access.
    topFolder = DriveApp.getFolderById(folderId);
  }
  contents.rootName = topFolder.getName() + '/';

  var files = topFolder.getFiles();
  var numFiles = 0;
  while (files.hasNext() && numFiles < 20) {
   var file = files.next();
   contents.children.push(file.getName());
   numFiles++;
  }

  return contents;
}
