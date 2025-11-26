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
 * Builds the main card displayed on the Gmail homepage.
 *
 * @returns {Card} - The homepage card.
 */
function buildHomepageCard() {
  // Create a new card builder
  const cardBuilder = CardService.newCardBuilder();

  // Create a card header
  const cardHeader = CardService.newCardHeader();
  cardHeader.setImageUrl(
    "https://fonts.gstatic.com/s/i/googlematerialicons/mail/v6/black-24dp/1x/gm_mail_black_24dp.png",
  );
  cardHeader.setImageStyle(CardService.ImageStyle.CIRCLE);
  cardHeader.setTitle("Analyze your Gmail");

  // Add the header to the card
  cardBuilder.setHeader(cardHeader);

  // Create a card section
  const cardSection = CardService.newCardSection();

  // Create buttons for generating sample emails and analyzing sentiment
  const buttonSet = CardService.newButtonSet();

  // Create "Generate sample emails" button
  const generateButton = createFilledButton(
    "Generate sample emails",
    "generateSampleEmails",
    "#34A853",
  );
  buttonSet.addButton(generateButton);

  // Create "Analyze emails" button
  const analyzeButton = createFilledButton(
    "Analyze emails",
    "analyzeSentiment",
    "#FF0000",
  );
  buttonSet.addButton(analyzeButton);

  // Add the button set to the section
  cardSection.addWidget(buttonSet);

  // Add the section to the card
  cardBuilder.addSection(cardSection);

  // Build and return the card
  return cardBuilder.build();
}

/**
 * Creates a filled text button with the specified text, function, and color.
 *
 * @param {string} text - The text to display on the button.
 * @param {string} functionName - The name of the function to call when the button is clicked.
 * @param {string} color - The background color of the button.
 * @returns {TextButton} - The created text button.
 */
function createFilledButton(text, functionName, color) {
  // Create a new text button
  const textButton = CardService.newTextButton();

  // Set the button text
  textButton.setText(text);

  // Set the action to perform when the button is clicked
  const action = CardService.newAction();
  action.setFunctionName(functionName);
  textButton.setOnClickAction(action);

  // Set the button style to filled
  textButton.setTextButtonStyle(CardService.TextButtonStyle.FILLED);

  // Set the background color
  textButton.setBackgroundColor(color);

  return textButton;
}

/**
 * Creates a notification response with the specified text.
 *
 * @param {string} notificationText - The text to display in the notification.
 * @returns {ActionResponse} - The created action response.
 */
function buildNotificationResponse(notificationText) {
  // Create a new notification
  const notification = CardService.newNotification();
  notification.setText(notificationText);

  // Create a new action response builder
  const actionResponseBuilder = CardService.newActionResponseBuilder();

  // Set the notification for the action response
  actionResponseBuilder.setNotification(notification);

  // Build and return the action response
  return actionResponseBuilder.build();
}
