// [START removeDuplicates]
function removeDuplicates() {
  // [START sheet]
  var sheet = SpreadsheetApp.getActiveSheet();
  var data = sheet.getDataRange().getValues();
  // [END sheet]
  // [START newData]
  var newData = new Array();
  // [END newData]
  for(i in data){
    var row = data[i];
    var duplicate = false;
    for(j in newData){
      if(row.join() == newData[j].join()){
        duplicate = true;
      }
    }
    // [START duplicate]
    if(!duplicate){
      newData.push(row);
    }
    // [END duplicate]
  }
  // [START clear]
  sheet.clearContents();
  sheet.getRange(1, 1, newData.length, newData[0].length).setValues(newData);
  // [END clear]
}
// [END removeDuplicates]
