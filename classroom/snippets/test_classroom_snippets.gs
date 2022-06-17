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
 * Tests createCourse function of createCourse.gs
 * @return {string} courseId course id of created course
 */
function itShouldCreateCourse() {
  Logger.log('> itShouldCreateCourse');
  const courseId = createCourse();
  return courseId;
}

/**
 * Tests getCourse function of getCourse.gs
 * @param {string} courseId course id
 */
function itShouldGetCourse(courseId) {
  Logger.log('> itShouldGetCourse');
  getCourse(courseId);
}

/**
 * Tests createAlias function of createAlias.gs
 */
function itShouldCreateAlias() {
  Logger.log('> itShouldCreateAlias');
  createAlias();
}

/**
 * Tests addAlias function of addAlias.gs
 * @param {string} courseId course id
 */
function itShouldAddAlias(courseId) {
  Logger.log('> itShouldAddAlias');
  addAlias(courseId);
}

/**
 * Tests courseUpdate function of courseUpdate.gs
 * @param {string} courseId course id
 */
function itShouldUpdateCourse(courseId) {
  Logger.log('> itShouldUpdateCourse');
  courseUpdate(courseId);
}

/**
 * Tests coursePatch function of patchCourse.gs
 * @param {string} courseId course id
 */
function itShouldPatchCourse(courseId) {
  Logger.log('> itShouldPatchCourse');
  coursePatch(courseId);
}

/**
 * Tests listCourses function of listCourses.gs
 */
function itShouldListCourses() {
  Logger.log('> itShouldListCourses');
  listCourses();
}

/**
 * Runs all the tests
 */
function RUN_ALL_TESTS() {
  const courseId = itShouldCreateCourse();
  itShouldGetCourse(courseId);
  itShouldCreateAlias();
  itShouldAddAlias(courseId);
  itShouldUpdateCourse(courseId);
  itShouldPatchCourse(courseId);
  itShouldListCourses();
}
