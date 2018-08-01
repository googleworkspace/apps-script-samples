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
  var projectId = 'XXXXXXXX';

  var request = {
    query: 'SELECT TOP(word, 300) AS word, COUNT(*) AS word_count ' +
      'FROM publicdata:samples.shakespeare WHERE LENGTH(word) > 10;'
  };
  var queryResults = BigQuery.Jobs.query(request, projectId);
  var jobId = queryResults.jobReference.jobId;

  // Check on status of the Query Job.
  var sleepTimeMs = 500;
  while (!queryResults.jobComplete) {
    Utilities.sleep(sleepTimeMs);
    sleepTimeMs *= 2;
    queryResults = BigQuery.Jobs.getQueryResults(projectId, jobId);
  }

  // Get all the rows of results.
  var rows = queryResults.rows;
  while (queryResults.pageToken) {
    queryResults = BigQuery.Jobs.getQueryResults(projectId, jobId, {
      pageToken: queryResults.pageToken
    });
    rows = rows.concat(queryResults.rows);
  }

  if (rows) {
    var spreadsheet = SpreadsheetApp.create('BiqQuery Results');
    var sheet = spreadsheet.getActiveSheet();

    // Append the headers.
    var headers = queryResults.schema.fields.map(function(field) {
      return field.name;
    });
    sheet.appendRow(headers);

    // Append the results.
    var data = new Array(rows.length);
    for (var i = 0; i < rows.length; i++) {
      var cols = rows[i].f;
      data[i] = new Array(cols.length);
      for (var j = 0; j < cols.length; j++) {
        data[i][j] = cols[j].v;
      }
    }
    sheet.getRange(2, 1, rows.length, headers.length).setValues(data);

    Logger.log('Results spreadsheet created: %s',
        spreadsheet.getUrl());
  } else {
    Logger.log('No rows returned.');
  }
}
// [END apps_script_bigquery_run_query]

// [START apps_script_bigquery_load_csv]
/**
 * Loads a CSV into BigQuery
 */
function loadCsv() {
  // Replace this value with the project ID listed in the Google
  // Cloud Platform project.
  var projectId = 'XXXXXXXX';
  // Create a dataset in the BigQuery UI (https://bigquery.cloud.google.com)
  // and enter its ID below.
  var datasetId = 'YYYYYYYY';
  // Sample CSV file of Google Trends data conforming to the schema below.
  // https://docs.google.com/file/d/0BwzA1Orbvy5WMXFLaTR1Z1p2UDg/edit
  var csvFileId = '0BwzA1Orbvy5WMXFLaTR1Z1p2UDg';

  // Create the table.
  var tableId = 'pets_' + new Date().getTime();
  var table = {
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
  table = BigQuery.Tables.insert(table, projectId, datasetId);
  Logger.log('Table created: %s', table.id);

  // Load CSV data from Drive and convert to the correct format for upload.
  var file = DriveApp.getFileById(csvFileId);
  var data = file.getBlob().setContentType('application/octet-stream');

  // Create the data upload job.
  var job = {
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
  job = BigQuery.Jobs.insert(job, projectId, data);
  Logger.log('Load job started. Check on the status of it here: ' +
      'https://bigquery.cloud.google.com/jobs/%s', projectId);
}
// [END apps_script_bigquery_load_csv]
