/**
 * Copyright Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// @see- https://developers.google.com/apps-script/guides/properties
/**
 * Save or set the property in each three property store.
 */
function saveSingleProperty() {
  // [START apps_script_property_service_save_data_single_value]
  try {
    // Set a property in each of the three property stores.
    const scriptProperties = PropertiesService.getScriptProperties();
    const userProperties = PropertiesService.getUserProperties();
    const documentProperties = PropertiesService.getDocumentProperties();

    scriptProperties.setProperty('SERVER_URL', 'http://www.example.com/');
    userProperties.setProperty('DISPLAY_UNITS', 'metric');
    documentProperties.setProperty('SOURCE_DATA_ID',
        '1j3GgabZvXUF177W0Zs_2v--H6SPCQb4pmZ6HsTZYT5k');
  } catch (err) {
    // TODO (developer) - Handle exception
    console.log('Failed with error %s', err.message);
  }
  // [END apps_script_property_service_save_data_single_value]
}

/**
 * Save the multiple script properties.
 */
function saveMultipleProperties() {
  // [START apps_script_property_service_save_data_multiple_value]
  try {
    // Set multiple script properties in one call.
    const scriptProperties = PropertiesService.getScriptProperties();
    scriptProperties.setProperties({
      'cow': 'moo',
      'sheep': 'baa',
      'chicken': 'cluck'
    });
  } catch (err) {
    // TODO (developer) - Handle exception
    console.log('Failed with error %s', err.message);
  }
  // [END apps_script_property_service_save_data_multiple_value]
}

/**
 * Read single value for user property.
 */
function readSingleProperty() {
  // [START apps_script_property_service_read_data_single_value]
  try {
    // Get the value for the user property 'DISPLAY_UNITS'.
    const userProperties = PropertiesService.getUserProperties();
    const units = userProperties.getProperty('DISPLAY_UNITS');
    console.log('values of units %s', units);
  } catch (err) {
    // TODO (developer) - Handle exception
    console.log('Failed with error %s', err.message);
  }
  // [END apps_script_property_service_read_data_single_value]
}

/**
 * Read the multiple script properties.
 */
function readAllProperties() {
  // [START apps_script_property_service_read_multiple_data_value]
  try {
    // Get multiple script properties in one call, then log them all.
    const scriptProperties = PropertiesService.getScriptProperties();
    const data = scriptProperties.getProperties();
    for (const key in data) {
      console.log('Key: %s, Value: %s', key, data[key]);
    }
  } catch (err) {
    // TODO (developer) - Handle exception
    console.log('Failed with error %s', err.message);
  }
  // [END apps_script_property_service_read_multiple_data_value]
}

/**
 * Update the user property value.
 */
function updateProperty() {
  // [START apps_script_property_service_modify_data]
  try {
    // Change the unit type in the user property 'DISPLAY_UNITS'.
    const userProperties = PropertiesService.getUserProperties();
    let units = userProperties.getProperty('DISPLAY_UNITS');
    units = 'imperial'; // Only changes local value, not stored value.
    userProperties.setProperty('DISPLAY_UNITS', units); // Updates stored value.
  } catch (err) {
    // TODO (developer) - Handle exception
    console.log('Failed with error %s', err.message);
  }
  // [END apps_script_property_service_modify_data]
}

/**
 * Delete the single user property.
 */
function deleteSingleProperty() {
  // [START apps_script_property_service_delete_data_single_value]
  try {
    // Delete the user property 'DISPLAY_UNITS'.
    const userProperties = PropertiesService.getUserProperties();
    userProperties.deleteProperty('DISPLAY_UNITS');
  } catch (err) {
    // TODO (developer) - Handle exception
    console.log('Failed with error %s', err.message);
  }
  // [END apps_script_property_service_delete_data_single_value]
}

/**
 * Delete all user properties in the current script.
 */
function deleteAllUserProperties() {
  // [START apps_script_property_service_delete_all_data]
  try {
    // Get user properties in the current script.
    const userProperties = PropertiesService.getUserProperties();
    // Delete all user properties in the current script.
    userProperties.deleteAllProperties();
  } catch (err) {
    // TODO (developer) - Handle exception
    console.log('Failed with error %s', err.message);
  }
  // [END apps_script_property_service_delete_all_data]
}
