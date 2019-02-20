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

// [START apps_script_data_studio_error_ds_user]
// Admin and non-admin users will see the following error.
try {
  // Code that might fail.
} catch (e) {
  throw new Error('DS_USER:This will be shown to admin & non-admin.');
}

// Only admin users will see the following error.
try {
  // Code that might fail.
} catch (e) {
  throw new Error('This message will only be shown to admin users');
}
// [END apps_script_data_studio_error_ds_user]

// [START apps_script_data_studio_error_helper]
/**
 * Throws an error that complies with the community connector spec.
 * @param {string} message The error message.
 * @param {boolean} userSafe Determines whether this message is safe to show
 *     to non-admin users of the connector. true to show the message, false
 *     otherwise. false by default.
 */
function throwConnectorError(message, userSafe) {
  userSafe = (typeof userSafe !== 'undefined' &&
              typeof userSafe === 'boolean') ? userSafe : false;
  if (userSafe) {
    message = 'DS_USER:' + message;
  }

  throw new Error(message);
}
// [END apps_script_data_studio_error_helper]

// [START apps_script_data_studio_error_logging]
/**
 * Log an error that complies with the community connector spec.
 * @param {Error} originalError The original error that occurred.
 * @param {string} message Additional details about the error to include in
 *    the log entry.
 */
function logConnectorError(originalError, message) {
  var logEntry = [
    'Original error (Message): ',
    originalError,
    '(', message, ')'
  ];
  console.error(logEntry.join('')); // Log to Stackdriver.
}
// [END apps_script_data_studio_error_logging]

// [START apps_script_data_studio_error_error]
// Error message that will be shown to a non-admin users.
try {
  // Code that might fail.
} catch (e) {
  logConnectorError(e, 'quota_hour_exceeded'); // Log to Stackdriver.
  throwConnectorError('You\'ve exceeded the hourly quota. Try again later.', true);
}
// [END apps_script_data_studio_error_error]
