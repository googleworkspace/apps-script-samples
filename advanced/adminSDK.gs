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
// [START apps_script_admin_sdk_list_all_users]
/**
 * Lists all the users in a domain sorted by first name.
 * @see https://developers.google.com/admin-sdk/directory/reference/rest/v1/users/list
 */
function listAllUsers() {
  let pageToken;
  let page;
  do {
    page = AdminDirectory.Users.list({
      domain: 'example.com',
      orderBy: 'givenName',
      maxResults: 100,
      pageToken: pageToken
    });
    const users = page.users;
    if (!users) {
      console.log('No users found.');
      return;
    }
    // Print the user's full name and email.
    for (const user of users) {
      console.log('%s (%s)', user.name.fullName, user.primaryEmail);
    }
    pageToken = page.nextPageToken;
  } while (pageToken);
}
// [END apps_script_admin_sdk_list_all_users]

// [START apps_script_admin_sdk_get_users]
/**
 * Get a user by their email address and logs all of their data as a JSON string.
 * @see https://developers.google.com/admin-sdk/directory/reference/rest/v1/users/get
 */
function getUser() {
  // TODO (developer) - Replace userEmail value with yours
  const userEmail = 'liz@example.com';
  try {
    const user = AdminDirectory.Users.get(userEmail);
    console.log('User data:\n %s', JSON.stringify(user, null, 2));
  } catch (err) {
    // TODO (developer)- Handle exception from the API
    console.log('Failed with error %s', err.message);
  }
}
// [END apps_script_admin_sdk_get_users]

// [START apps_script_admin_sdk_add_user]
/**
 * Adds a new user to the domain, including only the required information. For
 * the full list of user fields, see the API's reference documentation:
 * @see https://developers.google.com/admin-sdk/directory/v1/reference/users/insert
 */
function addUser() {
  let user = {
    // TODO (developer) - Replace primaryEmail value with yours
    primaryEmail: 'liz@example.com',
    name: {
      givenName: 'Elizabeth',
      familyName: 'Smith'
    },
    // Generate a random password string.
    password: Math.random().toString(36)
  };
  try {
    user = AdminDirectory.Users.insert(user);
    console.log('User %s created with ID %s.', user.primaryEmail, user.id);
  } catch (err) {
    // TODO (developer)- Handle exception from the API
    console.log('Failed with error %s', err.message);
  }
}
// [END apps_script_admin_sdk_add_user]

// [START apps_script_admin_sdk_create_alias]
/**
 * Creates an alias (nickname) for a user.
 * @see https://developers.google.com/admin-sdk/directory/reference/rest/v1/users.aliases/insert
 */
function createAlias() {
  // TODO (developer) - Replace userEmail value with yours
  const userEmail = 'liz@example.com';
  let alias = {
    alias: 'chica@example.com'
  };
  try {
    alias = AdminDirectory.Users.Aliases.insert(alias, userEmail);
    console.log('Created alias %s for user %s.', alias.alias, userEmail);
  } catch (err) {
    // TODO (developer)- Handle exception from the API
    console.log('Failed with error %s', err.message);
  }
}
// [END apps_script_admin_sdk_create_alias]

// [START apps_script_admin_sdk_list_all_groups]
/**
 * Lists all the groups in the domain.
 * @see https://developers.google.com/admin-sdk/directory/reference/rest/v1/groups/list
 */
function listAllGroups() {
  let pageToken;
  let page;
  do {
    page = AdminDirectory.Groups.list({
      domain: 'example.com',
      maxResults: 100,
      pageToken: pageToken
    });
    const groups = page.groups;
    if (!groups) {
      console.log('No groups found.');
      return;
    }
    // Print group name and email.
    for (const group of groups) {
      console.log('%s (%s)', group.name, group.email);
    }
    pageToken = page.nextPageToken;
  } while (pageToken);
}
// [END apps_script_admin_sdk_list_all_groups]

// [START apps_script_admin_sdk_add_group_member]
/**
 * Adds a user to an existing group in the domain.
 * @see https://developers.google.com/admin-sdk/directory/reference/rest/v1/members/insert
 */
function addGroupMember() {
  // TODO (developer) - Replace userEmail value with yours
  const userEmail = 'liz@example.com';
  // TODO (developer) - Replace groupEmail value with yours
  const groupEmail = 'bookclub@example.com';
  const member = {
    email: userEmail,
    role: 'MEMBER'
  };
  try {
    AdminDirectory.Members.insert(member, groupEmail);
    console.log('User %s added as a member of group %s.', userEmail, groupEmail);
  } catch (err) {
    // TODO (developer)- Handle exception from the API
    console.log('Failed with error %s', err.message);
  }
}
// [END apps_script_admin_sdk_add_group_member]

