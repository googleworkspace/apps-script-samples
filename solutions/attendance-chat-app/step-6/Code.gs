/**
 * Responds to an ADDED_TO_SPACE event
 *  in Google Chat.
 *
 * @param event the event object from Google Chat
 * @return JSON-formatted response
 */
function onAddToSpace(event) {
  console.info(event);

  let message = "";

  if (event.space.type === "DM") {
    message = `Thank you for adding me to a DM, ${event.user.displayName}!`;
  } else {
    message = `Thank you for adding me to ${event.space.displayName}`;
  }

  return { text: message };
}

/**
 * Responds to a REMOVED_FROM_SPACE event
 * in Google Chat.
 *
 * @param event the event object from Google Chat
 */
function onRemoveFromSpace(event) {
  console.info(event);
  console.info("Chat app removed from ", event.space.name);
}

const DEFAULT_IMAGE_URL = "https://goo.gl/bMqzYS";
const header = {
  header: {
    title: "Attendance Chat app",
    subtitle: "Log your vacation time",
    imageUrl: DEFAULT_IMAGE_URL,
  },
};

/**
 * Creates a card-formatted response.
 *
 * @param widgets the UI components to send
 * @return JSON-formatted response
 */
function createCardResponse(widgets) {
  return {
    cards: [
      header,
      {
        sections: [
          {
            widgets: widgets,
          },
        ],
      },
    ],
  };
}

const REASON_SICK = "Out sick";
const REASON_OTHER = "Out of office";

/**
 * Responds to a MESSAGE event triggered in Google Chat.
 *
 * @param event the event object from Google Chat
 * @return JSON-formatted response
 */
function onMessage(event) {
  console.info(event);

  let reason = REASON_OTHER;
  const name = event.user.displayName;
  const userMessage = event.message.text;

  // If the user said that they were "sick", adjust the image in the
  // header sent in response.
  if (userMessage.indexOf("sick") > -1) {
    // Hospital material icon
    header.header.imageUrl = "https://goo.gl/mnZ37b";
    reason = REASON_SICK;
  } else if (userMessage.indexOf("vacation") > -1) {
    // Spa material icon
    header.header.imageUrl = "https://goo.gl/EbgHuc";
  }

  const widgets = [
    {
      textParagraph: {
        text: `Hello, ${name}.<br/>Are you taking time off today?`,
      },
    },
    {
      buttons: [
        {
          textButton: {
            text: "Set vacation in Gmail",
            onClick: {
              action: {
                actionMethodName: "turnOnAutoResponder",
                parameters: [
                  {
                    key: "reason",
                    value: reason,
                  },
                ],
              },
            },
          },
        },
        {
          textButton: {
            text: "Block out day in Calendar",
            onClick: {
              action: {
                actionMethodName: "blockOutCalendar",
                parameters: [
                  {
                    key: "reason",
                    value: reason,
                  },
                ],
              },
            },
          },
        },
      ],
    },
  ];

  return createCardResponse(widgets);
}

/**
 * Responds to a CARD_CLICKED event triggered in Google Chat.
 *
 * @param event the event object from Google Chat
 * @return JSON-formatted response
 */
function onCardClick(event) {
  console.info(event);

  let message = "";
  const reason = event.action.parameters[0].value;

  if (event.action.actionMethodName === "turnOnAutoResponder") {
    turnOnAutoResponder(reason);
    message = "Turned on vacation settings.";
  } else if (event.action.actionMethodName === "blockOutCalendar") {
    blockOutCalendar(reason);
    message = "Blocked out your calendar for the day.";
  } else {
    message = "I'm sorry; I'm not sure which button you clicked.";
  }

  return { text: message };
}

const ONE_DAY_MILLIS = 24 * 60 * 60 * 1000;

/**
 * Turns on the user's vacation response for today in Gmail.
 *
 * @param reason the reason for vacation, either REASON_SICK or REASON_OTHER
 */
function turnOnAutoResponder(reason) {
  const currentTime = new Date().getTime();

  Gmail.Users.Settings.updateVacation(
    {
      enableAutoReply: true,
      responseSubject: reason,
      responseBodyHtml:
        "I'm out of the office today; will be back on the next business day.<br><br><i>Created by Attendance Chat app!</i>",
      restrictToContacts: true,
      restrictToDomain: true,
      startTime: currentTime,
      endTime: currentTime + ONE_DAY_MILLIS,
    },
    "me",
  );
}

/**
 * Places an all-day meeting on the user's Calendar.
 *
 * @param reason the reason for vacation, either REASON_SICK or REASON_OTHER
 */
function blockOutCalendar(reason) {
  CalendarApp.createAllDayEvent(
    reason,
    new Date(),
    new Date(Date.now() + ONE_DAY_MILLIS),
  );
}
