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
 * List login events for a Google Workspace domain.
 * @see https://developers.google.com/admin-sdk/reports/reference/rest/v1/activities/list
 */
function listLogins() {
  const userKey = 'all';
  const applicationName = 'login';
  const optionalArgs = {
    maxResults: 10
  };
  try {
    const response = AdminReports.Activities.list(userKey, applicationName, optionalArgs);
    const activities = response.items;
    if (!activities || activities.length === 0) {
      console.log('No logins found.');
      return;
    }
    // Print login events
    console.log('Logins:');
    for (const activity of activities) {
      console.log('%s: %s (%s)', activity.id.time, activity.actor.email,
          activity.events[0].name);
    }
  } catch (err) {
    // TODO (developer)- Handle exception from the Report  API
    console.log('Failed with error %s', err.message);
  }
}
// [END admin_sdk_reports_quickstart]
