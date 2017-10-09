/**
 * Gets a file's activity and logs the list of
 * unique users that performed the activity.
 */
// [START getUsersActivity]
function getUsersActivity() {
  var fileId = 'YOUR_FILE_ID_HERE';

  var pageToken;
  var users = {};
  do {
    var result = AppsActivity.Activities.list({
      'drive.fileId': fileId,
      'source': 'drive.google.com',
      'pageToken': pageToken
    });
    var activities = result.activities;
    for (var i = 0; i < activities.length; i++) {
      var events = activities[i].singleEvents;
      for (var j = 0; j < events.length; j++) {
        var event = events[j];
        users[event.user.name] = true;
      }
    }
    pageToken = result.nextPageToken;
  } while (pageToken);
  Logger.log(Object.keys(users));
}
// [END getUsersActivity]
