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

const PROJECT_ID = 'qwiklabs-gcp-01-e6ca251b4715';
const VERTEX_AI_LOCATION = 'us-central1';
const MODEL_ID = 'gemini-1.5-pro-002';

/**
 * Packages prompt and necessary settings, then sends a request to
 * Vertex API. 
 * A check is performed to see if the response from Vertex AI contains FALSE as a value.
 * Returns the outcome of that check which is a boolean. 
 *
 * @param emailText - Email message that is sent to the model.
 */

function processSentiment(emailText) {
  const prompt = `Analyze the sentiment of the following message: ${emailText}`;

  const request = {
    "contents": [{
      "role": "user",
      "parts": [{
        "text": prompt,
      }]
    }],
    "generationConfig": {
      "temperature": 0.9,
      "maxOutputTokens": 1024,
      "responseMimeType": "application/json",
      "responseSchema": {
        "type": "object",
        "properties": {
          "response": {
            "type": "string",
            "enum": [
              "positive",
              "negative",
              "neutral",
            ]
          }
        }
      }
    }
  };

  const fetchOptions = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${ScriptApp.getOAuthToken()}`
    },
    contentType: 'application/json',
    muteHttpExceptions: true,
    payload: JSON.stringify(request),
  }

  const url = `https://${VERTEX_AI_LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/`
    + `locations/${VERTEX_AI_LOCATION}/publishers/google/models/${MODEL_ID}:generateContent`

  const response = UrlFetchApp.fetch(url, fetchOptions);
  const payload = JSON.parse(response.getContentText());
  const text = JSON.parse(payload.candidates[0].content.parts[0].text);

  return text.response === 'negative';
}
