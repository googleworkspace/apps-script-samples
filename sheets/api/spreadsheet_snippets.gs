/**
 * Google Sheets API Snippets.
 */
function Snippets() {};

Snippets.prototype.create = function(title) {
  // [START sheets_create]
  // This code uses the Sheets Advanced Service, but for most use cases
  // the built-in method SpreadsheetApp.create() is more appropriate.
  var sheet = Sheets.newSpreadsheet();
  sheet.properties = Sheets.newSpreadsheetProperties();
  sheet.properties.title = title;
  var spreadsheet = Sheets.Spreadsheets.create(sheet);
  // [END sheets_create]
  return spreadsheet.spreadsheetId;
};

Snippets.prototype.batchUpdate = function(spreadsheetId, title, find,
                                          replacement) {
  // [START sheets_batch_update]
  // This code uses the Sheets Advanced Service, but for most use cases
  // the built-in method SpreadsheetApp.getActiveSpreadsheet()
  //     .getRange(range).setValues(values) is more appropriate.

  // Change the spreadsheet's title.
  var updateSpreadsheetPropertiesRequest = Sheets.newUpdateSpreadsheetPropertiesRequest();
  updateSpreadsheetPropertiesRequest.properties = Sheets.newSpreadsheetProperties();
  updateSpreadsheetPropertiesRequest.properties.title = title;
  updateSpreadsheetPropertiesRequest.fields = 'title';

  // Find and replace text.
  var findReplaceRequest = Sheets.newFindReplaceRequest();
  findReplaceRequest.find = find;
  findReplaceRequest.replacement = replacement;
  findReplaceRequest.allSheets = true;

  var requests = [Sheets.newRequest(), Sheets.newRequest()];
  requests[0].updateSpreadsheetProperties = updateSpreadsheetPropertiesRequest;
  requests[1].findReplace = findReplaceRequest;

  var batchUpdateRequest = Sheets.newBatchUpdateSpreadsheetRequest();
  batchUpdateRequest.requests = requests;

  // Add additional requests (operations)
  var result = Sheets.Spreadsheets.batchUpdate(batchUpdateRequest, spreadsheetId);
  // [END sheets_batch_update]
  return result;
};

Snippets.prototype.getValues = function(spreadsheetId, range) {
  // [START sheets_get_values]
  // This code uses the Sheets Advanced Service, but for most use cases
  // the built-in method SpreadsheetApp.getActiveSpreadsheet()
  //     .getRange(range).getValues(values) is more appropriate.
  var result = Sheets.Spreadsheets.Values.get(spreadsheetId, range);
  var numRows = result.values ? result.values.length : 0;
  // [END sheets_get_values]
  return result;
};

Snippets.prototype.batchGetValues = function(spreadsheetId, _ranges) {
  // [START sheets_batch_get_values]
  // This code uses the Sheets Advanced Service, but for most use cases
  // the built-in method SpreadsheetApp.getActiveSpreadsheet()
  //     .getRange(range).getValues(values) is more appropriate.
  var ranges = [
    // Range names ...
  ];
  // [START_EXCLUDE silent]
  ranges = _ranges;
  // [END_EXCLUDE]
  var result = Sheets.Spreadsheets.Values.batchGet(spreadsheetId, {ranges: ranges});
  // [END sheets_batch_get_values]
  return result;
};

Snippets.prototype.updateValues = function(spreadsheetId, range, valueInputOption,
                                           _values) {
  // [START sheets_update_values]
  // This code uses the Sheets Advanced Service, but for most use cases
  // the built-in method SpreadsheetApp.getActiveSpreadsheet()
  //     .getRange(range).setValues(values) is more appropriate.
  var values = [
    [
      // Cell values ...
    ]
    // Additional rows ...
  ];
  // [START_EXCLUDE silent]
  values = _values;
  // [END_EXCLUDE]
  var valueRange = Sheets.newValueRange();
  valueRange.values = values;
  var result = Sheets.Spreadsheets.Values.update(valueRange, spreadsheetId, range, {
    valueInputOption: valueInputOption
  });
  // [END sheets_update_values]
  return result;
};

