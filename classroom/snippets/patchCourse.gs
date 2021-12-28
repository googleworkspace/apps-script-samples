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
 */
function coursePatch(courseId) {
  const courseDetails = {
    'section': 'Period 3',
    'room': '302'
  };
  const mask = {
    updateMask: 'section,room'
  };
  try {
    // Update section and room in course.
    const course = Classroom.Courses.patch(body=courseDetails, id=courseId, updateMask=mask);
    Logger.log('Course "%s" updated.', course.name);
  } catch (err) {
    // TODO (developer) - Handle Courses.patch() exception
    Logger.log('Failed to update the course. Error message: %s',JSON.stringify(err.message))

  }
}
// [END classroom_patch_course]