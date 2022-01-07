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
// [START tasks_lists_task_lists]
/**
 * Lists the titles and IDs of tasksList.
 */
function listTaskLists() {
  try {
    /**
     * Returns all the authenticated user's task lists.
     * @see https://developers.google.com/tasks/reference/rest/v1/tasklists/list
     */
    const taskLists = Tasks.Tasklists.list();
    // If taskLists are available then print all tasklists.
    if (taskLists.items) {
      // Print the tasklist title and tasklist id.
      for (let i = 0; i < taskLists.items.length; i++) {
        const taskList = taskLists.items[i];
        Logger.log('Task list with title "%s" and ID "%s" was found.', taskList.title, taskList.id);
      }
    } else {
      Logger.log('No task lists found.');
    }
  } catch (err) {
    // TODO (developer) - Handle exception from Task API
    Logger.log('Failed with an error %s ', err.message);
  }
}
// [END tasks_lists_task_lists]

// [START tasks_list_tasks]
/**
 * Lists task items for a provided tasklist ID.
 * @param  {string} taskListId The tasklist ID.
 */
function listTasks(taskListId) {
  try {
    /**
     * List the task items of specified tasklist using taskList id.
     * @see https://developers.google.com/tasks/reference/rest/v1/tasks/list
     */
    const tasks = Tasks.Tasks.list(taskListId);
    // If tasks are availble then print all task of given tasklists.
    if (tasks.items) {
      // Print the task title and task id of specified tasklist.
      for (let i = 0; i < tasks.items.length; i++) {
        const task = tasks.items[i];
        Logger.log('Task with title "%s" and ID "%s" was found.', task.title, task.id);
      }
    } else {
      Logger.log('No tasks found.');
    }
  } catch (err) {
    // TODO (developer) - Handle exception from Task API
    Logger.log('Failed with an error %s', err.message);
  }
}
// [END tasks_list_tasks]

// [START tasks_add_task]
/**
 * Adds a task to a tasklist.
 * @param {string} taskListId The tasklist to add to.
 */
function addTask(taskListId) {
  /**
   * Task details with title and notes for inserting new task
   * @see https://developers.google.com/tasks/reference/rest/v1/tasks/insert
   */
  const taskDetails = {
    title: 'Pick up courier',
    notes: 'Remember to get this done!'
  };
  try {
    // Call insert method with taskDetails and taskListId to insert Task to specified tasklist.
    const task= Tasks.Tasks.insert(taskDetails, taskListId);
    // Print the Task ID of created task.
    Logger.log('Task with ID "%s" was created.', task.id);
  } catch (err) {
    // TODO (developer) - Handle exception from Tasks.insert() of Task API
    Logger.log('Failed with an error %s', err.message);
  }
}
// [END tasks_add_task]
