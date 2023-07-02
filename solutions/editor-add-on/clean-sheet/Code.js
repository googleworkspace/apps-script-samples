// To learn how to use this script, refer to the documentation:
// https://developers.google.com/apps-script/add-ons/clean-sheet

/*
Copyright 2022 Google LLC

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

// Application Constants
const APP_TITLE = 'Clean sheet';

/**
 * Identifies and deletes empty rows in selected range of active sheet.
 * 
 * Cells that contain space characters are treated as non-empty.
 * The entire row, including the cells outside of the selected range,
 * must be empty to be deleted.
 *  
 * Called from menu option.
 */
function deleteEmptyRows() {

  const sheet = SpreadsheetApp.getActiveSheet();

  // Gets active selection and dimensions.
  let activeRange = sheet.getActiveRange();
  const rowCount = activeRange.getHeight();
  const firstActiveRow = activeRange.getRow();
  const columnCount = sheet.getMaxColumns();

  // Tests that the selection is a valid range.
  if (rowCount < 1) {
    showMessage('Select a valid range.');
    return;
  }
  // Tests active range isn't too large to process. Enforces limit set to 10k.
  if (rowCount > 10000) {
    showMessage("Selected range too large. Select up to 10,000 rows at one time.");
    return;
  }

  // Utilizes an array of values for efficient processing to determine blank rows.
  const activeRangeValues = sheet.getRange(firstActiveRow, 1, rowCount, columnCount).getValues();

  // Checks if array is all empty values.
  const valueFilter = value => value !== '';
  const isRowEmpty = (row) => {
    return row.filter(valueFilter).length === 0;
  }

  // Maps the range values as an object with value (to test) and corresponding row index (with offset from selection).
  const rowsToDelete = activeRangeValues.map((row, index) => ({ row, offset: index + activeRange.getRowIndex() }))
    .filter(item => isRowEmpty(item.row)) // Test to filter out non-empty rows.
    .map(item => item.offset); //Remap to include just the row indexes that will be removed.

  // Combines a sorted, ascending list of indexes into a set of ranges capturing consecutive values as start/end ranges.
  // Combines sequential empty rows for faster processing.
  const rangesToDelete = rowsToDelete.reduce((ranges, index) => {
    const currentRange = ranges[ranges.length - 1];
    if (currentRange && index === currentRange[1] + 1) {
      currentRange[1] = index;
      return ranges;
    }
    ranges.push([index, index]);
    return ranges;
  }, []);

  // Sends a list of row indexes to be deleted to the console.
  console.log(rangesToDelete);

  // Deletes the rows using REVERSE order to ensure proper indexing is used.
  rangesToDelete.reverse().forEach(([start, end]) => sheet.deleteRows(start, end - start + 1));
  SpreadsheetApp.flush();
}

/**
 * Removes blank columns in a selected range.
 * 
 * Cells containing Space characters are treated as non-empty.
 * The entire column, including cells outside of the selected range,
 * must be empty to be deleted.
 *   
 * Called from menu option.
 */
function deleteEmptyColumns() {

  const sheet = SpreadsheetApp.getActiveSheet();

  // Gets active selection and dimensions.
  let activeRange = sheet.getActiveRange();
  const rowCountMax = sheet.getMaxRows();
  const columnWidth = activeRange.getWidth();
  const firstActiveColumn = activeRange.getColumn();

  // Tests that the selection is a valid range.
  if (columnWidth < 1) {
    showMessage('Select a valid range.');
    return;
  }
  // Tests active range is not too large to process. Enforces limit set to 1k.
  if (columnWidth > 1000) {
    showMessage("Selected range too large. Select up to 10,000 rows at one time.");
    return;
  }

  // Utilizes an array of values for efficient processing to determine blank columns.
  const activeRangeValues = sheet.getRange(1, firstActiveColumn, rowCountMax, columnWidth).getValues();

  // Transposes the array of range values so it can be processed in order of columns.
  const activeRangeValuesTransposed = activeRangeValues[0].map((_, colIndex) => activeRangeValues.map(row => row[colIndex]));

  // Checks if array is all empty values.
  const valueFilter = value => value !== '';
  const isColumnEmpty = (column) => {
    return column.filter(valueFilter).length === 0;
  }

  // Maps the range values as an object with value (to test) and corresponding column index (with offset from selection).
  const columnsToDelete = activeRangeValuesTransposed.map((column, index) => ({ column, offset: index + firstActiveColumn}))
    .filter(item => isColumnEmpty(item.column)) // Test to filter out non-empty rows.
    .map(item => item.offset); //Remap to include just the column indexes that will be removed.

  // Combines a sorted, ascending list of indexes into a set of ranges capturing consecutive values as start/end ranges.
  // Combines sequential empty columns for faster processing.
  const rangesToDelete = columnsToDelete.reduce((ranges, index) => {
    const currentRange = ranges[ranges.length - 1];
    if (currentRange && index === currentRange[1] + 1) {
      currentRange[1] = index;
      return ranges;
    }
    ranges.push([index, index]);
    return ranges;
  }, []);

  // Sends a list of column indexes to be deleted to the console.
  console.log(rangesToDelete);

  // Deletes the columns using REVERSE order to ensure proper indexing is used.
  rangesToDelete.reverse().forEach(([start, end]) => sheet.deleteColumns(start, end - start + 1));
  SpreadsheetApp.flush();
}

