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

// Replace with correct values
const accountName = 'account name';
const clientName = 'ad client name';

/**
 * Tests listAccounts function of adsense.gs
 */
function itShouldListAccounts() {
  console.log('> itShouldListAccounts');
  listAccounts();
}

/**
 * Tests listAdClients function of adsense.gs
 */
function itShouldListAdClients() {
  console.log('> itShouldListAdClients');
  listAdClients(accountName);
}

/**
 * Tests listAdUnits function of adsense.gs
 */
function itShouldListAdUnits() {
  console.log('> itShouldListAdUnits');
  listAdUnits(clientName);
}

/**
 * Run all tests
 */
function RUN_ALL_TESTS() {
  itShouldListAccounts();
  itShouldListAdClients();
  itShouldListAdUnits();
}
