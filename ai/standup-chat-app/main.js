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

/** TODO
 * Update global variables for your project settings
 * */
const API_KEY = PropertiesService.getScriptProperties().getProperty("API_KEY");
const SPREADSHEET_ID = PropertiesService.getScriptProperties().getProperty("SPREADSHEET_ID"); // e.g. "1O0IW7fW1QeFLa7tIrv_h7_PlSUTB6kd0miQO_sXo7p0"
const SPACE_NAME = PropertiesService.getScriptProperties().getProperty("SPACE_NAME"); // e.g. "spaces/AAAABCa12Cc"

const SUMMARY_HEADER = `\n\n*Gemini Generated Summary*\n\n`;


/**
 * Sends the message to create new standup instance. 
 * Called by trigger on interval of standup, e.g. Weekly
 * 
 * @return {string} The thread name of the message sent.
 */
function standup() {
  const db = new DB(SPREADSHEET_ID);

  const last = db.last;

  let text = `<users/all> Please share your weekly update here.\n\n*Source Code*: <https://script.google.com/corp/home/projects/${ScriptApp.getScriptId()}/edit|Apps Script>`;

  if (last) {
    text += `\n*Last Week*: <${linkToThread(last)}|View thread>`;
  }

  const message = Chat.Spaces.Messages.create({
    text,
  }, PropertiesService.getScriptProperties().getProperty("spaceName") // Demo replaces => SPACE_NAME
  );

  db.append(message);

  console.log(`Thread Name: ${message.thread.name}`)
  return message.thread.name
}

/**
 * Uses AI to create a summary of messages for a stand up period.
 * Called by trigger on interval required to summarize, e.g. Hourly 
 * 
 * @return n/a
 */
function summarize() {
  const db = new DB(SPREADSHEET_ID);
  const last = db.last;

  if (last == undefined) return;

  const filter = `thread.name=${last.thread.name}`;
  let { messages } = Chat.Spaces.Messages.list(PropertiesService.getScriptProperties().getProperty("spaceName"), { filter });  // Demo replaces => SPACE_NAME

  messages = (messages ?? [])
    .slice(1)
    .filter(message => message.slashCommand === undefined)

  if (messages.length === 0) {
    return;
  }

  const history = messages
    .map(({ sender, text }) => `${cachedGetSenderDisplayName(sender)}: ${text}`)
    .join('/n');

  const response = generateContent(
    `Summarize the following weekly tasks and discussion per team member in a single concise sentence for each individual with an extra newline between members, but without using markdown or any special character except for newlines: ${history}`,
    API_KEY);
  const summary = response.candidates[0].content?.parts[0].text;

  if (summary == undefined) {
    return;
  }

  Chat.Spaces.Messages.update({
    text: last.formattedText + SUMMARY_HEADER + summary.replace("**", "*")
  },
    last.name,
    { update_mask: "text" }
  );

}

/**
 * Gets the display name from AdminDirectory Services.
 * 
 * @param {!Object} sender 
 * @return {string} User name on success | 'Unknown' if not.
 */
function getSenderDisplayName(sender) {
  try {
    const user = AdminDirectory.Users.get(
      sender.name.replace("users/", ""),
      { projection: 'BASIC', viewType: 'domain_public' });
    return user.name.displayName ?? user.name.fullName;
  } catch (e) {
    console.error("Unable to get display name");
    return "Unknown"
  };
}

const cachedGetSenderDisplayName = memoize(getSenderDisplayName);

/**
 * @params {Chat_v1.Chat.V1.Schema.Message|Message} message
 * @returns {String}
 */
function linkToThread(message) {
  // https://chat.google.com/room/SPACE/THREAD/
  return `https://chat.google.com/room/${message.space.name.split("/").pop()}/${message.thread.name.split("/").pop()}`;
}
