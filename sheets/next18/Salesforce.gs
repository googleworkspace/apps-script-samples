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


/**
 * Creates an add-on menu, the main entry point for this add-on
 */
function onOpen() {
  SpreadsheetApp.getUi().createAddonMenu()
      .addItem('Login To Salesforce', 'login')
      .addItem('Run SOQL Query', 'promptQuery')
      .addSeparator()
      .addItem('Logout From Salesforce', 'logout')
      .addSeparator()
      .addItem('Generate Invoices', 'generateInvoices')
      .addItem('Generate Report', 'generateReport')
      .addToUi();
}

/** Ensure the menu is created when the add-on is installed */
function onInstall() {
  onOpen();
}

/**
 * If we dont have a Salesforce OAuth token, starts the OAuth flow with
 * Salesforce.
 */
function login() {
  var salesforce = getSalesforceService();
  if (!salesforce.hasAccess()) {
    showLinkDialog(salesforce.getAuthorizationUrl(),
        'Sign-in to Salesforce', 'Sign-in');
  }
}

/**
 * Displays a modal dialog with a simple HTML link that opens in a new tab.
 *
 * @param {string} url the URL to link to
 * @param {string} message the message to display to the user as a link
 * @param {string} title the title of the dialog
 */
function showLinkDialog(url, message, title) {
  var template = HtmlService.createTemplateFromFile('LinkDialog');
  template.url = url;
  template.message = message;
  SpreadsheetApp.getUi().showModalDialog(template.evaluate(), title);
}

/**
 * Creates a Salesforce OAuth2 service, using the Apps Script OAuth2 library:
 * https://github.com/googleworkspace/apps-script-oauth2
 *
 * @return {Object} a Salesforce OAuth2 service
 */
function getSalesforceService() {
  return OAuth2.createService('salesforce')
    .setAuthorizationBaseUrl(
        'https://login.salesforce.com/services/oauth2/authorize')
    .setTokenUrl('https://login.salesforce.com/services/oauth2/token')
    .setClientId(SALESFORCE_CLIENT_ID)
    .setClientSecret(SALESFORCE_CLIENT_SECRET)
    .setCallbackFunction('authCallback')
    .setPropertyStore(PropertiesService.getUserProperties());
}

/**
 * Authentication callback for OAuth2: called when Salesforce redirects back to
 * Apps Script after sign-in.
 *
 * @param {Object} request the HTTP request, provided by Apps Script
 * @return {Object} HTMLOutput to render the callback as a web page
 */
function authCallback(request) {
  var salesforce = getSalesforceService();
  var isAuthorized = salesforce.handleCallback(request);
  var message = isAuthorized ?
      'Success! You can close this tab and the dialog in Sheets.'
      : 'Denied. You can close this tab and the dialog in Sheets.';

  return HtmlService.createHtmlOutput(message);
}

/**
 * Prompts the user to enter a SOQL (Salesforce Object Query Language) query
 * to execute. If given, the query is run and its results are added as a new
 * sheet.
 */
function promptQuery() {
  var ui = SpreadsheetApp.getUi();
  var response = ui.prompt('Run SOQL Query',
      'Enter your query, ex: "select Id from Opportunity"',
      ui.ButtonSet.OK_CANCEL);
  var query = response.getResponseText();
  if (response.getSelectedButton() === ui.Button.OK) {
    executeQuery(query);
  }
}

/**
 * Executes the given SOQL query and copies its results to a new sheet.
 *
 * @param {string} query the SOQL to execute
 */
function executeQuery(query) {
  var response = fetchSoqlResults(query);
  var outputSheet = SpreadsheetApp.getActive().insertSheet();
  var records = response['records'];
  var fields = getFields(records[0]);

  // Builds the new sheet's contents as a 2D array that can be passed in
  // to setValues() at once. This gives better performance than updating
  // a single cell at a time.
  var outputValues = [];
  outputValues.push(fields);
  for (var i = 0; i < records.length; i++) {
    var row = [];
    var record = records[i];
    for (var j = 0; j < fields.length; j++) {
      var fieldName = fields[j];
      row.push(record[fieldName]);
    }
    outputValues.push(row);
  }

  outputSheet.getRange(1, 1, outputValues.length, fields.length)
      .setValues(outputValues);
}

/**
 * Makes an API call to Salesforce to execute a given SOQL query.
 *
 * @param {string} query the SOQL query to execute
 * @return {Object} the API response from Salesforce, as a parsed JSON object.
 */
function fetchSoqlResults(query) {
  var salesforce = getSalesforceService();
  if (!salesforce.hasAccess()) {
    throw new Error('Please login first');
  } else {
    var params = {
      'headers': {
        'Authorization': 'Bearer ' + salesforce.getAccessToken(),
        'Content-Type': 'application/json'
      }
    };
    var url = 'https://' + SALESFORCE_INSTANCE +
        '.salesforce.com/services/data/v30.0/query';
    var response = UrlFetchApp.fetch(url +
        '?q=' + encodeURIComponent(query), params);
    return JSON.parse(response.getContentText());
  }
}

/**
 * Parses the Salesforce response and extracts the list of field names in the
 * result set.
 *
 * @param {Object} record a single Salesforce response record
 * @return {Array<string>} an array of string keys of that record
 */
function getFields(record) {
  var fields = [];
  for (var field in record) {
    if (record.hasOwnProperty(field) && field !== 'attributes') {
      fields.push(field);
    }
  }
  return fields;
}

/** Resets the Salesforce service, removing any saved OAuth tokens. */
function logout() {
  getSalesforceService().reset();
}
