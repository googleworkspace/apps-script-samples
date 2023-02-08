/**
 * Copyright Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Run all tests for propertyService.gs
 */
function RUN_ALL_TESTS() {
  console.log('> itShouldSaveSingleProperty');
  saveSingleProperty();
  console.log('> itShouldSaveMultipleProperties');
  saveMultipleProperties();
  console.log('> itShouldReadSingleProperty');
  readSingleProperty();
  console.log('> itShouldReadAllProperties');
  readAllProperties();
  // The tests below are successful if they run without any extra output
  console.log('> itShouldUpdateProperty');
  updateProperty();
  console.log('> itShouldDeleteSingleProperty');
  deleteSingleProperty();
  console.log('> itShouldDeleteAllUserProperties');
  deleteAllUserProperties();
}
