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
 * Lists users in a G Suite domain.
 */
function listUsers() {
  var optionalArgs = {
    customer: 'my_customer',
    maxResults: 10,
    orderBy: 'email'
  };
  var response = AdminDirectory.Users.list(optionalArgs);
  var users = response.users;
  if (users && users.length > 0) {
    Logger.log('Users:');
    for (i = 0; i < users.length; i++) {
      var user = users[i];
      Logger.log('%s (%s)', user.primaryEmail, user.name.fullName);
    }
  } else {
    Logger.log('No users found.');
  }
}
// [END admin_sdk_directory_quickstart]
