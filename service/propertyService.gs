// [START apps_script_property_service_save_data_1]
// Set a property in each of the three property stores.
var scriptProperties = PropertiesService.getScriptProperties();
var userProperties = PropertiesService.getUserProperties();
var documentProperties = PropertiesService.getDocumentProperties();

scriptProperties.setProperty('SERVER_URL', 'http://www.example.com/');
userProperties.setProperty('DISPLAY_UNITS', 'metric');
documentProperties.setProperty('SOURCE_DATA_ID', '1234567890abcdefghijklmnopqrstuvwxyz');
// [END apps_script_property_service_save_data_1]

// [START apps_script_property_service_save_data_2]
// Set multiple script properties in one call.
var scriptProperties = PropertiesService.getScriptProperties();
scriptProperties.setProperties({
  'cow': 'moo',
  'sheep': 'baa',
  'chicken': 'cluck'
});
// [END apps_script_property_service_save_data_2]

// [START apps_script_property_service_read_data_1]
// Get the value for the user property 'DISPLAY_UNITS'.
var userProperties = PropertiesService.getUserProperties();
var units = userProperties.getProperty('DISPLAY_UNITS');
// [END apps_script_property_service_read_data_1]

// [START apps_script_property_service_read_data_2]
// Get the value for the user property 'DISPLAY_UNITS'.
var userProperties = PropertiesService.getUserProperties();
var units = userProperties.getProperty('DISPLAY_UNITS');
// [END apps_script_property_service_read_data_2]

// [START apps_script_property_service_modify_data]
// Change the unit type in the user property 'DISPLAY_UNITS'.
var userProperties = PropertiesService.getUserProperties();
var units = userProperties.getProperty('DISPLAY_UNITS');
units = 'imperial'; // Only changes local value, not stored value.
userProperties.setProperty('DISPLAY_UNITS', units); // Updates stored value.
// [END apps_script_property_service_modify_data]

// [START apps_script_property_service_delete_data_1]
// Delete the user property 'DISPLAY_UNITS'.
var userProperties = PropertiesService.getUserProperties();
userProperties.deleteProperty('DISPLAY_UNITS');
// [END apps_script_property_service_delete_data_1]

// [START apps_script_property_service_delete_data_2]
// Delete all user properties in the current script.
var userProperties = PropertiesService.getUserProperties();
userProperties.deleteAllProperties();
// [END apps_script_property_service_delete_data_2]
