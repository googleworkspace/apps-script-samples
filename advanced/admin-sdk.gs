/**
 * Lists all the users in a domain sorted by first name.
 */
// [START listAllUsers]
function listAllUsers() {
  var pageToken, page;
  do {
    page = AdminDirectory.Users.list({
      domain: 'example.com',
      orderBy: 'givenName',
      maxResults: 100,
      pageToken: pageToken
    });
    var users = page.users;
    if (users) {
      for (var i = 0; i < users.length; i++) {
        var user = users[i];
        Logger.log('%s (%s)', user.name.fullName, user.primaryEmail);
      }
    } else {
      Logger.log('No users found.');
    }
    pageToken = page.nextPageToken;
  } while (pageToken);
}
// [END listAllUsers]

/**
* Get a user by their email address and logs all of their data as a JSON string.
*/
// [START getUser]
function getUser() {
  var userEmail = 'liz@example.com';
  var user = AdminDirectory.Users.get(userEmail);
  Logger.log('User data:\n %s', JSON.stringify(user, null, 2));
}
// [END getUser]

/**
 * Adds a new user to the domain, including only the required information. For
 * the full list of user fields, see the API's reference documentation:
 * https://developers.google.com/admin-sdk/directory/v1/reference/users/insert
 */
// [START addUser]
function addUser() {
  var user = {
    primaryEmail: 'liz@example.com',
    name: {
      givenName: 'Elizabeth',
      familyName: 'Smith'
    },
    // Generate a random password string.
    password: Math.random().toString(36)
  };
  user = AdminDirectory.Users.insert(user);
  Logger.log('User %s created with ID %s.', user.primaryEmail, user.id);
}
// [END addUser]

/**
 * Creates an alias (nickname) for a user.
 */
// [START createAlias]
function createAlias() {
  var userEmail = 'liz@example.com';
  var alias = {
    alias: 'chica@example.com'
  };
  alias = AdminDirectory.Users.Aliases.insert(alias, userEmail);
  Logger.log('Created alias %s for user %s.', alias.alias, userEmail);
}
// [END createAlias]

/**
 * Lists all the groups in the domain.
 */
// [START listAllGroups]
function listAllGroups() {
  var pageToken, page;
  do {
    page = AdminDirectory.Groups.list({
      domain: 'example.com',
      maxResults: 100,
      pageToken: pageToken
    });
    var groups = page.groups;
    if (groups) {
      for (var i = 0; i < groups.length; i++) {
        var group = groups[i];
        Logger.log('%s (%s)', group.name, group.email);
      }
    } else {
      Logger.log('No groups found.');
    }
    pageToken = page.nextPageToken;
  } while (pageToken);
}
// [END listAllGroups]

/**
 * Adds a user to an existing group in the domain.
 */
// [START addGroupMember]
function addGroupMember() {
  var userEmail = 'liz@example.com';
  var groupEmail = 'bookclub@example.com';
  var member = {
    email: userEmail,
    role: 'MEMBER'
  };
  member = AdminDirectory.Members.insert(member, groupEmail);
  Logger.log('User %s added as a member of group %s.', userEmail, groupEmail);
}
// [END addGroupMember]

/**
 * Gets three RFC822 formatted messages from the each of the latest three
 * threads in the user's Gmail inbox, creates a blob from the email content
 * (including attachments), and inserts it in a Google Group in the domain.
 */
// [START migrate]
function migrateMessages() {
  var groupId = 'exampleGroup@example.com';
  var messagesToMigrate = getRecentMessagesContent();
  for (var i = 0; i < messagesToMigrate.length; i++) {
    var messageContent = messagesToMigrate[i];
    var contentBlob = Utilities.newBlob(messageContent, 'message/rfc822');
    AdminGroupsMigration.Archive.insert(groupId, contentBlob);
  }
}

/**
 * Gets a list of recent messages' content from the user's Gmail account.
 * By default, fetches 3 messages from the latest 3 threads.
 *
 * @return {Array} the messages' content.
 */
function getRecentMessagesContent() {
  var NUM_THREADS = 3;
  var NUM_MESSAGES = 3;
  var threads = GmailApp.getInboxThreads(0, NUM_THREADS);
  var messages = GmailApp.getMessagesForThreads(threads);
  var messagesContent = [];
  for (var i = 0; i < messages.length; i++) {
    for (var j = 0; j < NUM_MESSAGES; j++) {
      var message = messages[i][j];
      if (message) {
        messagesContent.push(message.getRawContent());
      }
    }
  }
  return messagesContent;
}
// [END migrate]

/**
 * Gets a group's settings and logs them to the console.
 */
// [START getGroupSettings]
function getGroupSettings() {
  var groupId = 'exampleGroup@example.com';
  var group = AdminGroupsSettings.Groups.get(groupId);
  Logger.log(JSON.stringify(group, null, 2));
}
// [END getGroupSettings]

/**
 * Updates group's settings. Here, the description is modified, but various
 * other settings can be changed in the same way.
 */
// [START updateGroupSettings]
function updateGroupSettings() {
  var groupId = 'exampleGroup@example.com';
  var group = AdminGroupsSettings.newGroups();
  group.description = 'Newly changed group description';
  AdminGroupsSettings.Groups.patch(group, groupId);
}
// [END updateGroupSettings]

/**
 * Logs the license assignments, including the product ID and the sku ID, for
 * the users in the domain. Notice the use of page tokens to access the full
 * list of results.
 */
