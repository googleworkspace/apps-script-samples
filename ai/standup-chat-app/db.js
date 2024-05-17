/*
Copyright 2024 Google LLC

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

/** @typedef {object} Message
 * @property {string} name
 * @property {string} text
 * @property {object} sender
 * @property {string} sender.type
 * @property {string} sender.name
 * @property {object[]} annotations
 * @property {number} annotations.startIndex
 * @property {string} annotations.type
 * @property {object} annotations.userMention
 * @property {number} annotations.length
 * @property {string} formattedText
 * @property {string} createTime
 * @property {string} argumentText
 * @property {object} thread
 * @property {string} thread.name
 * @property {object} space
 * @property {string} space.name
 */


class DB {
  /**
   * params {String} spreadsheetId
   */
  constructor(spreadsheetId) {
    this.spreadsheetId = spreadsheetId;
    this.sheetName = "Messages";

  }

  /**
   * @returns {SpreadsheetApp.Sheet}
   */
  get sheet() {
    const spreadsheet = SpreadsheetApp.openById(this.spreadsheetId);
    let sheet = spreadsheet.getSheetByName(this.sheetName);

    // create if it does not exist
    if (sheet == undefined) {
      sheet = spreadsheet.insertSheet();
      sheet.setName(this.sheetName)
    }

    return sheet;
  }

  /**
   * @returns {Message|undefined}
   */
  get last() {
    const lastRow = this.sheet.getLastRow()
    if (lastRow === 0) return;
    return JSON.parse(this.sheet.getSheetValues(lastRow, 1, 1, 2)[0][1]);
  }


  /**
   * @params {Chat_v1.Chat.V1.Schema.Message} message
   */
  append(message) {
    this.sheet.appendRow([message.name, JSON.stringify(message, null, 2)]);
  }

}


/**
 * Test function for DB Object
 */
function testDB() {
  const db = new DB(SPREADSHEET_ID);

  let thread = db.last;
  if (thread == undefined) return;
  console.log(thread)

  db.rowOffset = 1;
  thread = db.last;
  if (thread == undefined) return;
  console.log(thread)
}
