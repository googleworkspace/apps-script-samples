/**
 * Lists the user's tasks.
 */
function listTaskLists() {
  var optionalArgs = {
    maxResults: 10
  };
  var response = Tasks.Tasklists.list(optionalArgs);
  var taskLists = response.items;
  if (taskLists && taskLists.length > 0) {
    Logger.log('Task lists:');
    for (var i = 0; i < taskLists.length; i++) {
      var taskList = taskLists[i];
      Logger.log('%s (%s)', taskList.title, taskList.id);
    }
  } else {
    Logger.log('No task lists found.');
  }
}
