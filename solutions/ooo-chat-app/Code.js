/**
 * Responds to an ADDED_TO_SPACE event in Chat.
 * @param {object} event the event object from Chat
 * @return {object} JSON-formatted response
 * @see https://developers.google.com/hangouts/chat/reference/message-formats/events
 */
 function onAddToSpace(event) {
    let message = 'Thank you for adding me to ';
    if (event.space.type === 'DM') {
      message += 'a DM, ' + event.user.displayName + '!';
    } else {
      message += event.space.displayName;
    }
    return { text: message };
  }
  
  /**
   * Responds to a REMOVED_FROM_SPACE event in Chat.
   * @param {object} event the event object from Chat
   * @param {object} event the event object from Chat
   * @see https://developers.google.com/hangouts/chat/reference/message-formats/events
   */
  function onRemoveFromSpace(event) {
    console.log('App removed from ', event.space.name);
  }
  
  
  /**
   * Responds to a MESSAGE event triggered in Chat.
   * @param {object} event the event object from Chat
   * @return {function} call the respective function
   */
  function onMessage(event) {
    const message = event.message;
  
    if (message.slashCommand) {
      switch (message.slashCommand.commandId) {
        case 1: // Help command
          return createHelpCard();
        case 2: // Block out day command
          return blockDayOut();
        case 3: // Cancel all meetings command
          return cancelAllMeetings();
        case 4: // Set auto reply command
          return setAutoReply();
      }
    }
  }
  
  function createHelpCard() {
    return {
      "cardsV2": [
        {
          "cardId": "2",
          "card": {
            "sections": [
              {
                "header": "",
                "widgets": [
                  {
                    "decoratedText": {
                      "topLabel": "",
                      "text": "Hi! 👋 I'm here to help you with your out of office tasks.<br><br>Here's a list of commands I understand.",
                      "wrapText": true
                    }
                  }
                ]
              },
              {
                "widgets": [
                  {
                    "decoratedText": {
                      "topLabel": "",
                      "text": "<b>/blockDayOut</b>: I will block out your calendar for you.",
                      "wrapText": true
                    }
                  },
                  {
                    "decoratedText": {
                      "topLabel": "",
                      "text": "<b>/cancelAllMeetings</b>: I will cancel all your meetings for the day.",
                      "wrapText": true
                    }
                  },
                  {
                    "decoratedText": {
                      "topLabel": "",
                      "text": "<b>/setAutoReply</b>: Set an out of office auto reply in Gmail.",
                      "wrapText": true
                    }
                  }
                ]
              }
            ],
            "header": {
              "title": "OOO app",
              "subtitle": "Helping you manage your OOO",
              "imageUrl": "https://goo.gle/3SfMkjb",
              "imageType": "SQUARE"
            }
          }
        }
      ]
    }
  }
  
  /**
   * Adds an all day event to the users Google Calendar.
   * @return {object} JSON-formatted response
   */
  function blockDayOut() {
    blockOutCalendar();
    return createResponseCard('Your calendar has been blocked out for you.')
  }
  
  /**
   * Cancels all of the users meeting for the current day.
   * @return {object} JSON-formatted response
   */
  function cancelAllMeetings() {
    cancelMeetings();
    return createResponseCard('All your meetings have been canceled.')
  }
  
  /**
   * Sets an out of office auto reply in the users Gmail account.
   * @return {object} JSON-formatted response
   */
  function setAutoReply() {
    turnOnAutoResponder();
    return createResponseCard('The out of office auto reply has been turned on.')
  }
  
  
  const ONE_DAY_MILLIS = 24 * 60 * 60 * 1000;
  
  /**
   * Places an all-day meeting on the user's Calendar.
   */
  function blockOutCalendar() {
    CalendarApp.createAllDayEvent('I am out of office today', new Date(), new Date(Date.now() + ONE_DAY_MILLIS));
  }
  
  /**
   * Declines all meetings for the day.
   */
  
  function cancelMeetings() {
    const events = CalendarApp.getEventsForDay(new Date());
  
    events.forEach(function(event) {
      if (event.getGuestList().length > 0) {
        event.setMyStatus(CalendarApp.GuestStatus.NO);
      }
    });
  }
  
  /**
   * Turns on the user's vacation response for today in Gmail.
   */
  function turnOnAutoResponder() {
    const currentTime = (new Date()).getTime();
    Gmail.Users.Settings.updateVacation({
      enableAutoReply: true,
      responseSubject: 'I am out of the office today',
      responseBodyHtml: 'I am out of the office today; will be back on the next business day.<br><br><i>Created by OOO Chat app!</i>',
      restrictToContacts: true,
      restrictToDomain: true,
      startTime: currentTime,
      endTime: currentTime + ONE_DAY_MILLIS
    }, 'me');
  }
  
  function createResponseCard(responseText) {
    return {
      "cardsV2": [
        {
          "cardId": "1",
          "card": {
            "sections": [
              {
                "widgets": [
                  {
                    "decoratedText": {
                      "topLabel": "",
                      "text": responseText,
                      "startIcon": {
                        "knownIcon": "NONE",
                        "altText": "Task done",
                        "iconUrl": "https://fonts.gstatic.com/s/i/short-term/web/system/1x/task_alt_gm_grey_48dp.png"
                      },
                      "wrapText": true
                    }
                  }
                ]
              }
            ],
            "header": {
              "title": "OOO app",
              "subtitle": "Helping you manage your OOO",
              "imageUrl": "https://goo.gle/3SfMkjb",
              "imageType": "CIRCLE"
            }
          }
        }
      ]
    }
  }
  
  