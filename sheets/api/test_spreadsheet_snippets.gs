var snippets = new Snippets();
var helpers = new Helpers();

/**
 * A simple exists assertion check. Expects a value to exist. Errors if DNE.
 * @param {any} value A value that is expected to exist.
 */
function expectToExist(value) {
  if (value) {
    console.log('TEST: Exists');
  } else {
    throw new Error('TEST: DNE');
  }
}

/**
 * A simple exists assertion check for primatives (no nested objects).
 * Expects actual to equal expected. Logs the output.
 * @param {any} actual The actual value.
 * @param {any} expected The expected value.
 */
function expectToEqual(actual, expected) {
  console.log('TEST: actual: %s = expected: %s', actual, expected);
  if (actual !== expected) {
    console.log('TEST: actual: %s expected: %s', actual, expected);
  }
}

/**
 * Runs all tests.
 */
function RUN_ALL_TESTS() {
  itShouldCreateASpreadsheet();
  itShouldBatchUpdateASpreadsheet();
  itShouldGetSpreadsheetValues();
  itShouldBatchGetSpreadsheetValues();
  itShouldUpdateSpreadsheetValues();
  itShouldBatchUpdateSpreadsheetValues();
  itShouldAppendValuesToASpreadsheet();
  itShouldCreatePivotTables();
  itShouldConditionallyFormat();
}

/**
 * Tests creating a spreadsheet.
 */
function itShouldCreateASpreadsheet() {
  var spreadsheetId = snippets.create('Title');
  expectToExist(spreadsheetId);
  helpers.deleteFileOnCleanup(spreadsheetId);
}

/**
 * Tests updating a spreadsheet.
 */
function itShouldBatchUpdateASpreadsheet() {
  var spreadsheetId = helpers.createTestSpreadsheet();
  helpers.populateValues(spreadsheetId);
  var result = snippets.batchUpdate(spreadsheetId, 'New Title', 'Hello', 'Goodbye');
  var replies = result.replies;
  expectToEqual(replies.length, 2);
  var findReplaceResponse = replies[1].findReplace;
  expectToEqual(findReplaceResponse.occurrencesChanged, 100);
}

/**
 * Tests getting a spreadsheet value.
 */
function itShouldGetSpreadsheetValues() {
  var spreadsheetId = helpers.createTestSpreadsheet();
  helpers.populateValues(spreadsheetId);
  var result = snippets.getValues(spreadsheetId, 'A1:C2');
  var values = result.values;
  expectToEqual(values.length, 2);
  expectToEqual(values[0].length, 3);
}

/**
 * Tests batch getting spreadsheet values.
 */
function itShouldBatchGetSpreadsheetValues() {
  var spreadsheetId = helpers.createTestSpreadsheet();
  helpers.populateValues(spreadsheetId);
  var result = snippets.batchGetValues(spreadsheetId, ['A1:A3', 'B1:C1']);
  expectToExist(result);
  expectToEqual(result.length, 2);
  var values = result[0];
  expectToEqual(result.valueRanges[0].values.length, 3);
}

/**
 * Tests updating spreadsheet values.
 */
function itShouldUpdateSpreadsheetValues() {
  var spreadsheetId = helpers.createTestSpreadsheet();
  var result = snippets.updateValues(spreadsheetId, 'A1:B2', 'USER_ENTERED', [
    ['A', 'B'],
    ['C', 'D']
  ]);
  expectToEqual(result.updatedRows, 2);
  expectToEqual(result.updatedColumns, 2);
  expectToEqual(result.updatedCells, 4);
}

/**
 * Test batch updating spreadsheet values.
 */
function itShouldBatchUpdateSpreadsheetValues() {
  var spreadsheetId = helpers.createTestSpreadsheet();
  var result = snippets.batchUpdateValues(spreadsheetId, 'A1:B2', 'USER_ENTERED', [
    ['A', 'B'],
    ['C', 'D']
  ]);
  expectToEqual(result.totalUpdatedRows, 2);
  expectToEqual(result.totalUpdatedColumns, 2);
  expectToEqual(result.totalUpdatedCells, 4);
}

/**
 * Test appending values to a spreadsheet.
 */
function itShouldAppendValuesToASpreadsheet() {
  var spreadsheetId = helpers.createTestSpreadsheet();
  helpers.populateValues(spreadsheetId);
  var result = snippets.appendValues(spreadsheetId, 'Sheet1', 'USER_ENTERED', [
    ['A', 'B'],
    ['C', 'D']
  ]);
  var updates = result.updates;
  expectToEqual(updates.updatedRows, 2);
  expectToEqual(updates.updatedColumns, 2);
  expectToEqual(updates.updatedCells, 4);
}

/**
 * Test creating pivot tables.
 */
function itShouldCreatePivotTables() {
  var spreadsheetId = helpers.createTestSpreadsheet();
  helpers.populateValues(spreadsheetId);
  var result = snippets.pivotTable(spreadsheetId);
  expectToExist(result);
}

/**
 * Test conditionally formatting spreadsheets.
 */
function itShouldConditionallyFormat() {
  var spreadsheetId = helpers.createTestSpreadsheet();
  helpers.populateValues(spreadsheetId);
  var result = snippets.conditionalFormatting(spreadsheetId);
  expectToExist(spreadsheetId);
  expectToEqual(result.replies.length, 2);
}
