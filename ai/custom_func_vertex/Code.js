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

/**
 * Passes a prompt and a data range to Gemini AI.
 *
 * @param {range} range The range of cells.
 * @param {string} prompt The text prompt as a string or single cell reference.
 * @return The Gemini response.
 * @customfunction
 */
function gemini(range, prompt) {
  return getAiSummary(
    `For the table of data: ${range} Answer the following: ${prompt}. Do not use formatting. Remove all markdown.`,
  );
}
