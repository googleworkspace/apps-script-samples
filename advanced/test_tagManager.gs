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
// Before running tagManager tests create a test tagMAnager account
// and replace the value below with its account path
const path = 'accounts/6007387289';

/**
 * Tests createContainerVersion function of tagManager.gs
 * @param {string} accountPath Tag manager account's path
 * @return {object} version The container version
 */
function itShouldCreateContainerVersion(accountPath) {
  console.log('> itShouldCreateContainerVersion');
  const version = createContainerVersion(accountPath);
  return version;
}

/**
 * Tests publishVersionAndQuickPreviewDraft function of tagManager.gs
 * @param {object} version tag managers container version
 */
function itShouldPublishVersionAndQuickPreviewDraft(version) {
  console.log('> itShouldPublishVersionAndQuickPreviewDraft');
  publishVersionAndQuickPreviewDraft(version);
}

/**
 * Tests createAndReauthorizeUserEnvironment function of tagManager.gs
 * @param {object} version tag managers container version
 */
function itShouldCreateAndReauthorizeUserEnvironment(version) {
  console.log('> itShouldCreateAndReauthorizeUserEnvironment');
  createAndReauthorizeUserEnvironment(version);
}

/**
 * Tests logAllAccountUserPermissionsWithContainerAccess function of tagManager.gs
 * @param {string} accountPath Tag manager account's path
 */
function itShouldLogAllAccountUserPermissionsWithContainerAccess(accountPath) {
  console.log('> itShouldLogAllAccountUserPermissionsWithContainerAccess');
  logAllAccountUserPermissionsWithContainerAccess(accountPath);
}
/**
 * Runs all tests
 */
function RUN_ALL_TESTS() {
  const version = itShouldCreateContainerVersion(path);
  itShouldPublishVersionAndQuickPreviewDraft(version);
  itShouldCreateAndReauthorizeUserEnvironment(version);
  itShouldLogAllAccountUserPermissionsWithContainerAccess(path);
}
