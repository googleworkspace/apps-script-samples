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
// [START apps_script_classroom_list_courses]
/**
 * Lists 10 course names and IDs.
 */
function listCourses() {
  /**
   * @see https://developers.google.com/classroom/reference/rest/v1/courses/list
   */
  const optionalArgs = {
    pageSize: 10
    // Use other query parameters here if needed.
  };
  try {
    const response = Classroom.Courses.list(optionalArgs);
    const courses = response.courses;
    if (!courses || courses.length === 0) {
      console.log('No courses found.');
      return;
    }
    // Print the course names and IDs of the available courses.
    for (const course in courses) {
      console.log('%s (%s)', courses[course].name, courses[course].id);
    }
  } catch (err) {
    // TODO (developer)- Handle Courses.list() exception from Classroom API
    console.log('Failed with error %s', err.message);
  }
}
// [END apps_script_classroom_list_courses]
