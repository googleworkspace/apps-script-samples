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
// [START apps_script_dcbm_list_queries]
/**
 * Logs all of the queries available in the account.
 */
function listQueries() {
  // Retrieve the list of available queries
  try {
    const queries = DoubleClickBidManager.Queries.list();

    if (queries.queries) {
      // Print out the ID and name of each
      for (let i = 0; i < queries.queries.length; i++) {
        const query = queries.queries[i];
        console.log(
          'Found query with ID %s and name "%s".',
          query.queryId,
          query.metadata.title,
        );
      }
    }
  } catch (e) {
    // TODO (Developer) - Handle exception
    console.log("Failed with error: %s", e.error);
  }
}
// [END apps_script_dcbm_list_queries]

// [START apps_script_dcbm_create_and_run_query]
/**
 * Create and run a new DBM Query
 */
function createAndRunQuery() {
  let result;
  let execution;
  //We leave the default date range blank for the report run to
  //use the value defined during query creation
  const defaultDateRange = {};
  const partnerId = "1234567"; //Replace with your Partner ID
  const query = {
    metadata: {
      title: "Apps Script Example Report",
      dataRange: {
        range: "YEAR_TO_DATE",
      },
      format: "CSV",
    },
    params: {
      type: "STANDARD",
      groupBys: [
        "FILTER_PARTNER",
        "FILTER_PARTNER_NAME",
        "FILTER_ADVERTISER",
        "FILTER_ADVERTISER_NAME",
      ],
      filters: [{ type: "FILTER_PARTNER", value: partnerId }],
      metrics: ["METRIC_IMPRESSIONS"],
    },
    schedule: {
      frequency: "ONE_TIME",
    },
  };

  try {
    result = DoubleClickBidManager.Queries.create(query);
    if (result.queryId) {
      console.log(
        'Created query with ID %s and name "%s".',
        result.queryId,
        result.metadata.title,
      );
      execution = DoubleClickBidManager.Queries.run(
        defaultDateRange,
        result.queryId,
      );
      if (execution.key) {
        console.log(
          'Created query report with query ID %s and report ID "%s".',
          execution.key.queryId,
          execution.key.reportId,
        );
      }
    }
  } catch (e) {
    // TODO (Developer) - Handle exception
    console.log(e);
    console.log("Failed with error: %s", e.error);
  }
}
// [END apps_script_dcbm_create_and_run_query]

// [START apps_script_dcbm_fetch_report]
/**
 * Fetches a report file
 */
function fetchReport() {
  const queryId = "1234567"; // Replace with your query ID.
  const orderBy = "key.reportId desc";

  try {
    const report = DoubleClickBidManager.Queries.Reports.list(queryId, {
      orderBy: orderBy,
    });
    if (report.reports) {
      const firstReport = report.reports[0];
      if (firstReport.metadata.status.state === "DONE") {
        const reportFile = UrlFetchApp.fetch(
          firstReport.metadata.googleCloudStoragePath,
        );
        console.log("Printing report content to log...");
        console.log(reportFile.getContentText());
      } else {
        console.log(
          "Report status is %s, and is not available for download",
          firstReport.metadata.status.state,
        );
      }
    }
  } catch (e) {
    // TODO (Developer) - Handle exception
    console.log(e);
    console.log("Failed with error: %s", e.error);
  }
}
// [END apps_script_dcbm_fetch_report]
