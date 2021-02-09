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

const DATASET_PROPERTY = 'datasetId';
const PROJECT_PROPERTY = 'projectId';
const INTEGER_PROPERTY = 'integer';

const DATETIME_COLUMN = 'datetime';
const DATA_COLUMN = 'data';

const DATASET_NAME = 'sheets_forecast';
const TABLE_NAME = 'sheets_forecast_training_data';
const MODEL_NAME = 'sheets_forecast_model';

const TIMEZONE = SpreadsheetApp.getActive().getSpreadsheetTimeZone();

// =============================================================================
// UI
// =============================================================================

/**
 * Create menu items linked to functions
 */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('BQML')
    .addItem('Train', 'train')
    .addItem('Forecast', 'forecast')
    .addSeparator()
    .addSubMenu(SpreadsheetApp.getUi().createMenu('Configure')
      .addItem('Project', 'configureProject')
      .addItem('Dataset', 'configureDataset'))
    .addToUi();
}

// =============================================================================
// Configuration
// =============================================================================

/**
 * Get configuration information, and prompt user if not defined
 */
function getConfiguration() {
  properties = PropertiesService.getUserProperties();
  let projectId = properties.getProperty(PROJECT_PROPERTY);
  if (projectId == null) {
    projectId = configureProject();
  }
  let datasetId = properties.getProperty(DATASET_PROPERTY);
  if (datasetId == null) {
    datasetId = DATASET_NAME; // Use default if the user hasn't specified one
  }
  return [projectId, datasetId];
}

/**
 * Prompt user for the GCP project details
 */
function configureProject() {
  const response = SpreadsheetApp.getUi().prompt('GCP Project ID:');
  if (response.getSelectedButton() == SpreadsheetApp.getUi().Button.OK) {
    const project = response.getResponseText();
    Logger.log('Project configured: ' + response.getResponseText());
    PropertiesService.getUserProperties().
      setProperty(PROJECT_PROPERTY, project);
    return project;
  }

  Logger.log('Project was not configured.');
  return null;
}

/**
 * Prompt user for the BigQuery dataset details
 */
function configureDataset() {
  const response = SpreadsheetApp.getUi().prompt('BigQuery dataset name:');
  if (response.getSelectedButton() == SpreadsheetApp.getUi().Button.OK) {
    const dataset = response.getResponseText();
    PropertiesService.getUserProperties().
      setProperty(DATASET_PROPERTY, dataset);
    Logger.log('Dataset configured: ' + dataset);
    return dataset;
  }

  Logger.log('Dataset was not configured.');
  return null;
}

// =============================================================================
// Schema creation
// =============================================================================

/**
 * Create BigQuery dataset if it doesn't exist already
 */
function createDatasetIfNotExists() {
  [projectId, datasetId] = getConfiguration();

  try {
    BigQuery.Datasets.get(projectId, datasetId);
  } catch (e) {
    Logger.log('Dataset does not exist. Creating new dataset with ID: ' +
      datasetId);
    const dataset = BigQuery.newDataset();
    const reference = BigQuery.newDatasetReference();
    reference.datasetId = datasetId;
    dataset.datasetReference = reference;
    BigQuery.Datasets.insert(dataset, projectId);
  }
  return datasetId;
}

/**
 * Create BigQuery table if it doesn't exist already
 */
function createTableIfNotExists() {

  [projectId, datasetId] = getConfiguration();

  try {
    BigQuery.Tables.get(projectId, datasetId, TABLE_NAME);
  } catch (e) {
    Logger.log('Table does not exist. Creating new table with ID: ' +
      TABLE_NAME);

    // Create time-series and data field schema
    const dateSchema = BigQuery.newTableFieldSchema();
    dateSchema.name = DATETIME_COLUMN;
    dateSchema.type = 'timestamp';
    const dataSchema = BigQuery.newTableFieldSchema();
    dataSchema.name = DATA_COLUMN;
    dataSchema.type = 'float';

    // Create table schema with field schema
    const schema = BigQuery.newTableSchema();
    schema.fields = [dateSchema, dataSchema];

    // Create table reference with table name
    const reference = BigQuery.newTableReference();
    reference.tableId = TABLE_NAME;

    // Create table with schema and reference
    const table = BigQuery.newTable();
    table.schema = schema;
    table.tableReference = reference;

    // Issue command to create table in BigQuery
    BigQuery.Tables.insert(table, projectId, datasetId);
  }
  return TABLE_NAME;
}

// =============================================================================
// Forecasting
// =============================================================================

/**
 * Create a forecasting model based on the input data
 */
function train() {
  const CREATE_OPTIONS = {
    'MODEL_TYPE': 'ARIMA',
    'TIME_SERIES_TIMESTAMP_COL': DATETIME_COLUMN,
    'TIME_SERIES_DATA_COL': DATA_COLUMN,
  };

  const project = getConfiguration()[0];
  const dataset = createDatasetIfNotExists();
  const table = project + '.' + dataset + '.' + createTableIfNotExists();
  const model = project + '.' + dataset + '.' + MODEL_NAME;

  const range = SpreadsheetApp.getActiveRange();
  if (!isValidTrainingData(range)) {
    return;
  }

  // Populate temporary table in BigQuery with selected data from sheet
  const inputs = SpreadsheetApp.getActiveRange().getValues();
  populateTable(project, table, [DATETIME_COLUMN, DATA_COLUMN], inputs);

  // Create a new model using training data in BigQuery
  const request = {
    query: 'CREATE OR REPLACE MODEL `' + model + '` ' +
      getOptionsStr(CREATE_OPTIONS) + ' AS SELECT * FROM `' + table + '`',
    useLegacySql: false,
  };

  runQuery(request, project);
}

