// To learn how to use this script, refer to the documentation:
// https://developers.google.com/apps-script/samples/automations/tax-loss-harvest-alerts

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
* Checks for losses in the sheet.
*/
function checkLosses() {
  // Pulls data from the spreadsheet
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(
    "Calculations"
  );
  let source = sheet.getRange("A:G");
  let data = source.getValues();

  //Prepares the email alert content
  let message = "Stocks: <br><br>";

  let send_message = false;

  console.log("starting loop");

  //Loops through the cells in the spreadsheet to find cells where the stock fell below purchase price
  let n = 0;
  for (let i in data) {
    //Skips the first row
    if (n++ == 0) continue;

    //Loads the current row
    let row = data[i];

    console.log(row[1]);
    console.log(row[6]);

    //Once at the end of the list, exits the loop
    if (row[1] == "") break;

    //If value is below purchase price, adds stock ticker and difference to list of tax loss opportunities
    if (row[6] < 0) {
      message +=
        row[1] +
        ": " +
        (parseFloat(row[6].toString()) * 100).toFixed(2).toString() +
        "%<br>";
      send_message = true;
    }
  }
  if (!send_message) return;

  MailApp.sendEmail({
    to: SpreadsheetApp.getActiveSpreadsheet().getOwner().getEmail(),
    subject: "Tax-loss harvest",
    htmlBody: message,
    
  });
}

