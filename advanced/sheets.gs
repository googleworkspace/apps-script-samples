var spreadsheetId = "1LcjJcCdM6OGrJtJEkHegV-rH5bWZ-mCukEMMCKYtUkc";
var sheetId = 371977894;
var pivotSourceDataSheetId = 371977894;
var destinationSheetId = 1428299768;

/**
 * Read a range of data values.
 */
// [START readRange]
function readRange(spreadsheetId) {
  var response = Sheets.Spreadsheets.Values.get(spreadsheetId, "Sheet1!A1:D5");
  Logger.log(response.values);
}
// [END readRange]

/**
 * Write to multiple, disjoint data ranges.
 */
// [START writeToMultipleRanges]
function writeToMultipleRanges(spreadsheetId) {
  // Specify some values to write to the sheet.
  var columnAValues = [
    ["Item", "Wheel", "Door", "Engine"]
  ];
  var rowValues = [
    ["Cost", "Stocked", "Ship Date"],
    ["$20.50", "4", "3/1/2016"]
  ];

  var request = {
    "valueInputOption": "USER_ENTERED",
    "data": [
      {
        "range": "Sheet1!A1:A4",
        "majorDimension": "COLUMNS",
        "values": columnAValues
      },
      {
        "range": "Sheet1!B1:D2",
        "majorDimension": "ROWS",
        "values": rowValues
      }
    ]
  };

  var response = Sheets.Spreadsheets.Values.batchUpdate(request, spreadsheetId);
  Logger.log(response);
}
// [END writeToMultipleRanges]

/**
 * Add a new sheet.
 */
// [START addSheet]
function addSheet(spreadsheetId) {
  var requests = [{
    "addSheet": {
      "properties": {
        "title": "Deposits",
        "gridProperties": {
          "rowCount": 20,
          "columnCount": 12
        },
        "tabColor": {
          "red": 1.0,
          "green": 0.3,
          "blue": 0.4
        }
      }
    }
  }];

  var response =
      Sheets.Spreadsheets.batchUpdate({'requests': requests}, spreadsheetId);
  Logger.log("Created sheet with ID: " +
      response.replies[0].addSheet.properties.sheetId);
}
// [END addSheet]

/**
 * Add a pivot table.
 */
// [START addPivotTable]
function addPivotTable(
    spreadsheetId, pivotSourceDataSheetId, destinationSheetId) {
  var requests = [{
    "updateCells": {
      "rows": {
        "values": [
          {
            "pivotTable": {
              "source": {
                "sheetId": pivotSourceDataSheetId,
                "startRowIndex": 0,
                "startColumnIndex": 0,
                "endRowIndex": 20,
                "endColumnIndex": 7
              },
              "rows": [
                {
                  "sourceColumnOffset": 0,
                  "showTotals": true,
                  "sortOrder": "ASCENDING",
                  "valueBucket": {
                    "buckets": [
                      {
                        "stringValue": "West"
                      }
                    ]
                  }
                },
                {
                  "sourceColumnOffset": 1,
                  "showTotals": true,
                  "sortOrder": "DESCENDING",
                  "valueBucket": {}
                }
              ],
              "columns": [
                {
                  "sourceColumnOffset": 4,
                  "sortOrder": "ASCENDING",
                  "showTotals": true,
                  "valueBucket": {}
                }
              ],
              "values": [
                {
                  "summarizeFunction": "SUM",
                  "sourceColumnOffset": 3
                }
              ],
              "valueLayout": "HORIZONTAL"
            }
          }
        ]
      },
      "start": {
        "sheetId": destinationSheetId,
        "rowIndex": 49,
        "columnIndex": 0
      },
      "fields": "pivotTable"
    }
  }];

  var response =
      Sheets.Spreadsheets.batchUpdate({'requests': requests}, spreadsheetId);
  // The Pivot table will appear anchored to cell A50 of the destination sheet.
}
// [END addPivotTable]
