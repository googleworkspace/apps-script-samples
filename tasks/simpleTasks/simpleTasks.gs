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
 * @typedef {Object} TaskInfo
 * @property {string} id
 * @property {string} title
 * @property {string} notes
 * @property {boolean} completed
 */

/**
 * @typedef {object} HtmlOutput
 */

/**
 * @typedef {Object} TaskListInfo
 * @property {string} id
 * @property {string} name
 */

/**
 * Special function that handles HTTP GET requests to the published web app.
 * @return {HtmlOutput} The HTML page to be served.
 */
function doGet() {
  return HtmlService.createTemplateFromFile('page').evaluate()
      .setTitle('Simple Tasks');
}

/**
 * Returns the ID and name of every task list in the user's account.
 * @return {TaskListInfo[]} The task list data.
 */
function getTaskLists() {
  if (!Tasks.Tasklists) {
    return [];
  }
  const taskLists = Tasks.Tasklists.list().items;
  if (!taskLists) {
    return [];
  }
  const result = [];
  for (const taskList of taskLists) {
    if (taskList.id && taskList.title) {
      result.push({id: taskList.id, name: taskList.title});
    }
  }
  return result;
}

/**
 * Returns information about the tasks within a given task list.
 * @param {string} taskListId The ID of the task list.
 * @return {TaskInfo[]} The task data.
 */
function getTasks(taskListId) {
  if (!Tasks.Tasks) {
    return [];
  }
  const tasks = Tasks.Tasks.list(taskListId).items;
  if (!tasks) {
    return [];
  }
  const result = [];
  for (const task of tasks) {
    if (task.id && task.title) {
      result.push({
        id: task.id,
        title: task.title,
        notes: task.notes ?? '',
        completed: Boolean(task.completed),
      });
    }
  }
  return result;
}

/**
 * Sets the completed status of a given task.
 * @param {string} taskListId The ID of the task list.
 * @param {string} taskId The ID of the task.
 * @param {boolean} completed True if the task should be marked as complete, false otherwise.
 */
function setCompleted(taskListId, taskId, completed) {
  const task = Tasks.newTask();
  if (completed) {
    task.status = 'completed';
  } else {
    task.status = 'needsAction';
    (/** @type {any} */ (task)).completed = null;
  }
  if (!Tasks.Tasks) {
    return;
  }
  Tasks.Tasks.patch(task, taskListId, taskId);
}

/**
 * Adds a new task to the task list.
 * @param {string} taskListId The ID of the task list.
 * @param {string} title The title of the new task.
 */
function addTask(taskListId, title) {
  const task = Tasks.newTask();
  task.title = title;
  if (!Tasks.Tasks) {
    return;
  }
  Tasks.Tasks.insert(task, taskListId);
}
