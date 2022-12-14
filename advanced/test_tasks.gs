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
 * Test functions for tasks.gs
 *
 * Add task API services to test
 */

/**
 * tests listTaskLists of tasks.gs
 */
function itShouldListTaskLists() {
  console.log('> itShouldListTaskLists');
  listTaskLists();
}

/**
 * tests listTasks of tasks.gs
 */
function itShouldListTasks() {
  console.log('> itShouldListTasks');
  const taskId = Tasks.Tasklists.list().items[0].id;
  listTasks(taskId);
}

/**
 * tests addTask of tasks.gs
 */
function itShouldAddTask() {
  console.log('> itShouldAddTask');
  const taskId = Tasks.Tasklists.list().items[0].id;
  addTask(taskId);
}

/**
 * run all tests
 */
function RUN_ALL_TESTS() {
  itShouldListTaskLists();
  itShouldListTasks();
  itShouldAddTask();
  itShouldListTasks();
}
