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
// [START apps_script_tasks_lists_task_lists]
/**
 * Lists tasks titles and IDs.
 */
function listTaskLists() {
  var taskLists = Tasks.Tasklists.list();
  if (taskLists.items) {
    for (var i = 0; i < taskLists.items.length; i++) {
      var taskList = taskLists.items[i];
      Logger.log('Task list with title "%s" and ID "%s" was found.',
          taskList.title, taskList.id);
    }
  } else {
    Logger.log('No task lists found.');
  }
}
// [END apps_script_tasks_lists_task_lists]

// [START apps_script_tasks_list_tasks]
/**
 * Lists task items for a provided tasklist ID.
 * @param  {string} taskListId The tasklist ID.
 */
function listTasks(taskListId) {
  var tasks = Tasks.Tasks.list(taskListId);
  if (tasks.items) {
    for (var i = 0; i < tasks.items.length; i++) {
      var task = tasks.items[i];
      Logger.log('Task with title "%s" and ID "%s" was found.',
          task.title, task.id);
    }
  } else {
    Logger.log('No tasks found.');
  }
}
// [END apps_script_tasks_list_tasks]

// [START apps_script_tasks_add_task]
/**
 * Adds a task to a tasklist.
 * @param {string} taskListId The tasklist to add to.
 */
function addTask(taskListId) {
  var task = {
    title: 'Pick up dry cleaning',
    notes: 'Remember to get this done!'
  };
  task = Tasks.Tasks.insert(task, taskListId);
  Logger.log('Task with ID "%s" was created.', task.id);
}
// [END apps_script_tasks_add_task]
