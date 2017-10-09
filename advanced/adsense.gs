// [START listAdClients]
function listAdClients() {
  // Retrieve ad client list in pages and log data as we receive it.
  var pageToken, adClients;
  do {
    adClients = AdSense.Adclients.list({
      maxResults: 50,
      pageToken: pageToken
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
// [END listAdClients]

// [START listAdUnits]
function listAdUnits(adClientId) {
  var pageToken, adUnits;
  do {
    adUnits = AdSense.Adunits.list(adClientId, {
      maxResults: 50,
      pageToken: pageToken
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
// [END listAdUnits]

// [START generateReport]
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
    sort: ['+DATE']
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
 * @param parameter the parameter to be escaped.
 * @return the escaped parameter.
 */
function escapeFilterParameter(parameter) {
  return parameter.replace('\\', '\\\\').replace(',', '\\,');
}
// [END generateReport]
