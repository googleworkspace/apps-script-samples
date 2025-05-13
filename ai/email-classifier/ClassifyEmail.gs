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
 * Constructs the prompt for classifying an email.
 *
 * @param {string} subject The subject of the email.
 * @param {string} body The body of the email.
 * @returns {string} The prompt for classifying an email.
 */
const classifyEmailPrompt = (subject, body) => `
Objective: You are an AI assistant tasked with classifying email threads. Analyze the entire email thread provided below and determine the single most appropriate classification label. Your response must conform to the provided schema.

**Classification Labels & Descriptions:**

* **needs-response**: The sender is explicitly or implicitly expecting a **direct, communicative reply** from me (${ME}) to answer a question, acknowledge receipt of information, confirm understanding, or continue a conversation. **Prioritize this label if the core expectation is purely a written or verbal communication back to the sender.**
* **action-required**: The email thread requires me (${ME}) to perform a **distinct task, make a formal decision, provide a review leading to approval/rejection, or initiate a process that results in a demonstrable change or outcome.** This label is for actions *beyond* just sending a reply, such as completing a document, setting up a meeting, approving a request, delegating a task, or performing a delegated duty.
* **for-your-info**: The email thread's primary purpose is to convey information, updates, or announcements. No immediate action or direct reply is expected or required from me (${ME}); the main purpose is for me to be informed and aware. This includes both routine 'FYI' updates and critical announcements where my role is to comprehend, not act or respond.

**Evaluation Criteria - Consider the following:**

* **Sender's Intent & My Role:** What does the sender want me (${ME}) to do, say, or know?
* **Direct Requests:** Are there explicit questions or calls to action addressed to me (${ME})?
* **Distinguishing Action vs. Response:**
    * If the email primarily asks for a *verbal or written communication* (e.g., answering a specific question, providing feedback, confirming receipt, giving thoughts, and is directly addressed to me (${ME})), it's likely \`needs-response\`.
    * If the email requires me to *perform a specific task or make a formal decision that goes beyond simply communicating* (e.g., completing a document, scheduling, approving a request, delegating, implementing a change), it's likely \`action-required\`.
* **Urgency/Deadlines:** Are there time-sensitive elements mentioned?
* **Last Message Focus:** Give slightly more weight to the content of the most recent messages in the thread.
* **Keywords:**
    * Look for terms like "answer," "reply to," "your thoughts on," "confirm," "acknowledge" for \`needs-response\`.
    * Look for terms like "complete," "approve," "review and approve," "sign," "process," "set up," "delegate" for \`action-required\`.
    * Look for terms like "FYI," "update," "announcement," "read," "info" for \`for-information\`.
* **Overall Significance:** Is the topic critical or routine, influencing the *type* of information being conveyed?

**Input:** Email message content
Subject: ${subject}

--- Email Thread Messages ---
${body}
--- End of Email Thread ---

**Output:** Return the single best classification and a brief justification.
Format: JSON object with '[Classification]', and '[Reason]'
`.trim();

/**
 * Classifies an email based on its subject and messages.
 *
 * @param {string} subject The subject of the email.
 * @param {!Array<!GmailMessage>} messages An array of Gmail messages.
 * @returns {!Object} The classification object.
 */
function classifyEmail(subject, messages) {
  const body = [];
  for (let i = 0; i < messages.length; i++) {
    const message = messages[i];
    body.push(`Message ${i + 1}:`);
    body.push(`From: ${message.getFrom()}`);
    body.push(`To:${message.getTo()}`);
    body.push('Body:');
    body.push(message.getPlainBody());
    body.push('---');
  }

  // Prepare the request payload
  const payload = {
    contents: [
      {
        role: "user",
        parts: [
          {
            text: classifyEmailPrompt(subject, body.join('\n'))
          }
        ]
      }
    ],
    generationConfig: {
      temperature: 0,
      topK: 1,
      topP: 0.1,
      seed: 37,
      maxOutputTokens: 1024,
      responseMimeType: "application/json",
      // Expected response format for simpler parsing.
      responseSchema: {
        type: "object",
        properties: {
          classification: {
            type: "string",
            enum: Object.keys(classificationLabels),
          },
          reason: {
            type: 'string'
          }
        }
      }
    }
  };

  // Prepare the request options
  const options = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${ScriptApp.getOAuthToken()}`
    },
    contentType: 'application/json',
    muteHttpExceptions: true, // Set to true to inspect the error response
    payload: JSON.stringify(payload)
  };

  // Make the API request
  const response = UrlFetchApp.fetch(API_URL, options);

  // Parse the response. There are two levels of JSON responses to parse.
  const parsedResponse = JSON.parse(response.getContentText());
  const text = parsedResponse.candidates[0].content.parts[0].text;
  const classification = JSON.parse(text);
  return classification;
}

