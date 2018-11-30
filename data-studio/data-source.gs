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

// [START apps_script_data_studio_params]
var configParams = [
  {
    type: 'TEXTINPUT',
    name: 'ZipCode',
    displayName: 'ZIP Code',
    parameterControl: {
      allowOverride: true
    }
  },
  {
    type: 'SELECT_SINGLE',
    name: 'units',
    displayName: 'Units',
    parameterControl: {
      allowOverride: true
    },
    options: [
      {
        label: 'Metric',
        value: 'metric'
      },
      {
        label: 'Imperial',
        value: 'imperial'
      },
      {
        label: 'Kelvin',
        value: 'kelvin'
      }
    ]
  },
  {
    type: 'TEXTINPUT',
    name: 'Days',
    displayName: 'Days to forecast'
  }
];
// [END apps_script_data_studio_params]
