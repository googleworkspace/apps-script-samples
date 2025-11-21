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
// [START classroom_get_course]
/**
 * Retrieves a course by its ID.
 * @param {string} courseId The course ID.
 * @see https://developers.google.com/classroom/reference/rest/v1/courses/get
 */
function getCourse(courseId) {
  if (!Classroom || !Classroom.Courses) {
    throw new Error('Enable the Classroom API advanced service.');
  }
  const course = Classroom.Courses.get(courseId);
  console.log('Course "%s" found. ', course.name);
}
// [END classroom_get_course]
