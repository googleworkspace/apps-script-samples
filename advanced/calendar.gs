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
// [START calendar_list_calendars]
/**
 * Lists the calendars shown in the user's calendar list.
 * @see https://developers.google.com/calendar/api/v3/reference/calendarList/list
 */
function listCalendars() {
  let calendars;
  let pageToken;
  do {
    calendars = Calendar.CalendarList.list({
      maxResults: 100,
      pageToken: pageToken

    });
    if (!calendars.items || calendars.items.length === 0) {
      console.log('No calendars found.');
      return;
    }
    // Print the calendar id and calendar summary
    for (const calendar of calendars.items) {
      console.log('%s (ID: %s)', calendar.summary, calendar.id);
    }
    pageToken = calendars.nextPageToken;
  } while (pageToken);
}
// [END calendar_list_calendars]

// [START calendar_create_event]
/**
 * Creates an event in the user's default calendar.
 * @see https://developers.google.com/calendar/api/v3/reference/events/insert
 */
function createEvent() {
  const calendarId = 'primary';
  const start = getRelativeDate(1, 12);
  const end = getRelativeDate(1, 13);
  // event details for creating event.
  let event = {
    summary: 'Lunch Meeting',
    location: 'The Deli',
    description: 'To discuss our plans for the presentation next week.',
    start: {
      dateTime: start.toISOString()
    },
    end: {
      dateTime: end.toISOString()
    },
    attendees: [
      {email: 'gduser1@workspacesample.dev'},
      {email: 'gduser2@workspacesample.dev'}
    ],
    // Red background. Use Calendar.Colors.get() for the full list.
    colorId: 11
  };
  try {
    // call method to insert/create new event in provided calandar
    event = Calendar.Events.insert(event, calendarId);
    console.log('Event ID: ' + event.id);
  } catch (err) {
    console.log('Failed with error %s', err.message);
  }
}

/**
 * Helper function to get a new Date object relative to the current date.
 * @param {number} daysOffset The number of days in the future for the new date.
 * @param {number} hour The hour of the day for the new date, in the time zone
 *     of the script.
 * @return {Date} The new date.
 */
function getRelativeDate(daysOffset, hour) {
  const date = new Date();
  date.setDate(date.getDate() + daysOffset);
  date.setHours(hour);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
}
// [END calendar_create_event]

// [START calendar_list_events]
/**
 * Lists the next 10 upcoming events in the user's default calendar.
 * @see https://developers.google.com/calendar/api/v3/reference/events/list
 */
function listNext10Events() {
  const calendarId = 'primary';
  const now = new Date();
  const events = Calendar.Events.list(calendarId, {
    timeMin: now.toISOString(),
    singleEvents: true,
    orderBy: 'startTime',
    maxResults: 10
  });
  if (!events.items || events.items.length === 0) {
    console.log('No events found.');
    return;
  }
  for (const event of events.items) {
    if (event.start.date) {
      // All-day event.
      const start = new Date(event.start.date);
      console.log('%s (%s)', event.summary, start.toLocaleDateString());
      return;
    }
    const start = new Date(event.start.dateTime);
    console.log('%s (%s)', event.summary, start.toLocaleString());
  }
}
// [END calendar_list_events]

// [START calendar_log_synced_events]
/**
 * Retrieve and log events from the given calendar that have been modified
 * since the last sync. If the sync token is missing or invalid, log all
 * events from up to a month ago (a full sync).
 *
 * @param {string} calendarId The ID of the calender to retrieve events from.
 * @param {boolean} fullSync If true, throw out any existing sync token and
 *        perform a full sync; if false, use the existing sync token if possible.
 */
