/**
 * Copyright  Google LLC
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

/**
 * Google Sheets API Snippets.
 */
function Snippets() {};

// [START sheets_create]
/**
 * Creates a new sheet using the sheets advanced services
 * @param {string} title the name of the sheet to be created
 * @returns {string} the spreadsheet ID
 */
Snippets.prototype.create = (title) => {
  // This code uses the Sheets Advanced Service, but for most use cases
  // the built-in method SpreadsheetApp.create() is more appropriate.
  try {
    let sheet = Sheets.newSpreadsheet();
    sheet.properties = Sheets.newSpreadsheetProperties();
    sheet.properties.title = title;
    const spreadsheet = Sheets.Spreadsheets.create(sheet);

    return spreadsheet.spreadsheetId;
  } catch (err) {
    // TODO (developer) - Handle exception
    console.log('Failed with error %s', err.message);
  }
};
// [END sheets_create]

// [START sheets_batch_update]
/**
 * Updates the specified sheet using advanced sheet services
 * @param {string} spreadsheetId id of the spreadsheet to be updated
 * @param {string} title name of the sheet in the spreadsheet to be updated
 * @param {string} find string to be replaced
 * @param {string} replacement the string to replace the old data
 * @returns {*} the updated spreadsheet
 */
Snippets.prototype.batchUpdate = (spreadsheetId, title,
  find, replacement) => {
  // This code uses the Sheets Advanced Service, but for most use cases
  // the built-in method SpreadsheetApp.getActiveSpreadsheet()
  //     .getRange(range).setValues(values) is more appropriate.

  try {
    // Change the spreadsheet's title.
    let updateSpreadsheetPropertiesRequest =
      Sheets.newUpdateSpreadsheetPropertiesRequest();
    updateSpreadsheetPropertiesRequest.properties =
      Sheets.newSpreadsheetProperties();
    updateSpreadsheetPropertiesRequest.properties.title = title;
    updateSpreadsheetPropertiesRequest.fields = 'title';

    // Find and replace text.
    let findReplaceRequest = Sheets.newFindReplaceRequest();
    findReplaceRequest.find = find;
    findReplaceRequest.replacement = replacement;
    findReplaceRequest.allSheets = true;

    let requests = [Sheets.newRequest(), Sheets.newRequest()];
    requests[0].updateSpreadsheetProperties =
      updateSpreadsheetPropertiesRequest;
    requests[1].findReplace = findReplaceRequest;

    let batchUpdateRequest = Sheets.newBatchUpdateSpreadsheetRequest();
    batchUpdateRequest.requests = requests;

    // Add additional requests (operations)
    const result =
      Sheets.Spreadsheets.batchUpdate(batchUpdateRequest, spreadsheetId);
    return result;
  } catch (err) {
    // TODO (developer) - Handle exception
    console.log('Failed with error %s', err.message);
  }
};
// [END sheets_batch_update]

// [START sheets_get_values]
/**
 * Gets the values of the cells in the specified range
 * @param {string} spreadsheetId id of the spreadsheet
 * @param {string} range specifying the start and end cells of the range
 * @returns {*} Values in the range
 */
Snippets.prototype.getValues = function(spreadsheetId, range) {
  // This code uses the Sheets Advanced Service, but for most use cases
  // the built-in method SpreadsheetApp.getActiveSpreadsheet()
  //     .getRange(range).getValues(values) is more appropriate.
  try {
    const result = Sheets.Spreadsheets.Values.get(spreadsheetId, range);
    const numRows = result.values ? result.values.length : 0;
    return result;
  } catch (err) {
    // TODO (developer) - Handle exception
    console.log('Failed with error %s', err.message);
  }
};
// [END sheets_get_values]

// [START sheets_batch_get_values]
/**
 * Get the values in the specified ranges
 * @param {string} spreadsheetId spreadsheet's ID
 * @param {list<string>} _ranges The span of ranges
 * @returns {*} spreadsheet information and values
 */
