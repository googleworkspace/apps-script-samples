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
/**
 * Returns the Auth Type of this connector.
 * @return {object} The Auth type.
 */
function getAuthType() {
  var cc = DataStudioApp.createCommunityConnector();
  return cc.newAuthTypeResponse()
      .setAuthType(cc.AuthType.OAUTH2)
      .build();
}
// [END apps_script_data_studio_get_auth_type_oauth2]

// [START apps_script_data_studio_get_auth_type_path_user_pass]
/**
 * Returns the Auth Type of this connector.
 * @return {object} The Auth type.
 */
function getAuthType() {
  var cc = DataStudioApp.createCommunityConnector();
  return cc.newAuthTypeResponse()
      .setAuthType(cc.AuthType.PATH_USER_PASS)
      .setHelpUrl('https://www.example.org/connector-auth-help')
      .build();
}
// [END apps_script_data_studio_get_auth_type_path_user_pass]

// [START apps_script_data_studio_get_auth_type_user_pass]
/**
 * Returns the Auth Type of this connector.
 * @return {object} The Auth type.
 */
function getAuthType() {
  var cc = DataStudioApp.createCommunityConnector();
  return cc.newAuthTypeResponse()
      .setAuthType(cc.AuthType.USER_PASS)
      .setHelpUrl('https://www.example.org/connector-auth-help')
      .build();
}
// [END apps_script_data_studio_get_auth_type_user_pass]

// [START apps_script_data_studio_get_auth_type_user_token]
/**
 * Returns the Auth Type of this connector.
 * @return {object} The Auth type.
 */
function getAuthType() {
  var cc = DataStudioApp.createCommunityConnector();
  return cc.newAuthTypeResponse()
      .setAuthType(cc.AuthType.USER_TOKEN)
      .setHelpUrl('https://www.example.org/connector-auth-help')
      .build();
}
// [END apps_script_data_studio_get_auth_type_user_token]

// [START apps_script_data_studio_get_auth_type_key]
/**
 * Returns the Auth Type of this connector.
 * @return {object} The Auth type.
 */
function getAuthType() {
  var cc = DataStudioApp.createCommunityConnector();
  return cc.newAuthTypeResponse()
      .setAuthType(cc.AuthType.KEY)
      .setHelpUrl('https://www.example.org/connector-auth-help')
      .build();
}
// [END apps_script_data_studio_get_auth_type_key]

// [START apps_script_data_studio_get_auth_type_none]
/**
 * Returns the Auth Type of this connector.
 * @return {object} The Auth type.
 */
function getAuthType() {
  var cc = DataStudioApp.createCommunityConnector();
  return cc.newAuthTypeResponse()
      .setAuthType(cc.AuthType.NONE)
      .build();
}
// [END apps_script_data_studio_get_auth_type_none]

// [START apps_script_data_studio_auth_reset_oauth2]
/**
 * Resets the auth service.
 */
function resetAuth() {
  getOAuthService().reset();
}
// [END apps_script_data_studio_auth_reset_oauth2]

// [START apps_script_data_studio_auth_reset_path_user]
/**
 * Resets the auth service.
 */
function resetAuth() {
  var userProperties = PropertiesService.getUserProperties();
  userProperties.deleteProperty('dscc.path');
  userProperties.deleteProperty('dscc.username');
  userProperties.deleteProperty('dscc.password');
}
// [END apps_script_data_studio_auth_reset_path_user]

// [START apps_script_data_studio_auth_reset_user]
/**
 * Resets the auth service.
 */
function resetAuth() {
  var userProperties = PropertiesService.getUserProperties();
  userProperties.deleteProperty('dscc.username');
  userProperties.deleteProperty('dscc.password');
}
// [END apps_script_data_studio_auth_reset_user]

// [START apps_script_data_studio_auth_reset_user_token]
/**
 * Resets the auth service.
 */
function resetAuth() {
  var userTokenProperties = PropertiesService.getUserProperties();
  userTokenProperties.deleteProperty('dscc.username');
  userTokenProperties.deleteProperty('dscc.password');
}
// [END apps_script_data_studio_auth_reset_user_token]

// [START apps_script_data_studio_auth_reset_key]
/**
 * Resets the auth service.
 */
function resetAuth() {
  var userProperties = PropertiesService.getUserProperties();
  userProperties.deleteProperty('dscc.key');
}
// [END apps_script_data_studio_auth_reset_key]

// [START apps_script_data_studio_auth_valid_oauth2]
/**
 * Returns true if the auth service has access.
 * @return {boolean} True if the auth service has access.
 */
function isAuthValid() {
  return getOAuthService().hasAccess();
}
// [END apps_script_data_studio_auth_valid_oauth2]

