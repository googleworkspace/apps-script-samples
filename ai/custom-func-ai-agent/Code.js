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

DEFAULT_OUTPUT_FORMAT =
  "Summarize it. Only keep the verdict result and main arguments. " +
  "Do not reiterate the fact being checked. Remove all markdown. " +
  "State the verdit result in a first paragraph in a few words and " +
  "the rest of the summary in a second paragraph.";

/**
 * Passes a statement to fact-check and, optionally, output formatting instructions.
 *
 * @param {string} statement The statement to fact-check as a string or single cell
 *   reference (data ranges are not supported).
 * @param {string} outputFormat The instructions as a string or single cell reference
 *   (data ranges are not supported).
 *
 * @return The generated and formatted verdict
 * @customfunction
 */
function FACT_CHECK(statement, outputFormat = DEFAULT_OUTPUT_FORMAT) {
  return requestOutputFormatting(
    `Here is a fact checking result: ${requestLlmAuditorAdkAiAgent(statement)}.\n\n${outputFormat}`,
  );
}
