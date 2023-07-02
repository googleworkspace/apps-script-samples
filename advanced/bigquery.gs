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
// [START apps_script_bigquery_run_query]
/**
 * Runs a BigQuery query and logs the results in a spreadsheet.
 */
function runQuery() {
  // Replace this value with the project ID listed in the Google
  // Cloud Platform project.
  const projectId = 'XXXXXXXX';

  const request = {
    // TODO (developer) - Replace query with yours
    query: 'SELECT refresh_date AS Day, term AS Top_Term, rank ' +
      'FROM `bigquery-public-data.google_trends.top_terms` ' +
      'WHERE rank = 1 ' +
      'AND refresh_date >= DATE_SUB(CURRENT_DATE(), INTERVAL 2 WEEK) ' +
      'GROUP BY Day, Top_Term, rank ' +
      'ORDER BY Day DESC;',
    useLegacySql: false
  };
  let queryResults = BigQuery.Jobs.query(request, projectId);
  const jobId = queryResults.jobReference.jobId;

  // Check on status of the Query Job.
  let sleepTimeMs = 500;
  while (!queryResults.jobComplete) {
    Utilities.sleep(sleepTimeMs);
    sleepTimeMs *= 2;
    queryResults = BigQuery.Jobs.getQueryResults(projectId, jobId);
  }

  // Get all the rows of results.
  let rows = queryResults.rows;
  while (queryResults.pageToken) {
    queryResults = BigQuery.Jobs.getQueryResults(projectId, jobId, {
      pageToken: queryResults.pageToken
    });
    rows = rows.concat(queryResults.rows);
  }

  if (!rows) {
    console.log('No rows returned.');
    return;
  }
  const spreadsheet = SpreadsheetApp.create('BigQuery Results');
  const sheet = spreadsheet.getActiveSheet();

  // Append the headers.
  const headers = queryResults.schema.fields.map(function(field) {
    return field.name;
  });
  sheet.appendRow(headers);

  // Append the results.
  const data = new Array(rows.length);
  for (let i = 0; i < rows.length; i++) {
    const cols = rows[i].f;
    data[i] = new Array(cols.length);
    for (let j = 0; j < cols.length; j++) {
      data[i][j] = cols[j].v;
    }
  }
  sheet.getRange(2, 1, rows.length, headers.length).setValues(data);

  console.log('Results spreadsheet created: %s', spreadsheet.getUrl());
}
// [END apps_script_bigquery_run_query]

// [START apps_script_bigquery_load_csv]
/**
 * Loads a CSV into BigQuery
 */
function loadCsv() {
  // Replace this value with the project ID listed in the Google
  // Cloud Platform project.
  const projectId = 'XXXXXXXX';
  // Create a dataset in the BigQuery UI (https://bigquery.cloud.google.com)
  // and enter its ID below.
  const datasetId = 'YYYYYYYY';
  // Sample CSV file of Google Trends data conforming to the schema below.
  // https://docs.google.com/file/d/0BwzA1Orbvy5WMXFLaTR1Z1p2UDg/edit
  const csvFileId = '0BwzA1Orbvy5WMXFLaTR1Z1p2UDg';

  // Create the table.
  const tableId = 'pets_' + new Date().getTime();
  let table = {
    tableReference: {
      projectId: projectId,
      datasetId: datasetId,
      tableId: tableId
    },
    schema: {
      fields: [
        {name: 'week', type: 'STRING'},
        {name: 'cat', type: 'INTEGER'},
        {name: 'dog', type: 'INTEGER'},
        {name: 'bird', type: 'INTEGER'}
      ]
    }
  };
  try {
    table = BigQuery.Tables.insert(table, projectId, datasetId);
    console.log('Table created: %s', table.id);
  } catch (err) {
    console.log('unable to create table');
  }
  // Load CSV data from Drive and convert to the correct format for upload.
  const file = DriveApp.getFileById(csvFileId);
  const data = file.getBlob().setContentType('application/octet-stream');

  // Create the data upload job.
  const job = {
    configuration: {
      load: {
        destinationTable: {
          projectId: projectId,
          datasetId: datasetId,
          tableId: tableId
        },
        skipLeadingRows: 1
      }
    }
  };
  try {
    const jobResult = BigQuery.Jobs.insert(job, projectId, data);
    console.log(`Load job started. Status: ${jobResult.status.state}`);
  } catch (err) {
    console.log('unable to insert job');
  }
}
// [END apps_script_bigquery_load_csv]
