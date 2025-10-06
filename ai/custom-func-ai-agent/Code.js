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
function FACT_CHECK(statement, outputFormat) {
  if (!outputFormat || outputFormat == "") {
    outputFormat = 'Summarize it. Only keep the verdict result and main arguments. '
      + 'Do not reiterate the fact being checked. Remove all markdown. '
      + 'State the verdit result in a first paragraph in a few words and the rest of the summary in a second paragraph.';
  }

  return requestOutputFormatting(`Here is a fact checking result: ${requestLlmAuditorAdkAiAgent(statement)}.\n\n${outputFormat}`);
}
