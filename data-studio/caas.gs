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

// [START apps_script_data_studio_caas_example]
var sqlString = '' +
    'SELECT ' +
    '  _TABLE_SUFFIX AS yyyymm, ' +
    '  ROUND(SUM(IF(fcp.start < @fast_fcp, fcp.density, 0)), 4) AS fast_fcp, ' +
    '  ROUND(SUM(IF(fcp.start >= 1000 AND fcp.start < 3000, fcp.density, 0)), 4) AS avg_fcp, ' +
    '  ROUND(SUM(IF(fcp.start >= 3000, fcp.density, 0)), 4) AS slow_fcp ' +
    'FROM ' +
    '  `chrome-ux-report.all.*`, ' +
    '  UNNEST(first_contentful_paint.histogram.bin) AS fcp ' +
    'WHERE ' +
    '  origin = @url ' +
    'GROUP BY ' +
    '  yyyymm ' +
    'ORDER BY ' +
    '  yyyymm ';

/**
 * Gets the config.
 * @param {object} request The request.
 * @return {Config} The Community Connector config.
 */
function getConfig(request) {
  var cc = DataStudioApp.createCommunityConnector();
  var config = cc.getConfig();

  config.newTextInput()
      .setId('projectId')
      .setName('BigQuery Billing Project ID')
      .setPlaceholder('556727765207');

  config.newTextInput()
      .setId('url')
      .setName('Enter your url')
      .setAllowOverride(true)
      .setPlaceholder('www.example.com');

  config.setDateRangeRequired(true);

  return config.build();
}

/**
 * Gets the fields.
 * @param {object} request The request.
 * @return {Fields} The Community Connector fields.
 */
function getFields() {
  var cc = DataStudioApp.createCommunityConnector();
  var fields = cc.getFields();
  var types = cc.FieldType;

  fields.newDimension()
      .setId('yyyymm')
      .setName('yyyymm')
      .setType(types.YEAR_MONTH);

  fields.newMetric()
      .setId('fast_fcp')
      .setName('fast_fcp')
      .setType(types.NUMBER);

  fields.newMetric()
      .setId('avg_fcp')
      .setName('avg_fcp')
      .setType(types.NUMBER);

  fields.newMetric()
      .setId('slow_fcp')
      .setName('slow_fcp')
      .setType(types.NUMBER);

  return fields;
}

/**
 * Gets the schema.
 * @param {object} request
 * @return {object} The connector's schema.
 */
function getSchema(request) {
  return {
    schema: getFields().build()
  };
}

/**
 * Gets the connector's data.
 * @param {object} request The request.
 * @return {object} The data response.
 */
function getData(request) {
  var url = (request.configParams && request.configParams.url);
  var projectId = (request.configParams && request.configParams.projectId);
  var authToken = ScriptApp.getOAuthToken();
  var response = {
    dataConfig: {
      type: 'BIGQUERY',
      bigQueryConnectorConfig: {
        billingProjectId: projectId,
        query: sqlString,
        useStandardSql: true,
        queryParameters: [{
          name: 'url',
          parameterType: {
            type: 'STRING'
          },
          parameterValue: {
            value: url
          }
        }, {
          name: 'fast_fcp',
          parameterType: {
            type: 'INT64'
          },
          parameterValue: {
            value: '' + 1000
          }
        }]
      }
    },
    authConfig: {
      accessToken: authToken
    }
  };
  return response;
}

/**
 * Gets the auth type.
 * @return {object} The auth type.
 */
function getAuthType() {
  var cc = DataStudioApp.createCommunityConnector();
  return cc.newAuthTypeResponse()
      .setAuthType(cc.AuthType.NONE)
      .build();
}
// [END apps_script_data_studio_caas_example]
