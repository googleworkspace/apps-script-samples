/**
 * Copyright 2025 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const APP_COMMAND = "app command";

/**
 * Responds to an ADDED_TO_SPACE event in Google Chat.
 * @param {Object} event the event object from Google Workspace Add On
 */
function onAddedToSpace(event) {
    return sendCreateMessageAction(createCardMessage(help(APP_COMMAND)));
}

/**
 * Responds to a MESSAGE event in Google Chat.
 * @param {Object} event the event object from Google Workspace Add On
 */
function onMessage(event) {
  return sendCreateMessageAction(createCardMessage(help(APP_COMMAND)));
}

/**
 * Responds to a APP_COMMAND event in Google Chat.
 * @param {Object} event the event object from Google Workspace Add On
 */
function onAppCommand(event) {
  switch (event.chat.appCommandPayload.appCommandMetadata.appCommandId) {
    case 2: // Block out day
      return sendCreateMessageAction(createCardMessage(blockDayOut()));
    case 3: // Set auto reply
      return sendCreateMessageAction(createCardMessage(setAutoReply()));
    default: // Help, any other
      return sendCreateMessageAction(createCardMessage(help(APP_COMMAND)));
  }
}

/**
 * Responds to a REMOVED_FROM_SPACE event in Google Chat.
 * @param {Object} event the event object from Google Workspace Add On
 */
function onRemovedFromSpace(event) {
  const space = event.chat.removedFromSpacePayload.space;
  console.info(`Chat app removed from ${(space.name || "this chat")}`);
}

// ----------------------
// Util functions
// ----------------------

function createTextMessage(text) { return { text: text }; }

function createCardMessage(card) { return { cardsV2: [{ card: card }]}; }

function sendCreateMessageAction(message) {
  return { hostAppDataAction: { chatDataAction: { createMessageAction: { message: message }}}};
}
