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
 * Lists the user's tasks.
 */
function listTaskLists() {
  var optionalArgs = {
    maxResults: 10
  };
  var response = Tasks.Tasklists.list(optionalArgs);
  var taskLists = response.items;
  if (taskLists && taskLists.length > 0) {
    Logger.log('Task lists:');
    for (var i = 0; i < taskLists.length; i++) {
      var taskList = taskLists[i];
      Logger.log('%s (%s)', taskList.title, taskList.id);
    }
  } else {
    Logger.log('No task lists found.');
  }
}
