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
// [START apps_script_analyticsdata]
/**
 * Runs a report of a Google Analytics 4 property ID. Creates a sheet with the
 * report.
 */
function runReport() {
  /**
   * TODO(developer): Uncomment this variable and replace with your
   *   Google Analytics 4 property ID before running the sample.
   */
  const propertyId = 'YOUR-GA4-PROPERTY-ID';

  var metric = AnalyticsData.newMetric();
  metric.name = 'activeUsers';

  var dimension = AnalyticsData.newDimension();
  dimension.name = 'city';

  var dateRange = AnalyticsData.newDateRange();
  dateRange.startDate = '2020-03-31';
  dateRange.endDate = 'today';

  var request = AnalyticsData.newRunReportRequest();
  request.dimensions = [ dimension ];
  request.metrics = [ metric ];
  request.dateRanges = dateRange;

  var report = AnalyticsData.Properties.runReport(request,
                                                  'properties/' + propertyId);
  if (report.rows) {
    var spreadsheet = SpreadsheetApp.create('Google Analytics Report');
    var sheet = spreadsheet.getActiveSheet();

    // Append the headers.
    var dimensionHeaders = report.dimensionHeaders.map(
      function(dimensionHeader) {
        return dimensionHeader.name;
    });
    var metricHeaders = report.metricHeaders.map(
      function(metricHeader) {
        return metricHeader.name;
    });
    var headers = [ ...dimensionHeaders, ...metricHeaders];

    sheet.appendRow(headers);

    // Append the results.
    var rows = report.rows.map( function(row) {
      var dimensionValues = row.dimensionValues.map(
        function(dimensionValue) {
          return dimensionValue.value;
      });
      var metricValues = row.metricValues.map(
        function(metricValues) {
          return metricValues.value;
      });
      return [ ...dimensionValues, ...metricValues];
    });

    sheet.getRange(2, 1, report.rows.length, headers.length)
        .setValues(rows);

    Logger.log('Report spreadsheet created: %s',
        spreadsheet.getUrl());
  } else {
    Logger.log('No rows returned.');
  }
}
// [END apps_script_analyticsdata]
