/**
 * Copyright  Google LLC
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
// [START gmail_quickstart]
/**
 * Lists all labels in the user's mailbox
 */
function listLabels() {
  try{
    const response = Gmail.Users.Labels.list('me');
    if (response.labels.length == 0) {
      Logger.log('No labels found.');
      return;
    } 
    Logger.log('Labels:');
    for (let i = 0; i < response.labels.length; i++) {
      const label = response.labels[i];
      Logger.log('- %s', label.name);
    }
  }
  catch(err){
    Logger.log(err)
  }
}
// [END gmail_quickstart]
