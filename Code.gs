function myFunction() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var bfeRange = ss.getRange("Raw BFE!D6:I").getValues();
  var trackerSheet = ss.getSheetByName("Tracker");
  // initialise hours total for each grade
  var associateTotalHours = 0;
  var seniorAssociateTotalHours = 0;
  var managerTotalHours = 0;
  var seniorManagerTotalHours = 0;
  var directorTotalHours = 0;
  var partnerTotalHours = 0;
  // initialise objionaries
  var associateObj = {};
  var seniorAssociateObj = {};
  var managerObj = {};
  var seniorManagerObj = {};
  var directorObj = {};
  var partnerObj = {};
  
  // filter removes empty entries from range
  bfeRange = bfeRange.filter(function(row){
    var isEmpty = row[0]+row[1]+row[2]+row[3]+row[4]+row[5];
    return !!isEmpty
  });
  
  // split bfe range into grades
  var associateRange = bfeRange.filter(getGradeRange("Associate"));
  var seniorAssociateRange = bfeRange.filter(getGradeRange("Senior Associate"));
  var managerRange = bfeRange.filter(getGradeRange("Manager"));
  var seniorManagerRange = bfeRange.filter(getGradeRange("Senior Manager"));
  var directorRange = bfeRange.filter(getGradeRange("Director"));
  var partnerRange = bfeRange.filter(getGradeRange("Partner"));
  
  
  // calculate total hours for associate
  associateRange.forEach(function(row){
    associateTotalHours = parseFloat(associateTotalHours + row[0]);
  });
  
  // calculate total hours for senior associate
  seniorAssociateRange.forEach(function(row){
    seniorAssociateTotalHours = parseFloat(seniorAssociateTotalHours + row[0]);
  });
  
  // calculate total hours for manager
  managerRange.forEach(function(row){
    managerTotalHours = parseFloat(managerTotalHours + row[0]);
  });
  
  // calculate total hours for senior manager
  seniorManagerRange.forEach(function(row){
    seniorManagerTotalHours = parseFloat(seniorManagerTotalHours + row[0]);
  });
  
  // calculate total hours for director
  directorRange.forEach(function(row){
    directorTotalHours = parseFloat(directorTotalHours + row[0]);
  });
  
  // calculate total hours for partner
  partnerRange.forEach(function(row){
    partnerTotalHours = parseFloat(partnerTotalHours + row[0]);
  });
  
  
  var uniqueDates = [];
  
  // get unique months and years from raw data
  bfeRange.forEach(function(row, index){
    date = Utilities.formatDate(new Date(row[3]), "GMT+1", "MMM yy")
    if (uniqueDates.indexOf(date) === -1) {
      uniqueDates.push(date);
    }
  });
  
  // write dates to tracker
  uniqueDates.forEach(function(date, idx){
    trackerSheet.getRange(1, idx + 3).setValue(date);              
  });
  
  // breakdown of partner hours
  
  //get total hours per person  
  associateRange.forEach(buildObj(associateObj, uniqueDates));
  seniorAssociateRange.forEach(buildObj(seniorAssociateObj, uniqueDates));
  managerRange.forEach(buildObj(managerObj, uniqueDates));
  seniorManagerRange.forEach(buildObj(seniorManagerObj, uniqueDates));
  directorRange.forEach(buildObj(directorObj, uniqueDates));
  partnerRange.forEach(buildObj(partnerObj, uniqueDates));
  
  var gradeIdx = 2; 
  //  gradeIdx = writeToTracker(trackerSheet, partnerObj, partnerTotalHours, gradeIdx);
  //  gradeIdx = writeToTracker(trackerSheet, directorObj, directorTotalHours, gradeIdx);
  //  gradeIdx = writeToTracker(trackerSheet, seniorManagerObj, seniorManagerTotalHours, gradeIdx);
  //  gradeIdx = writeToTracker(trackerSheet, managerObj, managerTotalHours, gradeIdx);
  //  gradeIdx = writeToTracker(trackerSheet, seniorAssociateObj, seniorAssociateTotalHours, gradeIdx);
  //  gradeIdx = writeToTracker(trackerSheet, associateObj, associateTotalHours, gradeIdx);
  
  trackerSheet.getRange(gradeIdx, 1).setValue("Partner");
  trackerSheet.getRange(gradeIdx, 2).setValue(partnerTotalHours);
  gradeIdx = printEmployees(partnerObj, gradeIdx, trackerSheet);
  
  // insert director header to tracker and total hours for grade
  trackerSheet.getRange(gradeIdx, 1).setValue("Directors");
  trackerSheet.getRange(gradeIdx, 2).setValue(directorTotalHours);
  gradeIdx = printEmployees(directorObj, gradeIdx, trackerSheet);
  
  // insert senior manager header to tracker and total hours for grade
  trackerSheet.getRange(gradeIdx, 1).setValue("Senior Managers");
  trackerSheet.getRange(gradeIdx, 2).setValue(seniorManagerTotalHours);
  gradeIdx = printEmployees(seniorManagerObj, gradeIdx, trackerSheet);
  
  // insert manager header to tracker and total hours for grade
  trackerSheet.getRange(gradeIdx, 1).setValue("Managers");
  trackerSheet.getRange(gradeIdx, 2).setValue(managerTotalHours);
  gradeIdx = printEmployees(managerObj, gradeIdx, trackerSheet);
  
  // insert senior associate header to tracker and total hours for grade
  trackerSheet.getRange(gradeIdx, 1).setValue("Senior Associates");
  trackerSheet.getRange(gradeIdx, 2).setValue(seniorAssociateTotalHours);
  gradeIdx = printEmployees(seniorAssociateObj, gradeIdx, trackerSheet);
  
  // insert associate header to tracker and total hours for grade
  trackerSheet.getRange(gradeIdx, 1).setValue("Associates");
  trackerSheet.getRange(gradeIdx, 2).setValue(associateTotalHours);
  gradeIdx = printEmployees(associateObj, gradeIdx, trackerSheet);
  
}

function getGradeRange(grade) {
  return function(row) {
    return row[4] === grade;
  }
}

function buildObj(obj, dates) {
  return function(row) {
    if (!obj[row[4]]) {
      obj[row[4]] = {};
    }
    hours = (row[0] !== undefined && row[0] !== -1 && typeof row[0] === "number") ? row[0] : 0;
    
    if (!obj[row[4]][row[2]]) {
      obj[row[4]][row[2]] = {"totalHours": 0 };
    }
    obj[row[4]][row[2]]["totalHours"] += hours;
    
    // add breakdown of monthly hours per person to object
    dates.forEach(function(date){
      if(!obj[row[4]][row[2]][date]) {
        obj[row[4]][row[2]][date] = 0; 
      }    
      obj[row[4]][row[2]][date] = (Utilities.formatDate(new Date(row[3]), "GMT+1", "MMM yy") === date) ?  obj[row[4]][row[2]][date] + hours : obj[row[4]][row[2]][date] + 0; 
    });
  }
}

function printEmployees(obj, gradeIdx, sheet){
  for(var grade in obj) {
    for (var person in obj[grade]) {
      gradeIdx++;
      sheet.getRange(gradeIdx, 1).setValue(person);
      sheet.getRange(gradeIdx, 2).setValue(obj[grade][person].totalHours);
    }
  }
  return ++gradeIdx;
}

