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

function scriptPropertyWithDefault(key, defaultValue = undefined) {
	const scriptProperties = PropertiesService.getScriptProperties();
	const value = scriptProperties.getProperty(key);
	if (value) {
		return value;
	}
	return defaultValue;
}

const VERTEX_AI_LOCATION = scriptPropertyWithDefault(
	"project_location",
	"us-central1",
);
const MODEL_ID = scriptPropertyWithDefault("model_id", "gemini-pro-vision");
const SERVICE_ACCOUNT_KEY = scriptPropertyWithDefault("service_account_key");

/**
 * Packages prompt and necessary settings, then sends a request to
 * Vertex API. Returns the response as an JSON object extracted from the
 * Vertex API response object.
 *
 * @param {string} prompt The prompt to senb to Vertex AI API.
 * @param {string} options.temperature The temperature setting set by user.
 * @param {string} options.tokens The number of tokens to limit to the prompt.
 */
function getAiSummary(parts, options = {}) {
	options = Object.assign(
		{},
		{ temperature: 0.1, tokens: 8192 },
		options ?? {},
	);
	const request = {
		contents: [
			{
				role: "user",
				parts: parts,
			},
		],
		generationConfig: {
			temperature: options.temperature,
			topK: 1,
			topP: 1,
			maxOutputTokens: options.tokens,
			stopSequences: [],
		},
	};

	const credentials = credentialsForVertexAI();

	const fetchOptions = {
		method: "POST",
		headers: {
			Authorization: `Bearer ${credentials.accessToken}`,
		},
		contentType: "application/json",
		muteHttpExceptions: true,
		payload: JSON.stringify(request),
	};

	const url =
		`https://${VERTEX_AI_LOCATION}-aiplatform.googleapis.com/v1/projects/${credentials.projectId}` +
		`/locations/${VERTEX_AI_LOCATION}/publishers/google/models/${MODEL_ID}:generateContent`;
	const response = UrlFetchApp.fetch(url, fetchOptions);

	const responseCode = response.getResponseCode();
	if (responseCode >= 400) {
		throw new Error(`Unable to process file: Error code ${responseCode}`);
	}

	const responseText = response.getContentText();
	const parsedResponse = JSON.parse(responseText);
	if (parsedResponse.error) {
		throw new Error(parsedResponse.error.message);
	}
	const text = parsedResponse.candidates[0].content.parts[0].text;
	return text;
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
		.setTokenUrl("https://oauth2.googleapis.com/token")
		.setPrivateKey(parsedCredentials["private_key"])
		.setIssuer(parsedCredentials["client_email"])
		.setPropertyStore(PropertiesService.getScriptProperties())
		.setScope("https://www.googleapis.com/auth/cloud-platform");
	return {
		projectId: parsedCredentials["project_id"],
		accessToken: service.getAccessToken(),
	};
}
