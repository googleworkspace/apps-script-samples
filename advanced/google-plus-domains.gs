/**
 * The following example demonstrates how to retrieve details from a user's
 * Google+ profile.
 */
// [START getProfile]
function getProfile() {
  var userId = 'me';
  var profile = PlusDomains.People.get(userId);

  Logger.log('ID: %s', profile.id);
  Logger.log('Display name: %s', profile.displayName);
  Logger.log('Image URL: %s', profile.image.url);
  Logger.log('Profile URL: %s', profile.url);
}
// [END getProfile]

/**
 * The following example demonstrates how to create an empty circle for a user
 * within your G Suite domain.
 */
 // [START createCircle]
function createCircle() {
  var userId = 'me';
  var circle = PlusDomains.newCircle();
  circle.displayName = 'Tech support';

  circle = PlusDomains.Circles.insert(circle, userId);
  Logger.log('Created "Tech support" circle with id: ' + circle.id);
}
// [END createCircle]

/**
 * The following example demonstrates how to list a user's posts. The returned
 * results contain a brief summary of the posts, including a title. Use the
 * Activities.get() method to read the full details of a post.
 */
 // [START getPosts]
function getPosts() {
  var userId = 'me';
  var pageToken, posts;
  do {
    posts = PlusDomains.Activities.list(userId, 'user', {
      maxResults: 100,
      pageToken: pageToken
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

/**
 * The following example demonstrates how to create a post that is available
 * to all users within your G Suite domain.
 */
// [START createPost]
function createPost() {
  var userId = 'me';
  var post = {
    object: {
      originalContent : 'Happy Monday! #caseofthemondays'
    },
    access: {
      items: [{
        type: 'domain'
      }],
      domainRestricted: true
    }
  };

  post = PlusDomains.Activities.insert(post, userId);
  Logger.log('Post created with URL: %s', post.url);
}
// [END createPost]
