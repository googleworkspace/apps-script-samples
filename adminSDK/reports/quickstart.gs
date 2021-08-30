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
// [START admin_sdk_reports_quickstart]
/**
 * List login events for a G Suite domain.
 */
function listLogins() {
  var userKey = 'all';
  var applicationName = 'login';
  var optionalArgs = {
    maxResults: 10
  };
  var response = AdminReports.Activities.list(userKey, applicationName, optionalArgs);
  var activities = response.items;
  if (activities && activities.length > 0) {
    Logger.log('Logins:');
    for (i = 0; i < activities.length; i++) {
      var activity = activities[i];
      Logger.log('%s: %s (%s)', activity.id.time, activity.actor.email,
          activity.events[0].name);
    }
  } else {
    Logger.log('No logins found.');
  }
}
// [END admin_sdk_reports_quickstart]