Snippets.prototype.batchGetValues = (spreadsheetId,
  _ranges) => {
  // This code uses the Sheets Advanced Service, but for most use cases
  // the built-in method SpreadsheetApp.getActiveSpreadsheet()
  //     .getRange(range).getValues(values) is more appropriate.
  let ranges = [
    //Range names ...
  ];
  // [START_EXCLUDE silent]
  ranges = _ranges;
  // [END_EXCLUDE]
  try {
    const result =
      Sheets.Spreadsheets.Values.batchGet(spreadsheetId, {ranges: ranges});
    return result;
  } catch (err) {
    // TODO (developer) - Handle exception
    console.log('Failed with error %s', err.message);
  }
};
// [END sheets_batch_get_values]

// [START sheets_update_values]
/**
 * Updates the values in the specified range
 * @param {string} spreadsheetId spreadsheet's ID
 * @param {string} range the range of cells in spreadsheet
 * @param {string} valueInputOption determines how the input should be interpreted
 * @see
 * https://developers.google.com/sheets/api/reference/rest/v4/ValueInputOption
 * @param {list<list<string>>} _values list of string lists to input
 * @returns {*} spreadsheet with updated values
 */
Snippets.prototype.updateValues = (spreadsheetId, range,
  valueInputOption, _values) => {
  // This code uses the Sheets Advanced Service, but for most use cases
  // the built-in method SpreadsheetApp.getActiveSpreadsheet()
  //     .getRange(range).setValues(values) is more appropriate.
  let values = [
    [
      // Cell values ...
    ]
    // Additional rows ...
  ];
  // [START_EXCLUDE silent]
  values = _values;
  // [END_EXCLUDE]

  try {
    let valueRange = Sheets.newValueRange();
    valueRange.values = values;
    const result = Sheets.Spreadsheets.Values.update(valueRange,
      spreadsheetId, range, {valueInputOption: valueInputOption});
    return result;
  } catch (err) {
    // TODO (developer) - Handle exception
    console.log('Failed with error %s', err.message);
  }
};
// [END sheets_update_values]

// [START sheets_batch_update_values]
/**
 * Updates the values in the specified range
 * @param {string} spreadsheetId spreadsheet's ID
 * @param {string} range range of cells of the spreadsheet
 * @param {string} valueInputOption determines how the input should be interpreted
 * @see
 * https://developers.google.com/sheets/api/reference/rest/v4/ValueInputOption
 * @param {list<list<string>>} _values list of string values to input
 * @returns {*} spreadsheet with updated values
 */
Snippets.prototype.batchUpdateValues =
  (spreadsheetId, range, valueInputOption,
    _values) => {
    // This code uses the Sheets Advanced Service, but for most use cases
    // the built-in method SpreadsheetApp.getActiveSpreadsheet()
    //     .getRange(range).setValues(values) is more appropriate.
    let values = [
      [
        // Cell values ...
      ]
      // Additional rows ...
    ];
    // [START_EXCLUDE silent]
    values = _values;
    // [END_EXCLUDE]

    try {
      let valueRange = Sheets.newValueRange();
      valueRange.range = range;
      valueRange.values = values;

      let batchUpdateRequest = Sheets.newBatchUpdateValuesRequest();
      batchUpdateRequest.data = valueRange;
      batchUpdateRequest.valueInputOption = valueInputOption;

      const result = Sheets.Spreadsheets.Values.batchUpdate(batchUpdateRequest,
        spreadsheetId);
      return result;
    } catch (err) {
      // TODO (developer) - Handle exception
      console.log('Failed with error %s', err.message);
    }
  };
// [END sheets_batch_update_values]

