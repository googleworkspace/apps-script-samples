/**
 * Export the hash values stored in Google Sheets to Text file 
 */

// add the function to Google Sheets menu
function onOpen() {
  var thisSS = SpreadsheetApp.getActiveSpreadsheet(); // get active Spreadsheet
   var myFs = [
     {name: "Export hash (.txt)", functionName: "exportHashToText"}, // Option to export Hash and File location
     {name: "Export filename (.txt)", functionName: "exportFilenameToText"}, // Option to export only file location
   ];
   thisSS.addMenu("Extra Custom Tools", myFs); 
}

// get Data in sorted form from the sheet
function getData(){
  var thisSS = SpreadsheetApp.getActiveSpreadsheet(); // get active Spreadsheet
  var currSheet = thisSS.getActiveSheet(); // get the active sheet name
  var range = currSheet.getRange("A:B"); // select columns containing the hash value and path
  range.sort(2); // Sorts by the values in the second column (B)
  return currSheet.getDataRange().getValues(); // return the values in the sheet
}

// Save data to a text file
function saveToTextFile(text){
  var myName = Browser.inputBox("The file named here will be appeared in your Docs list.", Browser.Buttons.OK_CANCEL);
  if (myName == "cancel"){
  } else {
    DriveApp.createFile(myName + ".txt", text);
  }
}

// Get Hash values and file path from the sheet
function exportHashToText(){
  var data = getData(); // get Data in sorted form from the sheet function

  var text = data.map(function (row) {
    if(row[0]==""){
      hash_val='--------------------------------';
    }else{
      hash_val=row[0];
    }
    return hash_val + "\t" + row[1];
  }).join('\n'); // join the values of data

  saveToTextFile(text); // Save data to a text file function
}

// Get file path from the sheet
function exportFilenameToText(){
  var data = getData(); // get Data in sorted form from the sheet function

  var text = data.map(function (row) {
    return row[1];
  }).join('\n'); // join the values of data

  saveToTextFile(text); // Save data to a text file function
}