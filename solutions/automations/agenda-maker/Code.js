// To learn how to use this script, refer to the documentation:
// https://developers.google.com/apps-script/samples/automations/agenda-maker

/*
Copyright 2022 Google LLC

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

/**
 * Checks if the folder for Agenda docs exists, and creates it if it doesn't.
 *
 * @return {*} Drive folder ID for the app.
 */
function checkFolder() {
  const folders = DriveApp.getFoldersByName('Agenda Maker - App');
  // Finds the folder if it exists
  while (folders.hasNext()) {
    let folder = folders.next();
    if (
      folder.getDescription() ==
        'Apps Script App - Do not change this description' &&
      folder.getOwner().getEmail() == Session.getActiveUser().getEmail()
    ) {
      return folder.getId();
    }
  }
  // If the folder doesn't exist, creates one
  let folder = DriveApp.createFolder('Agenda Maker - App');
  folder.setDescription('Apps Script App - Do not change this description');
  return folder.getId();
}

/**
 * Finds the template agenda doc, or creates one if it doesn't exist.
 */
function getTemplateId(folderId) {
  const folder = DriveApp.getFolderById(folderId);
  const files = folder.getFilesByName('Agenda TEMPLATE##');

  // If there is a file, returns the ID.
  while (files.hasNext()) {
    const file = files.next();
    return file.getId();
  }

  // Otherwise, creates the agenda template.
  // You can adjust the default template here
  const doc = DocumentApp.create('Agenda TEMPLATE##');
  const body = doc.getBody();

  body
      .appendParagraph('##Attendees##')
      .setHeading(DocumentApp.ParagraphHeading.HEADING1)
      .editAsText()
      .setBold(true);
  body.appendParagraph(' ').editAsText().setBold(false);

  body
      .appendParagraph('Overview')
      .setHeading(DocumentApp.ParagraphHeading.HEADING1)
      .editAsText()
      .setBold(true);
  body.appendParagraph(' ');
  body.appendParagraph('- Topic 1: ').editAsText().setBold(true);
  body.appendParagraph(' ').editAsText().setBold(false);
  body.appendParagraph('- Topic 2: ').editAsText().setBold(true);
  body.appendParagraph(' ').editAsText().setBold(false);
  body.appendParagraph('- Topic 3: ').editAsText().setBold(true);
  body.appendParagraph(' ').editAsText().setBold(false);

  body
      .appendParagraph('Next Steps')
      .setHeading(DocumentApp.ParagraphHeading.HEADING1)
      .editAsText()
      .setBold(true);
  body.appendParagraph('- Takeaway 1: ').editAsText().setBold(true);
  body.appendParagraph('- Responsible: ').editAsText().setBold(false);
  body.appendParagraph('- Accountable: ');
  body.appendParagraph('- Consult: ');
  body.appendParagraph('- Inform: ');
  body.appendParagraph(' ');
  body.appendParagraph('- Takeaway 2: ').editAsText().setBold(true);
  body.appendParagraph('- Responsible: ').editAsText().setBold(false);
  body.appendParagraph('- Accountable: ');
  body.appendParagraph('- Consult: ');
  body.appendParagraph('- Inform: ');
  body.appendParagraph(' ');
  body.appendParagraph('- Takeaway 3: ').editAsText().setBold(true);
  body.appendParagraph('- Responsible: ').editAsText().setBold(false);
  body.appendParagraph('- Accountable: ');
  body.appendParagraph('- Consult: ');
  body.appendParagraph('- Inform: ');
  
  doc.saveAndClose();

  folder.addFile(DriveApp.getFileById(doc.getId()));

  return doc.getId();
}

/**
 * When there is a change to the calendar, searches for events that include "#agenda"
 * in the decrisption.
 *
 */
function onCalendarChange() {
  // Gets recent events with the #agenda tag
  const now = new Date();
  const events = CalendarApp.getEvents(
      now,
      new Date(now.getTime() + 2 * 60 * 60 * 1000000),
      {search: '#agenda'},
  );

  const folderId = checkFolder();
  const templateId = getTemplateId(folderId);

  const folder = DriveApp.getFolderById(folderId);

  // Loops through any events found
  for (i = 0; i < events.length; i++) {
    const event = events[i];

    // Confirms whether the event has the #agenda tag
    let description = event.getDescription();
    if (description.search('#agenda') == -1) continue;

    // Only works with events created by the owner of this calendar
    if (event.isOwnedByMe()) {
      // Creates a new document from the template for an agenda for this event
      const newDoc = DriveApp.getFileById(templateId).makeCopy();
      newDoc.setName('Agenda for ' + event.getTitle());

      const file = DriveApp.getFileById(newDoc.getId());
      folder.addFile(file);

      const doc = DocumentApp.openById(newDoc.getId());
      const body = doc.getBody();

      // Fills in the template with information about the attendees from the
      // calendar event
      const conf = body.findText('##Attendees##');
      if (conf) {
        const ref = conf.getStartOffset();

        for (let i in event.getGuestList()) {
          let guest = event.getGuestList()[i];

          body.insertParagraph(ref + 2, guest.getEmail());
        }
        body.replaceText('##Attendees##', 'Attendees');
      }

      // Replaces the tag with a link to the agenda document
      const agendaUrl = 'https://docs.google.com/document/d/' + newDoc.getId();
      description = description.replace(
          '#agenda',
          '<a href=' + agendaUrl + '>Agenda Doc</a>',
      );
      event.setDescription(description);

      // Invites attendees to the Google doc so they automatically receive access to the agenda
      newDoc.addEditor(newDoc.getOwner());

      for (let i in event.getGuestList()) {
        let guest = event.getGuestList()[i];

        newDoc.addEditor(guest.getEmail());
      }
    }
  }
  return;
}

/**
 * Creates an event-driven trigger that fires whenever there's a change to the calendar.
 */
function setUp() {
  let email = Session.getActiveUser().getEmail();
  ScriptApp.newTrigger("onCalendarChange").forUserCalendar(email).onEventUpdated().create();
}
