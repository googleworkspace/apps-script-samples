/*
Copyright 2024 Google LLC

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
 * Builds the card for to display in the sidepanel of gmail.
 * @return {CardService.Card} The card to show to the user.
 */

function buildCard_GmailHome(notifyOk = false) {
  const imageUrl =
    "https://icons.iconarchive.com/icons/roundicons/100-free-solid/48/spy-icon.png";
  const image = CardService.newImage().setImageUrl(imageUrl);

  const cardHeader = CardService.newCardHeader()
    .setImageUrl(imageUrl)
    .setImageStyle(CardService.ImageStyle.CIRCLE)
    .setTitle("Analyze your GMail");

  const action = CardService.newAction().setFunctionName("analyzeSentiment");
  const button = CardService.newTextButton()
    .setText("Identify angry customers")
    .setOnClickAction(action)
    .setTextButtonStyle(CardService.TextButtonStyle.FILLED);
  const buttonSet = CardService.newButtonSet().addButton(button);

  const section = CardService.newCardSection()
    .setHeader("Emails sentiment analysis")
    .addWidget(buttonSet);

  const card = CardService.newCardBuilder()
    .setHeader(cardHeader)
    .addSection(section);

  /**
   * This builds the card that contains the footer that informs
   * the user about the successful execution of the Add-on.
   */

  if (notifyOk == true) {
    let fixedFooter = CardService.newFixedFooter().setPrimaryButton(
      CardService.newTextButton()
        .setText("Analysis complete")
        .setOnClickAction(
          CardService.newAction().setFunctionName("buildCard_GmailHome"),
        ),
    );
    card.setFixedFooter(fixedFooter);
  }
  return card.build();
}
