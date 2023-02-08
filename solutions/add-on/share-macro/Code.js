// To learn how to use this script, refer to the documentation:
// https://developers.devsite.corp.google.com/apps-script/add-ons/share-macro

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

/**
 * Uses Apps Script API to copy source Apps Script project 
 * to destination Google Spreadsheet container.
 * 
 * @param {string} sourceScriptId - Script ID of the source project.
 * @param {string} targetSpreadsheetUrl - URL if the target spreadsheet.
 * @return {Card[]} - Card indicating successful copy.
 */
function shareMacro_(sourceScriptId, targetSpreadsheetUrl) {

  // Gets the source project content using the Apps Script API.
  const sourceProject = APPS_SCRIPT_API.get(sourceScriptId);
  const sourceFiles = APPS_SCRIPT_API.getContent(sourceScriptId);

  // Opens the target spreadsheet and gets its ID.
  const parentSSId = SpreadsheetApp.openByUrl(targetSpreadsheetUrl).getId();

  // Creates an Apps Script project that's bound to the target spreadsheet.
  const targetProjectObj = APPS_SCRIPT_API.create(sourceProject.title, parentSSId);

  // Updates the Apps Script project with the source project content.
  APPS_SCRIPT_API.updateContent(targetProjectObj.scriptId, sourceFiles);

}

/**
 * Function that encapsulates Apps Script API project manipulation. 
*/
const APPS_SCRIPT_API = {
  accessToken: ScriptApp.getOAuthToken(),

  /* APPS_SCRIPT_API.get
   * Gets Apps Script source project.
   * @param {string} scriptId - Script ID of the source project.
   * @return {Object} - JSON representation of source project.
   */
  get: function (scriptId) {
    const url = ('https://script.googleapis.com/v1/projects/' + scriptId);
    const options = {
      "method": 'get',
      "headers": {
        "Authorization": "Bearer " + this.accessToken
      },
      "muteHttpExceptions": true,
    };
    const res = UrlFetchApp.fetch(url, options);
    if (res.getResponseCode() == 200) {
      return JSON.parse(res);
    } else {
      console.log('An error occurred gettting the project details');
      console.log(res.getResponseCode());
      console.log(res.getContentText());
      console.log(res);
      return false;
    }
  },

  /* APPS_SCRIPT_API.create
   * Creates new Apps Script project in the target spreadsheet.
   * @param {string} title - Name of Apps Script project.
   * @param {string} parentId - Internal ID of target spreadsheet.
   * @return {Object} - JSON representation completed project creation.
   */
  create: function (title, parentId) {
    const url = 'https://script.googleapis.com/v1/projects';
    const options = {
      "headers": {
        "Authorization": "Bearer " + this.accessToken,
        "Content-Type": "application/json"
      },
      "muteHttpExceptions": true,
      "method": "POST",
      "payload": { "title": title }
    }
    if (parentId) {
      options.payload.parentId = parentId;
    }
    options.payload = JSON.stringify(options.payload);
    let res = UrlFetchApp.fetch(url, options);
    if (res.getResponseCode() == 200) {
      res = JSON.parse(res);
      return res;
    } else {
      console.log("An error occurred while creating the project");
      console.log(res.getResponseCode());
      console.log(res.getContentText());
      console.log(res);
      return false;
    }
  },
   /* APPS_SCRIPT_API.getContent
   * Gets the content of the source Apps Script project.
   * @param {string} scriptId - Script ID of the source project.
   * @return {Object} - JSON representation of Apps Script project content.
   */
   getContent: function (scriptId) {
    const url = "https://script.googleapis.com/v1/projects/" + scriptId + "/content";
    const options = {
      "method": 'get',
      "headers": {
        "Authorization": "Bearer " + this.accessToken
      },
      "muteHttpExceptions": true,
    };
    let res = UrlFetchApp.fetch(url, options);
    if (res.getResponseCode() == 200) {
      res = JSON.parse(res);
      return res['files'];
    } else {
      console.log('An error occurred obtaining the content from the source script');
      console.log(res.getResponseCode());
      console.log(res.getContentText());
      console.log(res);
      return false;
    }
  },

  /* APPS_SCRIPT_API.updateContent
   * Updates (copies) content from source to target Apps Script project.
   * @param {string} scriptId - Script ID of the source project.
   * @param {Object} files - JSON representation of Apps Script project content.
   * @return {boolean} - Result status of the function.
   */
  updateContent: function (scriptId, files) {
    const url = "https://script.googleapis.com/v1/projects/" + scriptId + "/content";
    const options = {
      "method": 'put',
      "headers": {
        "Authorization": "Bearer " + this.accessToken
      },
      "contentType": "application/json",
      "payload": JSON.stringify({ "files": files }),
      "muteHttpExceptions": true,
    };
    let res = UrlFetchApp.fetch(url, options);
    if (res.getResponseCode() == 200) {
      return true;
    } else {
      console.log(`An error occurred updating content of script ${scriptId}`);
      console.log(res.getResponseCode());
      console.log(res.getContentText());
      console.log(res);
      return false;
    }
  }
}