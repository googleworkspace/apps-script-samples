/**
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Return an array of potential columns (identifiers to locate them in
 * the data response object and the labels to use as column headers).
 * @return {Array} list of potential columns.
 */
function getColumnOptions() {
  var columns = [];

  // TODO: Replace this section, adding a column entry for each data of
  // interest. id should be an identifier that can be used to locate
  // the data in the data request response, and label should be the name
  // to associate with that data in the UI.
  columns.push({id: 'DATA_ITEM1_ID', label: 'Data Item 1 label'});
  columns.push({id: 'DATA_ITEM2_ID', label: 'Data Item 2 label'});
  columns.push({id: 'DATA_ITEM3_ID', label: 'Data Item 3 label'});

  return columns;
}

/**
 * Return a page of results from the data source as a 2D array of
 * values (with columns corresponding to the columns specified). Return
 * null if no data exists for the specified pageNumber.
 * @param {Array} columns an array of Strings specifying the column ids
 *   to include in the output.
 * @param {Number} pageNumber a number indicating what page of data to
 *   retrieve from the data source.
 * @param {Number} pageSize a number indicating the maximum number of
 *   rows to return per call.
 * @param {Object} opt_settings optional object containing any additional
 *   information needed to retrieve data from the data source.
 */
function getDataPage(columns, pageNumber, pageSize, opt_settings) {
  var data = null;
  /**
   * TODO: This function needs to be implemented based on the particular
   * details of the data source you are extracting data from. For example,
   * you might request a page of data from an API using OAuth2 credentials
   * similar to this:
   *
   * var service = getService(); // Be sure to configure the Auth.gs code
   *
   * // Build the appropriate API URL based on the parameters (pageNumber,
   * // pageSize, and opt_settings).
   * var url = '...';
   * var response = UrlFetchApp.fetch(url, {
   *   headers: {
   *     Authorization: 'Bearer ' + service.getAccessToken(),
   *     // Include any API-required headers needed for the call
   *   }
   * });
   *
   * // Given the response, construct the appropriate data output. Return
   * // null if there is no data for the specified page.
   * if (noData(response)) {
   *   return null;
   * }
   * data = [];
   *
   * // Iterate over each relevant data item in the API response and build
   * // a data row for it containing the data specified by columns
   * // (in the same column order). Add each data row to data.
   *
   */

   return data;
}
