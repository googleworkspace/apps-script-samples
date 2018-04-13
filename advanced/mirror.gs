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
// [START insertTimelineItem]
/**
 * This sample inserts a new item into the timeline.
 */
function insertTimelineItem() {
  var timelineItem = Mirror.newTimelineItem();
  timelineItem.text = 'Hello world!';

  var notificationConfig = Mirror.newNotificationConfig();
  notificationConfig.level = 'AUDIO_ONLY';

  var menuItem = Mirror.newMenuItem();
  menuItem.action = 'REPLY';

  timelineItem.notification = notificationConfig;
  timelineItem.menuItems = [menuItem];

  Mirror.Timeline.insert(timelineItem);
}
// [END insertTimelineItem]

// [START insertContact]
/**
 * This sample inserts a new contact.
 */
function insertContact() {
  var contact = {
    id: 'harold',
    displayName: 'Harold Penguin',
    imageUrls: ['https://developers.google.com/glass/images/harold.jpg'],
  };

  Mirror.Contacts.insert(contact);
}
// [END insertContact]

// [START printLatestLocation]
/**
 * This sample prints the most recent known location of the user's Glass to the
 * script editor's log.
 */
function printLatestLocation() {
  var location = Mirror.Locations.get('latest');

  Logger.log('Location recorded on: ' + location.timestamp);
  Logger.log('  > Latitude: ' + location.latitude);
  Logger.log('  > Longitude: ' + location.longitude);
  Logger.log('  > Accuracy: ' + location.accuracy + ' meters');
}
// [END printLatestLocation]