/** 
 * Basic validation function that checks range size and first row contents
 */
function isValidTrainingData(range) {

  if (range.getNumRows() < 2 || range.getNumColumns() != 2) {
    SpreadsheetApp.getUi().alert('Multiple rows, each with 2 columns ' +
      '(date/time and number), must be selected.');
    return false;
  }

  const inputs = SpreadsheetApp.getActiveRange().getValues();
  const firstDate = new Date(inputs[0][0]);
  const firstNumber = new Number(inputs[0][1]);

  if (!firstDate instanceof Date || isNaN(firstDate)) {
    SpreadsheetApp.getUi().alert('1st column must be a date/time');
    return false;
  }

  if (!firstNumber instanceof Number || isNaN(firstNumber)) {
    SpreadsheetApp.getUi().alert('2nd column must be a number');
    return false;
  }

  // Check if using integers (to round forecasts later if needed)
  PropertiesService.getUserProperties().
    setProperty(INTEGER_PROPERTY, Number.isInteger(firstNumber.valueOf()));

  return true;
}

/**
 * Forecast starting one time step forward from the last trained date.
 * Returns a number of forecasts equal to the length of the selected range.
 * Each forecast contains the forecast date and predicted value.
 */
function forecast() {
  const project = getConfiguration()[0];
  const dataset = createDatasetIfNotExists();
  const model = project + '.' + dataset + '.' + MODEL_NAME;

  try {
    BigQuery.Models.get(project, dataset, MODEL_NAME);
  } catch (e) {
    SpreadsheetApp.getUi().
      alert('Model not found. You must train a model before forecasting.');
    return;
  }

  const range = SpreadsheetApp.getActiveRange();

  let numRows;
  if (range.getNumRows() == 1 && range.getNumColumns() == 1) {
    numRows = getHorizon();
  } else {
    numRows = range.getNumRows();
  }
  const numColumns = 2;


  // Forecast a time series using the trained model
  request = {
    query: 'SELECT FORMAT_TIMESTAMP("%FT%T%Ez", forecast_timestamp), ' +
      'forecast_value FROM ML.FORECAST(MODEL `' +
      model + '`, STRUCT(' + numRows + ' AS horizon))',
    useLegacySql: false,
  };
  const response = runQuery(request, project);

  // Extract forecasts from response
  const forecasts = [];
  const integers = PropertiesService.getUserProperties().
    getProperty(INTEGER_PROPERTY);

  for (const item of response) {
    // Extract forecast date and adjust for local time zone
    const date = new Date(item.f[0].v);

    const forecast = integers === "true" ? Math.round(item.f[1].v) : item.f[1].v;

    forecasts.push([date, forecast]);
  }

  // Write values back to sheet
  range.offset(0, 0, numRows, numColumns).setValues(forecasts);
}

/**
 * Prompt user for the forecast horizon if not inferred from selected range
 */
function getHorizon() {
  const response = SpreadsheetApp.getUi().
    prompt('Number of time steps to forecast:');
  if (response.getSelectedButton() == SpreadsheetApp.getUi().Button.OK) {
    return response.getResponseText();
  }

  Logger.log('User did not select a horizon. Defaulting to 1 time step.');
  return 1;
}

// =============================================================================
// Utilities
// =============================================================================

/**
 * Insert data from sheet as records into BigQuery table, for use in BQML models
 */
function populateTable(project, table, columnNames, data) {
  // Delete existing rows from temporary table
  const request =
    { query: 'DELETE FROM `' + table + '` WHERE TRUE', useLegacySql: false };
  runQuery(request, project);

  // Insert records in batches, to avoid exceeding resource constraints
  const BATCH_SIZE = 500;
  for (let i = 0, j = data.length; i < j; i += BATCH_SIZE) {
    const batch = data.slice(i, i + BATCH_SIZE);

    const request = {
      query: 'INSERT `' + table + '` (' + columnNames.join() +
        ') VALUES ' + getValuesStr(batch),
      useLegacySql: false,
    };
    runQuery(request, project);
  }
}

/**
 * Converts an array into comma-separated strings for use in SQL statement
 */
function getValuesStr(inputs) {
  const values = [];
  for (let i = 0; i < inputs.length; i++) {
    input = inputs[i];
    values.push('(' + inputs[i].map((x) => formatInput(x)).join() + ')');
  }
  return values.join();
}
/**
 * Formats variables for use in SQL:
 * Dates are converted to strings.
 * Strings are wrapped with quotes.
 * Numbers are left alone.
 */
function formatInput(input) {
  if (input instanceof Date) {
    input = input.
      toLocaleString('sv-SE', { timeZone: TIMEZONE }) + ' ' + TIMEZONE;
    return '\'' + input + '\'';
  } else if (input instanceof String) {
    return '\'' + input + '\'';
  }
  return input;
}

/**
 * Creates SQL clause with options for model creation (e.g. MODEL_TYPE='ARIMA')
 */
function getOptionsStr(modelOptions) {
  options = [];
  for (const o in modelOptions) {
    options.push(o + '=\'' + modelOptions[o] + '\'');
  }
  return 'OPTIONS(' + options.join() + ')';
}

/**
 * Runs a BigQuery query and logs the results in a spreadsheet.
 */
function runQuery(request, projectId) {
  // Replace this value with the project ID listed in the Google
  // Cloud Platform project.

  // @ts-ignore
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
      pageToken: queryResults.pageToken,
    });
    rows = rows.concat(queryResults.rows);
  }
  return rows;
}

