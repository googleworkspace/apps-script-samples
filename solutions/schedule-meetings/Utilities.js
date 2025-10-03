/**
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
* Helper function that gets the field value from the given form input.
* @return {string} 
*/
function getFieldValue_(formInputs, fieldName) {
  return formInputs[fieldName][''].stringInputs.value[0];
}

// Regular expression to validate the date/time input.
const DATE_TIME_PATTERN = /\d{1,2}\/\d{1,2}\/\d{4}\s+\d{1,2}:\d\d/;

/**
* Casts date and time from string to Date object.
* @return {date} 
*/
function getStartTimeAsDateObject_(dateTimeStr) {
  if (!dateTimeStr || !dateTimeStr.match(DATE_TIME_PATTERN)) {
    return null;
  }

  const parts = dateTimeStr.split(' ');
  const [month, day, year] = parts[0].split('/').map(Number);
  const [hour, minute] = parts[1].split(':').map(Number);
  
  
  Session.getScriptTimeZone()
  
  return new Date(year, month - 1, day, hour, minute)
}

/** 
* Gets the current date and time for the upcoming top of the hour (e.g. 01/25/2022 18:00).
* @return {string} date/time in mm/dd/yyy HH:MM format needed for use by Calendar
*/
function getTopOfHourDateString_() {
  const date = new Date();
  date.setHours(date.getHours() + 1);
  date.setMinutes(0, 0, 0);
  // Adding the date as string might lead to an incorrect response due to time zone adjustments.
  return Utilities.formatDate(date, Session.getScriptTimeZone(), 'MM/dd/yyyy H:mm');
}


/** 
* Creates the URL for the Google Calendar event.
*
* @param {object} event The Google Calendar Event instance
* @param {object} cal The associated Google Calendar 
* @return {string} URL in the form of 'https://www.google.com/calendar/event?eid={event-id}'
*/
function getCalendarEventURL_(event, cal) {
  const baseCalUrl = 'https://www.google.com/calendar';
  // Joins Calendar Event Id with Calendar Id, then base64 encode to derive the event URL.
  let encodedId = Utilities.base64Encode(event.getId().split('@')[0] + " " + cal.getId()).replace(/\=/g, '');
  encodedId = `/event?eid=${encodedId}`;
  return (baseCalUrl + encodedId);

}