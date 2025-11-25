// Copyright 2021 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// Global constants. Customize as needed.
const formsAPIUrl = 'https://forms.googleapis.com/v1/forms/';
const formId = '<YOUR_FORM_ID>';
const topicName = 'projects/<YOUR_TOPIC_PATH>';

// To setup pub/sub topics, see: 
//   https://cloud.google.com/pubsub/docs/building-pubsub-messaging-system

/**
 * Forms API Method: forms.create
 * POST https://forms.googleapis.com/v1/forms
 * @param {string} title The title of the new form.
 * @return {string} The form object as a JSON string.
 */
function create(title) {
  const accessToken = ScriptApp.getOAuthToken();
  const jsonTitle = JSON.stringify({
    info: {
      title: title,
    },
  });

  const options = {
    headers: {
      Authorization: 'Bearer ' + accessToken,
    },
    method: /** @type {GoogleAppsScript.URL_Fetch.HttpMethod} */ ('post'),
    contentType: 'application/json',
    payload: jsonTitle,
  };

  console.log('Forms API POST options was: ' + JSON.stringify(options));
  const response = UrlFetchApp.fetch(formsAPIUrl, options);
  console.log('Response from Forms API was: ' + JSON.stringify(response));

  return response.getContentText();
}

/**
 * Forms API Method: forms.get
 * GET https://forms.googleapis.com/v1/forms/{formId}/responses/{responseId}
 * @param {string} formId The ID of the form to get.
 * @return {string} The form object as a JSON string.
 */
function get(formId) {
  const accessToken = ScriptApp.getOAuthToken();

  const options = {
    headers: {
      Authorization: 'Bearer ' + accessToken,
      Accept: 'application/json',
    },
    method: /** @type {GoogleAppsScript.URL_Fetch.HttpMethod} */ ('get'),
  };

  const response = UrlFetchApp.fetch(formsAPIUrl + formId, options);
  console.log('Response from Forms API was: ' + response);
  return response.getContentText();
}

/**
 * Forms API Method: forms.batchUpdate
 * POST https://forms.googleapis.com/v1/forms/{formId}:batchUpdate
 * @param {string} formId The ID of the form to update.
 * @return {number} The response code.
 */
function batchUpdate(formId) {
  const accessToken = ScriptApp.getOAuthToken();

  // Request body to add a description to a Form
  const update = {
    requests: [
      {
        updateFormInfo: {
          info: {
            description:
              'Please complete this quiz based on this week\'s ' +
              'readings for class.',
          },
          updateMask: 'description',
        },
      },
    ],
  };

  const options = {
    headers: {
      Authorization: 'Bearer ' + accessToken,
    },
    method: /** @type {GoogleAppsScript.URL_Fetch.HttpMethod} */ ('post'),
    contentType: 'application/json',
    payload: JSON.stringify(update),
    muteHttpExceptions: true,
  };

  const response = UrlFetchApp.fetch(
      formsAPIUrl + formId + ':batchUpdate',
      options,
  );
  console.log('Response code from API: ' + response.getResponseCode());
  return response.getResponseCode();
}

/**
 * Forms API Method: forms.responses.get
 * GET https://forms.googleapis.com/v1/forms/{formId}/responses/{responseId}
 * @param {string} formId The form ID.
 * @param {string} responseId The response ID.
 * @return {string} The response object as a JSON string.
 */
function responsesGet(formId, responseId) {
  const accessToken = ScriptApp.getOAuthToken();

  const options = {
    headers: {
      Authorization: 'Bearer ' + accessToken,
      Accept: 'application/json',
    },
    method: /** @type {GoogleAppsScript.URL_Fetch.HttpMethod} */ ('get'),
  };

  const response = UrlFetchApp.fetch(
      formsAPIUrl + formId + '/' + 'responses/' + responseId,
      options,
  );
  console.log('Response from Forms.responses.get was: ' + response);
  return response.getContentText();
}

/**
 * Forms API Method: forms.responses.list
 * GET https://forms.googleapis.com/v1/forms/{formId}/responses
 * @param {string} formId The form ID.
 * @return {string} The response object as a JSON string.
 */
