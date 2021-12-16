// [START apps_script_api_execute]
/**
 * Return the set of folder names contained in the user's root folder as an
 * object (with folder IDs as keys).
 * @return {Object} A set of folder names keyed by folder ID.
 */
function getFoldersUnderRoot() {
  const root = DriveApp.getRootFolder();
  const folders = root.getFolders();
  const folderSet = {};
  while (folders.hasNext()) {
    const folder = folders.next();
    folderSet[folder.getId()] = folder.getName();
  }
  return folderSet;
}
// [END apps_script_api_execute]
