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

// This script provides each code sample in a separate function.
// It may require modifications to work in your environment.

// For more information on user authentication, see
// https://developers.google.com/workspace/chat/authenticate-authorize-chat-user

// For more information on app authentication, see
// https://developers.google.com/workspace/chat/authenticate-authorize-chat-app

// [START chat_create_membership_user_cred]
/**
 * This sample shows how to create membership with user credential for a human user
 * 
 * It relies on the OAuth2 scope 'https://www.googleapis.com/auth/chat.memberships'
 * referenced in the manifest file (appsscript.json).
 */
function createMembershipUserCred() {
  // Initialize request argument(s)
  // TODO(developer): Replace SPACE_NAME here.
  const parent = 'spaces/SPACE_NAME';
  const membership = {
    member: {
      // TODO(developer): Replace USER_NAME here
      name: 'users/USER_NAME',
      // User type for the membership
      type: 'HUMAN'
    }
  };

  // Make the request
  const response = Chat.Spaces.Members.create(membership, parent);

  // Handle the response
  console.log(response);
}
// [END chat_create_membership_user_cred]

// [START chat_create_membership_user_cred_for_app]
/**
 * This sample shows how to create membership with app credential for an app
 * 
 * It relies on the OAuth2 scope 'https://www.googleapis.com/auth/chat.memberships.app'
 * referenced in the manifest file (appsscript.json).
 */
function createMembershipUserCredForApp() {
  // Initialize request argument(s)
  // TODO(developer): Replace SPACE_NAME here.
  const parent = 'spaces/SPACE_NAME';
  const membership = {
    member: {
      // Member name for app membership, do not change this
      name: 'users/app',
      // User type for the membership
      type: 'BOT'
    }
  };

  // Make the request
  const response = Chat.Spaces.Members.create(membership, parent);

  // Handle the response
  console.log(response);
}
// [END chat_create_membership_user_cred_for_app]

// [START chat_create_membership_user_cred_for_group]
/**
 * This sample shows how to create membership with user credential for a group
 * 
 * It relies on the OAuth2 scope 'https://www.googleapis.com/auth/chat.memberships'
 * referenced in the manifest file (appsscript.json).
 */
function createMembershipUserCredForGroup() {
  // Initialize request argument(s)
  // TODO(developer): Replace SPACE_NAME here.
  const parent = 'spaces/SPACE_NAME';
  const membership = {
    groupMember: {
      // TODO(developer): Replace GROUP_NAME here
      name: 'groups/GROUP_NAME'
    }
  };

  // Make the request
  const response = Chat.Spaces.Members.create(membership, parent);

  // Handle the response
  console.log(response);
}
// [END chat_create_membership_user_cred_for_group]


// [START chat_create_message_app_cred]
/**
 * This sample shows how to create message with app credential
 * 
 * It relies on the OAuth2 scope 'https://www.googleapis.com/auth/chat.bot'
 * used by service accounts.
 */
