// To learn how to use this script, refer to the documentation:
// https://developers.google.com/apps-script/samples/chat-bots/schedule-meetings

/*
Copyright 2022 Google LLC

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

// Application constants
const BOTNAME = 'Chat Meeting Scheduler';
const SLASHCOMMAND = {
  HELP: 1, // /help
  DIALOG: 2, // /schedule_Meeting
};

/**
 * Responds to an ADDED_TO_SPACE event in Google Chat.
 * Called when the bot is added to a space. The bot can either be directly added to the space
 * or added by a @mention. If the bot is added by a @mention, the event object includes a message property. 
 * Returns a Message object, which is usually a welcome message informing users about the bot.
 *
 * @param {Object} event The event object from Google Chat
 */
function onAddToSpace(event) {
  let message = '';

  // Personalizes the message depending on how the bot is called.
  if (event.space.singleUserBotDm) {
    message = `Hi ${event.user.displayName}!`;
  } else {
    const spaceName = event.space.displayName ? event.space.displayName : "this chat";
    message = `Hi! Thank you for adding me to ${spaceName}`;
  }

  // Lets users know what they can do and how they can get help.
  message = message + '/nI can quickly schedule a meeting for you with just a few clicks.' +
    'Try me out by typing */schedule_Meeting*. ' +
    '/nTo learn what else I can do, type */help*.'

  return { "text": message };
}

/**
 * Responds to a MESSAGE event triggered in Chat.
 * Called when the bot is already in the space and the user invokes it via @mention or / command.
 * Returns a message object containing the bot's response. For this bot, the response is either the
 * help text or the dialog to schedule a meeting.
 * 
 * @param {object} event The event object from Google Chat
 * @return {object} JSON-formatted response as text or Card message
 */
function onMessage(event) {

  // Handles regular onMessage logic.
  // Evaluates if and handles for all slash commands.
  if (event.message.slashCommand) {
    switch (event.message.slashCommand.commandId) {

      case SLASHCOMMAND.DIALOG: // Displays meeting dialog for /schedule_Meeting.

        // TODO update this with your own logic to set meeting recipients, subjects, etc (e.g. a group email).
        return getInputFormAsDialog_({
          invitee: '',
          startTime: getTopOfHourDateString_(),
          duration: 30,
          subject: 'Status Stand-up',
          body: 'Scheduling a quick status stand-up meeting.'
        });

      case SLASHCOMMAND.HELP: // Responds with help text for /help.
        return getHelpTextResponse_();

      /* TODO Add other use cases here. E.g:
      case SLASHCOMMAND.NEW_FEATURE:  // Your Feature Here
        getDialogForAddContact(message);
      */

    }
  }
  else {
    // Returns text if users didn't invoke a slash command.
    return { text: 'No action taken - use Slash Commands.' }
  }
}

/**
 * Responds to a CARD_CLICKED event triggered in Chat.
 * @param {object} event the event object from Chat
 * @return {object} JSON-formatted response
 * @see https://developers.google.com/chat/api/guides/message-formats/events
 */
function onCardClick(event) {
  if (event.action.actionMethodName === 'handleFormSubmit') {
    const recipients = getFieldValue_(event.common.formInputs, 'email');
    const subject = getFieldValue_(event.common.formInputs, 'subject');
    const body = getFieldValue_(event.common.formInputs, 'body');

    // Assumes dialog card inputs for date and times are in the correct format. mm/dd/yyy HH:MM
    const dateTimeInput = getFieldValue_(event.common.formInputs, 'date');
    const startTime = getStartTimeAsDateObject_(dateTimeInput);
    const duration = Number(getFieldValue_(event.common.formInputs, 'duration'));

    // Handles instances of missing or invalid input parameters.
    const errors = [];

    if (!recipients) {
      errors.push('Missing or invalid recipient email address.');
    }
    if (!subject) {
      errors.push('Missing subject line.');
    }
    if (!body) {
      errors.push('Missing event description.');
    }
    if (!startTime) {
      errors.push('Missing or invalid start time.');
    }
    if (!duration || isNaN(duration)) {
      errors.push('Missing or invalid duration');
    }
    if (errors.length) {
      // Redisplays the form if missing or invalid inputs exist.
      return getInputFormAsDialog_({
        errors,
        invitee: recipients,
        startTime: dateTimeInput,
        duration,
        subject,
        body
      });
    }

    //  Calculates the end time via duration.
    const endTime = new Date(startTime.valueOf());
    endTime.setMinutes(endTime.getMinutes() + duration);

    // Creates calendar event with notification.
    const calendar = CalendarApp.getDefaultCalendar()
    const scheduledEvent = calendar.createEvent(subject,
      startTime,
      endTime,
      {
        guests: recipients,
        sendInvites: true,
        description: body + '\nThis meeting scheduled by a Google Chat App!'
      });

    // Gets a link to the Calendar event.
    const url = getCalendarEventURL_(scheduledEvent, calendar)
        
    return getConfirmationDialog_(url);

  } else if (event.action.actionMethodName === 'closeDialog') {

    // Returns this dialog as success.
    return {
      actionResponse: {
        type: 'DIALOG',
        dialog_action: {
          actionStatus: 'OK'
        }
      }
    }
  }
}

/**
 * Responds with help text about this chat bot.
 * @return {string} The help text as seen below
 */
function getHelpTextResponse_() {
  const help = `*${BOTNAME}* lets you quickly create meetings from Google Chat. Here\'s a list of all its commands:
  \`/schedule_Meeting\`  Opens a dialog with editable, preset parameters to create a meeting event
  \`/help\`  Displays this help message
  
  Learn more about creating Google Chat bots at https://developers.google.com/chat.`

  return { 'text': help }
}
