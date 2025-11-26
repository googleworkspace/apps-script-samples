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
 * Triggered when the add-on is opened from the Gmail homepage.
 *
 * @param {!Object} e - The event object.
 * @returns {!Card} - The homepage card.
 */
function onHomepageTrigger(e) {
  return buildHomepageCard();
}

/**
 * Builds the main card displayed on the Gmail homepage.
 *
 * @returns {!Card} - The homepage card.
 */
function buildHomepageCard() {
  // Create a new card builder
  const cardBuilder = CardService.newCardBuilder();

  // Create a card header
  const cardHeader = CardService.newCardHeader();
  cardHeader.setImageUrl(
    "https://fonts.gstatic.com/s/i/googlematerialicons/label_important/v20/googblue-24dp/1x/gm_label_important_googblue_24dp.png",
  );
  cardHeader.setImageStyle(CardService.ImageStyle.CIRCLE);
  cardHeader.setTitle("Email Classifier");

  // Add the header to the card
  cardBuilder.setHeader(cardHeader);

  // Create a card section
  const cardSection = CardService.newCardSection();

  // Create buttons for generating sample emails and analyzing sentiment
  const buttonSet = CardService.newButtonSet();

  // Create "Classify emails" button
  const classifyButton = createFilledButton({
    text: "Classify emails",
    functionName: "main",
    color: "#007bff",
    icon: "new_label",
  });
  buttonSet.addButton(classifyButton);

  // Create "Create Labels" button
  const createLabelsButtton = createFilledButton({
    text: "Create labels",
    functionName: "createLabels",
    color: "#34A853",
    icon: "add",
  });

  // Create "Remove Labels" button
  const removeLabelsButtton = createFilledButton({
    text: "Remove labels",
    functionName: "removeLabels",
    color: "#FF0000",
    icon: "delete",
  });

  if (labelsCreated()) {
    buttonSet.addButton(removeLabelsButtton);
  } else {
    buttonSet.addButton(createLabelsButtton);
  }

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
 * @param {{text: string, functionName: string, color: string, icon: string}} options
 *   - text: The text to display on the button.
 *   - functionName: The name of the function to call when the button is clicked.
 *   - color: The background color of the button.
 *   - icon: The material icon to display on the button.
 * @returns {!TextButton} - The created text button.
 */
function createFilledButton({ text, functionName, color, icon }) {
  // Create a new text button
  const textButton = CardService.newTextButton();

  // Set the button text
  textButton.setText(text);

  // Set the action to perform when the button is clicked
  const action = CardService.newAction();
  action.setFunctionName(functionName);
  action.setLoadIndicator(CardService.LoadIndicator.SPINNER);
  textButton.setOnClickAction(action);

  // Set the button style to filled
  textButton.setTextButtonStyle(CardService.TextButtonStyle.FILLED);

  // Set the background color
  textButton.setBackgroundColor(color);

  textButton.setMaterialIcon(CardService.newMaterialIcon().setName(icon));

  return textButton;
}

/**
 * Creates a notification response with the specified text.
 *
 * @param {string} notificationText - The text to display in the notification.
 * @returns {!ActionResponse} - The created action response.
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

/**
 * Creates a card to display the spreadsheet link.
 *
 * @param {string} spreadsheetUrl - The URL of the spreadsheet.
 * @returns {!ActionResponse} - The created action response.
 */
function showSpreadsheetLink(spreadsheetUrl) {
  const updatedCardBuilder = CardService.newCardBuilder();

  updatedCardBuilder.setHeader(
    CardService.newCardHeader().setTitle("Sheet generated!"),
  );

  const updatedSection = CardService.newCardSection()
    .addWidget(
      CardService.newTextParagraph().setText("Click to open the sheet:"),
    )
    .addWidget(
      CardService.newTextButton().setText("Open Sheet").setOpenLink(
        CardService.newOpenLink()
          .setUrl(spreadsheetUrl)
          .setOpenAs(CardService.OpenAs.FULL_SCREEN) // Opens in a new browser tab/window
          .setOnClose(CardService.OnClose.NOTHING), // Does nothing when the tab is closed
      ),
    )
    .addWidget(
      CardService.newTextButton() // Optional: Add a button to go back or refresh
        .setText("Go Back")
        .setOnClickAction(
          CardService.newAction().setFunctionName("onHomepageTrigger"),
        ), // Go back to the initial state
    );

  updatedCardBuilder.addSection(updatedSection);
  const newNavigation = CardService.newNavigation().updateCard(
    updatedCardBuilder.build(),
  );

  return CardService.newActionResponseBuilder()
    .setNavigation(newNavigation) // This updates the current card in the UI
    .build();
}