// [START sheets_append_values]
/**
 * Appends values to the specified range
 * @param {string} spreadsheetId spreadsheet's ID
 * @param {string} range range of cells in the spreadsheet
 * @param valueInputOption determines how the input should be interpreted
 * @see
 * https://developers.google.com/sheets/api/reference/rest/v4/ValueInputOption
 * @param {list<string>} _values list of rows of values to input
 * @returns {*} spreadsheet with appended values
 */
Snippets.prototype.appendValues = (spreadsheetId, range,
  valueInputOption, _values) => {
  let values = [
    [
      // Cell values ...
    ]
    // Additional rows ...
  ];
  // [START_EXCLUDE silent]
  values = _values;
  // [END_EXCLUDE]
  try {
    let valueRange = Sheets.newRowData();
    valueRange.values = values;

    let appendRequest = Sheets.newAppendCellsRequest();
    appendRequest.sheetId = spreadsheetId;
    appendRequest.rows = [valueRange];

    const result = Sheets.Spreadsheets.Values.append(valueRange, spreadsheetId,
      range, {valueInputOption: valueInputOption});
    return result;
  } catch (err) {
    // TODO (developer) - Handle exception
    console.log('Failed with error %s', err.message);
  }
};
// [END sheets_append_values]

// [START sheets_pivot_tables]
/**
 * Create pivot table
 * @param {string} spreadsheetId spreadsheet ID
 * @returns {*} pivot table's spreadsheet
 */
Snippets.prototype.pivotTable = (spreadsheetId) => {
  try {
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);

    // Create two sheets for our pivot table, assume we have one.
    let sheet = spreadsheet.getSheets()[0];
    sheet.copyTo(spreadsheet);

    const sourceSheetId = spreadsheet.getSheets()[0].getSheetId();
    const targetSheetId = spreadsheet.getSheets()[1].getSheetId();

    // Create pivot table
    const pivotTable = Sheets.newPivotTable();

    let gridRange = Sheets.newGridRange();
    gridRange.sheetId = sourceSheetId;
    gridRange.startRowIndex = 0;
    gridRange.startColumnIndex = 0;
    gridRange.endRowIndex = 20;
    gridRange.endColumnIndex = 7;
    pivotTable.source = gridRange;

    let pivotRows = Sheets.newPivotGroup();
    pivotRows.sourceColumnOffset = 1;
    pivotRows.showTotals = true;
    pivotRows.sortOrder = 'ASCENDING';
    pivotTable.rows = pivotRows;

    let pivotColumns = Sheets.newPivotGroup();
    pivotColumns.sourceColumnOffset = 4;
    pivotColumns.sortOrder = 'ASCENDING';
    pivotColumns.showTotals = true;
    pivotTable.columns = pivotColumns;

    let pivotValue = Sheets.newPivotValue();
    pivotValue.summarizeFunction = 'COUNTA';
    pivotValue.sourceColumnOffset = 4;
    pivotTable.values = [pivotValue];

    // Create other metadata for the updateCellsRequest
    let cellData = Sheets.newCellData();
    cellData.pivotTable = pivotTable;

    let rows = Sheets.newRowData();
    rows.values = cellData;

    let start = Sheets.newGridCoordinate();
    start.sheetId = targetSheetId;
    start.rowIndex = 0;
    start.columnIndex = 0;

    let updateCellsRequest = Sheets.newUpdateCellsRequest();
    updateCellsRequest.rows = rows;
    updateCellsRequest.start = start;
    updateCellsRequest.fields = 'pivotTable';

    // Batch update our spreadsheet
    let batchUpdate = Sheets.newBatchUpdateSpreadsheetRequest();
    let updateCellsRawRequest = Sheets.newRequest();
    updateCellsRawRequest.updateCells = updateCellsRequest;
    batchUpdate.requests = [updateCellsRawRequest];
    const response = Sheets.Spreadsheets.batchUpdate(batchUpdate,
      spreadsheetId);

    return response;
  } catch (err) {
    // TODO (developer) - Handle exception
    console.log('Failed with error %s', err.message);
  }
};
// [END sheets_pivot_tables]

