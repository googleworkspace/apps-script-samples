/**
 * Copyright 2021 Google LLC
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

  try {
    const metric = AnalyticsData.newMetric();
    metric.name = 'activeUsers';

    const dimension = AnalyticsData.newDimension();
    dimension.name = 'city';

    const dateRange = AnalyticsData.newDateRange();
    dateRange.startDate = '2020-03-31';
    dateRange.endDate = 'today';

    const request = AnalyticsData.newRunReportRequest();
    request.dimensions = [dimension];
    request.metrics = [metric];
    request.dateRanges = dateRange;

    const report = AnalyticsData.Properties.runReport(request,
        'properties/' + propertyId);
    if (!report.rows) {
      console.log('No rows returned.');
      return;
    }

    const spreadsheet = SpreadsheetApp.create('Google Analytics Report');
    const sheet = spreadsheet.getActiveSheet();

    // Append the headers.
    const dimensionHeaders = report.dimensionHeaders.map(
        (dimensionHeader) => {
          return dimensionHeader.name;
        });
    const metricHeaders = report.metricHeaders.map(
        (metricHeader) => {
          return metricHeader.name;
        });
    const headers = [...dimensionHeaders, ...metricHeaders];

    sheet.appendRow(headers);

    // Append the results.
    const rows = report.rows.map((row) => {
      const dimensionValues = row.dimensionValues.map(
          (dimensionValue) => {
            return dimensionValue.value;
          });
      const metricValues = row.metricValues.map(
          (metricValues) => {
            return metricValues.value;
          });
      return [...dimensionValues, ...metricValues];
    });

    sheet.getRange(2, 1, report.rows.length, headers.length)
        .setValues(rows);

    console.log('Report spreadsheet created: %s',
        spreadsheet.getUrl());
  } catch (e) {
    // TODO (Developer) - Handle exception
    console.log('Failed with error: %s', e.error);
  }
}
// [END apps_script_analyticsdata]
