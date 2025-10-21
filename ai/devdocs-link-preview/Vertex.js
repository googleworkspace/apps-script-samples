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

const VERTEX_AI_LOCATION = scriptPropertyWithDefault('project_location', 'us-central1');
const MODEL_ID = scriptPropertyWithDefault('model_id', 'gemini-2.5-flash');
const SERVICE_ACCOUNT_KEY = scriptPropertyWithDefault('service_account_key');

/**
 * Invokes Gemini to extrac the title and summary of a given URL. Responses may be cached.
 */
function getPageSummary(targetUrl) {
  let cachedResponse = CacheService.getScriptCache().get(targetUrl);
  if (cachedResponse) {
    return JSON.parse(cachedResponse);
  }

  const request = {
    contents: [
      {
        role: "user",
        parts: [
          {
            text: targetUrl
          }
        ]
      }
    ],
    systemInstruction: {
      parts: [
        {
          text: `You are a Google Developers documentation expert. In 2-3 sentences, create a short description of what the following web page is about based on the snippet of HTML from the page. Make the summary scannable. Don't repeat the URL in the description. Use proper grammar. Make the description easy to read. Only include the description in your response, exclude any conversational parts of the response. Make sure you use the most recent Google product names. Output the response as JSON with the page title as "title" and the summary as "summary"`
        }
      ]
    },
    generationConfig: {
      temperature: .2,
      candidateCount: 1,
      maxOutputTokens: 2048
    }
  }

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

  const url = `https://${VERTEX_AI_LOCATION}-aiplatform.googleapis.com/v1/projects/${credentials.projectId}` +
    `/locations/${VERTEX_AI_LOCATION}/publishers/google/models/${MODEL_ID}:generateContent`
  const response = UrlFetchApp.fetch(url, fetchOptions);

  const responseText = response.getContentText();
  console.log(responseText);
  if (response.getResponseCode() >= 400) {
    console.log(responseText);
    throw new Error("Unable to generate preview,");
  }
  const parsedResponse = JSON.parse(responseText);
  let modelResponse = parsedResponse.candidates[0].content.parts[0].text;
  const jsonMatch = modelResponse.match(/(?<=^`{3}json$)([\s\S]*)(?=^`{3}$)/gm);
  if (!jsonMatch) {
    throw new Error("Unable to generate preview,");
  }
  CacheService.getScriptCache().put(targetUrl, jsonMatch);
  return JSON.parse(jsonMatch[0]);
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
