/**
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Change application logo here (and in manifest) as desired.
const ADDON_LOGO = 'https://www.gstatic.com/images/branding/product/2x/apps_script_48dp.png';

/**
 * Callback function for rendering the main card.
 * @return {CardService.Card} The card to show the user.
 */
function onHomepage(e) {
  return createSelectionCard(e);
}

/**
 * Builds the primary card interface used to collect user inputs.
 * 
 * @param {Object} e - Add-on event object.
 * @param {string} sourceScriptId - Script ID of the source project.
 * @param {string} targetSpreadsheetUrl - URL of the target spreadsheet.
 * @param {string[]} errors - Array of error messages. 
 * 
 * @return {CardService.Card} The card to show to the user for inputs.
 */
function createSelectionCard(e, sourceScriptId, targetSpreadsheetUrl, errors) {

  // Configures card header.
  let cardHeader = CardService.newCardHeader()
    .setTitle('Share macros with other spreadheets!')
    .setImageUrl(ADDON_LOGO)
    .setImageStyle(CardService.ImageStyle.SQUARE);

  // If form errors exist, configures section with error messages.
  let showErrors = false;

  if (errors && errors.length) {
    showErrors = true;
    let msg = errors.reduce((str, err) => `${str}• ${err}<br>`, '');
    msg = `<b>Form submission errors:</b><br><font color="#ba0000">${msg}</font>`;

    // Builds error message section.
    sectionErrors = CardService.newCardSection()
      .addWidget(CardService.newDecoratedText()
        .setText(msg)
        .setWrapText(true));
  }

  // Configures source project section.
  let sectionSource = CardService.newCardSection()
    .addWidget(CardService.newDecoratedText()
      .setText('<b>Source macro</b><br>The Apps Script project to copy'))

    .addWidget(CardService.newTextInput()
      .setFieldName('sourceScriptId')
      .setValue(sourceScriptId || '')
      .setTitle('Script ID of the source macro')
      .setHint('You must have at least edit permission for the source spreadsheet to access its script project'))

    .addWidget(CardService.newTextButton()
      .setText('Find the script ID')
      .setOpenLink(CardService.newOpenLink()
        .setUrl('https://developers.google.com/apps-script/api/samples/execute')
        .setOpenAs(CardService.OpenAs.FULL_SIZE)
        .setOnClose(CardService.OnClose.NOTHING)));

  // Configures target spreadsheet section.
  let sectionTarget = CardService.newCardSection()
    .addWidget(CardService.newDecoratedText()
      .setText('<b>Target spreadsheet</b>'))

    .addWidget(CardService.newTextInput()
      .setFieldName('targetSpreadsheetUrl')
      .setValue(targetSpreadsheetUrl || '')
      .setHint('You must have at least edit permission for the target spreadsheet')
      .setTitle('Target spreadsheet URL'));

  // Configures help section.
  let sectionHelp = CardService.newCardSection()
    .addWidget(CardService.newDecoratedText()
      .setText('<b><font color=#c80000>NOTE: </font></b>' +
        'The Apps Script API must be turned on.')
      .setWrapText(true))

    .addWidget(CardService.newTextButton()
      .setText('Turn on Apps Script API')
      .setOpenLink(CardService.newOpenLink()
        .setUrl('https://script.google.com/home/usersettings')
        .setOpenAs(CardService.OpenAs.FULL_SIZE)
        .setOnClose(CardService.OnClose.NOTHING)));

  // Configures card footer with action to copy the macro.
  var cardFooter = CardService.newFixedFooter()
    .setPrimaryButton(CardService.newTextButton()
      .setText('Share macro')
      .setOnClickAction(CardService.newAction()
        .setFunctionName('onClickFunction_')));

  // Begins building the card.
  let builder = CardService.newCardBuilder()
    .setHeader(cardHeader);

  // Adds error section if applicable.
  if (showErrors) {
    builder.addSection(sectionErrors)
  }

  // Adds final sections & footer.
  builder
    .addSection(sectionSource)
    .addSection(sectionTarget)
    .addSection(sectionHelp)
    .setFixedFooter(cardFooter);

  return builder.build();
}