Snippets.prototype.batchUpdateValues = function(spreadsheetId, range,
                                                valueInputOption, _values) {
  // [START sheets_batch_update_values]
  // This code uses the Sheets Advanced Service, but for most use cases
  // the built-in method SpreadsheetApp.getActiveSpreadsheet()
  //     .getRange(range).setValues(values) is more appropriate.
  var values = [
    [
      // Cell values ...
    ]
    // Additional rows ...
  ];
  // [START_EXCLUDE silent]
  values = _values;
  // [END_EXCLUDE]
  var valueRange = Sheets.newValueRange();
  valueRange.range = range;
  valueRange.values = values;

  var batchUpdateRequest = Sheets.newBatchUpdateValuesRequest();
  batchUpdateRequest.data = valueRange;
  batchUpdateRequest.valueInputOption = valueInputOption;

  var result = Sheets.Spreadsheets.Values.batchUpdate(batchUpdateRequest, spreadsheetId);
  // [END sheets_batch_update_values]
  return result;
};

Snippets.prototype.appendValues = function(spreadsheetId, range,
    valueInputOption, _values) {
  // [START sheets_append_values]
  var values = [
    [
      // Cell values ...
    ]
    // Additional rows ...
  ];
  // [START_EXCLUDE silent]
  values = _values;
  // [END_EXCLUDE]
  var valueRange = Sheets.newRowData();
  valueRange.values = values;

  var appendRequest = Sheets.newAppendCellsRequest();
  appendRequest.sheetId = spreadsheetId;
  appendRequest.rows = [valueRange];

  var result = Sheets.Spreadsheets.Values.append(valueRange, spreadsheetId, range, {
    valueInputOption: valueInputOption
  });
  // [END sheets_append_values]
  return result;
};

Snippets.prototype.pivotTable = function(spreadsheetId) {
  var spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  // [START sheets_pivot_table]
  // Create two sheets for our pivot table, assume we have one.
  var sheet = spreadsheet.getSheets()[0];
  sheet.copyTo(spreadsheet);

  var sourceSheetId = spreadsheet.getSheets()[0].getSheetId();
  var targetSheetId = spreadsheet.getSheets()[1].getSheetId();

  // Create pivot table
  var pivotTable = Sheets.newPivotTable();

  var gridRange = Sheets.newGridRange();
  gridRange.sheetId = sourceSheetId;
  gridRange.startRowIndex = 0;
  gridRange.startColumnIndex = 0;
  gridRange.endRowIndex = 20;
  gridRange.endColumnIndex = 7;
  pivotTable.source = gridRange;

  var pivotRows = Sheets.newPivotGroup();
  pivotRows.sourceColumnOffset = 1;
  pivotRows.showTotals = true;
  pivotRows.sortOrder = 'ASCENDING';
  pivotTable.rows = pivotRows;

  var pivotColumns = Sheets.newPivotGroup();
  pivotColumns.sourceColumnOffset = 4;
  pivotColumns.sortOrder = 'ASCENDING';
  pivotColumns.showTotals = true;
  pivotTable.columns = pivotColumns;

  var pivotValue = Sheets.newPivotValue();
  pivotValue.summarizeFunction = 'COUNTA';
  pivotValue.sourceColumnOffset = 4;
  pivotTable.values = [pivotValue];

  // Create other metadata for the updateCellsRequest
  var cellData = Sheets.newCellData();
  cellData.pivotTable = pivotTable;

  var rows = Sheets.newRowData();
  rows.values = cellData;

  var start = Sheets.newGridCoordinate();
  start.sheetId = targetSheetId;
  start.rowIndex = 0;
  start.columnIndex = 0;

  var updateCellsRequest = Sheets.newUpdateCellsRequest();
  updateCellsRequest.rows = rows;
  updateCellsRequest.start = start;
  updateCellsRequest.fields = 'pivotTable';

  // Batch update our spreadsheet
  var batchUpdate = Sheets.newBatchUpdateSpreadsheetRequest();
  var updateCellsRawRequest = Sheets.newRequest();
  updateCellsRawRequest.updateCells = updateCellsRequest;
  batchUpdate.requests = [updateCellsRawRequest];
  var response = Sheets.Spreadsheets.batchUpdate(batchUpdate, spreadsheetId);
  // [END sheets_pivot_table]
  return response;
};

