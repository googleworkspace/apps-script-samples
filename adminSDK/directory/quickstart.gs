function listUsers() {
  var optionalArgs = {
    customer: 'my_customer',
    maxResults: 10,
    orderBy: 'email'
  };
  var response = AdminDirectory.Users.list(optionalArgs);
  var users = response.users;
  if (users && users.length > 0) {
    Logger.log('Users:');
    for (i = 0; i < users.length; i++) {
      var user = users[i];
      Logger.log('%s (%s)', user.primaryEmail, user.name.fullName);
    }
  } else {
    Logger.log('No users found.');
  }
}
