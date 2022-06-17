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
 * Tests listAllUsers function of adminSDK.gs
 */
function itShouldListAllUsers() {
  Logger.log('> itShouldListAllUsers');
  listAllUsers();
}

/**
 * Tests getUser function of adminSDK.gs
 */
function itShouldGetUser() {
  Logger.log('> itShouldGetUser');
  getUser();
}

/**
 * Tests addUser function of adminSDK.gs
 */
function itShouldAddUser() {
  Logger.log('> itShouldAddUser');
  addUser();
}

/**
 * Tests createAlias function of adminSDK.gs
 */
function itShouldCreateAlias() {
  Logger.log('> itShouldCreateAlias');
  createAlias();
}

/**
 * Tests listAllGroups function of adminSDK.gs
 */
function itShouldListAllGroups() {
  Logger.log('> itShouldListAllGroups');
  listAllGroups();
}

/**
 * Tests addGroupMember function of adminSDK.gs
 */
function itShouldAddGroupMember() {
  Logger.log('> itShouldAddGroupMember');
  addGroupMember();
}

/**
 * Tests migrateMessages function of adminSDK.gs
 */
function itShouldMigrateMessages() {
  Logger.log('> itShouldMigrateMessages');
  migrateMessages();
}

/**
 * Tests getGroupSettings function of adminSDK.gs
 */
function itShouldGetGroupSettings() {
  Logger.log('> itShouldGetGroupSettings');
  getGroupSettings();
}

/**
 * Tests updateGroupSettings function of adminSDK.gs
 */
function itShouldUpdateGroupSettings() {
  Logger.log('> itShouldUpdateGroupSettings');
  updateGroupSettings();
}

/**
 * Tests getLicenseAssignments function of adminSDK.gs
 */
function itShouldGetLicenseAssignments() {
  Logger.log('> itShouldGetLicenseAssignments');
  getLicenseAssignments();
}

/**
 * Tests insertLicenseAssignment function of adminSDK.gs
 */
function itShouldInsertLicenseAssignment() {
  Logger.log('> itShouldInsertLicenseAssignment');
  insertLicenseAssignment();
}

/**
 * Tests generateLoginActivityReport function of adminSDK.gs
 */
function itShouldGenerateLoginActivityReport() {
  Logger.log('> itShouldGenerateLoginActivityReport');
  generateLoginActivityReport();
}

/**
 * Tests generateUserUsageReport function of adminSDK.gs
 */
function itShouldGenerateUserUsageReport() {
  Logger.log('> itShouldGenerateUserUsageReport');
  generateUserUsageReport();
}

/**
 * Tests getSubscriptions function of adminSDK.gs
 */
function itShouldGetSubscriptions() {
  Logger.log('> itShouldGetSubscriptions');
  getSubscriptions();
}

/**
 * Runs all the tests
 */
function RUN_ALL_TESTS() {
  itShouldListAllUsers();
  itShouldGetUser();
  itShouldAddUser();
  itShouldCreateAlias();
  itShouldListAllGroups();
  itShouldAddGroupMember();
  itShouldMigrateMessages();
  itShouldGetGroupSettings();
  itShouldUpdateGroupSettings();
  itShouldGetLicenseAssignments();
  itShouldInsertLicenseAssignment();
  itShouldGenerateLoginActivityReport();
  itShouldGenerateUserUsageReport();
  itShouldGetSubscriptions();
}