function createMessageAppCred() {
  // Initialize request argument(s)
  // TODO(developer): Replace SPACE_NAME here.
  const parent = 'spaces/SPACE_NAME';
  const message = {
    text: '👋🌎 Hello world! I created this message by calling ' +
          'the Chat API\'s `messages.create()` method.',
    cardsV2 : [{ card: {
      header: {
        title: 'About this message',
        imageUrl: 'https://fonts.gstatic.com/s/i/short-term/release/googlesymbols/info/default/24px.svg'
      },
      sections: [{
        header: 'Contents',
        widgets: [{ textParagraph: {
            text: '🔡 <b>Text</b> which can include ' +
                  'hyperlinks 🔗, emojis 😄🎉, and @mentions 🗣️.'
          }}, { textParagraph: {
            text: '🖼️ A <b>card</b> to display visual elements' +
                  'and request information such as text 🔤, ' +
                  'dates and times 📅, and selections ☑️.'
          }}, { textParagraph: {
            text: '👉🔘 An <b>accessory widget</b> which adds ' +
                  'a button to the bottom of a message.'
          }}
        ]}, {
          header: "What's next",
          collapsible: true,
          widgets: [{ textParagraph: {
              text: "❤️ <a href='https://developers.google.com/workspace/chat/api/reference/rest/v1/spaces.messages.reactions/create'>Add a reaction</a>."
            }}, { textParagraph: {
              text: "🔄 <a href='https://developers.google.com/workspace/chat/api/reference/rest/v1/spaces.messages/patch'>Update</a> " +
                    "or ❌ <a href='https://developers.google.com/workspace/chat/api/reference/rest/v1/spaces.messages/delete'>delete</a> " +
                    "the message."
            }
          }]
        }
      ]
    }}],
    accessoryWidgets: [{ buttonList: { buttons: [{
      text: 'View documentation',
      icon: { materialIcon: { name: 'link' }},
      onClick: { openLink: {
        url: 'https://developers.google.com/workspace/chat/create-messages'
      }}
    }]}}]
  };
  const parameters = {};

  // Make the request
  const response = Chat.Spaces.Messages.create(
    message, parent, parameters, getHeaderWithAppCredentials()
  );

  // Handle the response
  console.log(response);
}
// [END chat_create_message_app_cred]

// [START chat_create_message_user_cred]
/**
 * This sample shows how to create message with user credential
 * 
 * It relies on the OAuth2 scope 'https://www.googleapis.com/auth/chat.messages.create'
 * referenced in the manifest file (appsscript.json).
 */
function createMessageUserCred() {
  // Initialize request argument(s)
  // TODO(developer): Replace SPACE_NAME here.
  const parent = 'spaces/SPACE_NAME';
  const message = {
    text: '👋🌎 Hello world!' +
          'Text messages can contain things like:\n\n' +
          '* Hyperlinks 🔗\n' +
          '* Emojis 😄🎉\n' +
          '* Mentions of other Chat users `@` \n\n' +
          'For details, see the ' +
          '<https://developers.google.com/workspace/chat/format-messages' +
          '|Chat API developer documentation>.'
  };

  // Make the request
  const response = Chat.Spaces.Messages.create(message, parent);

  // Handle the response
  console.log(response);
}
// [END chat_create_message_user_cred]

// [START chat_create_message_user_cred_at_mention]
/**
 * This sample shows how to create message with user credential with a user mention
 * 
 * It relies on the OAuth2 scope 'https://www.googleapis.com/auth/chat.messages.create'
 * referenced in the manifest file (appsscript.json).
 */
function createMessageUserCredAtMention() {
  // Initialize request argument(s)
  // TODO(developer): Replace SPACE_NAME here.
  const parent = 'spaces/SPACE_NAME';
  const message = {
    // The user with USER_NAME will be mentioned if they are in the space
    // TODO(developer): Replace USER_NAME here
    text: 'Hello <users/USER_NAME>!'
  };

  // Make the request
  const response = Chat.Spaces.Messages.create(message, parent);

  // Handle the response
  console.log(response);
}
// [END chat_create_message_user_cred_at_mention]

// [START chat_create_message_user_cred_message_id]
/**
 * This sample shows how to create message with user credential with message id
 * 
 * It relies on the OAuth2 scope 'https://www.googleapis.com/auth/chat.messages.create'
 * referenced in the manifest file (appsscript.json).
 */
function createMessageUserCredMessageId() {
  // Initialize request argument(s)
  // TODO(developer): Replace SPACE_NAME here.
  const parent = 'spaces/SPACE_NAME';
  // Message id lets chat apps get, update or delete a message without needing
  // to store the system assigned ID in the message's resource name
  const messageId = 'client-MESSAGE-ID';
  const message = { text: 'Hello with user credential!' };

  // Make the request
  const response = Chat.Spaces.Messages.create(message, parent, {
    messageId: messageId
  });

  // Handle the response
  console.log(response);
}
// [END chat_create_message_user_cred_message_id]

