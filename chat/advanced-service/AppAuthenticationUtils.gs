/**
 * Copyright 2024 Google LLC
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

// [START chat_authentication_utils]

// This script provides configuration and helper functions for app authentication.
// It may require modifications to work in your environment.

// For more information on app authentication, see
// https://developers.google.com/workspace/chat/authenticate-authorize-chat-app

const APP_AUTH_OAUTH_SCOPES = ['https://www.googleapis.com/auth/chat.bot'];
// Warning: This example uses a service account private key, it should always be stored in a
// secure location.
const SERVICE_ACCOUNT = {
  // TODO(developer): Replace with the Google Chat credentials to use for app authentication,
  // the service account private key's JSON.
};

/**
 * Authenticates the app service by using the OAuth2 library.
 *
 * @return {Object} the authenticated app service
 */
function getService_() {
  return OAuth2.createService(SERVICE_ACCOUNT.client_email)
    .setTokenUrl(SERVICE_ACCOUNT.token_uri)
    .setPrivateKey(SERVICE_ACCOUNT.private_key)
    .setIssuer(SERVICE_ACCOUNT.client_email)
    .setSubject(SERVICE_ACCOUNT.client_email)
    .setScope(APP_AUTH_OAUTH_SCOPES)
    .setCache(CacheService.getUserCache())
    .setLock(LockService.getUserLock())
    .setPropertyStore(PropertiesService.getScriptProperties());
}

/**
 * Generates headers with the app credentials to use to make Google Chat API calls.
 *
 * @return {Object} the header with credentials
 */
function getHeaderWithAppCredentials() {
  return {
    'Authorization': `Bearer ${getService_().getAccessToken()}`
  };
}

// [END chat_authentication_utils]