/**
 * Action handler that validates user inputs and calls shareMacro_
 * function to copy Apps Script project to target spreadsheet.
 * 
 * @param {Object} e - Add-on event object.
 * 
 * @return {CardService.Card} Responds with either a success or error card.
 */
function onClickFunction_(e) {

  const sourceScriptId = e.formInput.sourceScriptId;
  const targetSpreadsheetUrl = e.formInput.targetSpreadsheetUrl;

  // Validates inputs for errors.
  const errors = [];

  // Pushes an error message if the Script ID parameter is missing.
  if (!sourceScriptId) {
    errors.push('Missing script ID');
  } else {

    // Gets the Apps Script project if the Script ID parameter is valid.
    const sourceProject = APPS_SCRIPT_API.get(sourceScriptId);
    if (!sourceProject) {
      // Pushes an error message if the Script ID parameter isn't valid.
      errors.push('Invalid script ID');
    }
  }

  // Pushes an error message if the spreadsheet URL is missing.
  if (!targetSpreadsheetUrl) {
    errors.push('Missing Spreadsheet URL');
  } else
    try {
      // Tests for valid spreadsheet URL to get the spreadsheet ID.
      const ssId = SpreadsheetApp.openByUrl(targetSpreadsheetUrl).getId();
    } catch (err) {
      // Pushes an error message if the spreadsheet URL parameter isn't valid.
      errors.push('Invalid spreadsheet URL');
    }

  if (errors && errors.length) {
    // Redisplays form if inputs are missing or invalid.
    return createSelectionCard(e, sourceScriptId, targetSpreadsheetUrl, errors);

  } else {
    // Calls shareMacro function to copy the project.
    shareMacro_(sourceScriptId, targetSpreadsheetUrl);

    // Creates a success card to display to users.
    return buildSuccessCard(e, targetSpreadsheetUrl);
  }
}

/**
 * Builds success card to inform user & let them open the spreadsheet.
 * 
 * @param {Object} e - Add-on event object.
 * @param {string} targetSpreadsheetUrl - URL of the target spreadsheet.
 * 
 * @return {CardService.Card} Returns success card.
 */function buildSuccessCard(e, targetSpreadsheetUrl) {

  // Configures card header.
  let cardHeader = CardService.newCardHeader()
    .setTitle('Share macros with other spreadsheets!')
    .setImageUrl(ADDON_LOGO)
    .setImageStyle(CardService.ImageStyle.SQUARE);
  
  // Configures card body section with success message and open button.
  let sectionBody1 = CardService.newCardSection()
    .addWidget(CardService.newTextParagraph()
      .setText('Sharing process is complete!'))
    .addWidget(CardService.newTextButton()
      .setText('Open spreadsheet')
      .setOpenLink(CardService.newOpenLink()
        .setUrl(targetSpreadsheetUrl)
        .setOpenAs(CardService.OpenAs.FULL_SIZE)
        .setOnClose(CardService.OnClose.RELOAD_ADD_ON)));
  let sectionBody2 = CardService.newCardSection()
    .addWidget(CardService.newTextParagraph()
      .setText('If you don\'t see the copied project in your target spreadsheet,' +
       ' make sure you turned on the Apps Script API in the Apps Script dashboard.'))
    .addWidget(CardService.newTextButton()
      .setText("Check API")
      .setOpenLink(CardService.newOpenLink()
        .setUrl('https://script.google.com/home/usersettings')
        .setOpenAs(CardService.OpenAs.FULL_SIZE)
        .setOnClose(CardService.OnClose.RELOAD_ADD_ON)));

  // Configures the card footer with action to start new process.
  let cardFooter = CardService.newFixedFooter()
    .setPrimaryButton(CardService.newTextButton()
      .setText('Share another')
      .setOnClickAction(CardService.newAction()
        .setFunctionName('onHomepage')));

  return builder = CardService.newCardBuilder()
    .setHeader(cardHeader)
    .addSection(sectionBody1)
    .addSection(sectionBody2)
    .setFixedFooter(cardFooter)
    .build();
 }