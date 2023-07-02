# Copyright 2022 Google LLC
# 
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
# 
#     https://www.apache.org/licenses/LICENSE-2.0
# 
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

 # [START forms_retrieve_all_responses]
 function callFormsAPI() {
  console.log('Calling the Forms API!');
  var formId = '<YOUR_FORM_ID>';

  // Get OAuth Token
 var OAuthToken = ScriptApp.getOAuthToken();
 console.log('OAuth token is: ' + OAuthToken);
 var formsAPIUrl = 'https://forms.googleapis.com/v1/forms/' + formId + '/' + 'responses';
 console.log('formsAPIUrl is: ' + formsAPIUrl);
 var options = {
    'headers': {
      Authorization: 'Bearer ' + OAuthToken,
      Accept: 'application/json'
    },
    'method': 'get'
  };  
var response = UrlFetchApp.fetch(formsAPIUrl, options);
 console.log('Response from forms.responses was: ' + response);
}
# [END forms_retrieve_all_responses]
