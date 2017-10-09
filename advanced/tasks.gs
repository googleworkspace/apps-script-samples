// [START listTaskLists]
function listTaskLists() {
  var taskLists = Tasks.Tasklists.list();
  if (taskLists.items) {
    for (var i = 0; i < taskLists.items.length; i++) {
      var taskList = taskLists.items[i];
      Logger.log('Task list with title "%s" and ID "%s" was found.',
                 taskList.title, taskList.id);
    }
  } else {
    Logger.log('No task lists found.');
  }
}
// [END listTaskLists]

// [START listTasks]
function listTasks(taskListId) {
  var tasks = Tasks.Tasks.list(taskListId);
  if (tasks.items) {
    for (var i = 0; i < tasks.items.length; i++) {
      var task = tasks.items[i];
      Logger.log('Task with title "%s" and ID "%s" was found.',
                 task.title, task.id);
    }
  } else {
    Logger.log('No tasks found.');
  }
}
// [END listTasks]

// [START addTask]
function addTask(taskListId) {
  var task = {
    title: 'Pick up dry cleaning',
    notes: 'Remember to get this done!'
  };
  task = Tasks.Tasks.insert(task, taskListId);
  Logger.log('Task with ID "%s" was created.', task.id);
}
// [END addTask]