Snippets.prototype.conditionalFormatting = function(spreadsheetId) {
  // [START sheets_conditional_formatting]
  var myRange = Sheets.newGridRange();
  myRange.sheetId = 0;
  myRange.startRowIndex = 0;
  myRange.endRowIndex = 11;
  myRange.startColumnIndex = 0;
  myRange.endColumnIndex = 4;

  // Request 1
  var rule1ConditionalValue = Sheets.newConditionValue();
  rule1ConditionalValue.userEnteredValue = '=GT($D2,median($D$2:$D$11))';

  var rule1ConditionFormat = Sheets.newCellFormat();
  rule1ConditionFormat.textFormat = Sheets.newTextFormat();
  rule1ConditionFormat.textFormat.foregroundColor = Sheets.newColor();
  rule1ConditionFormat.textFormat.foregroundColor.red = 0.8;

  var rule1Condition = Sheets.newBooleanCondition();
  rule1Condition.type = 'CUSTOM_FORMULA';
  rule1Condition.values = [rule1ConditionalValue];

  var rule1BooleanRule = Sheets.newBooleanRule();
  rule1BooleanRule.condition = rule1Condition;
  rule1BooleanRule.format = rule1ConditionFormat;

  var rule1 = Sheets.newConditionalFormatRule();
  rule1.ranges = [myRange];
  rule1.booleanRule = rule1BooleanRule;

  var request1 = Sheets.newRequest();
  var addConditionalFormatRuleRequest1 = Sheets.newAddConditionalFormatRuleRequest();
  addConditionalFormatRuleRequest1.rule = rule1;
  addConditionalFormatRuleRequest1.index = 0;
  request1.addConditionalFormatRule = addConditionalFormatRuleRequest1;

  // Request 2
  var rule2ConditionalValue = Sheets.newConditionValue();
  rule2ConditionalValue.userEnteredValue = '=LT($D2,median($D$2:$D$11))';

  var rule2ConditionFormat = Sheets.newCellFormat();
  rule2ConditionFormat.textFormat = Sheets.newTextFormat();
  rule2ConditionFormat.textFormat.foregroundColor = Sheets.newColor();
  rule2ConditionFormat.textFormat.foregroundColor.red = 1;
  rule2ConditionFormat.textFormat.foregroundColor.green = 0.4;
  rule2ConditionFormat.textFormat.foregroundColor.blue = 0.4;

  var rule2Condition = Sheets.newBooleanCondition();
  rule2Condition.type = 'CUSTOM_FORMULA';
  rule2Condition.values = [rule1ConditionalValue];

  var rule2BooleanRule = Sheets.newBooleanRule();
  rule2BooleanRule.condition = rule2Condition;
  rule2BooleanRule.format = rule2ConditionFormat;

  var rule2 = Sheets.newConditionalFormatRule();
  rule2.ranges = [myRange];
  rule2.booleanRule = rule2BooleanRule;

  var request2 = Sheets.newRequest();
  var addConditionalFormatRuleRequest2 = Sheets.newAddConditionalFormatRuleRequest();
  addConditionalFormatRuleRequest2.rule = rule2;
  addConditionalFormatRuleRequest2.index = 0;
  request2.addConditionalFormatRule = addConditionalFormatRuleRequest2;

  // Batch send the requests
  var requests = [request1, request2];
  var batchUpdate = Sheets.newBatchUpdateSpreadsheetRequest();
  batchUpdate.requests = requests;
  var response = Sheets.Spreadsheets.batchUpdate(batchUpdate, spreadsheetId);
  // [END sheets_conditional_formatting]
  return response;
};
