/**
 * Lists the labels in the user's account.
 */
function listLabels() {
  var response = Gmail.Users.Labels.list('me');
  if (response.labels.length == 0) {
    Logger.log("No labels found.");
  } else {
    Logger.log("Labels:");
    for (var i = 0; i < response.labels.length; i++) {
      var label = response.labels[i];
      Logger.log("- %s", label.name);
    }
  }
}
