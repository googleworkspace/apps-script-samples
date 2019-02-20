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
// [START apps_script_people_get_connections]
/**
 * Gets a list of people in the user's contacts.
 */
function getConnections() {
  var people = People.People.Connections.list('people/me', {
    personFields: 'names,emailAddresses'
  });
  Logger.log('Connections: %s', JSON.stringify(people, null, 2));
}
// [END apps_script_people_get_connections]

// [START apps_script_people_get_self]
/**
 * Gets the own user's profile.
 */
function getSelf() {
  var people = People.People.getBatchGet({
    resourceNames: ['people/me'],
    personFields: 'names,emailAddresses'
  });
  Logger.log('Myself: %s', JSON.stringify(people, null, 2));
}
// [END apps_script_people_get_self]

// [START apps_script_people_get_account]
/**
 * Gets the person information for any Google Account.
 * @param {string} accountId The account ID.
 */
function getAccount(accountId) {
  var people = People.People.get('people/' + accountId, {
    personFields: 'names,emailAddresses'
  });
  Logger.log('Public Profile: %s', JSON.stringify(people, null, 2));
}
// [END apps_script_people_get_account]
