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
// [START admin_sdk_directory_quickstart]
/**
 * Lists users in a Google Workspace domain.
 * @see https://developers.google.com/admin-sdk/directory/reference/rest/v1/users/list
 */
function listUsers() {
  const optionalArgs = {
    customer: 'my_customer',
    maxResults: 10,
    orderBy: 'email'
  };
  try {
    const response = AdminDirectory.Users.list(optionalArgs);
    const users = response.users;
    if (!users || users.length === 0) {
      console.log('No users found.');
      return;
    }
    // Print the list of user's full name and email
    console.log('Users:');
    for (const user of users) {
      console.log('%s (%s)', user.primaryEmail, user.name.fullName);
    }
  } catch (err) {
    // TODO (developer)- Handle exception from the Directory API
    console.log('Failed with error %s', err.message);
  }
}
// [END admin_sdk_directory_quickstart]
