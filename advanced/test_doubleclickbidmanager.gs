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

/**
 * Tests listQueries function of doubleclickbidmanager.gs
 */
function itShouldListQueries() {
  console.log('> itShouldListQueries');
  listQueries();
}

/**
 * Tests createAndRunQuery function of doubleclickbidmanager.gs
 */
function itShouldCreateAndRunQuery() {
  console.log('> itShouldCreateAndRunQuery');
  createAndRunQuery();
}

/**
 * Tests fetchReport function of doubleclickbidmanager.gs
 */
function itShouldFetchReport() {
  console.log('> itShouldFetchReport');
  fetchReport();
}

/**
 * Run all tests
 */
function RUN_ALL_TESTS() {
  itShouldListQueries();
  itShouldCreateAndRunQuery();
  itShouldFetchReport();
}