// [START chat_create_message_user_cred_request_id]
/**
 * This sample shows how to create message with user credential with request id
 * 
 * It relies on the OAuth2 scope 'https://www.googleapis.com/auth/chat.messages.create'
 * referenced in the manifest file (appsscript.json).
 */
function createMessageUserCredRequestId() {
  // Initialize request argument(s)
  // TODO(developer): Replace SPACE_NAME here.
  const parent = 'spaces/SPACE_NAME';
  // Specifying an existing request ID returns the message created with
  // that ID instead of creating a new message
  const requestId = 'REQUEST_ID';
  const message = { text: 'Hello with user credential!' };

  // Make the request
  const response = Chat.Spaces.Messages.create(message, parent, {
    requestId: requestId
  });

  // Handle the response
  console.log(response);
}
// [END chat_create_message_user_cred_request_id]

// [START chat_create_message_user_cred_thread_key]
/**
 * This sample shows how to create message with user credential with thread key
 * 
 * It relies on the OAuth2 scope 'https://www.googleapis.com/auth/chat.messages.create'
 * referenced in the manifest file (appsscript.json).
 */
function createMessageUserCredThreadKey() {
  // Initialize request argument(s)
  // TODO(developer): Replace SPACE_NAME here.
  const parent = 'spaces/SPACE_NAME';
  // Creates the message as a reply to the thread specified by thread_key
  // If it fails, the message starts a new thread instead
  const messageReplyOption = 'REPLY_MESSAGE_FALLBACK_TO_NEW_THREAD';
  const message = {
    text: 'Hello with user credential!',
    thread: {
      // Thread key specifies a thread and is unique to the chat app
      // that sets it
      threadKey: 'THREAD_KEY'
    }
  };

  // Make the request
  const response = Chat.Spaces.Messages.create(message, parent, {
    messageReplyOption: messageReplyOption
  });

  // Handle the response
  console.log(response);
}
// [END chat_create_message_user_cred_thread_key]

// [START chat_create_message_user_cred_thread_name]
/**
 * This sample shows how to create message with user credential with thread name
 * 
 * It relies on the OAuth2 scope 'https://www.googleapis.com/auth/chat.messages.create'
 * referenced in the manifest file (appsscript.json).
 */
function createMessageUserCredThreadName() {
  // Initialize request argument(s)
  // TODO(developer): Replace SPACE_NAME here.
  const parent = 'spaces/SPACE_NAME';
  // Creates the message as a reply to the thread specified by thread.name
  // If it fails, the message starts a new thread instead
  const messageReplyOption = 'REPLY_MESSAGE_FALLBACK_TO_NEW_THREAD';
  const message = {
    text: 'Hello with user credential!',
    thread: {
      // Resource name of a thread that uniquely identify a thread
      // TODO(developer): Replace SPACE_NAME and THREAD_NAME here
      name: 'spaces/SPACE_NAME/threads/THREAD_NAME'
    }
  };

  // Make the request
  const response = Chat.Spaces.Messages.create(message, parent, {
    messageReplyOption: messageReplyOption
  });

  // Handle the response
  console.log(response);
}
// [END chat_create_message_user_cred_thread_name]

// [START chat_delete_message_app_cred]
/**
 * This sample shows how to delete a message with app credential
 * 
 * It relies on the OAuth2 scope 'https://www.googleapis.com/auth/chat.bot'
 * used by service accounts.
 */
function deleteMessageAppCred() {
  // Initialize request argument(s)
  // TODO(developer): Replace SPACE_NAME and MESSAGE_NAME here
  const name = 'spaces/SPACE_NAME/messages/MESSAGE_NAME';
  const parameters = {};

  // Make the request
  const response = Chat.Spaces.Messages.remove(name, parameters, getHeaderWithAppCredentials());

  // Handle the response
  console.log(response);
}
// [END chat_delete_message_app_cred]

