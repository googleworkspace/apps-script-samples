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
// [START admin_sdk_reseller_quickstart]
/**
 * List Admin SDK reseller subscriptions.
 */
function listSubscriptions() {
  var optionalArgs = {
    maxResults: 10,
  };
  var response = AdminReseller.Subscriptions.list(optionalArgs);
  var subscriptions = response.subscriptions;
  if (subscriptions && subscriptions.length > 0) {
    Logger.log('Subscriptions:');
    for (i = 0; i < subscriptions.length; i++) {
      var subscription = subscriptions[i];
      Logger.log('%s (%s, %s)', subscription.customerId, subscription.skuId,
          subscription.plan.planName);
    }
  } else {
    Logger.log('No subscriptions found.');
  }
}
// [END admin_sdk_reseller_quickstart]