/**
 * Trims all of the unused rows and columns outside of selected data range.
 * 
 * Called from menu option.
 */
function cropSheet() {
  const dataRange = SpreadsheetApp.getActiveSheet().getDataRange();
  const sheet = dataRange.getSheet();

  let numRows = dataRange.getNumRows();
  let numColumns = dataRange.getNumColumns();

  const maxRows = sheet.getMaxRows();
  const maxColumns = sheet.getMaxColumns();

  const numFrozenRows = sheet.getFrozenRows();
  const numFrozenColumns = sheet.getFrozenColumns();

  // If last data row is less than maximium row, then deletes rows after the last data row.
  if (numRows < maxRows) {
    numRows = Math.max(numRows, numFrozenRows + 1); // Don't crop empty frozen rows.
    sheet.deleteRows(numRows + 1, maxRows - numRows);
  }

  // If last data column is less than maximium column, then deletes columns after the last data column.
  if (numColumns < maxColumns) {
    numColumns = Math.max(numColumns, numFrozenColumns + 1); // Don't crop empty frozen columns.
    sheet.deleteColumns(numColumns + 1, maxColumns - numColumns);
  }
}

/**
 * Copies value of active cell to the blank cells beneath it. 
 * Stops at last row of the sheet's data range if only blank cells are encountered.
 * 
 * Called from menu option.
 */
function fillDownData() {

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // Gets sheet's active cell and confirms it's not empty.
  const activeCell = sheet.getActiveCell();
  const activeCellValue = activeCell.getValue();

  if (!activeCellValue) {
    showMessage("The active cell is empty. Nothing to fill.");
    return;
  }

  // Gets coordinates of active cell.
  const column = activeCell.getColumn();
  const row = activeCell.getRow();

  // Gets entire data range of the sheet.
  const dataRange = sheet.getDataRange();
  const dataRangeRows = dataRange.getNumRows();

  // Gets trimmed range starting from active cell to the end of sheet data range.
  const searchRange = dataRange.offset(row - 1, column - 1, dataRangeRows - row + 1, 1)
  const searchValues = searchRange.getDisplayValues();

  // Find the number of empty rows below the active cell.
  let i = 1; // Start at 1 to skip the ActiveCell.
  while (searchValues[i] && searchValues[i][0] == "") { i++; }

  // If blanks exist, fill the range with values.
  if (i > 1) {
    const fillRange = searchRange.offset(0, 0, i, 1).setValue(activeCellValue)
    //sheet.setActiveRange(fillRange) // Uncomment to test affected range.
  }
  else {
    showMessage("There are no empty cells below the Active Cell to fill.");
  }
}

/**
 * A helper function to display messages to user.
 * 
 * @param {string} message - Message to be displayed.
 * @param {string} caller - {Optional} text to append to title.
 */
function showMessage(message, caller) {

  // Sets the title using the APP_TITLE variable; adds optional caller string.
  const title = APP_TITLE
  if (caller != null) {
    title += ` : ${caller}`
  };

  const ui = SpreadsheetApp.getUi();
  ui.alert(title, message, ui.ButtonSet.OK);
}
