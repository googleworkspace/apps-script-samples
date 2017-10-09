/**
 * This function searches for videos about dogs, then logs the video IDs and
 * title. Note that this sample limits the results to 25. To return more
 * results, pass additional parameters as shown in the YouTube Data API
 * reference documentation:
 *   https://developers.google.com/youtube/v3/docs/search/list
 */
// [START searchByKeyword]
function searchByKeyword() {
  var results = YouTube.Search.list('id,snippet', {
    q: 'dogs',
    maxResults: 25
  });

  for (var i = 0; i < results.items.length; i++) {
    var item = results.items[i];
    Logger.log('[%s] Title: %s', item.id.videoId, item.snippet.title);
  }
}
// [END searchByKeyword]

/**
 * This function retrieves the user's uploaded videos. It does this using the
 * following steps:
 *    1. Fetches the user's channel's
 *    2. Fetches the user's "uploads" playlist
 *    3. Iterates through this playlist and logs the video IDs and titles
 *    4. If there is a next page of resuts, fetches it and returns to step 3
 */
// [START retrieveMyUploads]
function retrieveMyUploads() {
  var results = YouTube.Channels.list('contentDetails', {
    mine: true
  });

  for (var i = 0; i < results.items.length; i++) {
    var item = results.items[i];
    // Get the channel ID - it's nested in contentDetails, as described in the
    // Channel resource:
    //    https://developers.google.com/youtube/v3/docs/channels
    var playlistId = item.contentDetails.relatedPlaylists.uploads;

    var nextPageToken;
    while (nextPageToken != null) {
      var playlistResponse = YouTube.PlaylistItems.list('snippet', {
        playlistId: playlistId,
        maxResults: 25,
        pageToken: nextPageToken
      });

      for (var j = 0; j < playlistResponse.items.length; j++) {
        var playlistItem = playlistResponse.items[j];
        Logger.log('[%s] Title: %s',
                   playlistItem.snippet.resourceId.videoId,
                   playlistItem.snippet.title);

      }
      nextPageToken = playlistResponse.nextPageToken;
    }
  }
}
// [END retrieveMyUploads]

/**
 * This sample subscribes the user to the Google Developers channel on YouTube.
 */
// [START addSubscription]
function addSubscription() {
  // Replace this channel ID with the channel ID you want to subscribe to
  var channelId = 'UC9gFih9rw0zNCK3ZtoKQQyA';

  var resource = {
    snippet: {
      resourceId: {
        kind: 'youtube#channel',
        channelId: channelId
      }
    }
  };

  try {
    var response = YouTube.Subscriptions.insert(resource, 'snippet');
    Logger.log(response);
  } catch (e) {
    if (e.message.match('subscriptionDuplicate')) {
      Logger.log('Cannot subscribe; already subscribed to channel: ' +
          channelId);
    } else {
      Logger.log('Error adding subscription: ' + e.message);
    }
  }
}
// [END addSubscription]
