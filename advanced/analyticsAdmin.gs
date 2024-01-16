/**
 * Copyright 2021 Google LLC
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
// [START apps_script_analyticsadmin]
/**
 * Logs the Google Analytics accounts accessible by the current user.
 */
function listAccounts() {
  try {
    accounts = AnalyticsAdmin.Accounts.list();
    if (!accounts.items || !accounts.items.length) {
      console.log('No accounts found.');
      return;
    }

    for (let i = 0; i < accounts.items.length; i++) {
      const account = accounts.items[i];
      console.log('Account: name "%s", displayName "%s".', account.name, account.displayName);
    }
  } catch (e) {
    // TODO (Developer) - Handle exception
    console.log('Failed with error: %s', e.error);
  }
}
// [END apps_script_analyticsadmin]
