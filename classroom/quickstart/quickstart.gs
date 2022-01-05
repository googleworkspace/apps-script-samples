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
// [START classroom_quickstart]
/**
 * Lists 10 course names and ids.
 */
function listCourses() {
  /**  here pass pageSize Query parameter as argument to get maximum number of result
  * Uncomment other query parameter as needed like studentId/teacherId/courseStates.
  * @see https://developers.google.com/classroom/reference/rest/v1/courses/list
  */
  const optionalArgs = {
    pageSize: 10 // integer value for maximum number of result.
    // teacherId:'string', //  numeric id/email address/'me'(indicating requesting user)
    // studentId: 'string', //  numeric id/email address/'me'(indicating requesting user)
    // courseStates:'ACTIVE' // state of course. Use other options PROVISIONED/DECLINED/ARCHIVED
  };
  try {
    /** call Classroom.Courses.list method returns list of courses that the requesting user
     *  is permitted to view, restricted to those that match the request.
     */
    const response = Classroom.Courses.list(optionalArgs);
    const courses = response.courses;
    // print the course title and id only courses are present in classroom
    if (courses && courses.length > 0) {
      // Print the course names and IDs of the courses
      for (let i = 0; i < courses.length; i++) {
        const course = courses[i];
        Logger.log('%s (%s)', course.name, course.id);
      }
      return;
    }
    Logger.log('No courses found.');
  } catch (err) {
    // TODO (developer)- Handle Courses.list() exception from Classroom API
    // get errors like PERMISSION_DENIED/INVALID_ARGUMENT/NOT_FOUND
    Logger.log('Failed with error %s', err.message);
  }
}
// [END classroom_quickstart]