// [START chat_delete_message_user_cred]
/**
 * This sample shows how to delete a message with user credential
 * 
 * It relies on the OAuth2 scope 'https://www.googleapis.com/auth/chat.messages'
 * referenced in the manifest file (appsscript.json).
 */
function deleteMessageUserCred() {
  // Initialize request argument(s)
  // TODO(developer): Replace SPACE_NAME and MESSAGE_NAME here
  const name = 'spaces/SPACE_NAME/messages/MESSAGE_NAME';

  // Make the request
  const response = Chat.Spaces.Messages.remove(name);

  // Handle the response
  console.log(response);
}
// [END chat_delete_message_user_cred]

// [START chat_get_membership_app_cred]
/**
 * This sample shows how to get membership with app credential
 * 
 * It relies on the OAuth2 scope 'https://www.googleapis.com/auth/chat.bot'
 * used by service accounts.
 */
function getMembershipAppCred() {
  // Initialize request argument(s)
  // TODO(developer): Replace SPACE_NAME and MEMBER_NAME here
  const name = 'spaces/SPACE_NAME/members/MEMBER_NAME';
  const parameters = {};

  // Make the request
  const response = Chat.Spaces.Members.get(name, parameters, getHeaderWithAppCredentials());

  // Handle the response
  console.log(response);
}
// [END chat_get_membership_app_cred]

// [START chat_get_membership_user_cred]
/**
 * This sample shows how to get membership with user credential
 * 
 * It relies on the OAuth2 scope 'https://www.googleapis.com/auth/chat.memberships.readonly'
 * referenced in the manifest file (appsscript.json).
 */
function getMembershipUserCred() {
  // Initialize request argument(s)
  // TODO(developer): Replace SPACE_NAME and MEMBER_NAME here
  const name = 'spaces/SPACE_NAME/members/MEMBER_NAME';

  // Make the request
  const response = Chat.Spaces.Members.get(name);

  // Handle the response
  console.log(response);
}
// [END chat_get_membership_user_cred]

// [START chat_get_message_app_cred]
/**
 * This sample shows how to get message with app credential
 * 
 * It relies on the OAuth2 scope 'https://www.googleapis.com/auth/chat.bot'
 * used by service accounts.
 */
function getMessageAppCred() {
  // Initialize request argument(s)
  // TODO(developer): Replace SPACE_NAME and MESSAGE_NAME here
  const name = 'spaces/SPACE_NAME/messages/MESSAGE_NAME';
  const parameters = {};

  // Make the request
  const response = Chat.Spaces.Messages.get(name, parameters, getHeaderWithAppCredentials());

  // Handle the response
  console.log(response);
}
// [END chat_get_message_app_cred]

// [START chat_get_message_user_cred]
/**
 * This sample shows how to get message with user credential
 * 
 * It relies on the OAuth2 scope 'https://www.googleapis.com/auth/chat.messages.readonly'
 * referenced in the manifest file (appsscript.json).
 */
function getMessageUserCred() {
  // Initialize request argument(s)
  // TODO(developer): Replace SPACE_NAME and MESSAGE_NAME here
  const name = 'spaces/SPACE_NAME/messages/MESSAGE_NAME';

  // Make the request
  const response = Chat.Spaces.Messages.get(name);

  // Handle the response
  console.log(response);
}
// [END chat_get_message_user_cred]

// [START chat_get_space_app_cred]
/**
 * This sample shows how to get space with app credential
 * 
 * It relies on the OAuth2 scope 'https://www.googleapis.com/auth/chat.bot'
 * used by service accounts.
 */
function getSpaceAppCred() {
  // Initialize request argument(s)
  // TODO(developer): Replace SPACE_NAME here
  const name = 'spaces/SPACE_NAME';
  const parameters = {};

  // Make the request
  const response = Chat.Spaces.get(name, parameters, getHeaderWithAppCredentials());

  // Handle the response
  console.log(response);
}
// [END chat_get_space_app_cred]

