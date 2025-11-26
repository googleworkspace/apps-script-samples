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
// [START people_quickstart]
/**
 * @typedef {Object} EmailAddress
 * @see https://developers.google.com/people/api/rest/v1/people#Person
 * @property {string} value
 * Note: This is a partial definition.
 */

/**
 * @typedef {Object} Name
 * @see https://developers.google.com/people/api/rest/v1/people#Person
 * @property {string} displayName
 * Note: This is a partial definition.
 */

/**
 * @typedef {Object} Person
 * @see https://developers.google.com/people/api/rest/v1/people#Person
 * @property {Name[]} names
 * @property {EmailAddress[]} [emailAddresses]
 * Note: This is a partial definition.
 */

/**
 * @typedef {Object} Connection
 * @see https://developers.google.com/people/api/rest/v1/people.connections/list
 * @property {Person[]} connections
 * Note: This is a partial definition.
 */

/**
 * Print the display name if available for 10 connections.
 */
function listConnectionNames() {
  // Use the People API to list the connections of the logged in user.
  // See: https://developers.google.com/people/api/rest/v1/people.connections/list
  if (!People || !People.People || !People.People.Connections) {
    throw new Error("People service not enabled.");
  }
  const connections = People.People.Connections.list("people/me", {
    pageSize: 10,
    personFields: "names,emailAddresses",
  });
  if (!connections.connections) {
    console.log("No connections found.");
    return;
  }
  for (const person of connections.connections) {
    if (
      person.names &&
      person.names.length > 0 &&
      person.names[0].displayName
    ) {
      console.log(person.names[0].displayName);
    } else {
      console.log("No display name found for connection.");
    }
  }
}
// [END people_quickstart]
