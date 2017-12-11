/**
 * The following example demonstrates how to retrieve a list of the people
 * in the user's Google+ circles.
 */
// [START getPeople]
function getPeople() {
  var userId = 'me';
  var people, pageToken;
  do {
    people = Plus.People.list(userId, 'visible', {
      pageToken: pageToken
    });
    if (people.items) {
      for (var i = 0; i < people.items.length; i++) {
        var person = people.items[i];
        Logger.log(person.displayName);
      }
    } else {
      Logger.log('No people in your visible circles.');
    }
    pageToken = people.nextPageToken;
  } while (pageToken);
}
// [END getPeople]

/**
 * The following example demonstrates how to list a user's posts. The returned
 * results contain a brief summary of the posts, including a list of comments
 * made on the post.
 */
 // [START getPosts]
function getPosts() {
  var userId = 'me';
  var posts, pageToken;
  do {
    posts = Plus.Activities.list(userId, 'public', {
      maxResults: 10,
      pageToken: pageToken
    });
    if (posts.items) {
      for (var i = 0; i < posts.items.length; i++) {
        var post = posts.items[i];
        Logger.log(post.title);
        var comments = Plus.Comments.list(post.id);
        if (comments.items) {
          for (var j = 0; j < comments.items.length; j++) {
            var comment = comments.items[j];
            Logger.log(comment.actor.displayName + ': ' +
                comment.object.content);
          }
        }
      }
    } else {
      Logger.log('No posts found.');
    }
    pageToken = posts.pageToken;
  } while (pageToken);
}
// [END getPosts]
