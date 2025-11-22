// @ts-nocheck
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

// @ts-nocheck
var OAuth2 = undefined;

/**
 * @typedef {{
 *  setAuthorizationBaseUrl: (url: string) => Service,
 *  setTokenUrl: (url: string) => Service,
 *  setClientId: (id: string) => Service,
 *  setClientSecret: (secret: string) => Service,
 *  setCallbackFunction: (handler: string) => Service,
 *  setPropertyStore: (store: GoogleAppsScript.Properties.Properties) => Service,
 *  getAuthorizationUrl: () => string,
 *  reset: () => void,
 *  handleCallback: (request: Object<string, string>) => boolean,
 *  hasAccess: () => boolean,
 * }} Service
 */

/**
 * Return an OAuth service object to handle authorization for a specific
 * data source (such as an API resource). Makes use of the OAuth2 Apps
 * Script library:
 *   https://github.com/googlesamples/apps-script-oauth2
 * @return {Service} a service object associated with
 *   the specified resource.
 */
function getService() {
  if (typeof OAuth2 === 'undefined') {
    throw new Error('OAuth2 library not found. Have you added it?');
  }

  /* TODO: Fill in the following required parameters for your data source. */
  var service = OAuth2.createService('ENTER_SERVICE_NAME_HERE')
      .setAuthorizationBaseUrl('ENTER_BASE_URL_HERE')
      .setTokenUrl('ENTER_TOKEN_URL_HERE')
      .setClientId('ENTER_CLIENT_ID_HERE')
      .setClientSecret('ENTER_CLIENT_SECRET_HERE')
      .setCallbackFunction('authCallback')
      .setPropertyStore(PropertiesService.getUserProperties());

  /* TODO: Do any app-specific OAuth property setting here.
   * For details, see:
   *   https://github.com/googlesamples/apps-script-oauth2
   */

  return service;
}

/**
 * Example of a authorization callback function that is called after an
 * authorization attempt. Presents an authorization results window upon
 * completion of the API auth sequence. For additional details, see the
 * OAuth2 Apps Script library:
 *   https://github.com/googlesamples/apps-script-oauth2
 * @param {Object<string, string>} request results of API auth request.
 * @return {GoogleAppsScript.HTML.HtmlOutput} A auth callback HTML page.
 */
function authCallback(request) {
  var template = HtmlService.createTemplateFromFile('AuthCallbackView');
  template.user = Session.getEffectiveUser().getEmail();
  var service = getService();
  var authorized = service.handleCallback(request);
  template.isAuthorized = authorized;
  var title = authorized ? 'Access Granted' : 'Access Denied';
  template.title = title;
  return template.evaluate().setTitle(title);
}

/**
 * Builds and returns the API authorization URL from the service object.
 * @return {string} the API authorization URL.
 */
function getAuthorizationUrl() {
  return getService().getAuthorizationUrl();
}

/**
 * Resets the API service, forcing re-authorization before
 * additional authorization-required API calls can be made.
 */
function signout() {
  getService().reset();
}
