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
function insertEmailIntoGroup() {
  var groupId = 'YOUR_GROUP_EMAIL_ADDRESS_HERE';
  var threads = GmailApp.getInboxThreads();
  if (!threads || threads.length == 0) {
    throw 'Error: No threads in inbox.';
  }
  var thread = threads[0];
  var message = thread.getMessages().pop();
  var content = message.getRawContent();
  var contentBlob = Utilities.newBlob(content, 'message/rfc822');
  var response = AdminGroupsMigration.Archive.insert(groupId, contentBlob);
  Logger.log('Response code: %s', response.responseCode);
}
