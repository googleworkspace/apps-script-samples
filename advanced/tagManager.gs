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
// [START apps_script_tag_manager_create_version]
/**
 * Creates a container version for a particular account
 * with the input accountPath.
 * @param {string} accountPath The account path.
 * @return {string} The tag manager container version.
 */
function createContainerVersion(accountPath) {
  const date = new Date();
  // Creates a container in the account, using the current timestamp to make
  // sure the container is unique.
  try {
    const container = TagManager.Accounts.Containers.create(
        {
          'name': 'appscript tagmanager container ' + date.getTime(),
          'usageContext': ['WEB']
        },
        accountPath);
    const containerPath = container.path;
    // Creates a workspace in the container to track entity changes.
    const workspace = TagManager.Accounts.Containers.Workspaces.create(
        {'name': 'appscript workspace', 'description': 'appscript workspace'},
        containerPath);
    const workspacePath = workspace.path;
    // Creates a random value variable.
    const variable = TagManager.Accounts.Containers.Workspaces.Variables.create(
        {'name': 'apps script variable', 'type': 'r'},
        workspacePath);
    // Creates a trigger that fires on any page view.
    const trigger = TagManager.Accounts.Containers.Workspaces.Triggers.create(
        {'name': 'apps script trigger', 'type': 'PAGEVIEW'},
        workspacePath);
    // Creates a arbitary pixel that fires the tag on all page views.
    const tag = TagManager.Accounts.Containers.Workspaces.Tags.create(
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
    const version = TagManager.Accounts.Containers.Workspaces
        .create_version(
            {'name': 'apps script version'}, workspacePath)
        .containerVersion;
    console.log(version);
    return version;
  } catch (e) {
    // TODO (Developer) - Handle exception
    console.log('Failed with error: %s', e.error);
  }
}
// [END apps_script_tag_manager_create_version]

// [START apps_script_tag_manager_publish_version]
/**
 * Retrieves the container path from a container version path.
 * @param  {string} versionPath The version path.
 * @return {string}             The container path.
 */
function grabContainerPath(versionPath) {
  const pathParts = versionPath.split('/');
  return pathParts.slice(0, 4).join('/');
}

/**
 * Publishes a container version publically to the world and creates a quick
 * preview of the current container draft.
 * @param {object} version The container version.
 */
function publishVersionAndQuickPreviewDraft(version) {
  try {
    const containerPath = grabContainerPath(version.path);
    // Publish the input container version.
    TagManager.Accounts.Containers.Versions.publish(version.path);
    const workspace = TagManager.Accounts.Containers.Workspaces.create(
        {'name': 'appscript workspace', 'description': 'appscript workspace'},
        containerPath);
    const workspaceId = workspace.path;
    // Quick previews the current container draft.
    const quickPreview = TagManager.Accounts.Containers.Workspaces
        .quick_preview(workspace.path);
    console.log(quickPreview);
  } catch (e) {
    // TODO (Developer) - Handle exceptions
    console.log('Failed with error: $s', e.error);
  }
}
// [END apps_script_tag_manager_publish_version]

// [START apps_script_tag_manager_create_user_environment]
/**
 * Retrieves the container path from a container version path.
 * @param  {string} versionPath The version path.
 * @return {string}             The container path.
 */
function grabContainerPath(versionPath) {
  const pathParts = versionPath.split('/');
  return pathParts.slice(0, 4).join('/');
}

/**
 * Creates and reauthorizes a user environment in a container that points
 * to a container version passed in as an argument.
 * @param {object} version The container version object.
 */
function createAndReauthorizeUserEnvironment(version) {
  try {
    // Creates a container version.
    const containerPath = grabContainerPath(version.path);
    // Creates a user environment that points to a container version.
    const environment = TagManager.Accounts.Containers.Environments.create(
        {
          'name': 'test_environment',
          'type': 'user',
          'containerVersionId': version.containerVersionId
        },
        containerPath);
    console.log('Original user environment: ' + environment);
    // Reauthorizes the user environment that points to a container version.
    TagManager.Accounts.Containers.Environments.reauthorize(
        {}, environment.path);
    console.log('Reauthorized user environment: ' + environment);
  } catch (e) {
    // TODO (Developer) - Handle exceptions
    console.log('Failed with error: $s', e.error);
  }
}
// [END apps_script_tag_manager_create_user_environment]

// [START apps_script_tag_manager_log]
/**
 * Logs all emails and container access permission within an account.
 * @param {string} accountPath The account path.
 */
function logAllAccountUserPermissionsWithContainerAccess(accountPath) {
  try {
    const userPermissions =
      TagManager.Accounts.User_permissions.list(accountPath).userPermission;
    for (let i = 0; i < userPermissions.length; i++) {
      const userPermission = userPermissions[i];
      if ('emailAddress' in userPermission) {
        const containerAccesses = userPermission.containerAccess;
        for (let j = 0; j < containerAccesses.length; j++) {
          const containerAccess = containerAccesses[j];
          console.log(
              'emailAddress:' + userPermission.emailAddress +
            ' containerId:' + containerAccess.containerId +
            ' containerAccess:' + containerAccess.permission);
        }
      }
    }
  } catch (e) {
    // TODO (Developer) - Handle exceptions
    console.log('Failed with error: $s', e.error);
  }
}
// [END apps_script_tag_manager_log]
