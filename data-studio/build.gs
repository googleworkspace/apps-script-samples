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

// [START apps_script_data_studio_build_get_config]
function getConfig() {
  var cc = DataStudioApp.createCommunityConnector();
  var config = cc.getConfig();

  config.newInfo()
      .setId('instructions')
      .setText('Enter npm package names to fetch their download count.');

  config.newTextInput()
      .setId('package')
      .setName('Enter a single package name.')
      .setHelpText('for example, googleapis or lighthouse')
      .setPlaceholder('googleapis')
      .setAllowOverride(true);

  config.setDateRangeRequired(true);

  return config.build();
}
// [END apps_script_data_studio_build_get_config]

// [START apps_script_data_studio_build_get_fields]
function getFields() {
  var cc = DataStudioApp.createCommunityConnector();
  var fields = cc.getFields();
  var types = cc.FieldType;
  var aggregations = cc.AggregationType;

  fields.newDimension()
      .setId('packageName')
      .setName('Package Name')
      .setType(types.TEXT);

  fields.newDimension()
      .setId('day')
      .setName('Day')
      .setType(types.YEAR_MONTH_DAY);

  fields.newMetric()
      .setId('downloads')
      .setName('Downloads')
      .setType(types.NUMBER)
      .setAggregation(aggregations.SUM);

  return fields;

}

function getSchema(request) {
  var fields = getFields().build();
  return { 'schema': fields };
}
// [END apps_script_data_studio_build_get_fields]

// [START apps_script_data_studio_build_get_data]
function responseToRows(requestedFields, response, packageName) {
  // Transform parsed data and filter for requested fields
  return response.map(function(dailyDownload) {
    var row = [];
    requestedFields.asArray().forEach(function (field) {
      switch (field.getId()) {
        case 'day':
          return row.push(dailyDownload.day.replace(/-/g, ''));
        case 'downloads':
          return row.push(dailyDownload.downloads);
        case 'packageName':
          return row.push(packageName);
        default:
          return row.push('');
      }
    });
    return { values: row };
  });
}

function getData(request) {
  var requestedFieldIds = request.fields.map(function(field) {
    return field.name;
  });
  var requestedFields = getFields().forIds(requestedFieldIds);

  // Fetch and parse data from API
  var url = [
    'https://api.npmjs.org/downloads/range/',
    request.dateRange.startDate,
    ':',
    request.dateRange.endDate,
    '/',
    request.configParams.package
  ];
  var response = UrlFetchApp.fetch(url.join(''));
  var parsedResponse = JSON.parse(response).downloads;
  var rows = responseToRows(requestedFields, parsedResponse, request.configParams.package);

  return {
    schema: requestedFields.build(),
    rows: rows
  };
}
// [END apps_script_data_studio_build_get_data]

// [START apps_script_data_studio_build_get_auth_type]
function getAuthType() {
  var response = { type: 'NONE' };
  return response;
}
// [END apps_script_data_studio_build_get_auth_type]
