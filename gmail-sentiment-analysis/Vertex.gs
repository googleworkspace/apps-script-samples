/*
Copyright 2024 Google LLC

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

const PROJECT_ID = [ADD YOUR GCP PROJECT ID HERE];
const VERTEX_AI_LOCATION = 'europe-west2';
const MODEL_ID = 'text-bison';
const SERVICE_ACCOUNT_KEY = PropertiesService.getScriptProperties().getProperty('service_account_key');

/**
 * Packages prompt and necessary settings, then sends a request to
 * Vertex API. Returns the response as an JSON object extracted from the
 * Vertex API response object.
 *
 * @param emailText - Email message that is sent to the model.
 */

function processSentiment(emailText) {
  const prompt = `Analyze the following message: ${emailText}. If the sentiment of this message is negative, answer with NEGATIVE. If the sentiment of this message is neutral or positive, answer with OK. Do not use any other words than the ones requested in this prompt as a response!`;
  const request = {
    "instances": [{
      "prompt":  prompt
    }],
    "parameters": {
      "temperature": 0.9,
      "maxOutputTokens": 1024,
      "topK": 1,
      "topP": 1
    },
    
  };

  const credentials = credentialsForVertexAI();

  const fetchOptions = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${credentials.accessToken}`
    },
    contentType: 'application/json',
    muteHttpExceptions: true,
    payload: JSON.stringify(request)
  }

  const url = `https://${VERTEX_AI_LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/`
  + `locations/${VERTEX_AI_LOCATION}/publishers/google/models/${MODEL_ID}:predict`

  const response = UrlFetchApp.fetch(url, fetchOptions);
  const payload = JSON.parse(response.getContentText());
  console.log(payload.predictions[0].content);

  return payload.predictions[0].content;
}

/**
 * Gets credentials required to call Vertex API using a Service Account.
 * Requires use of Service Account Key stored with project
 * 
 * @return {!Object} Containing the Cloud Project Id and the access token.
 */

function credentialsForVertexAI() {
  const credentials = SERVICE_ACCOUNT_KEY;
  if (!credentials) {
    throw new Error("service_account_key script property must be set.");
  }

  const parsedCredentials = JSON.parse(credentials);

  const service = OAuth2.createService("Vertex")
    .setTokenUrl('https://oauth2.googleapis.com/token')
    .setPrivateKey(parsedCredentials['private_key'])
    .setIssuer(parsedCredentials['client_email'])
    .setPropertyStore(PropertiesService.getScriptProperties())
    .setScope("https://www.googleapis.com/auth/cloud-platform");
  return {
    projectId: parsedCredentials['project_id'],
    accessToken: service.getAccessToken(),
  }
}