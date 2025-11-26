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
 * Constructs a prompt for drafting an email.
 *
 * @param {string} subject The subject of the email thread.
 * @param {string} body The body of the email thread.
 * @returns {string} The prompt string.
 */
const draftEmailPrompt = (subject, body) =>
  `
You are an AI assistant. Based on the following email thread:

Subject: ${subject}

--- Email Thread Messages ---
${body}
--- End of Email Thread ---

Task: Considering all messages in this thread:
- Help me ${ME} draft a polite and professional reply that addresses the key points from the most recent message(s) in HTML
- Do NOT include subject of the email

Draft Criteria: Consider the following:
* Explicit Questions: Are there direct questions posed to me ${ME}, especially in the most recent messages?
* Calls to Action: Are there clear instructions or requests for the me ${ME}, to *do* something?
* Urgency/Deadlines: Does the thread mention deadlines or urgent requests?
* Sender's Intent: What does the sender seem to want?
* My Role: What am I (${ME}) being asked to do or know?
* Keywords: Look for terms like "please," "urgent," "FYI," "question," "task," "review," "approve," "respond," "deadline."
* Last Message Focus: Give slightly more weight to the most recent messages.
* Overall Significance: Is the topic critical or routine?

Output: Return the draft message in HTML format.
Format: HTML

Example format:
<!DOCTYPE html>
<html>
<head>
  <title>My Email</title>
</head>
<body>
  <h1>Hello, World!</h1>
  <p>This is an HTML email sent from Google Apps Script.</p>
</body>
</html>
`.trim();

/**
 * Drafts an email based on the given subject and messages.
 *
 * @param {string} subject The subject of the email thread.
 * @param {!Array<!GmailMessage>} messages An array of Gmail messages.
 * @returns {string|null} The drafted email in HTML format or null if not found.
 */
function draftEmail(subject, messages) {
  const body = [];
  for (let i = 0; i < messages.length; i++) {
    const message = messages[i];
    body.push(`Message ${i + 1}:`);
    body.push(`From: ${message.getFrom()}`);
    body.push(`To:${message.getTo()}`);
    body.push("Body:");
    body.push(message.getPlainBody());
    body.push("---");
  }

  // Prepare the request payload
  const payload = {
    contents: [
      {
        role: "user",
        parts: [
          {
            text: draftEmailPrompt(subject, body.join("\n")),
          },
        ],
      },
    ],
    generationConfig: {
      temperature: 0,
      topK: 1,
      topP: 0.1,
      seed: 37,
      maxOutputTokens: 1024,
      responseMimeType: "text/plain",
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
  const response = UrlFetchApp.fetch(API_URL, options);

  // Parse the response. There are two levels of JSON responses to parse.
  const parsedResponse = JSON.parse(response.getContentText());
  const draft = parsedResponse.candidates[0].content.parts[0].text;
  return extractHtmlContent(draft);
}

/**
 * Extracts HTML content from a string.
 *
 * @param {string} textString The string to extract HTML content from.
 * @returns {string|null} The HTML content or null if not found.
 */
function extractHtmlContent(textString) {
  // The regex pattern:
  // ````html` (literal start marker)
  // `(.*?)` (capturing group for any character, non-greedily, including newlines)
  // ` ``` ` (literal end marker)
  // `s` flag makes '.' match any character including newlines.
  const match = textString.match(/```html(.*?)```/s);
  if (match?.[1]) {
    return match[1]; // Return the content of the first capturing group
  }
  return null; // Or an empty string, depending on desired behavior if not found
}
