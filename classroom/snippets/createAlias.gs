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
// [START classroom_create_alias]
/**
 * Creates Course with an alias specified
 */
function createAlias() {
  let course = {
    id: 'p:bio_101',
    name: '10th Grade Biology',
    section: 'Period 2',
    descriptionHeading: 'Welcome to 10th Grade Biology',
    description: 'We\'ll be learning about the structure of living creatures from a combination ' +
      'of textbooks, guest lectures, and lab work. Expect to be excited!',
    room: '301',
    ownerId: 'me',
    courseState: 'PROVISIONED'
  };
  try {
    // Create the course using course details.
    course = Classroom.Courses.create(course);
    console.log('Course created: %s (%s)', course.name, course.id);
  } catch (err) {
    // TODO (developer) - Handle Courses.create() exception
    console.log('Failed to create course %s with an error %s', course.name, err.message);
  }
}
// [END classroom_create_alias]