// [START apps_script_admin_sdk_migrate]
/**
 * Gets three RFC822 formatted messages from the each of the latest three
 * threads in the user's Gmail inbox, creates a blob from the email content
 * (including attachments), and inserts it in a Google Group in the domain.
 */
function migrateMessages() {
  // TODO (developer) - Replace groupId value with yours
  const groupId = 'exampleGroup@example.com';
  const messagesToMigrate = getRecentMessagesContent();
  for (const messageContent of messagesToMigrate) {
    const contentBlob = Utilities.newBlob(messageContent, 'message/rfc822');
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
  const NUM_THREADS = 3;
  const NUM_MESSAGES = 3;
  const threads = GmailApp.getInboxThreads(0, NUM_THREADS);
  const messages = GmailApp.getMessagesForThreads(threads);
  const messagesContent = [];
  for (let i = 0; i < messages.length; i++) {
    for (let j = 0; j < NUM_MESSAGES; j++) {
      const message = messages[i][j];
      if (message) {
        messagesContent.push(message.getRawContent());
      }
    }
  }
  return messagesContent;
}
// [END apps_script_admin_sdk_migrate]

// [START apps_script_admin_sdk_get_group_setting]
/**
 * Gets a group's settings and logs them to the console.
 */
function getGroupSettings() {
  // TODO (developer) - Replace groupId value with yours
  const groupId = 'exampleGroup@example.com';
  try {
    const group = AdminGroupsSettings.Groups.get(groupId);
    console.log(JSON.stringify(group, null, 2));
  } catch (err) {
    // TODO (developer)- Handle exception from the API
    console.log('Failed with error %s', err.message);
  }
}
// [END apps_script_admin_sdk_get_group_setting]

// [START apps_script_admin_sdk_update_group_setting]
/**
 * Updates group's settings. Here, the description is modified, but various
 * other settings can be changed in the same way.
 * @see https://developers.google.com/admin-sdk/groups-settings/v1/reference/groups/patch
 */
function updateGroupSettings() {
  const groupId = 'exampleGroup@example.com';
  try {
    const group = AdminGroupsSettings.newGroups();
    group.description = 'Newly changed group description';
    AdminGroupsSettings.Groups.patch(group, groupId);
  } catch (err) {
    // TODO (developer)- Handle exception from the API
    console.log('Failed with error %s', err.message);
  }
}
// [END apps_script_admin_sdk_update_group_setting]

// [START apps_script_admin_sdk_get_license_assignments]
/**
 * Logs the license assignments, including the product ID and the sku ID, for
 * the users in the domain. Notice the use of page tokens to access the full
 * list of results.
 */
function getLicenseAssignments() {
  const productId = 'Google-Apps';
  const customerId = 'example.com';
  let assignments = [];
  let pageToken = null;
  do {
    const response = AdminLicenseManager.LicenseAssignments.listForProduct(productId, customerId, {
      maxResults: 500,
      pageToken: pageToken
    });
    assignments = assignments.concat(response.items);
    pageToken = response.nextPageToken;
  } while (pageToken);
  // Print the productId and skuId
  for (const assignment of assignments) {
    console.log('userId: %s, productId: %s, skuId: %s',
        assignment.userId, assignment.productId, assignment.skuId);
  }
}
// [END apps_script_admin_sdk_get_license_assignments]

// [START apps_script_admin_sdk_insert_license_assignment]
/**
 * Insert a license assignment for a user, for a given product ID and sku ID
 * combination.
 * For more details follow the link
 * https://developers.google.com/admin-sdk/licensing/reference/rest/v1/licenseAssignments/insert
 */
function insertLicenseAssignment() {
  const productId = 'Google-Apps';
  const skuId = 'Google-Vault';
  const userId = 'marty@hoverboard.net';
  try {
    const results = AdminLicenseManager.LicenseAssignments
        .insert({userId: userId}, productId, skuId);
    console.log(results);
  } catch (e) {
    // TODO (developer) - Handle exception.
    console.log('Failed with an error %s ', e.message);
  }
}
// [END apps_script_admin_sdk_insert_license_assignment]

// [START apps_script_admin_sdk_generate_login_activity_report]
/**
 * Generates a login activity report for the last week as a spreadsheet. The
 * report includes the time, user, and login result.
 * @see https://developers.google.com/admin-sdk/reports/reference/rest/v1/activities/list
 */
function generateLoginActivityReport() {
  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const startTime = oneWeekAgo.toISOString();
  const endTime = now.toISOString();

  const rows = [];
  let pageToken;
  let page;
  do {
    page = AdminReports.Activities.list('all', 'login', {
      startTime: startTime,
      endTime: endTime,
      maxResults: 500,
      pageToken: pageToken
    });
    const items = page.items;
    if (items) {
      for (const item of items) {
        const row = [
          new Date(item.id.time),
          item.actor.email,
          item.events[0].name
        ];
        rows.push(row);
      }
    }
    pageToken = page.nextPageToken;
  } while (pageToken);

  if (rows.length === 0) {
    console.log('No results returned.');
    return;
  }
  const spreadsheet = SpreadsheetApp.create('Google Workspace Login Report');
  const sheet = spreadsheet.getActiveSheet();

  // Append the headers.
  const headers = ['Time', 'User', 'Login Result'];
  sheet.appendRow(headers);

  // Append the results.
  sheet.getRange(2, 1, rows.length, headers.length).setValues(rows);

  console.log('Report spreadsheet created: %s', spreadsheet.getUrl());
}
// [END apps_script_admin_sdk_generate_login_activity_report]

// [START apps_script_admin_sdk_generate_user_usage_report]
/**
 * Generates a user usage report for this day last week as a spreadsheet. The
 * report includes the date, user, last login time, number of emails received,
 * and number of drive files created.
 * @see https://developers.google.com/admin-sdk/reports/reference/rest/v1/userUsageReport/get
 */
function generateUserUsageReport() {
  const today = new Date();
  const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  const timezone = Session.getScriptTimeZone();
  const date = Utilities.formatDate(oneWeekAgo, timezone, 'yyyy-MM-dd');

  const parameters = [
    'accounts:last_login_time',
    'gmail:num_emails_received',
    'drive:num_items_created'
  ];
  const rows = [];
  let pageToken;
  let page;
  do {
    page = AdminReports.UserUsageReport.get('all', date, {
      parameters: parameters.join(','),
      maxResults: 500,
      pageToken: pageToken
    });
    if (page.warnings) {
      for (const warning of page.warnings) {
        console.log(warning.message);
      }
    }
    const reports = page.usageReports;
    if (reports) {
      for (const report of reports) {
        const parameterValues = getParameterValues(report.parameters);
        const row = [
          report.date,
          report.entity.userEmail,
          parameterValues['accounts:last_login_time'],
          parameterValues['gmail:num_emails_received'],
          parameterValues['drive:num_items_created']
        ];
        rows.push(row);
      }
    }
    pageToken = page.nextPageToken;
  } while (pageToken);

  if (rows.length === 0) {
    console.log('No results returned.');
    return;
  }
  const spreadsheet = SpreadsheetApp.create('Google Workspace User Usage Report');
  const sheet = spreadsheet.getActiveSheet();

  // Append the headers.
  const headers = ['Date', 'User', 'Last Login', 'Num Emails Received',
    'Num Drive Files Created'];
  sheet.appendRow(headers);

  // Append the results.
  sheet.getRange(2, 1, rows.length, headers.length).setValues(rows);

  console.log('Report spreadsheet created: %s', spreadsheet.getUrl());
}

/**
 * Gets a map of parameter names to values from an array of parameter objects.
 * @param {Array} parameters An array of parameter objects.
 * @return {Object} A map from parameter names to their values.
 */
function getParameterValues(parameters) {
  return parameters.reduce((result, parameter) => {
    const name = parameter.name;
    let value;
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
// [END apps_script_admin_sdk_generate_user_usage_report]

// [START apps_script_admin_sdk_get_subscriptions]
/**
 * Logs the list of subscriptions, including the customer ID, date created, plan
 * name, and the sku ID. Notice the use of page tokens to access the full list
 * of results.
 * @see https://developers.google.com/admin-sdk/reseller/reference/rest/v1/subscriptions/list
 */
function getSubscriptions() {
  let result;
  let pageToken;
  do {
    result = AdminReseller.Subscriptions.list({
      pageToken: pageToken
    });
    for (const sub of result.subscriptions) {
      const creationDate = new Date();
      creationDate.setUTCSeconds(sub.creationTime);
      console.log('customer ID: %s, date created: %s, plan name: %s, sku id: %s',
          sub.customerId, creationDate.toDateString(), sub.plan.planName,
          sub.skuId);
    }
    pageToken = result.nextPageToken;
  } while (pageToken);
}
// [END apps_script_admin_sdk_get_subscriptions]
