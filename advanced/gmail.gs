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
// [START gmail_label]
/**
 * Lists the user's labels, including name, type,
 * ID and visibility information.
 */
function listLabelInfo() {
  try {
    const response =
      Gmail.Users.Labels.list('me');
    for (let i = 0; i < response.labels.length; i++) {
      const label = response.labels[i];
      console.log(JSON.stringify(label));
    }
  } catch (err) {
    console.log(err);
  }
}
// [END gmail_label]

// [START gmail_inbox_snippets]
/**
 * Lists, for each thread in the user's Inbox, a
 * snippet associated with that thread.
 */
function listInboxSnippets() {
  try {
    let pageToken;
    do {
      const threadList = Gmail.Users.Threads.list('me', {
        q: 'label:inbox',
        pageToken: pageToken
      });
      if (threadList.threads && threadList.threads.length > 0) {
        threadList.threads.forEach(function(thread) {
          console.log('Snippet: %s', thread.snippet);
        });
      }
      pageToken = threadList.nextPageToken;
    } while (pageToken);
  } catch (err) {
    console.log(err);
  }
}
// [END gmail_inbox_snippets]


// [START gmail_history]
/**
 * Gets a history record ID associated with the most
 * recently sent message, then logs all the message IDs
 * that have changed since that message was sent.
 */
function logRecentHistory() {
  try {
    // Get the history ID associated with the most recent
    // sent message.
    const sent = Gmail.Users.Threads.list('me', {
      q: 'label:sent',
      maxResults: 1
    });
    if (!sent.threads || !sent.threads[0]) {
      console.log('No sent threads found.');
      return;
    }
    const historyId = sent.threads[0].historyId;

    // Log the ID of each message changed since the most
    // recent message was sent.
    let pageToken;
    const changed = [];
    do {
      const recordList = Gmail.Users.History.list('me', {
        startHistoryId: historyId,
        pageToken: pageToken
      });
      const history = recordList.history;
      if (history && history.length > 0) {
        history.forEach(function(record) {
          record.messages.forEach(function(message) {
            if (changed.indexOf(message.id) === -1) {
              changed.push(message.id);
            }
          });
        });
      }
      pageToken = recordList.nextPageToken;
    } while (pageToken);

    changed.forEach(function(id) {
      console.log('Message Changed: %s', id);
    });
  } catch (err) {
    console.log(err);
  }
}
// [END gmail_history]

// [START gmail_raw]
/**
 * Logs the raw message content for the most recent message in gmail.
 */
function getRawMessage() {
  try {
    const messageId = Gmail.Users.Messages.list('me').messages[0].id;
    console.log(messageId);
    const message = Gmail.Users.Messages.get('me', messageId, {
      'format': 'raw'
    });

    // Get raw content as base64url encoded string.
    const encodedMessage = Utilities.base64Encode(message.raw);
    console.log(encodedMessage);
  } catch (err) {
    console.log(err);
  }
}
// [END gmail_raw]
