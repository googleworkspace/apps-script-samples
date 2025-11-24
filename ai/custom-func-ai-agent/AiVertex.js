/*
Copyright 2025 Google LLC

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

const LOCATION =
	PropertiesService.getScriptProperties().getProperty("LOCATION");
const GEMINI_MODEL_ID =
	PropertiesService.getScriptProperties().getProperty("GEMINI_MODEL_ID");
const REASONING_ENGINE_ID = PropertiesService.getScriptProperties().getProperty(
	"REASONING_ENGINE_ID",
);
const SERVICE_ACCOUNT_KEY = PropertiesService.getScriptProperties().getProperty(
	"SERVICE_ACCOUNT_KEY",
);

const credentials = credentialsForVertexAI();

/**
 * @param {string} statement The statement to fact-check.
 */
function requestLlmAuditorAdkAiAgent(statement) {
	return UrlFetchApp.fetch(
		`https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${credentials.projectId}/locations/${LOCATION}/reasoningEngines/${REASONING_ENGINE_ID}:streamQuery?alt=sse`,
		{
			method: "post",
			headers: { Authorization: `Bearer ${credentials.accessToken}` },
			contentType: "application/json",
			muteHttpExceptions: true,
			payload: JSON.stringify({
				class_method: "async_stream_query",
				input: {
					user_id: "google_sheets_custom_function_fact_check",
					message: statement,
				},
			}),
		},
	).getContentText();
}

/**
 * @param {string} prompt The Gemini prompt to use.
 */
function requestOutputFormatting(prompt) {
	const response = UrlFetchApp.fetch(
		`https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${credentials.projectId}/locations/${LOCATION}/publishers/google/models/${GEMINI_MODEL_ID}:generateContent`,
		{
			method: "post",
			headers: { Authorization: `Bearer ${credentials.accessToken}` },
			contentType: "application/json",
			muteHttpExceptions: true,
			payload: JSON.stringify({
				contents: [
					{
						role: "user",
						parts: [{ text: prompt }],
					},
				],
				generationConfig: { temperature: 0.1, maxOutputTokens: 2048 },
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
			}),
		},
	);
	return JSON.parse(response).candidates[0].content.parts[0].text;
}

/**
 * Gets credentials required to call Vertex API using a Service Account.
 * Requires use of Service Account Key stored with project.
 *
 * @return {!Object} Containing the Google Cloud project ID and the access token.
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