// [START chat_get_space_user_cred]
/**
 * This sample shows how to get space with user credential
 * 
 * It relies on the OAuth2 scope 'https://www.googleapis.com/auth/chat.spaces.readonly'
 * referenced in the manifest file (appsscript.json).
 */
function getSpaceUserCred() {
  // Initialize request argument(s)
  // TODO(developer): Replace SPACE_NAME here
  const name = 'spaces/SPACE_NAME';

  // Make the request
  const response = Chat.Spaces.get(name);

  // Handle the response
  console.log(response);
}
// [END chat_get_space_user_cred]

// [START chat_list_memberships_app_cred]
/**
 * This sample shows how to list memberships with app credential
 * 
 * It relies on the OAuth2 scope 'https://www.googleapis.com/auth/chat.bot'
 * used by service accounts.
 */
function listMembershipsAppCred() {
// Initialize request argument(s)
  // TODO(developer): Replace SPACE_NAME here
  const parent = 'spaces/SPACE_NAME';
  // Filter membership by type (HUMAN or BOT) or role (ROLE_MEMBER or
  // ROLE_MANAGER)
  const filter = 'member.type = "HUMAN"';

  // Iterate through the response pages using page tokens
  let responsePage;
  let pageToken = null;
  do {
    // Request response pages
    responsePage = Chat.Spaces.Members.list(parent, {
      filter: filter,
      pageSize: 10,
      pageToken: pageToken
    }, getHeaderWithAppCredentials());
    // Handle response pages
    if (responsePage.memberships) {
      responsePage.memberships.forEach((membership) => console.log(membership));
    }
    // Update the page token to the next one
    pageToken = responsePage.nextPageToken;
  } while (pageToken);
}
// [END chat_list_memberships_app_cred]

// [START chat_list_memberships_user_cred]
/**
 * This sample shows how to list memberships with user credential
 * 
 * It relies on the OAuth2 scope 'https://www.googleapis.com/auth/chat.memberships.readonly'
 * referenced in the manifest file (appsscript.json).
 */
function listMembershipsUserCred() {
  // Initialize request argument(s)
  // TODO(developer): Replace SPACE_NAME here
  const parent = 'spaces/SPACE_NAME';
  // Filter membership by type (HUMAN or BOT) or role (ROLE_MEMBER or
  // ROLE_MANAGER)
  const filter = 'member.type = "HUMAN"';

  // Iterate through the response pages using page tokens
  let responsePage;
  let pageToken = null;
  do {
    // Request response pages
    responsePage = Chat.Spaces.Members.list(parent, {
      filter: filter,
      pageSize: 10,
      pageToken: pageToken
    });
    // Handle response pages
    if (responsePage.memberships) {
      responsePage.memberships.forEach((membership) => console.log(membership));
    }
    // Update the page token to the next one
    pageToken = responsePage.nextPageToken;
  } while (pageToken);
}
// [END chat_list_memberships_user_cred]

// [START chat_list_messages_user_cred]
/**
 * This sample shows how to list messages with user credential
 * 
 * It relies on the OAuth2 scope 'https://www.googleapis.com/auth/chat.messages.readonly'
 * referenced in the manifest file (appsscript.json).
 */
function listMessagesUserCred() {
  // Initialize request argument(s)
  // TODO(developer): Replace SPACE_NAME here
  const parent = 'spaces/SPACE_NAME';

  // Iterate through the response pages using page tokens
  let responsePage;
  let pageToken = null;
  do {
    // Request response pages
    responsePage = Chat.Spaces.Messages.list(parent, {
      pageSize: 10,
      pageToken: pageToken
    });
    // Handle response pages
    if (responsePage.messages) {
      responsePage.messages.forEach((message) => console.log(message));
    }
    // Update the page token to the next one
    pageToken = responsePage.nextPageToken;
  } while (pageToken);
}
// [END chat_list_messages_user_cred]

