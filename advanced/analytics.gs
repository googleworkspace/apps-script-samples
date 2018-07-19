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
// [START apps_script_analytics_accounts]
/**
 * Lists Analytics accounts.
 */
function listAccounts() {
  var accounts = Analytics.Management.Accounts.list();
  if (accounts.items && accounts.items.length) {
    for (var i = 0; i < accounts.items.length; i++) {
      var account = accounts.items[i];
      Logger.log('Account: name "%s", id "%s".', account.name, account.id);

      // List web properties in the account.
      listWebProperties(account.id);
    }
  } else {
    Logger.log('No accounts found.');
  }
}

/**
 * Lists web properites for an Analytics account.
 * @param  {string} accountId The account ID.
 */
function listWebProperties(accountId) {
  var webProperties = Analytics.Management.Webproperties.list(accountId);
  if (webProperties.items && webProperties.items.length) {
    for (var i = 0; i < webProperties.items.length; i++) {
      var webProperty = webProperties.items[i];
      Logger.log('\tWeb Property: name "%s", id "%s".', webProperty.name,
          webProperty.id);

      // List profiles in the web property.
      listProfiles(accountId, webProperty.id);
      }
  } else {
    Logger.log('\tNo web properties found.');
  }
}

/**
 * Logs a list of Analytics accounts profiles.
 * @param  {string} accountId     The Analytics account ID
 * @param  {string} webPropertyId The web property ID
 */
function listProfiles(accountId, webPropertyId) {
  // Note: If you experience "Quota Error: User Rate Limit Exceeded" errors
  // due to the number of accounts or profiles you have, you may be able to
  // avoid it by adding a Utilities.sleep(1000) statement here.

  var profiles = Analytics.Management.Profiles.list(accountId,
      webPropertyId);
  if (profiles.items && profiles.items.length) {
    for (var i = 0; i < profiles.items.length; i++) {
      var profile = profiles.items[i];
      Logger.log('\t\tProfile: name "%s", id "%s".', profile.name,
          profile.id);
    }
  } else {
    Logger.log('\t\tNo web properties found.');
  }
}
// [END apps_script_analytics_accounts]

// [START apps_script_analytics_reports]
/**
 * Runs a report of an Analytics profile ID. Creates a sheet with the report.
 * @param  {string} profileId The profile ID.
 */
function runReport(profileId) {
  var today = new Date();
  var oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

  var startDate = Utilities.formatDate(oneWeekAgo, Session.getScriptTimeZone(),
      'yyyy-MM-dd');
  var endDate = Utilities.formatDate(today, Session.getScriptTimeZone(),
      'yyyy-MM-dd');

  var tableId = 'ga:' + profileId;
  var metric = 'ga:visits';
  var options = {
    'dimensions': 'ga:source,ga:keyword',
    'sort': '-ga:visits,ga:source',
    'filters': 'ga:medium==organic',
    'max-results': 25,
  };
  var report = Analytics.Data.Ga.get(tableId, startDate, endDate, metric,
      options);

  if (report.rows) {
    var spreadsheet = SpreadsheetApp.create('Google Analytics Report');
    var sheet = spreadsheet.getActiveSheet();

    // Append the headers.
    var headers = report.columnHeaders.map(function(columnHeader) {
      return columnHeader.name;
    });
    sheet.appendRow(headers);

    // Append the results.
    sheet.getRange(2, 1, report.rows.length, headers.length)
        .setValues(report.rows);

    Logger.log('Report spreadsheet created: %s',
        spreadsheet.getUrl());
  } else {
    Logger.log('No rows returned.');
  }
}
// [END apps_script_analytics_reports]
