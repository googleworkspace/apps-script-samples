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

/**
 * Create sample emails
 */
function generateSampleEmails() {
  // Get active user's email
  const userEmail = Session.getActiveUser().getEmail();

  // Send emails
  GmailApp.sendEmail(
    userEmail,
    "Thank you for amazing service!",
    "Hi, I really enjoyed working with you. Thank you again!",
    {
      name: 'Customer A',
    },
  );

  GmailApp.sendEmail(
    userEmail,
    "Request for information",
    "Hello, I need more information on your recent product launch. Thank you.",
    {
      name: 'Customer B',
    },
  );

  GmailApp.sendEmail(
    userEmail,
    "Complaint!",
    "Hello, You are late in delivery, again. Please contact me ASAP before I cancel our subscription.",
    {
      name: 'Customer C',
    },
  );

  console.log("Sample email generation completed.")
}
 * Create sample emails
 */
function generateSampleEmails() {
  // Get active user's email
  var userEmail = Session.getActiveUser().getEmail();

  // Send emails
  GmailApp.sendEmail(
    userEmail,
    "Thank you for amazing service!",
    "Hi, I really enjoyed working with you. Thank you again!",
    {
      name: 'Customer A',
    },
  );

  GmailApp.sendEmail(
    userEmail,
    "Request for information",
    "Hello, I need more information on your recent product launch. Thank you.",
    {
      name: 'Customer B',
    },
  );

  GmailApp.sendEmail(
    userEmail,
    "Complaint!",
    "Hello, You are late in delivery, again. Please contact me ASAP before I cancel our subscription.",
    {
      name: 'Customer C',
    },
  );

  console.log("Sample email generation completed.")
}
