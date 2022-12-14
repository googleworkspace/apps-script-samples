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

// [START apps_script_sheets_custom_form_responses_quickstart]
/**
 * A special function that inserts a custom menu when the spreadsheet opens.
 */
function onOpen() {
  const menu = [{name: 'Set up conference', functionName: 'setUpConference_'}];
  try {
    SpreadsheetApp.getActive().addMenu('Conference', menu);
  } catch (e) {
    // TODO (Developer) - Handle Exception
    console.log('Failed with error: %s' + e.error);
  }
}

/**
 * A set-up function that uses the conference data in the spreadsheet to create
 * Google Calendar events, a Google Form, and a trigger that allows the script
 * to react to form responses.
 */
function setUpConference_() {
  if (ScriptProperties.getProperty('calId')) {
    Browser.msgBox('Your conference is already set up. Look in Google Drive!');
  }

  try {
    const ss = SpreadsheetApp.getActive();
    const sheet = ss.getSheetByName('Conference Setup');
    const range = sheet.getDataRange();
    const values = range.getValues();
    setUpCalendar_(values, range);
    setUpForm_(ss, values);
    ScriptApp.newTrigger('onFormSubmit').forSpreadsheet(ss).onFormSubmit()
        .create();
    ss.removeMenu('Conference');
  } catch (e) {
    // TODO (Developer) - Handle Exception
    console.log('Failed with error: %s' + e.error);
  }
}

/**
 * Creates a Google Calendar with events for each conference session in the
 * spreadsheet, then writes the event IDs to the spreadsheet for future use.
 * @param {Array<string[]>} values Cell values for the spreadsheet range.
 * @param {Range} range A spreadsheet range that contains conference data.
 */
function setUpCalendar_(values, range) {
  try {
    const cal = CalendarApp.createCalendar('Conference Calendar');
    for (var i = 1; i < values.length; i++) {
      const session = values[i];
      const title = session[0];
      const start = joinDateAndTime_(session[1], session[2]);
      const end = joinDateAndTime_(session[1], session[3]);
      const options = {location: session[4], sendInvites: true};
      const event = cal.createEvent(title, start, end, options)
          .setGuestsCanSeeGuests(false);
      session[5] = event.getId();
    }
    range.setValues(values);

    // Store the ID for the Calendar, which is needed to retrieve events by ID.
    ScriptProperties.setProperty('calId', cal.getId());
  } catch (e) {
    // TODO (Developer) - Handle Exception
    console.log('Failed with error: %s' + e.error);
  }
}

/**
 * Creates a single Date object from separate date and time cells.
 *
 * @param {Date} date A Date object from which to extract the date.
 * @param {Date} time A Date object from which to extract the time.
 * @return {Date} A Date object representing the combined date and time.
 */
function joinDateAndTime_(date, time) {
  date = new Date(date);
  date.setHours(time.getHours());
  date.setMinutes(time.getMinutes());
  return date;
}

/**
 * Creates a Google Form that allows respondents to select which conference
 * sessions they would like to attend, grouped by date and start time.
 *
 * @param {Spreadsheet} ss The spreadsheet that contains the conference data.
 * @param {Array<String[]>} values Cell values for the spreadsheet range.
 */
function setUpForm_(ss, values) {
  // Group the sessions by date and time so that they can be passed to the form.
  const schedule = {};
  for (let i = 1; i < values.length; i++) {
    const session = values[i];
    const day = session[1].toLocaleDateString();
    const time = session[2].toLocaleTimeString();
    if (!schedule[day]) {
      schedule[day] = {};
    }
    if (!schedule[day][time]) {
      schedule[day][time] = [];
    }
    schedule[day][time].push(session[0]);
  }

  try {
    // Create the form and add a multiple-choice question for each timeslot.
    const form = FormApp.create('Conference Form');
    form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());
    form.addTextItem().setTitle('Name').setRequired(true);
    form.addTextItem().setTitle('Email').setRequired(true);
    for (const day of schedule) {
      const header = form.addSectionHeaderItem().setTitle(
          'Sessions for ' + day);
      for (const time of schedule[day]) {
        const item = form.addMultipleChoiceItem().setTitle(time + ' ' + day)
            .setChoiceValues(schedule[day][time]);
      }
    }
  } catch (e) {
    // TODO (Developer) - Handle Exception
    console.log('Failed with error: %s' + e.error);
  }
}

/**
 * A trigger-driven function that sends out calendar invitations and a
 * personalized Google Docs itinerary after a user responds to the form.
 *
 * @param {Object} e The event parameter for form submission to a spreadsheet;
 *     see https://developers.google.com/apps-script/understanding_events
 */
function onFormSubmit(e) {
  const user = {name: e.namedValues['Name'][0],
    email: e.namedValues['Email'][0]};

  // Grab the session data again so that we can match it to the user's choices.
  const response = [];
  try {
    values = SpreadsheetApp.getActive()
        .getSheetByName('Conference Setup').getDataRange().getValues();
    for (let i = 1; i < values.length; i++) {
      const session = values[i];
      const title = session[0];
      const day = session[1].toLocaleDateString();
      const time = session[2].toLocaleTimeString();
      const timeslot = time + ' ' + day;

      // For every selection in the response, find the matching timeslot and
      // title in the spreadsheet and add the session data to the response array.
      if (e.namedValues[timeslot] && e.namedValues[timeslot] === title) {
        response.push(session);
      }
    }
    sendInvites_(user, response);
    sendDoc_(user, response);
  } catch (e) {
    // TODO (Developer) - Handle Exception
    console.log('Failed with error: %s' + e.error);
  }
}

/**
 * Add the user as a guest for every session he or she selected.
 * @param {object} user An object that contains the user's name and email.
 * @param {Array<String[]>} response An array of data for the user's session choices.
 */
function sendInvites_(user, response) {
  try {
    const id = ScriptProperties.getProperty('calId');
    const cal = CalendarApp.getCalendarById(id);
    for (let i = 0; i < response.length; i++) {
      cal.getEventSeriesById(response[i][5]).addGuest(user.email);
    }
  } catch (e) {
    // TODO (Developer) - Handle Exception
    console.log('Failed with error: %s' + e.error);
  }
}

/**
 * Create and share a personalized Google Doc that shows the user's itinerary.
 * @param {object} user An object that contains the user's name and email.
 * @param {Array<string[]>} response An array of data for the user's session choices.
 */
function sendDoc_(user, response) {
  try {
    const doc = DocumentApp.create('Conference Itinerary for ' + user.name)
        .addEditor(user.email);
    const body = doc.getBody();
    let table = [['Session', 'Date', 'Time', 'Location']];
    for (let i = 0; i < response.length; i++) {
      table.push([response[i][0], response[i][1].toLocaleDateString(),
        response[i][2].toLocaleTimeString(), response[i][4]]);
    }
    body.insertParagraph(0, doc.getName())
        .setHeading(DocumentApp.ParagraphHeading.HEADING1);
    table = body.appendTable(table);
    table.getRow(0).editAsText().setBold(true);
    doc.saveAndClose();

    // Email a link to the Doc as well as a PDF copy.
    MailApp.sendEmail({
      to: user.email,
      subject: doc.getName(),
      body: 'Thanks for registering! Here\'s your itinerary: ' + doc.getUrl(),
      attachments: doc.getAs(MimeType.PDF)
    });
  } catch (e) {
    // TODO (Developer) - Handle Exception
    console.log('Failed with error: %s' + e.error);
  }
}
// [END apps_script_sheets_custom_form_responses_quickstart]

