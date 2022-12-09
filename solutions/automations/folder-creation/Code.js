/**
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// To learn how to use this script, refer to the video: https://youtu.be/Utl57R7I2Cs

/**
 * This function will create a new folder in the defined Shard Drive. You define
 * the Shared Drive by adding its ID on line number 28. The parameter `project`
 * is passed in from the AppSheet app. Please watch this video tutorial to see
 * how to use this script: https://youtu.be/Utl57R7I2Cs.
 */
function createNewFolder(project) {
  const folder = Drive.Files.insert(
    {
      parents: [{ id: 'ADD YOUR SHARED DRIVE FOLDER ID HERE' }],
      title: project,
      mimeType: "application/vnd.google-apps.folder",
    },
    null,
    { supportsAllDrives: true }
  );

  return folder.alternateLink;
}
