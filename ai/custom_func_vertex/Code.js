/**
 * Passes a prompt and a data range to Gemini AI.
 * 
 * @param {range} range The range of cells.
 * @param {string} prompt The text prompt as a string or single cell reference.
 * @return The Gemini response.
 * @customfunction
 */
function gemini(range,prompt) {
  prompt = `For the table of data: ${range}, Answer the following: ${prompt}. Do not use formatting. Remove all markdown.`
  return getAiSummary(prompt);
}