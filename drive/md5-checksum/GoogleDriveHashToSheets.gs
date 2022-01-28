/**
 * Get the hash values of files in Google Drive and store it in Google Sheets
 */

function driveHash() {
  var folderId="<folderID>"; // Null for root Directory or set Folder ID: https://drive.google.com/drive/folders/<folderID>?usp=sharing
  var sheetName="Sheet1";  // Name of the sheet
  var sheetId="<sheetID>" // Google Sheets ID: https://docs.google.com/spreadsheets/d/<sheetID>/edit#gid=0
  var rootPattern=".";
  var pathPattern="\\" // "\\" for "\" and "/" for "/"
  if(folderId!=""){
    var folder=DriveApp.getFolderById(folderId); // retrive folder by folder ID if not Null
  }
  var ss = SpreadsheetApp.openById(sheetId); // retrive Spreadsheet by Spreadsheet ID
  SpreadsheetApp.setActiveSpreadsheet(ss); // get active Spreadsheet
  var sheet = ss.getSheetByName(sheetName); // get Sheet by Sheet name in the Spreadsheet
  sheet.clear(); // clear all data
  listFolders(DriveApp,sheet,folder,rootPattern,pathPattern);
}

// recursive function to get hash values of all files and subdirectories 
function listFolders(dApp,sheet,folder,path,pathPattern) {
  folder = folder || dApp.getRootFolder(); // get the folder passed in arguments else start from root Directory
  var files = folder.getFiles(); // get files in present folder

  while ( files.hasNext() ) { 
    file=files.next()
    md5_val=Drive.Files.get(file.getId())['md5Checksum']; // retrive MD5 hash from the file properties calculated by Google Drive
    full_path=path+pathPattern+file.getName(); // retrive the path to the file
    sheet.appendRow([md5_val, full_path]); // store the full path and hash value in Google Sheets
    // Logger.log(md5_val + "\t" + full_path);
  }

  var subfolders = folder.getFolders(); // retrive subfolders to iterate over nested folders and files
  while (subfolders.hasNext()) {
    subfolder=subfolders.next();
    listFolders(dApp,sheet,subfolder,path+pathPattern+subfolder.getName(),pathPattern); // recursive function to get hash values of all files and subdirectories 
  }
}