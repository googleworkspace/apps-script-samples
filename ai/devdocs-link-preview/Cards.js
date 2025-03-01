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
 * Creates the Card to display documentation summary to user.
 * 
 * @param {string} pageTitle Title of the page/card section.
 * @param {string} summary Page summary to display.
 * @return {!Card}
 */
function buildCard(pageTitle, summary, showRating = true) {

  let cardHeader = CardService.newCardHeader()
    .setTitle('About this page');

  let summarySection = CardService.newCardSection()
    .addWidget(CardService.newTextParagraph().setText(summary));

  let feedbackSection = CardService.newCardSection()
    .setHeader('Rate this summary');

  if (showRating) {
    let thumbsUpAction = CardService.newAction()
      .setFunctionName('onRatingClicked')
      .setParameters({
        'key': 'upVotes',
        'title': pageTitle,
        'pageSummary': summary
      });

    let thumbsDownAction = CardService.newAction()
      .setFunctionName('onRatingClicked')
      .setParameters({
        'key': 'downVotes',
        'title': pageTitle,
        'pageSummary': summary
      });

    let thumbsUpButton = CardService.newImageButton()
      .setIconUrl(
        'https://fonts.gstatic.com/s/i/googlematerialicons/thumb_up_alt/v11/gm_blue-24dp/1x/gm_thumb_up_alt_gm_blue_24dp.png'
      )
      .setAltText('Looks good')
      .setOnClickAction(thumbsUpAction);

    let thumbsDownButton = CardService.newImageButton()
      .setIconUrl(
        'https://fonts.gstatic.com/s/i/googlematerialicons/thumb_down_alt/v11/gm_blue-24dp/1x/gm_thumb_down_alt_gm_blue_24dp.png'
      )
      .setAltText('Not great')
      .setOnClickAction(thumbsDownAction);

    let ratingButtons = CardService.newButtonSet()
      .addButton(thumbsUpButton)
      .addButton(thumbsDownButton);
    feedbackSection.addWidget(ratingButtons)
  } else {
    feedbackSection.addWidget(CardService.newTextParagraph().setText("Thank you for your feedback."))
  }


  let card = CardService.newCardBuilder()
    .setHeader(cardHeader)
    .addSection(summarySection)
    .addSection(feedbackSection)
    .build();
  return card;
}

/**
 * Creates a Card to let user know an error has occurred.
 * 
 * @return {!Card}
 */
function buildErrorCard() {
  let cardHeader = CardService.newCardHeader()
    .setTitle('Uh oh! Something went wrong.')

  let errorMessage = CardService.newTextParagraph()
    .setText(
      'It looks like Gemini got stage fright.');

  let tryAgainButton = CardService.newTextButton()
    .setText('Try again')
    .setTextButtonStyle(CardService.TextButtonStyle.TEXT)
    .setOnClickAction( CardService.newAction()
    .setFunctionName('onLinkPreview'));

  let buttonList = CardService.newButtonSet()
    .addButton(tryAgainButton);

  let mainSection = CardService.newCardSection()
    .addWidget(errorMessage)
    .addWidget(buttonList);

  let errorCard = CardService.newCardBuilder()
    .setHeader(cardHeader)
    .addSection(mainSection)
    .build();

  return errorCard;
}