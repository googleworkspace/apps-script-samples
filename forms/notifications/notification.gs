/**
 * Copyright Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// [START apps_script_forms_notifications_quickstart]
/**
 * @OnlyCurrentDoc
 *
 * The above comment directs Apps Script to limit the scope of file
 * access for this add-on. It specifies that this add-on will only
 * attempt to read or modify the files in which the add-on is used,
 * and not all of the user's files. The authorization request message
 * presented to users will reflect this limited scope.
 */

/**
 * A global constant String holding the title of the add-on. This is
 * used to identify the add-on in the notification emails.
 */
const ADDON_TITLE = 'Form Notifications';

/**
 * A global constant 'notice' text to include with each email
 * notification.
 */
const NOTICE = 'Form Notifications was created as an sample add-on, and is' +
  ' meant for' +
'demonstration purposes only. It should not be used for complex or important' +
'workflows. The number of notifications this add-on produces are limited by the' +
'owner\'s available email quota; it will not send email notifications if the' +
'owner\'s daily email quota has been exceeded. Collaborators using this add-on on' +
'the same form will be able to adjust the notification settings, but will not be' +
'able to disable the notification triggers set by other collaborators.';

/**
 * Adds a custom menu to the active form to show the add-on sidebar.
 *
 * @param {object} e The event parameter for a simple onOpen trigger. To
 *     determine which authorization mode (ScriptApp.AuthMode) the trigger is
 *     running in, inspect e.authMode.
 */
function onOpen(e) {
  try {
    FormApp.getUi()
        .createAddonMenu()
        .addItem('Configure notifications', 'showSidebar')
        .addItem('About', 'showAbout')
        .addToUi();
  } catch (e) {
    // TODO (Developer) - Handle exception
    console.log('Failed with error: %s', e.error);
  }
}

/**
 * Runs when the add-on is installed.
 *
 * @param {object} e The event parameter for a simple onInstall trigger. To
 *     determine which authorization mode (ScriptApp.AuthMode) the trigger is
 *     running in, inspect e.authMode. (In practice, onInstall triggers always
 *     run in AuthMode.FULL, but onOpen triggers may be AuthMode.LIMITED or
 *     AuthMode.NONE).
 */
function onInstall(e) {
  onOpen(e);
}

/**
 * Opens a sidebar in the form containing the add-on's user interface for
 * configuring the notifications this add-on will produce.
 */
function showSidebar() {
  try {
    const ui = HtmlService.createHtmlOutputFromFile('sidebar')
        .setTitle('Form Notifications');
    FormApp.getUi().showSidebar(ui);
  } catch (e) {
    // TODO (Developer) - Handle exception
    console.log('Failed with error: %s', e.error);
  }
}

/**
 * Opens a purely-informational dialog in the form explaining details about
 * this add-on.
 */
function showAbout() {
  try {
    const ui = HtmlService.createHtmlOutputFromFile('about')
        .setWidth(420)
        .setHeight(270);
    FormApp.getUi().showModalDialog(ui, 'About Form Notifications');
  } catch (e) {
    // TODO (Developer) - Handle exception
    console.log('Failed with error: %s', e.error);
  }
}

/**
 * Save sidebar settings to this form's Properties, and update the onFormSubmit
 * trigger as needed.
 *
 * @param {Object} settings An Object containing key-value
 *      pairs to store.
 */
function saveSettings(settings) {
  try {
    PropertiesService.getDocumentProperties().setProperties(settings);
    adjustFormSubmitTrigger();
  } catch (e) {
    // TODO (Developer) - Handle exception
    console.log('Failed with error: %s', e.error);
  }
}

/**
 * Queries the User Properties and adds additional data required to populate
 * the sidebar UI elements.
 *
 * @return {Object} A collection of Property values and
 *     related data used to fill the configuration sidebar.
 */
function getSettings() {
  try {
    const settings = PropertiesService.getDocumentProperties().getProperties();

    // Use a default email if the creator email hasn't been provided yet.
    if (!settings.creatorEmail) {
      settings.creatorEmail = Session.getEffectiveUser().getEmail();
    }

    // Get text field items in the form and compile a list
    //   of their titles and IDs.
    const form = FormApp.getActiveForm();
    const textItems = form.getItems(FormApp.ItemType.TEXT);

    settings.textItems = [];
    for (let i = 0; i < textItems.length; i++) {
      settings.textItems.push({
        title: textItems[i].getTitle(),
        id: textItems[i].getId()
      });
    }
    return settings;
  } catch (e) {
    // TODO (Developer) - Handle exception
    console.log('Failed with error: %s', e.error);
  }
}

/**
 * Adjust the onFormSubmit trigger based on user's requests.
 */
function adjustFormSubmitTrigger() {
  try {
    const form = FormApp.getActiveForm();
    const triggers = ScriptApp.getUserTriggers(form);
    const settings = PropertiesService.getDocumentProperties();
    const triggerNeeded =
      settings.getProperty('creatorNotify') === 'true' ||
      settings.getProperty('respondentNotify') === 'true';

    // Create a new trigger if required; delete existing trigger
    // if it is not needed.
    let existingTrigger = null;
    for (let i = 0; i < triggers.length; i++) {
      if (triggers[i].getEventType() === ScriptApp.EventType.ON_FORM_SUBMIT) {
        existingTrigger = triggers[i];
        break;
      }
    }
    if (triggerNeeded && !existingTrigger) {
      const trigger = ScriptApp.newTrigger('respondToFormSubmit')
          .forForm(form)
          .onFormSubmit()
          .create();
    } else if (!triggerNeeded && existingTrigger) {
      ScriptApp.deleteTrigger(existingTrigger);
    }
  } catch (e) {
    // TODO (Developer) - Handle exception
    console.log('Failed with error: %s', e.error);
  }
}

