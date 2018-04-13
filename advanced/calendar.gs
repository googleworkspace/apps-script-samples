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
// [START listCalendars]
/**
 * Lists the calendars shown in the user's calendar list.
 */
function listCalendars() {
  var calendars;
  var pageToken;
  do {
    calendars = Calendar.CalendarList.list({
      maxResults: 100,
      pageToken: pageToken,
    });
    if (calendars.items && calendars.items.length > 0) {
      for (var i = 0; i < calendars.items.length; i++) {
        var calendar = calendars.items[i];
        Logger.log('%s (ID: %s)', calendar.summary, calendar.id);
      }
    } else {
      Logger.log('No calendars found.');
    }
    pageToken = calendars.nextPageToken;
  } while (pageToken);
}
// [END listCalendars]

// [START createEvent]
/**
 * Creates an event in the user's default calendar.
 */
function createEvent() {
  var calendarId = 'primary';
  var start = getRelativeDate(1, 12);
  var end = getRelativeDate(1, 13);
  var event = {
    summary: 'Lunch Meeting',
    location: 'The Deli',
    description: 'To discuss our plans for the presentation next week.',
    start: {
      dateTime: start.toISOString(),
    },
    end: {
      dateTime: end.toISOString(),
    },
    attendees: [
      {email: 'alice@example.com'},
      {email: 'bob@example.com'},
    ],
    // Red background. Use Calendar.Colors.get() for the full list.
    colorId: 11,
  };
  event = Calendar.Events.insert(event, calendarId);
  Logger.log('Event ID: ' + event.getId());
}

/**
 * Helper function to get a new Date object relative to the current date.
 * @param {number} daysOffset The number of days in the future for the new date.
 * @param {number} hour The hour of the day for the new date, in the time zone
 *     of the script.
 * @return {Date} The new date.
 */
function getRelativeDate(daysOffset, hour) {
  var date = new Date();
  date.setDate(date.getDate() + daysOffset);
  date.setHours(hour);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
}
// [END createEvent]

// [START listNext10Events]
/**
 * Lists the next 10 upcoming events in the user's default calendar.
 */
function listNext10Events() {
  var calendarId = 'primary';
  var now = new Date();
  var events = Calendar.Events.list(calendarId, {
    timeMin: now.toISOString(),
    singleEvents: true,
    orderBy: 'startTime',
    maxResults: 10,
  });
  if (events.items && events.items.length > 0) {
    for (var i = 0; i < events.items.length; i++) {
      var event = events.items[i];
      if (event.start.date) {
        // All-day event.
        var start = parseDate(event.start.date);
        Logger.log('%s (%s)', event.summary, start.toLocaleDateString());
      } else {
        var start = parseDate(event.start.dateTime);
        Logger.log('%s (%s)', event.summary, start.toLocaleString());
      }
    }
  } else {
    Logger.log('No events found.');
  }
}

/**
 * Parses an RFC 3339 date or datetime string and returns a corresponding Date
 * object. This function is provided as a workaround until Apps Script properly
 * supports RFC 3339 dates. For more information, see
 * https://code.google.com/p/google-apps-script-issues/issues/detail?id=3860
 * @param {string} string The RFC 3339 string to parse.
 * @return {Date} The parsed date.
 */
function parseDate(string) {
  var parts = string.split('T');
  parts[0] = parts[0].replace(/-/g, '/');
  return new Date(parts.join(' '));
}
// [END listNext10Events]
