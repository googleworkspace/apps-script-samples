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
// [START apps_script_fusion_tables_list]
/**
 * This sample lists Fusion Tables that the user has access to.
 */
function listTables() {
  var tables = FusionTables.Table.list();
  if (tables.items) {
    for (var i = 0; i < tables.items.length; i++) {
      var table = tables.items[i];
      Logger.log('Table with name "%s" and ID "%s" was found.',
          table.name, table.tableId);
    }
  } else {
    Logger.log('No tables found.');
  }
}
// [END apps_script_fusion_tables_list]

// [START apps_script_fusion_tables_run_query]
/**
 * This sample queries for the first 100 rows in the given Fusion Table and
 * saves the results to a new spreadsheet.
 * @param {string} tableId The table ID.
 */
function runQuery(tableId) {
  var sql = 'SELECT * FROM ' + tableId + ' LIMIT 100';
  var result = FusionTables.Query.sqlGet(sql, {
    hdrs: false
  });
  if (result.rows) {
    var spreadsheet = SpreadsheetApp.create('Fusion Table Query Results');
    var sheet = spreadsheet.getActiveSheet();

    // Append the headers.
    sheet.appendRow(result.columns);

    // Append the results.
    sheet.getRange(2, 1, result.rows.length, result.columns.length)
        .setValues(result.rows);

    Logger.log('Query results spreadsheet created: %s',
        spreadsheet.getUrl());
  } else {
    Logger.log('No rows returned.');
  }
}
// [END apps_script_fusion_tables_run_query]
