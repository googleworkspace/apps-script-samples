// To learn how to use this script, refer to the documentation:
// https://developers.google.com/apps-script/samples/custom-functions/summarize-sheets-data

/*
Copyright 2022 Google LLC

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

/**
 * Gets summary data from other sheets. The sheets you want to summarize must have columns with headers that match the names of the columns this function summarizes data from.
 * 
 * @return {string} Summary data from other sheets.
 * @customfunction
 */

// The following sheets are ignored. Add additional constants for other sheets that should be ignored.
const READ_ME_SHEET_NAME = "ReadMe";
const PM_SHEET_NAME = "Summary";

/**
 * Reads data ranges for each sheet. Filters and counts based on 'Status' columns. To improve performance, the script uses arrays 
 * until all summary data is gathered. Then the script writes the summary array starting at the cell of the custom function.
 */
function getSheetsData() {
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheets = ss.getSheets();
  let outputArr = [];

  // For each sheet, summarizes the data and pushes to a temporary array.
  for (let s in sheets) {
    // Gets sheet name.
    let sheetNm = sheets[s].getName();
    // Skips ReadMe and Summary sheets.
    if (sheetNm === READ_ME_SHEET_NAME || sheetNm === PM_SHEET_NAME) { continue; }
    // Gets sheets data.
    let values = sheets[s].getDataRange().getValues();
    // Gets the first row of the sheet which is the header row.
    let headerRowValues = values[0];
    // Finds the columns with the heading names 'Owner Name' and 'Status' and gets the index value of each.
    // Using 'indexOf()' to get the position of each column prevents the script from breaking if the columns change positions in a sheet.
    let columnOwner = headerRowValues.indexOf("Owner Name");
    let columnStatus = headerRowValues.indexOf("Status");
    // Removes header row.
    values.splice(0,1);
    // Gets the 'Owner Name' column value by retrieving the first data row in the array.
    let owner = values[0][columnOwner];
    // Counts the total number of tasks.
    let taskCnt = values.length;
    // Counts the number of tasks that have the 'Complete' status.
    // If the options you want to count in your spreadsheet differ, update the strings below to match the text of each option.
    // To add more options, copy the line below and update the string to the new text.
    let completeCnt = filterByPosition(values,'Complete', columnStatus).length;
    // Counts the number of tasks that have the 'In-Progress' status.
    let inProgressCnt = filterByPosition(values,'In-Progress', columnStatus).length;
    // Counts the number of tasks that have the 'Scheduled' status.
    let scheduledCnt = filterByPosition(values,'Scheduled', columnStatus).length;
    // Counts the number of tasks that have the 'Overdue' status.
    let overdueCnt = filterByPosition(values,'Overdue', columnStatus).length;
    // Builds the output array.
    outputArr.push([owner,taskCnt,completeCnt,inProgressCnt,scheduledCnt,overdueCnt,sheetNm]);
  }
  // Writes the output array.
  return outputArr;
}

/**
 * Below is a helper function that filters a 2-dimenstional array.
 */
function filterByPosition(array, find, position) {
  return array.filter(innerArray => innerArray[position] === find);
}

