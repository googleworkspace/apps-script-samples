/*
Copyright 2024-2025 Google LLC

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
 * Analyzes the sentiment of the first 10 threads in the inbox
 * and labels them accordingly.
 *
 * @returns {ActionResponse} - A notification confirming completion.
 */
function analyzeSentiment() {
  // Analyze and label emails
  analyzeAndLabelEmailSentiment();

  // Return a notification
  return buildNotificationResponse("Successfully completed sentiment analysis");
}

/**
 * Analyzes the sentiment of emails and applies appropriate labels.
 */
function analyzeAndLabelEmailSentiment() {
  // Define label names
  const labelNames = ["HAPPY TONE 😊", "NEUTRAL TONE 😐", "UPSET TONE 😡"];

  // Get or create labels for each sentiment
  const positiveLabel =
    GmailApp.getUserLabelByName(labelNames[0]) ||
    GmailApp.createLabel(labelNames[0]);
  const neutralLabel =
    GmailApp.getUserLabelByName(labelNames[1]) ||
    GmailApp.createLabel(labelNames[1]);
  const negativeLabel =
    GmailApp.getUserLabelByName(labelNames[2]) ||
    GmailApp.createLabel(labelNames[2]);

  // Get the first 10 threads in the inbox
  const threads = GmailApp.getInboxThreads(0, 10);

  // Iterate through each thread
  for (const thread of threads) {
    // Iterate through each message in the thread
    const messages = thread.getMessages();
    for (const message of messages) {
      // Get the plain text body of the message
      const emailBody = message.getPlainBody();

      // Analyze the sentiment of the email body
      const sentiment = processSentiment(emailBody);

      // Apply the appropriate label based on the sentiment
      if (sentiment === "positive") {
        thread.addLabel(positiveLabel);
      } else if (sentiment === "neutral") {
        thread.addLabel(neutralLabel);
      } else if (sentiment === "negative") {
        thread.addLabel(negativeLabel);
      }
    }
  }
}

/**
 * Generates sample emails for testing the sentiment analysis.
 *
 * @returns {ActionResponse} - A notification confirming email generation.
 */
function generateSampleEmails() {
  // Get the current user's email address
  const userEmail = Session.getActiveUser().getEmail();

  // Define sample emails
  const sampleEmails = [
    {
      subject: "Thank you for amazing service!",
      body: "Hi, I really enjoyed working with you. Thank you again!",
      name: "Customer A",
    },
    {
      subject: "Request for information",
      body: "Hello, I need more information on your recent product launch. Thank you.",
      name: "Customer B",
    },
    {
      subject: "Complaint!",
      body: "",
      htmlBody: `<p>Hello, You are late in delivery, again.</p>
<p>Please contact me ASAP before I cancel our subscription.</p>`,
      name: "Customer C",
    },
  ];

  // Send each sample email
  for (const email of sampleEmails) {
    GmailApp.sendEmail(userEmail, email.subject, email.body, {
      name: email.name,
      htmlBody: email.htmlBody,
    });
  }

  // Return a notification
  return buildNotificationResponse("Successfully generated sample emails");
}
