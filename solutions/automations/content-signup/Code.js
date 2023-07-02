// To learn how to use this script, refer to the documentation:
// https://developers.google.com/apps-script/samples/automations/content-signup

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

// To use your own template doc, update the below variable with the URL of your own Google Doc template.
// Make sure you update the sharing settings so that 'anyone'  or 'anyone in your organization' can view.
const EMAIL_TEMPLATE_DOC_URL = 'https://docs.google.com/document/d/1enes74gWsMG3dkK3SFO08apXkr0rcYBd3JHKOb2Nksk/edit?usp=sharing';
// Update this variable to customize the email subject.
const EMAIL_SUBJECT = 'Hello, here is the content you requested';

// Update this variable to the content titles and URLs you want to offer. Make sure you update the form so that the content titles listed here match the content titles you list in the form.
const topicUrls = {
  'Google Calendar how-to videos': 'https://www.youtube.com/playlist?list=PLU8ezI8GYqs7IPb_UdmUNKyUCqjzGO9PJ',
  'Google Drive how-to videos': 'https://www.youtube.com/playlist?list=PLU8ezI8GYqs7Y5d1cgZm2Obq7leVtLkT4',
  'Google Docs how-to videos': 'https://www.youtube.com/playlist?list=PLU8ezI8GYqs4JKwZ-fpBP-zSoWPL8Sit7',
  'Google Sheets how-to videos': 'https://www.youtube.com/playlist?list=PLU8ezI8GYqs61ciKpXf_KkV7ZRbRHVG38',
};

/**
 * Installs a trigger on the spreadsheet for when someone submits a form.
 */
function installTrigger() {
  ScriptApp.newTrigger('onFormSubmit')
      .forSpreadsheet(SpreadsheetApp.getActive())
      .onFormSubmit()
      .create();
}

/**
 * Sends a customized email for every form response.
 * 
 * @param {Object} event - Form submit event
 */
function onFormSubmit(e) {
  let responses = e.namedValues;

  // If the question title is a label, it can be accessed as an object field.
  // If it has spaces or other characters, it can be accessed as a dictionary.
  let timestamp = responses.Timestamp[0];
  let email = responses['Email address'][0].trim();
  let name = responses.Name[0].trim();
  let topicsString = responses.Topics[0].toLowerCase();

  // Parse topics of interest into a list (since there are multiple items
  // that are saved in the row as blob of text).
  let topics = Object.keys(topicUrls).filter(function(topic) {
    // indexOf searches for the topic in topicsString and returns a non-negative
    // index if the topic is found, or it will return -1 if it's not found.
    return topicsString.indexOf(topic.toLowerCase()) != -1;
  });

  // If there is at least one topic selected, send an email to the recipient.
  let status = '';
  if (topics.length > 0) {
    MailApp.sendEmail({
      to: email,
      subject: EMAIL_SUBJECT,
      htmlBody: createEmailBody(name, topics),
    });
    status = 'Sent';
  }
  else {
    status = 'No topics selected';
  }

  // Append the status on the spreadsheet to the responses' row.
  let sheet = SpreadsheetApp.getActiveSheet();
  let row = sheet.getActiveRange().getRow();
  let column = e.values.length + 1;
  sheet.getRange(row, column).setValue(status);

  console.log("status=" + status + "; responses=" + JSON.stringify(responses));
}

/**
 * Creates email body and includes the links based on topic.
 *
 * @param {string} recipient - The recipient's email address.
 * @param {string[]} topics - List of topics to include in the email body.
 * @return {string} - The email body as an HTML string.
 */
function createEmailBody(name, topics) {
  let topicsHtml = topics.map(function(topic) {
  let url = topicUrls[topic];
    return '<li><a href="' + url + '">' + topic + '</a></li>';
  }).join('');
  topicsHtml = '<ul>' + topicsHtml + '</ul>';
  
  // Make sure to update the emailTemplateDocId at the top.
  let docId = DocumentApp.openByUrl(EMAIL_TEMPLATE_DOC_URL).getId();
  let emailBody = docToHtml(docId);
  emailBody = emailBody.replace(/{{NAME}}/g, name);
  emailBody = emailBody.replace(/{{TOPICS}}/g, topicsHtml);
  return emailBody;
}

/**
 * Downloads a Google Doc as an HTML string.
 * 
 * @param {string} docId - The ID of a Google Doc to fetch content from.
 * @return {string} The Google Doc rendered as an HTML string.
 */
function docToHtml(docId) {

  // Downloads a Google Doc as an HTML string.
  let url = "https://docs.google.com/feeds/download/documents/export/Export?id=" +
            docId + "&exportFormat=html";
  let param = {
    method: "get",
    headers: {"Authorization": "Bearer " + ScriptApp.getOAuthToken()},
    muteHttpExceptions: true,
  };
  return UrlFetchApp.fetch(url, param).getContentText();
}
