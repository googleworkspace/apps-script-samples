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

/**
 * Makes a simple content-only call to Gemini AI.
 *
 * @param {string} text Prompt to pass to Gemini API.
 * @param {string} API_KEY Developer API Key enabled to call Gemini.
 *
 * @return {string} Response from AI call.
 */
function generateContent(text, API_KEY) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

  return JSON.parse(
    UrlFetchApp.fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      payload: JSON.stringify({
        contents: [
          {
            parts: [{ text }],
          },
        ],
      }),
    }).getContentText(),
  );
}
