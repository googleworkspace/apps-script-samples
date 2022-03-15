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
// [START people_get_connections]
/**
 * Gets a list of people in the user's contacts.
 * @see https://developers.google.com/people/api/rest/v1/people.connections/list
 */
function getConnections() {
  try {
    // Get the list of connections/contacts of user's profile
    const people = People.People.Connections.list('people/me', {
      personFields: 'names,emailAddresses'
    });
    // Print the connections/contacts
    Logger.log('Connections: %s', JSON.stringify(people, null, 2));
  } catch (err) {
    // TODO (developers) - Handle exception here
    Logger.log('Failed to get the connection with an error %s', err.message);
  }
}
// [END people_get_connections]

// [START people_get_self_profile]
/**
 * Gets the own user's profile.
 * @see https://developers.google.com/people/api/rest/v1/people/getBatchGet
 */
function getSelf() {
  try {
    // Get own user's profile using People.getBatchGet() method
    const people = People.People.getBatchGet({
      resourceNames: ['people/me'],
      personFields: 'names,emailAddresses'
      // Use other query parameter here if needed
    });
    Logger.log('Myself: %s', JSON.stringify(people, null, 2));
  } catch (err) {
    // TODO (developer) -Handle exception
    Logger.log('Failed to get own profile with an error %s', err.message);
  }
}
// [END people_get_self_profile]

// [START people_get_account]
/**
 * Gets the person information for any Google Account.
 * @param {string} accountId The account ID.
 * @see https://developers.google.com/people/api/rest/v1/people/get
 */
function getAccount(accountId) {
  try {
    // Get the Account details using account ID.
    const people = People.People.get('people/' + accountId, {
      personFields: 'names,emailAddresses'
    });
    // Print the profile details of Account.
    Logger.log('Public Profile: %s', JSON.stringify(people, null, 2));
  } catch (err) {
    // TODO (developer) - Handle exception
    Logger.log('Failed to get account with an error %s', err.message);
  }
}
// [END people_get_account]
