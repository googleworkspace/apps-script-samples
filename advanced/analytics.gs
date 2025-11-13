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
  try {
    const accounts = Analytics.Management.Accounts.list();
    if (!accounts.items || !accounts.items.length) {
      console.log('No accounts found.');
      return;
    }

    for (let i = 0; i < accounts.items.length; i++) {
      const account = accounts.items[i];
      console.log('Account: name "%s", id "%s".', account.name, account.id);

      // List web properties in the account.
      listWebProperties(account.id);
    }
  } catch (e) {
    // TODO (Developer) - Handle exception
    console.log('Failed with error: %s', e.error);
  }
}

/**
 * Lists web properites for an Analytics account.
 * @param  {string} accountId The account ID.
 */
function listWebProperties(accountId) {
  try {
    const webProperties = Analytics.Management.Webproperties.list(accountId);
    if (!webProperties.items || !webProperties.items.length) {
      console.log('\tNo web properties found.');
      return;
    }
    for (let i = 0; i < webProperties.items.length; i++) {
      const webProperty = webProperties.items[i];
      console.log('\tWeb Property: name "%s", id "%s".',
          webProperty.name, webProperty.id);

      // List profiles in the web property.
      listProfiles(accountId, webProperty.id);
    }
  } catch (e) {
    // TODO (Developer) - Handle exception
    console.log('Failed with error: %s', e.error);
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
  try {
    const profiles = Analytics.Management.Profiles.list(accountId,
        webPropertyId);

    if (!profiles.items || !profiles.items.length) {
      console.log('\t\tNo web properties found.');
      return;
    }
    for (let i = 0; i < profiles.items.length; i++) {
      const profile = profiles.items[i];
      console.log('\t\tProfile: name "%s", id "%s".', profile.name,
          profile.id);
    }
  } catch (e) {
    // TODO (Developer) - Handle exception
    console.log('Failed with error: %s', e.error);
  }
}
// [END apps_script_analytics_accounts]

// [START apps_script_analytics_reports]
/**
 * Runs a report of an Analytics profile ID. Creates a sheet with the report.
 * @param  {string} profileId The profile ID.
 */
function runReport(profileId) {
  const today = new Date();
  const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

  const startDate = Utilities.formatDate(oneWeekAgo, Session.getScriptTimeZone(),
      'yyyy-MM-dd');
  const endDate = Utilities.formatDate(today, Session.getScriptTimeZone(),
      'yyyy-MM-dd');

  const tableId = 'ga:' + profileId;
  const metric = 'ga:visits';
  const options = {
    'dimensions': 'ga:source,ga:keyword',
    'sort': '-ga:visits,ga:source',
    'filters': 'ga:medium==organic',
    'max-results': 25
  };
  const report = Analytics.Data.Ga.get(tableId, startDate, endDate, metric,
      options);

  if (!report.rows) {
    console.log('No rows returned.');
    return;
  }

  const spreadsheet = SpreadsheetApp.create('Google Analytics Report');
  const sheet = spreadsheet.getActiveSheet();

  // Append the headers.
  const headers = report.columnHeaders.map((columnHeader) => {
    return columnHeader.name;
  });
  sheet.appendRow(headers);

  // Append the results.
  sheet.getRange(2, 1, report.rows.length, headers.length)
      .setValues(report.rows);

  console.log('Report spreadsheet created: %s',
      spreadsheet.getUrl());
}
// [END apps_script_analytics_reports]
