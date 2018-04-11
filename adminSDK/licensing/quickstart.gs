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
function listLicenseAssignments() {
  var customerId = 'YOUR_DOMAIN_NAME_HERE';
  var productId = 'Google-Apps';
  var optionalArgs = {
    maxResults: 10
  };
  var response = AdminLicenseManager.LicenseAssignments.listForProduct(productId,
      customerId, optionalArgs);
  var assignments = response.items;
  if (assignments && assignments.length > 0) {
    Logger.log('License assignments:');
    for (i = 0; i < assignments.length; i++) {
      var assignment = assignments[i];
      Logger.log('%s (%s)', assignment.userId, assignment.skuId);
    }
  } else {
    Logger.log('No license assignments found.');
  }
}
