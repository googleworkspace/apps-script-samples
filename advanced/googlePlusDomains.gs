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
// [START getProfile]
/**
 * The following example demonstrates how to retrieve details from a user's
 * Google+ profile.
 */
function getProfile() {
  var userId = 'me';
  var profile = PlusDomains.People.get(userId);

  Logger.log('ID: %s', profile.id);
  Logger.log('Display name: %s', profile.displayName);
  Logger.log('Image URL: %s', profile.image.url);
  Logger.log('Profile URL: %s', profile.url);
}
// [END getProfile]

 // [START createCircle]
/**
 * The following example demonstrates how to create an empty circle for a user
 * within your G Suite domain.
 */
function createCircle() {
  var userId = 'me';
  var circle = PlusDomains.newCircle();
  circle.displayName = 'Tech support';

  circle = PlusDomains.Circles.insert(circle, userId);
  Logger.log('Created "Tech support" circle with id: ' + circle.id);
}
// [END createCircle]

 // [START getPosts]
/**
 * The following example demonstrates how to list a user's posts. The returned
 * results contain a brief summary of the posts, including a title. Use the
 * Activities.get() method to read the full details of a post.
 */
function getPosts() {
  var userId = 'me';
  var pageToken;
  var posts;
  do {
    posts = PlusDomains.Activities.list(userId, 'user', {
      maxResults: 100,
      pageToken: pageToken,
    });
    if (posts.items) {
      for (var i = 0; i < posts.items.length; i++) {
        var post = posts.items[i];
        Logger.log('ID: %s, Content: %s', post.id, post.object.content);
      }
    }
    pageToken = posts.nextPageToken;
  } while (pageToken);
}
// [END getPosts]

// [START createPost]
/**
 * The following example demonstrates how to create a post that is available
 * to all users within your G Suite domain.
 */
function createPost() {
  var userId = 'me';
  var post = {
    object: {
      originalContent: 'Happy Monday! #caseofthemondays',
    },
    access: {
      items: [{
        type: 'domain',
      }],
      domainRestricted: true,
    },
  };

  post = PlusDomains.Activities.insert(post, userId);
  Logger.log('Post created with URL: %s', post.url);
}
// [END createPost]
