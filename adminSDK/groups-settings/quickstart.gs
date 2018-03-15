function getGroupSettings() {
  var groupUniqueId = 'YOUR_GROUP_EMAIL_ADDRESS_HERE';
  var group = AdminGroupsSettings.Groups.get(groupUniqueId);
  Logger.log(JSON.stringify(group, null, 2));
}