/**
 * Responds to a form submission event if an onFormSubmit trigger has been
 * enabled.
 *
 * @param {Object} e The event parameter created by a form
 *      submission; see
 *      https://developers.google.com/apps-script/understanding_events
 */
function respondToFormSubmit(e) {
  try {
    const settings = PropertiesService.getDocumentProperties();
    const authInfo = ScriptApp.getAuthorizationInfo(ScriptApp.AuthMode.FULL);

    // Check if the actions of the trigger require authorizations that have not
    // been supplied yet -- if so, warn the active user via email (if possible).
    // This check is required when using triggers with add-ons to maintain
    // functional triggers.
    if (authInfo.getAuthorizationStatus() ===
      ScriptApp.AuthorizationStatus.REQUIRED) {
      // Re-authorization is required. In this case, the user needs to be alerted
      // that they need to reauthorize; the normal trigger action is not
      // conducted, since authorization needs to be provided first. Send at
      // most one 'Authorization Required' email a day, to avoid spamming users
      // of the add-on.
      sendReauthorizationRequest();
    } else {
      // All required authorizations have been granted, so continue to respond to
      // the trigger event.

      // Check if the form creator needs to be notified; if so, construct and
      // send the notification.
      if (settings.getProperty('creatorNotify') === 'true') {
        sendCreatorNotification();
      }

      // Check if the form respondent needs to be notified; if so, construct and
      // send the notification. Be sure to respect the remaining email quota.
      if (settings.getProperty('respondentNotify') === 'true' &&
        MailApp.getRemainingDailyQuota() > 0) {
        sendRespondentNotification(e.response);
      }
    }
  } catch (e) {
    // TODO (Developer) - Handle exception
    console.log('Failed with error: %s', e.error);
  }
}


/**
 * Called when the user needs to reauthorize. Sends the user of the
 * add-on an email explaining the need to reauthorize and provides
 * a link for the user to do so. Capped to send at most one email
 * a day to prevent spamming the users of the add-on.
 */
function sendReauthorizationRequest() {
  try {
    const settings = PropertiesService.getDocumentProperties();
    const authInfo = ScriptApp.getAuthorizationInfo(ScriptApp.AuthMode.FULL);
    const lastAuthEmailDate = settings.getProperty('lastAuthEmailDate');
    const today = new Date().toDateString();
    if (lastAuthEmailDate !== today) {
      if (MailApp.getRemainingDailyQuota() > 0) {
        const template =
          HtmlService.createTemplateFromFile('authorizationEmail');
        template.url = authInfo.getAuthorizationUrl();
        template.notice = NOTICE;
        const message = template.evaluate();
        MailApp.sendEmail(Session.getEffectiveUser().getEmail(),
            'Authorization Required',
            message.getContent(), {
              name: ADDON_TITLE,
              htmlBody: message.getContent()
            });
      }
      settings.setProperty('lastAuthEmailDate', today);
    }
  } catch (e) {
    // TODO (Developer) - Handle exception
    console.log('Failed with error: %s', e.error);
  }
}

/**
 * Sends out creator notification email(s) if the current number
 * of form responses is an even multiple of the response step
 * setting.
 */
function sendCreatorNotification() {
  try {
    const form = FormApp.getActiveForm();
    const settings = PropertiesService.getDocumentProperties();
    let responseStep = settings.getProperty('responseStep');
    responseStep = responseStep ? parseInt(responseStep) : 10;

    // If the total number of form responses is an even multiple of the
    // response step setting, send a notification email(s) to the form
    // creator(s). For example, if the response step is 10, notifications
    // will be sent when there are 10, 20, 30, etc. total form responses
    // received.
    if (form.getResponses().length % responseStep === 0) {
      const addresses = settings.getProperty('creatorEmail').split(',');
      if (MailApp.getRemainingDailyQuota() > addresses.length) {
        const template =
          HtmlService.createTemplateFromFile('creatorNotification');
        template.summary = form.getSummaryUrl();
        template.responses = form.getResponses().length;
        template.title = form.getTitle();
        template.responseStep = responseStep;
        template.formUrl = form.getEditUrl();
        template.notice = NOTICE;
        const message = template.evaluate();
        MailApp.sendEmail(settings.getProperty('creatorEmail'),
            form.getTitle() + ': Form submissions detected',
            message.getContent(), {
              name: ADDON_TITLE,
              htmlBody: message.getContent()
            });
      }
    }
  } catch (e) {
    // TODO (Developer) - Handle exception
    console.log('Failed with error: %s', e.error);
  }
}

/**
 * Sends out respondent notification emails.
 *
 * @param {FormResponse} response FormResponse object of the event
 *      that triggered this notification
 */
function sendRespondentNotification(response) {
  try {
    const form = FormApp.getActiveForm();
    const settings = PropertiesService.getDocumentProperties();
    const emailId = settings.getProperty('respondentEmailItemId');
    const emailItem = form.getItemById(parseInt(emailId));
    const respondentEmail = response.getResponseForItem(emailItem)
        .getResponse();
    if (respondentEmail) {
      const template =
        HtmlService.createTemplateFromFile('respondentNotification');
      template.paragraphs = settings.getProperty('responseText').split('\n');
      template.notice = NOTICE;
      const message = template.evaluate();
      MailApp.sendEmail(respondentEmail,
          settings.getProperty('responseSubject'),
          message.getContent(), {
            name: form.getTitle(),
            htmlBody: message.getContent()
          });
    }
  } catch (e) {
    // TODO (Developer) - Handle exception
    console.log('Failed with error: %s', e.error);
  }
}
// [END apps_script_forms_notifications_quickstart]
