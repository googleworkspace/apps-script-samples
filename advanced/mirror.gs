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
// [START apps_script_mirror_timeline]
/**
 * This sample inserts a new item into the timeline.
 */
function insertTimelineItem() {
  const timelineItem = Mirror.newTimelineItem();
  timelineItem.text = 'Hello world!';

  const notificationConfig = Mirror.newNotificationConfig();
  notificationConfig.level = 'AUDIO_ONLY';

  const menuItem = Mirror.newMenuItem();
  menuItem.action = 'REPLY';

  timelineItem.notification = notificationConfig;
  timelineItem.menuItems = [menuItem];
  try {
    // @see https://developers.google.com/glass/v1/reference/timeline/insert
    Mirror.Timeline.insert(timelineItem);
    Logger.log('Successfully inserted new item to Timeline ');
  } catch (err) {
    // TODO (developer)- Handle exception from the  API
    Logger.log('Failed with error %s', err.message);
  }
}
// [END apps_script_mirror_timeline]

// [START apps_script_mirror_contact]
/**
 * This sample inserts a new contact.
 * @see https://developers.google.com/glass/v1/reference/contacts/insert
 */
function insertContact() {
  const contact = {
    id: 'harold',
    displayName: 'Harold Penguin',
    imageUrls: ['https://developers.google.com/glass/images/harold.jpg']
  };
  try {
    Mirror.Contacts.insert(contact);
    Logger.log('Successfully inserted contact ');
  } catch (err) {
    // TODO (developer)- Handle exception from the API
    Logger.log('Failed with error %s', err.message);
  }
}
// [END apps_script_mirror_contact]

// [START apps_script_mirror_location]
/**
 * This sample prints the most recent known location of the user's Glass to the
 * script editor's log.
 * @see https://developers.google.com/glass/v1/reference/locations/get
 */
function printLatestLocation() {
  try {
    const location = Mirror.Locations.get('latest');

    Logger.log('Location recorded on: ' + location.timestamp);
    Logger.log('  > Latitude: ' + location.latitude);
    Logger.log('  > Longitude: ' + location.longitude);
    Logger.log('  > Accuracy: ' + location.accuracy + ' meters');
  } catch (err) {
    // TODO (developer)- Handle exception from the API
    Logger.log('Failed with error %s', err.message);
  }
}
// [END apps_script_mirror_location]
