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
// [START calendar_quickstart]
/**
 * Lists 10 upcoming events in the user's calendar.
 */
function listUpcomingEvents() {
  const calendarId = 'primary';
  const optionalArgs = {
    timeMin: (new Date()).toISOString(),
    showDeleted: false,
    singleEvents: true,
    maxResults: 10,
    orderBy: 'startTime'
  };
  try {
    // List the calendar events using list() method.
    const response = Calendar.Events.list(calendarId, optionalArgs);
    const events = response.items;
    if (events.length > 0) {
      // Print the calendar events
      for (let i = 0; i < events.length; i++) {
        const event = events[i];
        let when = event.start.dateTime;
        if (!when) {
          when = event.start.date;
        }
        Logger.log('%s (%s)', event.summary, when);
      }
      return;
    }
    Logger.log('No upcoming events found.');
  } catch (err) {
    // TODO (developer) - Handle exception from Calendar API
    Logger.log('Failed with error %s', err.message);
  }
}
// [END calendar_quickstart]
