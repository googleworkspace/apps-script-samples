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
// [START drive_activity_v2_quickstart]
/**
 * Lists activity for a Drive user.
 */
function listDriveActivity() {
  var request = {pageSize: 10};
  var response = DriveActivity.Activity.query(request);
  var activities = response.activities;
  if (activities && activities.length > 0) {
    Logger.log('Recent activity:');
    for (var i = 0; i < activities.length; i++) {
      var activity = activities[i];
      var time = getTimeInfo(activity);
      var action = getActionInfo(activity['primaryActionDetail']);
      var actors = activity.actors.map(getActorInfo);
      var targets = activity.targets.map(getTargetInfo);
      Logger.log(
          '%s: %s, %s, %s', time, truncated(actors), action,
          truncated(targets));
    }
  } else {
    Logger.log('No activity.');
  }
}

/** Returns a string representation of the first elements in a list. */
function truncated(array, opt_limit) {
  var limit = opt_limit || 2;
  var contents = array.slice(0, limit).join(', ');
  var more = array.length > limit ? ', ...' : '';
  return '[' + contents + more + ']';
}

/** Returns the name of a set property in an object, or else "unknown". */
function getOneOf(object) {
  for (var key in object) {
    return key;
  }
  return 'unknown';
}

/** Returns a time associated with an activity. */
function getTimeInfo(activity) {
  if ('timestamp' in activity) {
    return activity.timestamp;
  }
  if ('timeRange' in activity) {
    return activity.timeRange.endTime;
  }
  return 'unknown';
}

/** Returns the type of action. */
function getActionInfo(actionDetail) {
  return getOneOf(actionDetail);
}

/** Returns user information, or the type of user if not a known user. */
function getUserInfo(user) {
  if ('knownUser' in user) {
    var knownUser = user['knownUser'];
    var isMe = knownUser['isCurrentUser'] || false;
    return isMe ? 'people/me' : knownUser['personName'];
  }
  return getOneOf(user);
}

/** Returns actor information, or the type of actor if not a user. */
function getActorInfo(actor) {
  if ('user' in actor) {
    return getUserInfo(actor['user'])
  }
  return getOneOf(actor);
}

/** Returns the type of a target and an associated title. */
function getTargetInfo(target) {
  if ('driveItem' in target) {
    var title = target.driveItem.title || 'unknown';
    return 'driveItem:"' + title + '"';
  }
  if ('teamDrive' in target) {
    var title = target.teamDrive.title || 'unknown';
    return 'teamDrive:"' + title + '"';
  }
  if ('fileComment' in target) {
    var parent = target.fileComment.parent || {};
    var title = parent.title || 'unknown';
    return 'fileComment:"' + title + '"';
  }
  return getOneOf(target) + ':unknown';
}
// [END drive_activity_v2_quickstart]