// [START apps_script_data_studio_auth_valid_path_user_pass]
/**
 * Returns true if the auth service has access.
 * @return {boolean} True if the auth service has access.
 */
function isAuthValid() {
  var userProperties = PropertiesService.getUserProperties();
  var path = userProperties.getProperty('dscc.path');
  var userName = userProperties.getProperty('dscc.username');
  var password = userProperties.getProperty('dscc.password');
  // This assumes you have a validateCredentials function that
  // can validate if the userName and password are correct.
  return validateCredentials(path, userName, password);
}
// [END apps_script_data_studio_auth_valid_path_user_pass]

// [START apps_script_data_studio_auth_valid_user_pass]
/**
 * Returns true if the auth service has access.
 * @return {boolean} True if the auth service has access.
 */
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
/**
 * Returns true if the auth service has access.
 * @return {boolean} True if the auth service has access.
 */
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
/**
 * Returns true if the auth service has access.
 * @return {boolean} True if the auth service has access.
 */
function isAuthValid() {
  var userProperties = PropertiesService.getUserProperties();
  var key = userProperties.getProperty('dscc.key');
  // This assumes you have a validateKey function that can validate
  // if the key is valid.
  return validateKey(key);
}
// [END apps_script_data_studio_auth_valid_key]

// [START apps_script_data_studio_auth_library]
/**
 * Returns the configured OAuth Service.
 * @return {Service} The OAuth Service
 */
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
/**
 * The OAuth callback.
 * @param {object} request The request data received from the OAuth flow.
 * @return {HtmlOutput} The HTML output to show to the user.
 */
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
/**
 * Gets the 3P authorization URL.
 * @return {string} The authorization URL.
 * @see https://developers.google.com/apps-script/reference/script/authorization-info
 */
function get3PAuthorizationUrls() {
  return getOAuthService().getAuthorizationUrl();
}
// [END apps_script_data_studio_auth_urls]

// [START apps_script_data_studio_auth_set_credentials_path_user_pass]
/**
 * Sets the credentials.
 * @param {Request} request The set credentials request.
 * @return {object} An object with an errorCode.
 */
function setCredentials(request) {
  var creds = request.userPass;
  var path = creds.path;
  var username = creds.username;
  var password = creds.password;

  // Optional
  // Check if the provided path, username and password are valid through
  // a call to your service. You would have to have a `checkForValidCreds`
  // function defined for this to work.
  var validCreds = checkForValidCreds(path, username, password);
  if (!validCreds) {
    return {
      errorCode: 'INVALID_CREDENTIALS'
    };
  }
  var userProperties = PropertiesService.getUserProperties();
  userProperties.setProperty('dscc.path', path);
  userProperties.setProperty('dscc.username', username);
  userProperties.setProperty('dscc.password', password);
  return {
    errorCode: 'NONE'
  };
}
// [END apps_script_data_studio_auth_set_credentials_path_user_pass]

// [START apps_script_data_studio_auth_set_credentials_user_pass]
/**
 * Sets the credentials.
 * @param {Request} request The set credentials request.
 * @return {object} An object with an errorCode.
 */
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
      errorCode: 'INVALID_CREDENTIALS'
    };
  }
  var userProperties = PropertiesService.getUserProperties();
  userProperties.setProperty('dscc.username', username);
  userProperties.setProperty('dscc.password', password);
  return {
    errorCode: 'NONE'
  };
}
// [END apps_script_data_studio_auth_set_credentials_user_pass]

// [START apps_script_data_studio_auth_set_credentials_user_token]
/**
 * Sets the credentials.
 * @param {Request} request The set credentials request.
 * @return {object} An object with an errorCode.
 */
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
      errorCode: 'INVALID_CREDENTIALS'
    };
  }
  var userProperties = PropertiesService.getUserProperties();
  userProperties.setProperty('dscc.username', username);
  userProperties.setProperty('dscc.token', token);
  return {
    errorCode: 'NONE'
  };
}
// [END apps_script_data_studio_auth_set_credentials_user_token]

// [START apps_script_data_studio_auth_set_credentials_key]
/**
 * Sets the credentials.
 * @param {Request} request The set credentials request.
 * @return {object} An object with an errorCode.
 */
function setCredentials(request) {
  var key = request.key;

  // Optional
  // Check if the provided key is valid through a call to your service.
  // You would have to have a `checkForValidKey` function defined for
  // this to work.
  var validKey = checkForValidKey(key);
  if (!validKey) {
    return {
      errorCode: 'INVALID_CREDENTIALS'
    };
  }
  var userProperties = PropertiesService.getUserProperties();
  userProperties.setProperty('dscc.key', key);
  return {
    errorCode: 'NONE'
  };
}
// [END apps_script_data_studio_auth_set_credentials_key]
