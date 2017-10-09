/**
 * Lists the user's labels, including name, type,
 * ID and visibility information.
 */
// [START listLabelInfo]
function listLabelInfo() {
  var response =
    Gmail.Users.Labels.list('me');
  for (var i = 0; i < response.labels.length; i++) {
    var label = response.labels[i];
    Logger.log(JSON.stringify(label));
  }
}
// [END listLabelInfo]

/**
 * Lists, for each thread in the user's Inbox, a
 * snippet associated with that thread.
 */
// [START listInboxSnippets]
function listInboxSnippets() {
  var pageToken;
  do {
    var threadList = Gmail.Users.Threads.list('me', {
      q: 'label:inbox',
      pageToken: pageToken
    });
    if (threadList.threads && threadList.threads.length > 0) {
      threadList.threads.forEach(function(thread) {
        Logger.log('Snippet: %s', thread.snippet);
      });
    }
    pageToken = threadList.nextPageToken;
  } while (pageToken);
}
// [END listInboxSnippets]


/**
 * Gets a history record ID associated with the most
 * recently sent message, then logs all the message IDs
 * that have changed since that message was sent.
 */
// [START logRecentHistory]
function logRecentHistory() {
  // Get the history ID associated with the most recent
  // sent message.
  var sent = Gmail.Users.Threads.list('me', {
      q: 'label:sent',
      maxResults: 1
  });
  if (!sent.threads || !sent.threads[0]) {
    Logger.log('No sent threads found.');
    return;
  }
  var historyId = sent.threads[0].historyId;

  // Log the ID of each message changed since the most
  // recent message was sent.
  var pageToken;
  var changed = [];
  do {
    var recordList = Gmail.Users.History.list('me', {
      startHistoryId: historyId,
      pageToken: pageToken
    });
    var history = recordList.history;
    if (history && history.length > 0) {
      history.forEach(function(record) {
        record.messages.forEach(function(message) {
          if (changed.indexOf(message.id) == -1) {
            changed.push(message.id);
          }
        });
      });
    }
    pageToken = recordList.nextPageToken;
  } while (pageToken);

  changed.forEach(function(id) {
    Logger.log('Message Changed: %s', id);
  });
}
// [END logRecentHistory]
