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
// [START sheets_quickstart]
/**
 * Creates a Sheets API service object and prints the names and majors of
 * students in a sample spreadsheet:
 * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @see https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/get
 */
function logNamesAndMajors() {
  const spreadsheetId = '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms';
  const rangeName = 'Class Data!A2:E';
  try {
    // Get the values from the spreadsheet using spreadsheetId and range.
    const values = Sheets.Spreadsheets.Values.get(spreadsheetId, rangeName).values;
    //  Print the values from spreadsheet if values are available.
    if (!values) {
      console.log('No data found.');
      return;
    }
    console.log('Name, Major:');
    for (const row in values) {
      // Print columns A and E, which correspond to indices 0 and 4.
      console.log(' - %s, %s', values[row][0], values[row][4]);
    }
  } catch (err) {
    // TODO (developer) - Handle Values.get() exception from Sheet API
    console.log(err.message);
  }
}
// [END sheets_quickstart]
