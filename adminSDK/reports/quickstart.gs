function listLogins() {
  var userKey = 'all';
  var applicationName = 'login';
  var optionalArgs = {
    maxResults: 10
  };
  var response = AdminReports.Activities.list(userKey, applicationName, optionalArgs)
  var activities = response.items;
  if (activities && activities.length > 0) {
    Logger.log('Logins:');
    for (i = 0; i < activities.length; i++) {
      var activity = activities[i];
      Logger.log('%s: %s (%s)', activity.id.time, activity.actor.email,
          activity.events[0].name);
    }
  } else {
    Logger.log('No logins found.');
  }
}
