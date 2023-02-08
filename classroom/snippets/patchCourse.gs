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
// [START classroom_patch_course]
/**
 * Updates the section and room of Google Classroom.
 * @param {string} courseId
 * @see https://developers.google.com/classroom/reference/rest/v1/courses/patch
 */
function coursePatch(courseId) {
  let course = {
    'section': 'Period 3',
    'room': '302'
  };
  const mask = {
    updateMask: 'section,room'
  };
  try {
    // Update section and room in course.
    course = Classroom.Courses.patch(body=course, id=courseId, updateMask=mask);
    console.log('Course "%s" updated.', course.name);
  } catch (err) {
    // TODO (developer) - Handle Courses.patch() exception
    console.log('Failed to update the course. Error message: %s', err.message);
  }
}
// [END classroom_patch_course]
