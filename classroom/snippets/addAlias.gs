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
// [START classroom_add_alias]
/**
 * Updates the section and room of Google Classroom.
 * @param {string} course_id
 * @see https://developers.google.com/classroom/reference/rest/v1/courses.aliases/create
 */
function addAlias(course_id) {
  const alias = {
    'alias': 'p:bio_101'
  };
  try {
    const course_alias = Classroom.Courses.Aliases.create(resource=alias, courseId=course_id);
    console.log('%s successfully added as an alias!', course_alias.alias);
  } catch (err) {
    // TODO (developer) - Handle exception
    console.log('Request to add alias %s failed with error %s.', alias.alias, err.message);
  }
}
// [END classroom_add_alias]
