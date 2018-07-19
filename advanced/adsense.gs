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
// [START apps_script_adsense_list_ad_clients]
/**
 * Logs a lists Ad clients.
 */
function listAdClients() {
  // Retrieve ad client list in pages and log data as we receive it.
  var pageToken;
  var adClients;
  do {
    adClients = AdSense.Adclients.list({
      maxResults: 50,
      pageToken: pageToken,
    });
    if (adClients.items) {
      for (var i = 0; i < adClients.items.length; i++) {
        var adClient = adClients.items[i];
        Logger.log('Ad client for product "%s" with ID "%s" was found.',
            adClient.productCode, adClient.id);
        Logger.log('Supports reporting: %s',
            adClient.supportsReporting ? 'Yes' : 'No');
      }
    } else {
      Logger.log('No ad clients found.');
    }
    pageToken = adClients.nextPageToken;
  } while (pageToken);
}
// [END apps_script_adsense_list_ad_clients]

// [START apps_script_adsense_list_ad_units]
/**
 * Lists ad units.
 * @param  {string} adClientId The ad client ID.
 */
function listAdUnits(adClientId) {
  var pageToken;
  var adUnits;
  do {
    adUnits = AdSense.Adunits.list(adClientId, {
      maxResults: 50,
      pageToken: pageToken,
    });
    if (adUnits.items) {
      for (var i = 0; i < adUnits.items.length; i++) {
        var unit = adUnits.items[i];
        Logger.log('Ad unit with code "%s" and name "%s" was found.',
            unit.code, unit.name);
      }
    } else {
      Logger.log('No ad units found.');
    }

    pageToken = adUnits.nextPageToken;
  } while (pageToken);
}
// [END apps_script_adsense_list_ad_units]

// [START apps_script_adsense_generate_report]
/**
 * Generates a spreadsheet report for an ad client.
 * @param {string} adClientId The ad client ID
 */
function generateReport(adClientId) {
  // Prepare report.
  var today = new Date();
  var oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

  var timezone = Session.getTimeZone();
  var startDate = Utilities.formatDate(oneWeekAgo, timezone, 'yyyy-MM-dd');
  var endDate = Utilities.formatDate(today, timezone, 'yyyy-MM-dd');

  var report = AdSense.Reports.generate(startDate, endDate, {
    // Specify the desired ad client using a filter.
    filter: ['AD_CLIENT_ID==' + escapeFilterParameter(adClientId)],
    metric: ['PAGE_VIEWS', 'AD_REQUESTS', 'AD_REQUESTS_COVERAGE', 'CLICKS',
             'AD_REQUESTS_CTR', 'COST_PER_CLICK', 'AD_REQUESTS_RPM',
             'EARNINGS'],
    dimension: ['DATE'],
    // Sort by ascending date.
    sort: ['+DATE'],
  });

  if (report.rows) {
    var spreadsheet = SpreadsheetApp.create('AdSense Report');
    var sheet = spreadsheet.getActiveSheet();

    // Append the headers.
    var headers = report.headers.map(function(header) {
      return header.name;
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

/**
 * Escape special characters for a parameter being used in a filter.
 * @param {string} parameter The parameter to be escaped.
 * @return {string} The escaped parameter.
 */
function escapeFilterParameter(parameter) {
  return parameter.replace('\\', '\\\\').replace(',', '\\,');
}
// [END apps_script_adsense_generate_report]