function responsesList(formId) {
  const accessToken = ScriptApp.getOAuthToken();

  const options = {
    headers: {
      Authorization: 'Bearer ' + accessToken,
      Accept: 'application/json',
    },
    method: /** @type {GoogleAppsScript.URL_Fetch.HttpMethod} */ ('get'),
  };

  const response = UrlFetchApp.fetch(
      formsAPIUrl + formId + '/' + 'responses',
      options,
  );
  console.log('Response from Forms.responses was: ' + response);
  return response.getContentText();
}

/**
 * Forms API Method: forms.watches.create
 * POST https://forms.googleapis.com/v1/forms/{formId}/watches
 * @param {string} formId The form ID.
 * @return {string} The watch object as a JSON string.
 */
function createWatch(formId) {
  const accessToken = ScriptApp.getOAuthToken();

  const myWatch = {
    watch: {
      target: {
        topic: {
          topicName: topicName,
        },
      },
      eventType: 'RESPONSES',
    },
  };
  console.log('myWatch is: ' + JSON.stringify(myWatch));

  const options = {
    headers: {
      Authorization: 'Bearer ' + accessToken,
    },
    method: /** @type {GoogleAppsScript.URL_Fetch.HttpMethod} */ ('post'),
    contentType: 'application/json',
    payload: JSON.stringify(myWatch),
    muteHttpExceptions: false,
  };
  console.log('options are: ' + JSON.stringify(options));
  console.log('formsAPIURL was: ' + formsAPIUrl);

  const response = UrlFetchApp.fetch(
      formsAPIUrl + formId + '/' + 'watches',
      options,
  );
  console.log(response);
  return response.getContentText();
}

/**
 * Forms API Method: forms.watches.delete
 * DELETE https://forms.googleapis.com/v1/forms/{formId}/watches/{watchId}
 * @param {string} formId The form ID.
 * @param {string} watchId The watch ID.
 * @return {string} The response as a JSON string.
 */
function deleteWatch(formId, watchId) {
  const accessToken = ScriptApp.getOAuthToken();

  console.log('formsAPIUrl is: ' + formsAPIUrl);

  const options = {
    headers: {
      Authorization: 'Bearer ' + accessToken,
      Accept: 'application/json',
    },
    method: /** @type {GoogleAppsScript.URL_Fetch.HttpMethod} */ ('delete'),
    muteHttpExceptions: false,
  };

  const response = UrlFetchApp.fetch(
      formsAPIUrl + formId + '/' + 'watches/' + watchId,
      options,
  );
  console.log(response);
  return response.getContentText();
}

/**
 * Forms API Method: forms.watches.list
 * GET https://forms.googleapis.com/v1/forms/{formId}/watches
 * @param {string} formId The form ID.
 * @return {string} The response as a JSON string.
 */
function watchesList(formId) {
  console.log('formId is: ' + formId);
  const accessToken = ScriptApp.getOAuthToken();
  const options = {
    headers: {
      Authorization: 'Bearer ' + accessToken,
      Accept: 'application/json',
    },
    method: /** @type {GoogleAppsScript.URL_Fetch.HttpMethod} */ ('get'),
  };
  const response = UrlFetchApp.fetch(
      formsAPIUrl + formId + '/' + 'watches',
      options,
  );
  console.log(response);
  return response.getContentText();
}

/**
 * Forms API Method: forms.watches.renew
 * POST https://forms.googleapis.com/v1/forms/{formId}/watches/{watchId}:renew
 * @param {string} formId The form ID.
 * @param {string} watchId The watch ID.
 * @return {string} The watch object as a JSON string.
 */
function renewWatch(formId, watchId) {
  const accessToken = ScriptApp.getOAuthToken();

  const options = {
    headers: {
      Authorization: 'Bearer ' + accessToken,
      Accept: 'application/json',
    },
    method: /** @type {GoogleAppsScript.URL_Fetch.HttpMethod} */ ('post'),
  };

  const response = UrlFetchApp.fetch(
      formsAPIUrl + formId + '/' + 'watches/' + watchId + ':renew',
      options,
  );
  console.log(response);
  return response.getContentText();
}
