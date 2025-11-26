/*
Copyright 2024-2025 Google LLC

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

// Replace with your project ID
const PROJECT_ID = "[ADD YOUR GCP PROJECT ID HERE]";

// Location for your Vertex AI model
const VERTEX_AI_LOCATION = "us-central1";

// Model ID to use for sentiment analysis
const MODEL_ID = "gemini-2.5-flash";

/**
 * Sends the email text to Vertex AI for sentiment analysis.
 *
 * @param {string} emailText - The text of the email to analyze.
 * @returns {string} - The sentiment of the email ('positive', 'negative', or 'neutral').
 */
function processSentiment(emailText) {
  // Construct the API endpoint URL
  const apiUrl = `https://${VERTEX_AI_LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${VERTEX_AI_LOCATION}/publishers/google/models/${MODEL_ID}:generateContent`;

  // Prepare the request payload
  const payload = {
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `Analyze the sentiment of the following message: ${emailText}`,
          },
        ],
      },
    ],
    generationConfig: {
      temperature: 0.9,
      maxOutputTokens: 1024,
      responseMimeType: "application/json",
      // Expected response format for simpler parsing.
      responseSchema: {
        type: "object",
        properties: {
          response: {
            type: "string",
            enum: ["positive", "negative", "neutral"],
          },
        },
      },
    },
  };

  // Prepare the request options
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${ScriptApp.getOAuthToken()}`,
    },
    contentType: "application/json",
    muteHttpExceptions: true, // Set to true to inspect the error response
    payload: JSON.stringify(payload),
  };

  // Make the API request
  const response = UrlFetchApp.fetch(apiUrl, options);

  // Parse the response. There are two levels of JSON responses to parse.
  const parsedResponse = JSON.parse(response.getContentText());
  const sentimentResponse = JSON.parse(
    parsedResponse.candidates[0].content.parts[0].text,
  ).response;

  // Return the sentiment
  return sentimentResponse;
}
