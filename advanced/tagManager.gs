// [START createContainerVersion]
/**
 * Creates a container version for a particular account with the input
 * accountPath.
 */
function createContainerVersion(accountPath) {
  var date = new Date();
  // Creates a container in the account, using the current timestamp to make
  // sure the container is unique.
  var container = TagManager.Accounts.Containers.create(
      {
        'name': 'appscript tagmanager container ' + date.getTime(),
        'usageContext': ['WEB']
      },
      accountPath);
  var containerPath = container.path;
  // Creates a workspace in the container to track entity changes.
  var workspace = TagManager.Accounts.Containers.Workspaces.create(
      {'name': 'appscript workspace', 'description': 'appscript workspace'},
      containerPath);
  var workspacePath = workspace.path;
  // Creates a random value variable.
  var variable = TagManager.Accounts.Containers.Workspaces.Variables.create(
      {'name': 'apps script variable', 'type': 'r'},
      workspacePath);
  // Creates a trigger that fires on any page view.
  var trigger = TagManager.Accounts.Containers.Workspaces.Triggers.create(
      {'name': 'apps script trigger', 'type': 'PAGEVIEW'},
      workspacePath);
  // Creates a arbitary pixel that fires the tag on all page views.
  var tag = TagManager.Accounts.Containers.Workspaces.Tags.create(
      {
        'name': 'apps script tag',
        'type': 'img',
        'liveOnly': false,
        'parameter': [
          {'type': 'boolean', 'key': 'useCacheBuster', 'value': 'true'}, {
            'type': 'template',
            'key': 'cacheBusterQueryParam',
            'value': 'gtmcb'
          },
          {'type': 'template', 'key': 'url', 'value': '//example.com'}
        ],
        'firingTriggerId': [trigger.triggerId]
      },
      workspacePath);
  // Creates a container version with the variabe, trigger, and tag.
  var version = TagManager.Accounts.Containers.Workspaces
                    .create_version(
                        {'name': 'apps script version'}, workspacePath)
                    .containerVersion;
  Logger.log(version);
  return version;
}
// [END createContainerVersion]

// [START publishVersionAndQuickPreviewDraft]
/** Retrieves the container path from a container version path. */
function grabContainerPath(versionPath) {
  var pathParts = versionPath.split('/')
  return pathParts.slice(0, 4).join('/');
}

/**
 * Publishes a container version publically to the world and creates a quick
 * preview of the current container draft.
 */
function publishVersionAndQuickPreviewDraft(version) {
  var containerPath = grabContainerPath(version.path);
  // Publish the input container version.
  TagManager.Accounts.Containers.Versions.publish(version.path);
  var workspace = TagManager.Accounts.Containers.Workspaces.create(
      {'name': 'appscript workspace', 'description': 'appscript workspace'},
      containerPath);
  var workspaceId = workspace.path;
  // Quick previews the current container draft.
  var quickPreview = TagManager.Accounts.Containers.Workspaces.quick_preview(
      workspace.path);
  Logger.log(quickPreview);
}
// [END publishVersionAndQuickPreviewDraft]

// [START createAndReauthorizeUserEnvironment]
/** Retrieves the container path from a container version path. */
function grabContainerPath(versionPath) {
  var pathParts = versionPath.split('/')
  return pathParts.slice(0, 4).join('/');
}

/**
 * Creates and reauthorizes a user environment in a container that points
 * to a container version passed in as an argument.
 */
function createAndReauthorizeUserEnvironment(version) {
  // Creates a container version.
  var containerPath = grabContainerPath(version.path)
  // Creates a user environment that points to a container version.
  var environment = TagManager.Accounts.Containers.Environments.create(
      {
        'name': 'test_environment',
        'type': 'user',
        'containerVersionId': version.containerVersionId
      },
      containerPath);
  Logger.log('Original user environment: ' + environment);
  // Reauthorizes the user environment that points to a container version.
  TagManager.Accounts.Containers.Environments.reauthorize({}, environment.path);
  Logger.log('Reauthorized user environment: ' + environment);
}
// [END createAndReauthorizeUserEnvironment]

// [START logAllAccountUserPermissionsWithContainerAccess]
/**
 * Logs all emails and container access permission within an account.
 */
function logAllAccountUserPermissionsWithContainerAccess(accountPath) {
  var userPermissions =
      TagManager.Accounts.User_permissions.list(accountPath).userPermission;
  for (var i = 0; i < userPermissions.length; i++) {
    var userPermission = userPermissions[i];
    if ('emailAddress' in userPermission) {
      var containerAccesses = userPermission.containerAccess;
      for (var j = 0; j < containerAccesses.length; j++) {
        var containerAccess = containerAccesses[j];
        Logger.log(
            'emailAddress:' + userPermission.emailAddress + ' containerId:' +
            containerAccess.containerId + ' containerAccess:' +
            containerAccess.permission);
      }
    }
  }
}
// [END logAllAccountUserPermissionsWithContainerAccess]
