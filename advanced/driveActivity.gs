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
// [START apps_script_drive_activity_get_users_activity]
/**
 * Gets a file's activity and logs the list of
 * unique users that performed the activity.
 */
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
  console.log(Object.keys(users));
}
// [END apps_script_drive_activity_get_users_activity]
