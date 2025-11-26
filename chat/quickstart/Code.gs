/**
 * Copyright 2024 Google LLC
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

// [START chat_quickstart]
/**
 * This quickstart sample shows how to list spaces with user credential
 *
 * It relies on the OAuth2 scope 'https://www.googleapis.com/auth/chat.spaces.readonly'
 * referenced in the manifest file (appsscript.json).
 */
function listSpaces() {
  // Initialize request argument(s)
  // Filter spaces by space type (SPACE or GROUP_CHAT or DIRECT_MESSAGE)
  const filter = 'space_type = "SPACE"';

  // Iterate through the response pages using page tokens
  let responsePage;
  let pageToken = null;
  do {
    // Request response pages
    responsePage = Chat.Spaces.list({
      filter: filter,
      pageToken: pageToken,
    });
    // Handle response pages
    if (responsePage.spaces) {
      for (const space of responsePage.spaces) {
        console.log(space);
      }
    }
    // Update the page token to the next one
    pageToken = responsePage.nextPageToken;
  } while (pageToken);
}
// [END chat_quickstart]
