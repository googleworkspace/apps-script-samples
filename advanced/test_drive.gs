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
 * Helper functions to help test drive.gs expectToExist(...)
 * @param {string} value
 * To test drive.gs please add drive services
 */
function expectToExist(value) {
  if (value) {
    console.log('TEST: Exists');
  } else {
    throw new Error('TEST: DNE');
  }
}

/**
 * Helper functions to help test drive.gs expectToEqual
 * @param {string} actual
 * @param {string} expected
 * To test drive.gs please add drive services
 */
function expectToEqual(actual, expected) {
  console.log('TEST: actual: %s = expected: %s', actual, expected);
  if (actual !== expected) {
    console.log('TEST: actual: %s expected: %s', actual, expected);
  }
}

/**
 * Helper functions to help test drive.gs createFolder()
 *
 * To test drive.gs please add drive services
 */
function createTestFolder() {
  DriveApp.createFolder('test1');
  DriveApp.createFolder('test2');
}

/**
 * Helper functions to help test drive.gs getFilesByName(...)
 *
 * To test drive.gs please add drive services
 */
function fileCleanUp() {
  DriveApp.getFilesByName('google_logo.png').next().setTrashed(true);
}

/**
 * Helper functions folderCleanUp()
 *
 * To test getFoldersByName() please add drive services
 */
function folderCleanUp() {
  DriveApp.getFoldersByName('test1').next().setTrashed(true);
  DriveApp.getFoldersByName('test2').next().setTrashed(true);
}

/**
 * drive.gs test functions below
 */

/**
 * tests drive.gs uploadFile
 * @return {string} fileId The ID of the file
 */
function checkUploadFile() {
  uploadFile();
  const fileId = DriveApp.getFilesByName('google_logo.png').next().getId();
  expectToExist(fileId);
  return fileId;
}

/**
 * tests drive.gs listRootFolders
 */
function checkListRootFolders() {
  createTestFolder();

  const folders = DriveApp.getFolders();
  while (folders.hasNext()) {
    const folder = folders.next();
    console.log(folder.getName() + ' ' + folder.getId());
  }
  listRootFolders();
  folderCleanUp();
}

/**
 * tests drive.gs addCustomProperty
 * @param {string} fileId The ID of the file
 */
function checkAddCustomProperty(fileId) {
  addCustomProperty(fileId);
  expectToEqual(Drive.Properties.get(fileId, 'department',
      {visibility: 'PUBLIC'}).value, 'Sales');
}

/**
 * Run all tests
 */
function RUN_ALL_TESTS() {
  const fileId = checkUploadFile();
  checkListRootFolders();
  checkAddCustomProperty(fileId);
  listRevisions(fileId);
  fileCleanUp();
}