function logSyncedEvents(calendarId, fullSync) {
  const properties = PropertiesService.getUserProperties();
  const options = {
    maxResults: 100
  };
  const syncToken = properties.getProperty('syncToken');
  if (syncToken && !fullSync) {
    options.syncToken = syncToken;
  } else {
    // Sync events up to thirty days in the past.
    options.timeMin = getRelativeDate(-30, 0).toISOString();
  }
  // Retrieve events one page at a time.
  let events;
  let pageToken;
  do {
    try {
      options.pageToken = pageToken;
      events = Calendar.Events.list(calendarId, options);
    } catch (e) {
      // Check to see if the sync token was invalidated by the server;
      // if so, perform a full sync instead.
      if (e.message === 'Sync token is no longer valid, a full sync is required.') {
        properties.deleteProperty('syncToken');
        logSyncedEvents(calendarId, true);
        return;
      }
      throw new Error(e.message);
    }
    if (events.items && events.items.length === 0) {
      console.log('No events found.');
      return;
    }
    for (const event of events.items) {
      if (event.status === 'cancelled') {
        console.log('Event id %s was cancelled.', event.id);
        return;
      }
      if (event.start.date) {
        const start = new Date(event.start.date);
        console.log('%s (%s)', event.summary, start.toLocaleDateString());
        return;
      }
      // Events that don't last all day; they have defined start times.
      const start = new Date(event.start.dateTime);
      console.log('%s (%s)', event.summary, start.toLocaleString());
    }
    pageToken = events.nextPageToken;
  } while (pageToken);
  properties.setProperty('syncToken', events.nextSyncToken);
}
// [END calendar_log_synced_events]

// [START calendar_conditional_update]
/**
 * Creates an event in the user's default calendar, waits 30 seconds, then
 * attempts to update the event's location, on the condition that the event
 * has not been changed since it was created.  If the event is changed during
 * the 30-second wait, then the subsequent update will throw a 'Precondition
 * Failed' error.
 *
 * The conditional update is accomplished by setting the 'If-Match' header
 * to the etag of the new event when it was created.
 */
function conditionalUpdate() {
  const calendarId = 'primary';
  const start = getRelativeDate(1, 12);
  const end = getRelativeDate(1, 13);
  let event = {
    summary: 'Lunch Meeting',
    location: 'The Deli',
    description: 'To discuss our plans for the presentation next week.',
    start: {
      dateTime: start.toISOString()
    },
    end: {
      dateTime: end.toISOString()
    },
    attendees: [
      {email: 'gduser1@workspacesample.dev'},
      {email: 'gduser2@workspacesample.dev'}
    ],
    // Red background. Use Calendar.Colors.get() for the full list.
    colorId: 11
  };
  event = Calendar.Events.insert(event, calendarId);
  console.log('Event ID: ' + event.getId());
  // Wait 30 seconds to see if the event has been updated outside this script.
  Utilities.sleep(30 * 1000);
  // Try to update the event, on the condition that the event state has not
  // changed since the event was created.
  event.location = 'The Coffee Shop';
  try {
    event = Calendar.Events.update(
        event,
        calendarId,
        event.id,
        {},
        {'If-Match': event.etag}
    );
    console.log('Successfully updated event: ' + event.id);
  } catch (e) {
    console.log('Fetch threw an exception: ' + e);
  }
}
// [END calendar_conditional_update]

// [START calendar_conditional_fetch]
/**
 * Creates an event in the user's default calendar, then re-fetches the event
 * every second, on the condition that the event has changed since the last
 * fetch.
 *
 * The conditional fetch is accomplished by setting the 'If-None-Match' header
 * to the etag of the last known state of the event.
 */
function conditionalFetch() {
  const calendarId = 'primary';
  const start = getRelativeDate(1, 12);
  const end = getRelativeDate(1, 13);
  let event = {
    summary: 'Lunch Meeting',
    location: 'The Deli',
    description: 'To discuss our plans for the presentation next week.',
    start: {
      dateTime: start.toISOString()
    },
    end: {
      dateTime: end.toISOString()
    },
    attendees: [
      {email: 'gduser1@workspacesample.dev'},
      {email: 'gduser2@workspacesample.dev'}
    ],
    // Red background. Use Calendar.Colors.get() for the full list.
    colorId: 11
  };
  try {
    // insert event
    event = Calendar.Events.insert(event, calendarId);
    console.log('Event ID: ' + event.getId());
    // Re-fetch the event each second, but only get a result if it has changed.
    for (let i = 0; i < 30; i++) {
      Utilities.sleep(1000);
      event = Calendar.Events.get(calendarId, event.id, {}, {'If-None-Match': event.etag});
      console.log('New event description: ' + event.start.dateTime);
    }
  } catch (e) {
    console.log('Fetch threw an exception: ' + e);
  }
}
// [END calendar_conditional_fetch]
