const filesToDelete = [];
/**
 * Helper methods for Google Sheets tests.
 */
function Helpers() {
  this.filesToDelete = [];
}

Helpers.prototype.reset = function () {
  this.filesToDelete = [];
};

Helpers.prototype.deleteFileOnCleanup = function (id) {
  this.filesToDelete.push(id);
};

Helpers.prototype.cleanup = () => {
  filesToDelete.forEach(Drive.Files.remove);
};

Helpers.prototype.createTestSpreadsheet = function () {
  const spreadsheet = SpreadsheetApp.create("Test Spreadsheet");
  for (let i = 0; i < 3; ++i) {
    spreadsheet.appendRow([1, 2, 3]);
  }
  this.deleteFileOnCleanup(spreadsheet.getId());
  return spreadsheet.getId();
};

Helpers.prototype.populateValues = (spreadsheetId) => {
  const batchUpdateRequest = Sheets.newBatchUpdateSpreadsheetRequest();
  const repeatCellRequest = Sheets.newRepeatCellRequest();

  const values = [];
  for (let i = 0; i < 10; ++i) {
    values[i] = [];
    for (let j = 0; j < 10; ++j) {
      values[i].push("Hello");
    }
  }
  const range = "A1:J10";
  SpreadsheetApp.openById(spreadsheetId).getRange(range).setValues(values);
  SpreadsheetApp.flush();
};
