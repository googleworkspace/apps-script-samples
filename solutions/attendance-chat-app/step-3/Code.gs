/**
 * Responds to an ADDED_TO_SPACE event
 * in Google Chat.
 *
 * @param event the event object from Google Chat
 * @return JSON-formatted response
 */
function onAddToSpace(event) {
  console.info(event);

  var message = "";

  if (event.space.type === "DM") {
    message =
      "Thank you for adding me to a DM, " + event.user.displayName + "!";
  } else {
    message = "Thank you for adding me to " + event.space.displayName;
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
