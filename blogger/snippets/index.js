/* exported listOfSelfBlogs */

/**
 * Prints to log a list of the current user blogs
 *
 * @returns {undefined}
 */
function listOfSelfBlogs() {
  var api = 'https://www.googleapis.com/blogger/v3/users/self/blogs';

  var headers = {
    Authorization: 'Bearer ' + ScriptApp.getOAuthToken()
  };

  var options = {
    headers: headers,
    method: 'GET',
    muteHttpExceptions: true
  };

  var response = UrlFetchApp.fetch(api, options);

  var data = JSON.parse(response.getContentText());

  for (var i = 0; i < data.items.length; i++) {
    Logger.log(
      '[%s] %s %s',
      data.items[i].id,
      data.items[i].name,
      data.items[i].url
    );
  }
}
