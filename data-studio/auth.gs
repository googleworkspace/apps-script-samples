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

// [START apps_script_data_studio_get_auth_type_oauth2]
function getAuthType() {
  return {
    "type": "OAUTH2"
  };
}
// [END apps_script_data_studio_get_auth_type_oauth2]

// [START apps_script_data_studio_get_auth_type_user_pass]
function getAuthType() {
  return {
    "type": "USER_PASS"
    "helpUrl": "https://www.example.org/connector-auth-help"
  };
}
// [END apps_script_data_studio_get_auth_type_user_pass]

// [START apps_script_data_studio_get_auth_type_user_token]
function getAuthType() {
  return {
    "type": "USER_TOKEN"
    "helpUrl": "https://www.example.org/connector-auth-help"
  };
}
// [END apps_script_data_studio_get_auth_type_user_pass]

// [START apps_script_data_studio_get_auth_type_key]
function getAuthType() {
  return {
    "type": "KEY"
    "helpUrl": "https://www.example.org/connector-auth-help"
  };
}
// [END apps_script_data_studio_get_auth_type_key]

// [START apps_script_data_studio_get_auth_type_none]
function getAuthType() {
  return {
    "type": "NONE"
  };
}
// [END apps_script_data_studio_get_auth_type_none]

// [START apps_script_data_studio_auth_reset_oauth2]
function resetAuth() {
  getOAuthService().reset();
}
// [END apps_script_data_studio_auth_reset_oauth2]

// [START apps_script_data_studio_auth_reset_user]
function resetAuth() {
  var userProperties = PropertiesService.getUserProperties();
  userProperties.deleteProperty('dscc.username');
  userProperties.deleteProperty('dscc.password');
}
// [END apps_script_data_studio_auth_reset_user]

// [START apps_script_data_studio_auth_reset_user_token]
function resetAuth() {
  var user_tokenProperties = PropertiesService.getUserProperties();
  user_tokenProperties.deleteProperty('dscc.username');
  user_tokenProperties.deleteProperty('dscc.password');
}
// [END apps_script_data_studio_auth_reset_user_token]

// [START apps_script_data_studio_auth_reset_key]
function resetAuth() {
  var userProperties = PropertiesService.getUserProperties();
  userProperties.deleteProperty('dscc.key');
}
// [END apps_script_data_studio_auth_reset_key]

// [START apps_script_data_studio_auth_valid_oauth2]
function isAuthValid() {
  return getOAuthService().hasAccess();
}
// [END apps_script_data_studio_auth_valid_oauth2]

// [START apps_script_data_studio_auth_valid_user_pass]
function isAuthValid() {
  var userProperties = PropertiesService.getUserProperties();
  var userName = userProperties.getProperty('dscc.username');
  var password = userProperties.getProperty('dscc.password');
  // This assumes you have a validateCredentials function that
  // can validate if the userName and password are correct.
  return validateCredentials(userName, password);
}
// [END apps_script_data_studio_auth_valid_user_pass]


// [START apps_script_data_studio_auth_valid_user_token]
function isAuthValid() {
  var userProperties = PropertiesService.getUserProperties();
  var userName = userProperties.getProperty('dscc.username');
  var token = userProperties.getProperty('dscc.token');
  // This assumes you have a validateCredentials function that
  // can validate if the userName and token are correct.
  return validateCredentials(userName, token);
}
// [END apps_script_data_studio_auth_valid_user_token]

// [START apps_script_data_studio_auth_valid_key]
function isAuthValid() {
  var userProperties = PropertiesService.getUserProperties();
  var key = userProperties.getProperty('dscc.key');
  // This assumes you have a validateKey function that can validate
  // if the key is valid.
  return validateKey(key);
}
// [END apps_script_data_studio_auth_valid_key]

// [START apps_script_data_studio_auth_library]
function getOAuthService() {
  return OAuth2.createService('exampleService')
    .setAuthorizationBaseUrl('...')
    .setTokenUrl('...')
    .setClientId('...')
    .setClientSecret('...')
    .setPropertyStore(PropertiesService.getUserProperties())
    .setCallbackFunction('authCallback')
    .setScope('...');
};
// [END apps_script_data_studio_auth_library]

// [START apps_script_data_studio_auth_callback]
function authCallback(request) {
  var authorized = getOAuthService().handleCallback(request);
  if (authorized) {
    return HtmlService.createHtmlOutput('Success! You can close this tab.');
  } else {
    return HtmlService.createHtmlOutput('Denied. You can close this tab');
  };
};
// [END apps_script_data_studio_auth_callback]

// [START apps_script_data_studio_auth_urls]
function get3PAuthorizationUrls() {
  return getOAuthService().getAuthorizationUrl();
}
// [END apps_script_data_studio_auth_urls]

// [START apps_script_data_studio_auth_set_credentials_user_pass]
function setCredentials(request) {
  var creds = request.userPass;
  var username = creds.username;
  var password = creds.password;

  // Optional
  // Check if the provided username and password are valid through a
  // call to your service. You would have to have a `checkForValidCreds`
  // function defined for this to work.
  var validCreds = checkForValidCreds(username, password);
  if (!validCreds) {
    return {
      errorCode: "INVALID_CREDENTIALS"
    };
  }
  var userProperties = PropertiesService.getUserProperties();
  userProperties.setProperty('dscc.username', username);
  userProperties.setProperty('dscc.password', password);
  return {
    errorCode: "NONE"
  };
}
// [END apps_script_data_studio_auth_set_credentials_user_pass]

// [START apps_script_data_studio_auth_set_credentials_user_token]
function setCredentials(request) {
  var creds = request.userToken;
  var username = creds.username;
  var token = creds.token;

  // Optional
  // Check if the provided username and token are valid through a
  // call to your service. You would have to have a `checkForValidCreds`
  // function defined for this to work.
  var validCreds = checkForValidCreds(username, token);
  if (!validCreds) {
    return {
      errorCode: "INVALID_CREDENTIALS"
    };
  }
  var userProperties = PropertiesService.getUserProperties();
  userProperties.setProperty('dscc.username', username);
  userProperties.setProperty('dscc.token', token);
  return {
    errorCode: "NONE"
  };
}
// [END apps_script_data_studio_auth_set_credentials_user_token]

// [START apps_script_data_studio_auth_set_credentials_key]
function setCredentials(request) {
  var key = request.key;

  // Optional
  // Check if the provided key is valid through a call to your service.
  // You would have to have a `checkForValidKey` function defined for
  // this to work.
  var validKey = checkForValidKey(key);
  if (!validKey) {
    return {
      errorCode: "INVALID_CREDENTIALS"
    };
  }
  var userProperties = PropertiesService.getUserProperties();
  userProperties.setProperty('dscc.key', key);
  return {
    errorCode: "NONE"
  };
}
// [END apps_script_data_studio_auth_set_credentials_key]
