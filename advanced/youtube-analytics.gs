/**
 * Creates a spreadsheet containing daily view counts, watch-time metrics,
 * and new-subscriber counts for a channel's videos.
 */
 // [START createReport]
function createReport() {
  // Retrieve info about the user's YouTube channel.
  var channels = YouTube.Channels.list('id,contentDetails', {
    mine: true
  });
  var channelId = channels.items[0].id;

  // Retrieve analytics report for the channel.
  var oneMonthInMillis = 1000 * 60 * 60 * 24 * 30;
  var today = new Date();
  var lastMonth = new Date(today.getTime() - oneMonthInMillis);

  var metrics = [
    'views',
    'estimatedMinutesWatched',
    'averageViewDuration',
    'averageViewPercentage',
    'subscribersGained'
  ];
  var options = {
    dimensions: 'day',
    sort: 'day'
  };
  var result = YouTubeAnalytics.Reports.query('channel==' + channelId,
      formatDateString(lastMonth),
      formatDateString(today),
      metrics.join(','),
      options);

  if (result.rows) {
    var spreadsheet = SpreadsheetApp.create('YouTube Analytics Report');
    var sheet = spreadsheet.getActiveSheet();

    // Append the headers.
    var headers = result.columnHeaders.map(function(columnHeader) {
      return formatColumnName(columnHeader.name);
    });
    sheet.appendRow(headers);

    // Append the results.
    sheet.getRange(2, 1, result.rows.length, headers.length)
        .setValues(result.rows);

    Logger.log('Report spreadsheet created: %s',
        spreadsheet.getUrl());
  } else {
    Logger.log('No rows returned.');
  }
}

/*
 * Converts a Date object into a YYYY-MM-DD string.
 */
function formatDateString(date) {
  return Utilities.formatDate(date, Session.getTimeZone(), 'yyyy-MM-dd');
}

/*
 * Formats a column name into a more human-friendly name. For example
 * "averageViewPercentage" becomes "Average View Percentage".
 */
function formatColumnName(columnName) {
  var name = columnName.replace(/([a-z])([A-Z])/g, '$1 $2');
  name = name.slice(0, 1).toUpperCase() + name.slice(1);
  return name;
}
// [END createReport]
