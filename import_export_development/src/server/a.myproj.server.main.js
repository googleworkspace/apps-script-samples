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
 * An example function that does something with the "active" spreadsheet,
 * which may be overridden by the developers debug function.
 * @return {Integer}
 */
function countSheets() {
  var config = Configuration.getCurrent();
  var currentSpreadsheet = new SheetsUtilitiesLibrary(config)
      .getCurrentActiveSpreadsheet();
  var count = currentSpreadsheet.getSheets().length;
  if (config.debug) {
    Logger.log(
        Utilities.formatString('main::countSheets:\nThere %s %d sheet%s.',
        (count > 1) ? 'are' : 'is', count, (count > 1) ? 's' : ''));
  }
  return count;
}


/**
 * Passed into the configuration factory constructor
 * @return {myproj.json.Configuration} Default configuration settings.
 */
function getDefaultConfiguration_() {
  return {
    debug: false,
    sheets: {
      debugSpreadsheetId: null
    }
  };
}