// [START chat_list_spaces_app_cred]
/**
 * This sample shows how to list spaces with app credential
 * 
 * It relies on the OAuth2 scope 'https://www.googleapis.com/auth/chat.bot'
 * used by service accounts.
 */
function listSpacesAppCred() {
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
      pageSize: 10,
      pageToken: pageToken
    }, getHeaderWithAppCredentials());
    // Handle response pages
    if (responsePage.spaces) {
      responsePage.spaces.forEach((space) => console.log(space));
    }
    // Update the page token to the next one
    pageToken = responsePage.nextPageToken;
  } while (pageToken);
}
// [END chat_list_spaces_app_cred]

// [START chat_list_spaces_user_cred]
/**
 * This sample shows how to list spaces with user credential
 * 
 * It relies on the OAuth2 scope 'https://www.googleapis.com/auth/chat.spaces.readonly'
 * referenced in the manifest file (appsscript.json).
 */
function listSpacesUserCred() {
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
      pageSize: 10,
      pageToken: pageToken
    });
    // Handle response pages
    if (responsePage.spaces) {
      responsePage.spaces.forEach((space) => console.log(space));
    }
    // Update the page token to the next one
    pageToken = responsePage.nextPageToken;
  } while (pageToken);
}
// [END chat_list_spaces_user_cred]

// [START chat_update_message_app_cred]
/**
 * This sample shows how to update a message with app credential
 * 
 * It relies on the OAuth2 scope 'https://www.googleapis.com/auth/chat.bot'
 * used by service accounts.
 */
function updateMessageAppCred() {
  // Initialize request argument(s)
  // TODO(developer): Replace SPACE_NAME and MESSAGE_NAME here
  const name = 'spaces/SPACE_NAME/messages/MESSAGE_NAME';
  const message = {
    text: 'Updated with app credential!'
  };
  // The field paths to update. Separate multiple values with commas or use
  // `*` to update all field paths.
  const updateMask = 'text';

  // Make the request
  const response = Chat.Spaces.Messages.patch(message, name, {
    updateMask: updateMask
  }, getHeaderWithAppCredentials());

  // Handle the response
  console.log(response);
}
// [END chat_update_message_app_cred]

// [START chat_update_message_user_cred]
/**
 * This sample shows how to update a message with user credential
 * 
 * It relies on the OAuth2 scope 'https://www.googleapis.com/auth/chat.messages'
 * referenced in the manifest file (appsscript.json).
 */
function updateMessageUserCred() {
  // Initialize request argument(s)
  // TODO(developer): Replace SPACE_NAME and MESSAGE_NAME here
  const name = 'spaces/SPACE_NAME/messages/MESSAGE_NAME';
  const message = {
    text: 'Updated with user credential!'
  };
  // The field paths to update. Separate multiple values with commas or use
  // `*` to update all field paths.
  const updateMask = 'text';

  // Make the request
  const response = Chat.Spaces.Messages.patch(message, name, {
    updateMask: updateMask
  });

  // Handle the response
  console.log(response);
}
// [END chat_update_message_user_cred]

// [START chat_update_space_user_cred]
/**
 * This sample shows how to update a space with user credential
 * 
 * It relies on the OAuth2 scope 'https://www.googleapis.com/auth/chat.spaces'
 * referenced in the manifest file (appsscript.json).
 */
function updateSpaceUserCred() {
  // Initialize request argument(s)
  // TODO(developer): Replace SPACE_NAME here
  const name = 'spaces/SPACE_NAME';
  const space = {
    displayName: 'New space display name'
  };
  // The field paths to update. Separate multiple values with commas or use
  // `*` to update all field paths.
  const updateMask = 'displayName';

  // Make the request
  const response = Chat.Spaces.patch(space, name, {
    updateMask: updateMask
  });

  // Handle the response
  console.log(response);
}
// [END chat_update_space_user_cred]
