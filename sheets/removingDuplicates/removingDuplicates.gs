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

// [START apps_script_sheets_remove_duplicates]
/**
 * Removes duplicate rows from the current sheet.
 */
function removeDuplicates() {
  // [START apps_script_sheets_sheet]
  const sheet = SpreadsheetApp.getActiveSheet();
  const data = sheet.getDataRange().getValues();
  // [END apps_script_sheets_sheet]
  const uniqueData = {};
  for (let row of data) {
    const key = row.join();
    // [START apps_script_sheets_duplicate]
    uniqueData[key] = uniqueData[key] || row;
    // [END apps_script_sheets_duplicate]
  }
  // [START apps_script_sheets_clear]
  sheet.clearContents();
  // [START apps_script_sheets_new_data]
  const newData = Object.values(uniqueData);
  // [END apps_script_sheets_new_data]
  sheet.getRange(1, 1, newData.length, newData[0].length).setValues(newData);
  // [END apps_script_sheets_clear]
}
// [END apps_script_sheets_remove_duplicates]
