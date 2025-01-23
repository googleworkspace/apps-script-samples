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
 * Callback for initiating the sentiment analysis.
 * @return {CardService.Card} The card to show to the user.
 */

function analyzeSentiment() {
  analyzeAndLabelEmailSentiment();
  return buildNotificationResponse("Successfully completed sentiment analysis");
}

/**
 * Analyzes the sentiment of recent emails in the inbox and labels threads with
 * the appropriate sentiment label.
 */
function analyzeAndLabelEmailSentiment() {
  const positiveLabelName = "HAPPY TONE 😊";
  const neutralLabelName = "NEUTRAL TONE 😐";
  const negativeLabelName = "UPSET TONE 😡";
  const maxThreads = 10;

  // Get the label, or create it if it doesn't exist.
  const positiveLabel = GmailApp.getUserLabelByName(positiveLabelName) || GmailApp.createLabel(positiveLabelName);
  const neutralLabel = GmailApp.getUserLabelByName(neutralLabelName) || GmailApp.createLabel(neutralLabelName);
  const negativeLabel = GmailApp.getUserLabelByName(negativeLabelName) || GmailApp.createLabel(negativeLabelName);

  // Get the first 'maxThreads' threads from the inbox.
  const threads = GmailApp.getInboxThreads(0, maxThreads);

  // Process each thread.
  for (const thread of threads) {
    const messages = thread.getMessages();

    // Process each message within the thread.
    for (const message of messages) {
      const emailText = message.getPlainBody();
      const sentiment = processSentiment(emailText);

      switch (sentiment) {
        case 'positive':
          thread.addLabel(positiveLabel);
          break;
        case 'neutral':
          thread.addLabel(neutralLabel);
          break;
        case 'negative':
          thread.addLabel(negativeLabel);
          break;
        default:
          break;
      }
    }
  }
}

/**
 * Create sample emails
 */
function generateSampleEmails() {
  // Get active user's email
  const userEmail = Session.getActiveUser().getEmail();

  // Send emails
  GmailApp.sendEmail(
    userEmail,
    'Thank you for amazing service!',
    'Hi, I really enjoyed working with you. Thank you again!',
    {
      name: 'Customer A',
    },
  );

  GmailApp.sendEmail(
    userEmail,
    'Request for information',
    'Hello, I need more information on your recent product launch. Thank you.',
    {
      name: 'Customer B',
    },
  );

  GmailApp.sendEmail(
    userEmail,
    'Complaint!',
    '',
    {
      name: 'Customer C',
      htmlBody: `<p>Hello, You are late in delivery, again.</p>
      <p>Please contact me ASAP before I cancel our subscription.</p>`,
    },
  );

  return buildNotificationResponse("Successfully generated sample emails");
}
