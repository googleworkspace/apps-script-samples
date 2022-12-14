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
 * Tests createDatabase function of jdbc.gs
 */
function itShouldCreateDatabase() {
  console.log('itShouldCreateDatabase');
  createDatabase();
}

/**
 * Tests createUser function of jdbc.gs
 */
function itShouldCreateUser() {
  console.log('itShouldCreateUser');
  createUser();
}

/**
 * Tests createTable function of jdbc.gs
 */
function itShouldCreateTable() {
  console.log('itShouldCreateTable');
  createTable();
}

/**
 * Tests writeOneRecord function of jdbc.gs
 */
function itShouldWriteOneRecord() {
  console.log('itShouldWriteOneRecord');
  writeOneRecord();
}

/**
 * Tests writeManyRecords function of jdbc.gs
 */
function itShouldWriteManyRecords() {
  console.log('itShouldWriteManyRecords');
  writeManyRecords();
}

/**
 * Tests readFromTable function of jdbc.gs
 */
function itShouldReadFromTable() {
  console.log('itShouldReadFromTable');
  readFromTable();
}

/**
 * Runs all the tests
 */
function RUN_ALL_TESTS() {
  itShouldCreateDatabase();
  itShouldCreateUser();
  itShouldCreateTable();
  itShouldWriteOneRecord();
  itShouldWriteManyRecords();
  itShouldReadFromTable();
}