// [START getLicenseAssignments]
function getLicenseAssignments() {
  var productId = 'Google-Apps';
  var customerId = 'example.com';
  var assignments, pageToken;
  do {
    assignments = AdminLicenseManager.LicenseAssignments
        .listForProduct(productId, customerId, {
      maxResults: 500,
      pageToken: pageToken
    });
  } while (pageToken);
  for (var i = 0; i < assignments.items.length; i++) {
    var assignment = assignments.items[i];
    Logger.log('userId: %s, productId: %s, skuId: %s',
        assignment.userId, assignment.productId, assignment.skuId);
  }
}
// [END getLicenseAssignments]

/**
 * Insert a license assignment for a user, for a given product ID and sku ID
 * combination.
 */
// [START insertLicenseAssignment]
function insertLicenseAssignment() {
  var productId = 'Google-Apps';
  var skuId = 'Google-Vault';
  var userId = 'marty@hoverboard.net';
  var results = AdminLicenseManager.LicenseAssignments
      .insert({ userId: userId }, productId, skuId);
  Logger.log(results);
}
// [END insertLicenseAssignment]

/**
 * Generates a login activity report for the last week as a spreadsheet. The
 * report includes the time, user, and login result.
 */
// [START generateLoginActivityReport]
function generateLoginActivityReport() {
  var now = new Date();
  var oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  var startTime = oneWeekAgo.toISOString();
  var endTime = now.toISOString();

  var rows = [];
  var pageToken, page;
  do {
    page = AdminReports.Activities.list('all', 'login', {
      startTime: startTime,
      endTime: endTime,
      maxResults: 500,
      pageToken: pageToken
    });
    var items = page.items;
    if (items) {
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var row = [
          new Date(item.id.time),
          item.actor.email,
          item.events[0].name
        ];
        rows.push(row);
      }
    }
    pageToken = page.nextPageToken;
  } while (pageToken);

  if (rows.length > 0) {
    var spreadsheet = SpreadsheetApp.create('G Suite Login Report');
    var sheet = spreadsheet.getActiveSheet();

    // Append the headers.
    var headers = ['Time', 'User', 'Login Result'];
    sheet.appendRow(headers);

    // Append the results.
    sheet.getRange(2, 1, rows.length, headers.length).setValues(rows);

    Logger.log('Report spreadsheet created: %s', spreadsheet.getUrl());
  } else {
    Logger.log('No results returned.');
  }
}
// [END generateLoginActivityReport]

/**
 * Generates a user usage report for this day last week as a spreadsheet. The
 * report includes the date, user, last login time, number of emails received,
 * and number of docs owned.
 */
// [START generateUserUsageReport]
function generateUserUsageReport() {
  var today = new Date();
  var oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  var timezone = Session.getTimeZone();
  var date = Utilities.formatDate(oneWeekAgo, timezone, 'yyyy-MM-dd');

  var parameters = [
    'accounts:last_login_time',
    'gmail:num_emails_received',
    'docs:num_docs'
  ];
  var rows = [];
  var pageToken, page;
  do {
    page = AdminReports.UserUsageReport.get('all', date, {
      parameters: parameters.join(','),
      maxResults: 500,
      pageToken: pageToken
    });
    var reports = page.usageReports;
    if (reports) {
      for (var i = 0; i < reports.length; i++) {
        var report = reports[i];
        var parameterValues = getParameterValues(report.parameters);
        var row = [
          report.date,
          report.entity.userEmail,
          parameterValues['accounts:last_login_time'],
          parameterValues['gmail:num_emails_received'],
          parameterValues['docs:num_docs']
        ];
        rows.push(row);
      }
    }
    pageToken = page.nextPageToken;
  } while (pageToken);

  if (rows.length > 0) {
    var spreadsheet = SpreadsheetApp.create('G Suite User Usage Report');
    var sheet = spreadsheet.getActiveSheet();

    // Append the headers.
    var headers = ['Date', 'User', 'Last Login', 'Num Emails Received',
        'Num Docs'];
    sheet.appendRow(headers);

    // Append the results.
    sheet.getRange(2, 1, rows.length, headers.length).setValues(rows);

    Logger.log('Report spreadsheet created: %s', spreadsheet.getUrl());
  } else {
    Logger.log('No results returned.');
  }
}

/**
 * Gets a map of parameter names to values from an array of parameter objects.
 * @param {Array} parameters An array of parameter objects.
 * @return {Object} A map from parameter names to their values.
 */
function getParameterValues(parameters) {
  return parameters.reduce(function(result, parameter) {
    var name = parameter.name;
    var value;
    if (parameter.intValue !== undefined) {
      value = parameter.intValue;
    } else if (parameter.stringValue !== undefined) {
      value = parameter.stringValue;
    } else if (parameter.datetimeValue !== undefined) {
      value = new Date(parameter.datetimeValue);
    } else if (parameter.boolValue !== undefined) {
      value = parameter.boolValue;
    }
    result[name] = value;
    return result;
  }, {});
}
// [END generateUserUsageReport]

/**
 * Logs the list of subscriptions, including the customer ID, date created, plan
 * name, and the sku ID. Notice the use of page tokens to access the full list
 * of results.
 */
// [START getSubscriptions]
function getSubscriptions() {
  var result, subscriptions, pageToken;
  do {
    result = AdminReseller.Subscriptions.list({
      pageToken: pageToken,
    });
    for (var i = 0; i < result.subscriptions.length; i++) {
      var sub = result.subscriptions[i];
      var creationDate = new Date();
      creationDate.setUTCSeconds(sub.creationTime);
      Logger.log('customer ID: %s, date created: %s, plan name: %s, sku id: %s',
          sub.customerId, creationDate.toDateString(), sub.plan.planName,
          sub.skuId);
    }
    pageToken = result.nextPageToken;
  } while (pageToken);
}
// [END getSubscriptions]
