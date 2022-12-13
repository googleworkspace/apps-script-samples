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
 */
function create(title) {
  const accessToken = ScriptApp.getOAuthToken();
  const jsonTitle = JSON.stringify({
    info: {
      title: title
    }
  });

  const options = {
    'headers': {
      Authorization: 'Bearer ' + accessToken
    },
    'method': 'post',
    'contentType': 'application/json',
    'payload': jsonTitle
  };

  console.log('Forms API POST options was: ' + JSON.stringify(options));
  let response = UrlFetchApp.fetch(formsAPIUrl, options);
  console.log('Response from Forms API was: ' + JSON.stringify(response));

  return ('' + response);
}

/**
 * Forms API Method: forms.get
 * GET https://forms.googleapis.com/v1/forms/{formId}/responses/{responseId}
 */
function get(formId) {
  const accessToken = ScriptApp.getOAuthToken();

  const options = {
    'headers': {
      Authorization: 'Bearer ' + accessToken,
      Accept: 'application/json'
    },
    'method': 'get'
  };

  try {
    let response = UrlFetchApp.fetch(formsAPIUrl + formId, options);
    console.log('Response from Forms API was: ' + response);
    return ('' + response);
  } catch (e) {
    console.log(JSON.stringify(e));
    return ('Error:' + JSON.stringify(e) +
      '<br/><br/>Unable to find Form with formId:<br/>' + formId);
  }
}

/**
 * Forms API Method: forms.batchUpdate
 * POST https://forms.googleapis.com/v1/forms/{formId}:batchUpdate
 */
function batchUpdate(formId) {
  const accessToken = ScriptApp.getOAuthToken();

  // Request body to add a description to a Form
  const update = {
    'requests': [{
      'updateFormInfo': {
        'info': {
          'description': 'Please complete this quiz based on this week\'s readings for class.'
        },
        'updateMask': 'description'
      }
    }]
  }

  const options = {
    'headers': {
      Authorization: 'Bearer ' + accessToken
    },
    'method': 'post',
    'contentType': 'application/json',
    'payload': JSON.stringify(update),
    'muteHttpExceptions': true,
  };

  let response = UrlFetchApp.fetch(formsAPIUrl + formId + ':batchUpdate',
    options);
  console.log('Response code from API: ' + response.getResponseCode());
  return (response.getResponseCode());
}

/**
 * Forms API Method: forms.responses.get
 * GET https://forms.googleapis.com/v1/forms/{formId}/responses/{responseId}
 */
function responsesGet(formId, responseId) {
  const accessToken = ScriptApp.getOAuthToken();

  var options = {
    'headers': {
      Authorization: 'Bearer ' + accessToken,
      Accept: 'application/json'
    },
    'method': 'get'
  };

  try {
    var response = UrlFetchApp.fetch(formsAPIUrl + formId + '/' + 'responses/' +
      responseId, options);
    console.log('Response from Forms.responses.get was: ' + response);
    return ('' + response);
  } catch (e) {
    console.log(JSON.stringify(e));
    return ('Error:' + JSON.stringify(e))
  }
}

/**
 * Forms API Method: forms.responses.list
 * GET https://forms.googleapis.com/v1/forms/{formId}/responses
 */
function responsesList(formId) {
  const accessToken = ScriptApp.getOAuthToken();

  var options = {
    'headers': {
      Authorization: 'Bearer ' + accessToken,
      Accept: 'application/json'
    },
    'method': 'get'
  };

  try {
    var response = UrlFetchApp.fetch(formsAPIUrl + formId + '/' + 'responses',
      options);
    console.log('Response from Forms.responses was: ' + response);
    return ('' + response);
  } catch (e) {
    console.log(JSON.stringify(e));
    return ('Error:' + JSON.stringify(e))
  }
}

/**
 * Forms API Method: forms.watches.create
 * POST https://forms.googleapis.com/v1/forms/{formId}/watches
 */
function createWatch(formId) {
  let accessToken = ScriptApp.getOAuthToken();

  var myWatch = {
    'watch': {
      'target': {
        'topic': {
          'topicName': topicName
        }
      },
      'eventType': 'RESPONSES',
    }
  };
  console.log('myWatch is: ' + JSON.stringify(myWatch));

  var options = {
    'headers': {
      Authorization: 'Bearer ' + accessToken
    },
    'method': 'post',
    'contentType': 'application/json',
    'payload': JSON.stringify(myWatch),
    'muteHttpExceptions': false,
  };
  console.log('options are: ' + JSON.stringify(options));
  console.log('formsAPIURL was: ' + formsAPIUrl);

  var response = UrlFetchApp.fetch(formsAPIUrl + formId + '/' + 'watches',
    options);
  console.log(response);
  return ('' + response);
}

/**
 * Forms API Method: forms.watches.delete
 * DELETE https://forms.googleapis.com/v1/forms/{formId}/watches/{watchId}
 */
function deleteWatch(formId, watchId) {
  let accessToken = ScriptApp.getOAuthToken();

  console.log('formsAPIUrl is: ' + formsAPIUrl);

  var options = {
    'headers': {
      Authorization: 'Bearer ' + accessToken,
      Accept: 'application/json'
    },
    'method': 'delete',
    'muteHttpExceptions': false,
  };

  try {
    var response = UrlFetchApp.fetch(formsAPIUrl + formId + '/' + 'watches/' +
      watchId, options);
    console.log(response);
    return ('' + response);
  } catch (e) {
    console.log('API Error: ' + JSON.stringify(e));
    return (JSON.stringify(e));
  }

}

/** 
 * Forms API Method: forms.watches.list
 * GET https://forms.googleapis.com/v1/forms/{formId}/watches
 */
function watchesList(formId) {
  console.log('formId is: ' + formId);
  let accessToken = ScriptApp.getOAuthToken();
  var options = {
    'headers': {
      Authorization: 'Bearer ' + accessToken,
      Accept: 'application/json'
    },
    'method': 'get'
  };
  try {
    var response = UrlFetchApp.fetch(formsAPIUrl + formId + '/' + 'watches',
      options);
    console.log(response);
    return ('' + response);
  } catch (e) {
    console.log('API Error: ' + JSON.stringify(e));
    return (JSON.stringify(e));
  }
}

/**
 * Forms API Method: forms.watches.renew
 * POST https://forms.googleapis.com/v1/forms/{formId}/watches/{watchId}:renew
 */
function renewWatch(formId, watchId) {
  let accessToken = ScriptApp.getOAuthToken();

  var options = {
    'headers': {
      Authorization: 'Bearer ' + accessToken,
      Accept: 'application/json'
    },
    'method': 'post'
  };

  try {
    var response = UrlFetchApp.fetch(formsAPIUrl + formId + '/' + 'watches/' +
      watchId + ':renew', options);
    console.log(response);
    return ('' + response);
  } catch (e) {
    console.log('API Error: ' + JSON.stringify(e));
    return (JSON.stringify(e));
  }
}
