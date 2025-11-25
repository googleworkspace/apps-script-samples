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

const VERTEX_AI_LOCATION =
  PropertiesService.getScriptProperties().getProperty("project_location");
const MODEL_ID =
  PropertiesService.getScriptProperties().getProperty("model_id");
const SERVICE_ACCOUNT_KEY = PropertiesService.getScriptProperties().getProperty(
  "service_account_key",
);

const STANDARD_PROMPT = `

 Your task is to create 3 potential document names for this content.

 Also, create a summary for this content, using 2 to 3 sentences, and don't include formatting.

 Format the response as a JSON object with the first field called names and the summary field called summary.

 The content is below:

 `;

/**
 * Packages prompt and necessary settings, then sends a request to
 * Vertex API. Returns the response as an JSON object extracted from the
 * Vertex API response object.
 *
 * @param prompt - String representing your prompt for Gemini AI.
 */
function getAiSummary(prompt) {
  const request = {
    contents: [
      {
        role: "user",
        parts: [
          {
            text: STANDARD_PROMPT,
          },
          {
            text: prompt,
          },
        ],
      },
    ],
    generationConfig: {
      temperature: 0.2,
      maxOutputTokens: 2048,
      response_mime_type: "application/json",
    },
  };

  const credentials = credentialsForVertexAI();

  const fetchOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${credentials.accessToken}`,
    },
    contentType: "application/json",
    payload: JSON.stringify(request),
  };

  const url = `https://${VERTEX_AI_LOCATION}-aiplatform.googleapis.com/v1/projects/${credentials.projectId}/locations/${VERTEX_AI_LOCATION}/publishers/google/models/${MODEL_ID}:generateContent`;

  const response = UrlFetchApp.fetch(url, fetchOptions);

  const payload = JSON.parse(response.getContentText());
  const jsonPayload = JSON.parse(payload.candidates[0].content.parts[0].text);

  return jsonPayload;
}

/**
 * Gets credentials required to call Vertex API using a Service Account.
 *
 *
 */
function credentialsForVertexAI() {
  const credentials = SERVICE_ACCOUNT_KEY;
  if (!credentials) {
    throw new Error("service_account_key script property must be set.");
  }

  const parsedCredentials = JSON.parse(credentials);

  const service = OAuth2.createService("Vertex")
    .setTokenUrl("https://oauth2.googleapis.com/token")
    .setPrivateKey(parsedCredentials.private_key)
    .setIssuer(parsedCredentials.client_email)
    .setPropertyStore(PropertiesService.getScriptProperties())
    .setScope("https://www.googleapis.com/auth/cloud-platform");
  return {
    projectId: parsedCredentials.project_id,
    accessToken: service.getAccessToken(),
  };
}
