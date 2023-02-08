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
// [START drive_quickstart]
/**
 * Lists the names and IDs of up to 10 files.
 */
function listFiles() {
  try {
    // Files.list method returns the list of files in drive.
    const files = Drive.Files.list({
      fields: 'nextPageToken, items(id, title)',
      maxResults: 10
    }).items;
    // Print the title and id of files available in drive
    for (const file of files) {
      console.log('%s (%s)', file.title, file.id);
    }
  } catch (err) {
    // TODO(developer)-Handle Files.list() exception
    console.log('failed with error %s', err.message);
  }
}
// [END drive_quickstart]
