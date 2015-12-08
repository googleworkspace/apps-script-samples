// Copyright 2015 Google Inc. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


/**
 * Sample server function that will be called using google.script.run.
 * @param {String} mode Execution mode (add-on or webapp).
 * @return {Object} Sample JSON object response.
 */
function runSomeAppsScript(mode) {
  var config = Configuration.getCurrent();
  var count = countSheets();
  try {
    var msg = Utilities.formatString('There %s %d sheet%s.',
        (count > 1) ? 'are' : 'is', count, (count > 1) ? 's' : '');
    if (mode === 'addon') {
      new SheetsUtilitiesLibrary(config).showToast(msg, 'Sheet Count');
    } else {
      Logger.log(msg);
    }
    return {
      status: 'ok',
      sheetCount: count,
      message: 'This is a response from a server-side function.' };
  } catch (e) {
    logException_(e);
    return { status: 'error', message: e.message, stack: e.stack };
  }
}
