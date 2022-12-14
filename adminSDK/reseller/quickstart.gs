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
 * List Admin SDK reseller.
 * @see https://developers.google.com/admin-sdk/reseller/reference/rest/v1/subscriptions/list
 */
function listSubscriptions() {
  const optionalArgs = {
    maxResults: 10
  };
  try {
    const response = AdminReseller.Subscriptions.list(optionalArgs);
    const subscriptions = response.subscriptions;
    if (!subscriptions || subscriptions.length === 0) {
      console.log('No subscriptions found.');
      return;
    }
    console.log('Subscriptions:');
    for (const subscription of subscriptions) {
      console.log('%s (%s, %s)', subscription.customerId, subscription.skuId,
          subscription.plan.planName);
    }
  } catch (err) {
    // TODO (developer)- Handle exception from the Reseller  API
    console.log('Failed with error %s', err.message);
  }
}
// [END admin_sdk_reseller_quickstart]