// [START sheets_conditional_formatting]
/**
 * conditional formatting
 * @param {string} spreadsheetId spreadsheet ID
 * @returns {*} spreadsheet
 */
Snippets.prototype.conditionalFormatting = (spreadsheetId) => {
  try {
    let myRange = Sheets.newGridRange();
    myRange.sheetId = 0;
    myRange.startRowIndex = 0;
    myRange.endRowIndex = 11;
    myRange.startColumnIndex = 0;
    myRange.endColumnIndex = 4;

    // Request 1
    let rule1ConditionalValue = Sheets.newConditionValue();
    rule1ConditionalValue.userEnteredValue = '=GT($D2,median($D$2:$D$11))';

    let rule1ConditionFormat = Sheets.newCellFormat();
    rule1ConditionFormat.textFormat = Sheets.newTextFormat();
    rule1ConditionFormat.textFormat.foregroundColor = Sheets.newColor();
    rule1ConditionFormat.textFormat.foregroundColor.red = 0.8;

    let rule1Condition = Sheets.newBooleanCondition();
    rule1Condition.type = 'CUSTOM_FORMULA';
    rule1Condition.values = [rule1ConditionalValue];

    let rule1BooleanRule = Sheets.newBooleanRule();
    rule1BooleanRule.condition = rule1Condition;
    rule1BooleanRule.format = rule1ConditionFormat;

    let rule1 = Sheets.newConditionalFormatRule();
    rule1.ranges = [myRange];
    rule1.booleanRule = rule1BooleanRule;

    let request1 = Sheets.newRequest();
    let addConditionalFormatRuleRequest1 =
      Sheets.newAddConditionalFormatRuleRequest();
    addConditionalFormatRuleRequest1.rule = rule1;
    addConditionalFormatRuleRequest1.index = 0;
    request1.addConditionalFormatRule = addConditionalFormatRuleRequest1;

    // Request 2
    let rule2ConditionalValue = Sheets.newConditionValue();
    rule2ConditionalValue.userEnteredValue = '=LT($D2,median($D$2:$D$11))';

    let rule2ConditionFormat = Sheets.newCellFormat();
    rule2ConditionFormat.textFormat = Sheets.newTextFormat();
    rule2ConditionFormat.textFormat.foregroundColor = Sheets.newColor();
    rule2ConditionFormat.textFormat.foregroundColor.red = 1;
    rule2ConditionFormat.textFormat.foregroundColor.green = 0.4;
    rule2ConditionFormat.textFormat.foregroundColor.blue = 0.4;

    let rule2Condition = Sheets.newBooleanCondition();
    rule2Condition.type = 'CUSTOM_FORMULA';
    rule2Condition.values = [rule2ConditionalValue];

    let rule2BooleanRule = Sheets.newBooleanRule();
    rule2BooleanRule.condition = rule2Condition;
    rule2BooleanRule.format = rule2ConditionFormat;

    let rule2 = Sheets.newConditionalFormatRule();
    rule2.ranges = [myRange];
    rule2.booleanRule = rule2BooleanRule;

    let request2 = Sheets.newRequest();
    let addConditionalFormatRuleRequest2 =
      Sheets.newAddConditionalFormatRuleRequest();
    addConditionalFormatRuleRequest2.rule = rule2;
    addConditionalFormatRuleRequest2.index = 0;
    request2.addConditionalFormatRule = addConditionalFormatRuleRequest2;

    // Batch send the requests
    const requests = [request1, request2];
    let batchUpdate = Sheets.newBatchUpdateSpreadsheetRequest();
    batchUpdate.requests = requests;
    const response =
      Sheets.Spreadsheets.batchUpdate(batchUpdate, spreadsheetId);
    return response;
  } catch (err) {
    // TODO (developer) - Handle exception
    console.log('Failed with error %s', err.message);
  }
};
// [END sheets_conditional_formatting]
