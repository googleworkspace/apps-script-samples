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
 * Print the display name if available for 10 connections.
 */
function listConnectionNames() {
  var connections = People.People.Connections.list('people/me', {
    pageSize: 10,
    personFields: 'names,emailAddresses'
  });
  connections.connections.forEach(function(person) {
    if (person.names && person.names.length > 0) {
      Logger.log(person.names[0].displayName);
    } else {
      Logger.log('No display name found for connection.');
    }
  });
}
// [END people_quickstart]
