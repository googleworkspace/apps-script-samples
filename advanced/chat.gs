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

// [START chat_post_message_with_user_credentials]
/**
 * Posts a new message to the specified space on behalf of the user.
 * @param {string} spaceName The resource name of the space.
 */
function postMessageWithUserCredentials(spaceName) {
  try {
    const message = {'text': 'Hello world!'};
    Chat.Spaces.Messages.create(message, spaceName);
  } catch (err) {
    // TODO (developer) - Handle exception
    console.log('Failed to create message with error %s', err.message);
  }
}
// [END chat_post_message_with_user_credentials]

// [START chat_post_message_with_app_credentials]
/**
 * Posts a new message to the specified space on behalf of the app.
 * @param {string} spaceName The resource name of the space.
 */
function postMessageWithAppCredentials(spaceName) {
  try {
    // See https://developers.google.com/chat/api/guides/auth/service-accounts
    // for details on how to obtain a service account OAuth token.
    const appToken = getToken_();
    const message = {'text': 'Hello world!'};
    Chat.Spaces.Messages.create(
        message,
        spaceName,
        {},
        // Authenticate with the service account token.
        {'Authorization': 'Bearer ' + appToken});
  } catch (err) {
    // TODO (developer) - Handle exception
    console.log('Failed to create message with error %s', err.message);
  }
}
// [END chat_post_message_with_app_credentials]

// [START chat_get_space]
/**
 * Gets information about a Chat space.
 * @param {string} spaceName The resource name of the space.
 */
function getSpace(spaceName) {
  try {
    const space = Chat.Spaces.get(spaceName);
    console.log('Space display name: %s', space.displayName);
    console.log('Space type: %s', space.spaceType);
  } catch (err) {
    // TODO (developer) - Handle exception
    console.log('Failed to get space with error %s', err.message);
  }
}
// [END chat_get_space]

// [START chat_create_space]
/**
 * Creates a new Chat space.
 */
function createSpace() {
  try {
    const space = {'displayName': 'New Space', 'spaceType': 'SPACE'};
    Chat.Spaces.create(space);
  } catch (err) {
    // TODO (developer) - Handle exception
    console.log('Failed to create space with error %s', err.message);
  }
}
// [END chat_create_space]

// [START chat_list_memberships]
/**
 * Lists all the members of a Chat space.
 * @param {string} spaceName The resource name of the space.
 */
function listMemberships(spaceName) {
  let response;
  let pageToken = null;
  try {
    do {
      response = Chat.Spaces.Members.list(spaceName, {
        pageSize: 10,
        pageToken: pageToken
      });
      if (!response.memberships || response.memberships.length === 0) {
        pageToken = response.nextPageToken;
        continue;
      }
      response.memberships.forEach(member => console.log(
        'Member resource name: %s (type: %s)',
        membership.name,
        membership.member.type);
      pageToken = response.nextPageToken;
    } while (pageToken);
  } catch (err) {
    // TODO (developer) - Handle exception
    console.log('Failed with error %s', err.message);
  }
}
// [END chat_list_memberships]
