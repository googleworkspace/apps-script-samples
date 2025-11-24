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
 * Packages prompt and necessary settings, then sends a request to the
 * Generative Language API. Returns the text string response, extracted from the
 * Gemini AI response object.
 *
 * @param {string} prompt String representing the prompt for Gemini AI call.
 * @return {string} Result of Gemini AI in string format.
 */
function getAiSummary(prompt) {
	const data = {
		contents: [
			{
				parts: [
					{
						text: prompt,
					},
				],
			},
		],
		generationConfig: {
			temperature: 0.2,
			topK: 1,
			topP: 1,
			maxOutputTokens: 2048,
			stopSequences: [],
		},
		safetySettings: [
			{
				category: "HARM_CATEGORY_HARASSMENT",
				threshold: "BLOCK_NONE",
			},
			{
				category: "HARM_CATEGORY_HATE_SPEECH",
				threshold: "BLOCK_NONE",
			},
			{
				category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
				threshold: "BLOCK_NONE",
			},
			{
				category: "HARM_CATEGORY_DANGEROUS_CONTENT",
				threshold: "BLOCK_NONE",
			},
		],
	};
	const options = {
		method: "post",
		contentType: "application/json",
		payload: JSON.stringify(data), // Convert the JavaScript object to a JSON string.
	};

	const apiKey = PropertiesService.getScriptProperties().getProperty("api_key");
	const response = UrlFetchApp.fetch(
		`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
		options,
	);

	const payload = JSON.parse(response.getContentText());
	const text = payload.candidates[0].content.parts[0].text;

	return text;
}
