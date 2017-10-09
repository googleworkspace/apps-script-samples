/**
 * This sample inserts a new item into the timeline.
 */
// [START insertTimelineItem]
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

/**
 * This sample inserts a new contact.
 */
// [START insertContact]
function insertContact() {
  var contact = {
    id: 'harold',
    displayName: 'Harold Penguin',
    imageUrls: ['https://developers.google.com/glass/images/harold.jpg']
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
