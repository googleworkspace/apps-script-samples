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
// [START classroom_list_courses]
/**
 * Lists all course names and ids.
 * @see https://developers.google.com/classroom/reference/rest/v1/courses/list
 */
function listCourses() {
  let courses = [];
  const pageToken = null;
  const optionalArgs = {
    pageToken: pageToken,
    pageSize: 100
  };
  try {
    const response = Classroom.Courses.list(optionalArgs);
    courses = response.courses;
    if (courses.length === 0) {
      console.log('No courses found.');
      return;
    }
    // Print the courses available in classroom
    console.log('Courses:');
    for ( const course in courses) {
      console.log('%s (%s)', courses[course].name, courses[course].id);
    }
  } catch (err) {
    // TODO (developer) - Handle exception
    console.log('Failed with error %s', err.message);
  }
}
// [END classroom_list_courses]
