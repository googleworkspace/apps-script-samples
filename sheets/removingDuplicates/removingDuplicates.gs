/**
 * Copyright Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// [START removeDuplicates]
/**
 * Removes duplicate rows from the current sheet.
 */
function removeDuplicates() {
  // [START sheet]
  var sheet = SpreadsheetApp.getActiveSheet();
  var data = sheet.getDataRange().getValues();
  // [END sheet]
  // [START newData]
  var newData = [];
  // [END newData]
  for (i in data) {
    var row = data[i];
    var duplicate = false;
    for (j in newData) {
      if (row.join() == newData[j].join()) {
        duplicate = true;
      }
    }
    // [START duplicate]
    if (!duplicate) {
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
