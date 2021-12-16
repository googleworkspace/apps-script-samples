/**
 * Posts a message to a Hangouts Chat room every time the spreadsheet is edited.
 * This script must be attached to the spreadsheet (created in Google Sheets under
 * "Tools > Script editor") and installed as a trigger:
 * - Click "Edit > Current project's triggers" in the Apps Script UI.
 * - Click "Add a new trigger".
 * - Select the function "sendChatMessageOnEdit" and the event
 *   "From spreadsheet", "On edit".
 * - Click "Save".
 *
 * @param {Object} e The onEdit event object.
 */
function sendChatMessageOnEdit(e) {
  var range = SpreadsheetApp.getActiveRange();
  var value = range.getValue();
  var oldValue = e.oldValue;
  var ss = range.getSheet().getParent();

  // Construct the message to send, based on the old and new value of the cell.
  var changeMessage;
  if (oldValue && value) {
    changeMessage = Utilities.formatString('changed from "%s" to "%s"',
        oldValue, value);
  } else if (value) {
    changeMessage = Utilities.formatString('set to "%s"', value);
  } else {
    changeMessage = 'cleared';
  }
  var message = Utilities.formatString(
      'The range %s was %s. <%s|Open spreadsheet>.',
      range.getA1Notation(), changeMessage, ss.getUrl());

  // Follow these steps to create an incomming webhook URL for your chat room:
  // https://developers.google.com/hangouts/chat/how-tos/webhooks#define_an_incoming_webhook
  var webhookUrl = 'ENTER INCOMMING WEBHOOK URL HERE';

  // Use the spreadsheet's ID as a thread key, so that all messages go into the
  // same thread.
  var url = webhookUrl + '&threadKey=' + ss.getId();

  // Send the message.
  UrlFetchApp.fetch(url, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify({
      text: message
    })
  });
}
