/**
 * Copyright  Google LLC
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

// [START gmail_quickstart]
/**
 * @func listLabels
 * @summary Demonstrate to use the Gmail.Users.labels.list() API, this API function returns list of
 * all labels for the user passed.
 * @see https://developers.google.com/gmail/api/reference/rest/v1/users.labels/list
 */
function listLabels() {
  try {
    // Gmail.Users.Labels.list() API returns the list of all Labels in user's mailbox
    const response = Gmail.Users.Labels.list('me');
    if (!response || response.labels.length === 0) {
      // TODO (developer) - No labels are returned from the response
      Logger.log('No labels found.');
      return;
    }
    // Print the Labels that are available.
    Logger.log('Labels:');
    for(let index in response.labels ) {
      // TODO (developer) - use the labels returned from the list() API
      Logger.log('- %s', response.labels[index].name);
    }
  } catch (err) {
    // TODO (developer) - Handle exception on Labels.list() API
    Logger.log('Labels.list() API failed with error %s', err.toString());
  }
}
// [END gmail_quickstart]
