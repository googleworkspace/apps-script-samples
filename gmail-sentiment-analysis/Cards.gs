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
 * Builds the card to display in the side panel of gmail.
 * @return {CardService.Card} The card to show to the user.
 */

function buildHomepageCard() {
  const imageUrl = 'https://fonts.gstatic.com/s/i/googlematerialicons/dynamic_feed/v6/black-24dp/1x/gm_dynamic_feed_black_24dp.png';

  const cardHeader = CardService.newCardHeader()
    .setImageUrl(imageUrl)
    .setImageStyle(CardService.ImageStyle.CIRCLE)
    .setTitle("Analyze your Gmail");

  const analyzeSentimentAction = CardService.newAction()
    .setFunctionName('analyzeSentiment');
  const analyzeSentimentBtn = CardService.newTextButton()
    .setText('Analyze emails')
    .setOnClickAction(analyzeSentimentAction)
    .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
    .setBackgroundColor('#FF0000');

  const generateSampleEmailAction = CardService.newAction()
    .setFunctionName('generateSampleEmails');

  const generateSampleEmailsBtn = CardService.newTextButton()
    .setText('Generate sample emails')
    .setOnClickAction(generateSampleEmailAction)
    .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
    .setBackgroundColor('#34A853');

  const buttonSet = CardService.newButtonSet()
    .addButton(generateSampleEmailsBtn)
    .addButton(analyzeSentimentBtn);

  const section = CardService.newCardSection()
    .addWidget(buttonSet);

  const card = CardService.newCardBuilder()
    .setHeader(cardHeader)
    .addSection(section);

  return card.build();
}

function buildNotificationResponse(notificationText) {
  const notification = CardService.newNotification().setText(notificationText);

  const actionResponse = CardService.newActionResponseBuilder()
    .setNotification(notification);

  return actionResponse.build();
}
