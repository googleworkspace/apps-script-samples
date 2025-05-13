/**
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const PROJECT_ID = '';
const LOCATION = 'us-central1';
const API_ENDPOINT = `${LOCATION}-aiplatform.googleapis.com`;
const MODEL = 'gemini-2.5-pro-preview-05-06';
const GENERATE_CONTENT_API = 'generateContent';
const API_URL = `https://${API_ENDPOINT}/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/${MODEL}:${GENERATE_CONTENT_API}`;
const ME = '';
