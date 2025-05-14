const UNIVERSAL_ACTION = "universal action";

// ----------------------
// Homepage util functions
// ----------------------

/**
 * Responds to any homepage load request in Google Workspace UIs.
 */
function onHomepage() {
  return help();
}

// ----------------------
// Action util functions
// ----------------------

// Help action: Show add-on details.
function help(featureName = UNIVERSAL_ACTION) {
  return {
    header: addOnCardHeader(),
    sections: [{ widgets: [{
      decoratedText: { text: "Hi! 👋 Feel free to use the following " +  featureName + "s:", wrapText: true }}, {
      decoratedText: { text: "<b>⛔ Block day out</b>: I will block out your calendar for today.", wrapText: true }}, {
      decoratedText: { text: "<b>↩️ Set auto reply</b>: I will set an OOO auto reply in your Gmail.", wrapText: true }
    }]}]
  };
}

// Block day out action: Adds an all-day event to the user's Google Calendar.
function blockDayOut() {
  blockOutCalendar();
  return createActionResponseCard('Your calendar is now blocked out for today.')
}

// Creates an OOO event in the user's Calendar.
function blockOutCalendar() {
  function getDateAndHours(hour, minutes) {
    const date = new Date();
    date.setHours(hour);
    date.setMinutes(minutes);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date.toISOString();
  } 
  
  const event = {
    start: { dateTime: getDateAndHours(9, 0) },
    end: { dateTime: getDateAndHours(17, 0) },
    eventType: 'outOfOffice',
    summary: 'OOO',
    outOfOfficeProperties: {
      autoDeclineMode: 'declineOnlyNewConflictingInvitations',
      declineMessage: 'Declined because OOO.',
    }
  }
  Calendar.Events.insert(event, 'primary');
}

// Set auto reply action: Set OOO auto reply in the user's Gmail .
function setAutoReply() {
  turnOnAutoResponder();
  return createActionResponseCard('The out of office auto reply has been turned on.')
}

// Turns on the user's vacation response for today in Gmail.
function turnOnAutoResponder() {
  const ONE_DAY_MILLIS = 24 * 60 * 60 * 1000;
  const currentTime = (new Date()).getTime();
  Gmail.Users.Settings.updateVacation({
    enableAutoReply: true,
    responseSubject: 'I am OOO today',
    responseBodyHtml: 'I am OOO today.<br><br><i>Created by OOO Assistant add-on!</i>',
    restrictToContacts: true,
    restrictToDomain: true,
    startTime: currentTime,
    endTime: currentTime + ONE_DAY_MILLIS
  }, 'me');
}

// ----------------------
// Card util functions
// ----------------------

function addOnCardHeader() {
  return {
      title: "OOO Assistant",
      subtitle: "Helping manage your OOO",
      imageUrl: "https://goo.gle/3SfMkjb",
    };
}

// Create an action response card
function createActionResponseCard(text) {
  return {
    header: addOnCardHeader(),
    sections: [{ widgets: [{ decoratedText: {
      startIcon: { iconUrl: "https://fonts.gstatic.com/s/i/short-term/web/system/1x/task_alt_gm_grey_48dp.png" },
      text: text,
      wrapText: true
    }}]}]
  };
}

// ----------------------
// Universal action util functions
// ----------------------

function respondToUniversalAction(card) {
  return CardService.newUniversalActionResponseBuilder().displayAddOnCards([card]).build();
}
