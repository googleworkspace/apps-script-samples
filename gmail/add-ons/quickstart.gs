var MAX_THREADS = 5;

/**
 * Returns the array of cards that should be rendered for the current
 * e-mail thread. The name of this function is specified in the
 * manifest 'onTriggerFunction' field, indicating that this function
 * runs every time the add-on is started.
 *
 * @param {Object} e data provided by the Gmail UI.
 * @return {Card[]}
 */
function buildAddOn(e) {
  // Activate temporary Gmail add-on scopes.
  var accessToken = e.messageMetadata.accessToken;
  GmailApp.setCurrentMessageAccessToken(accessToken);

  var messageId = e.messageMetadata.messageId;
  var senderData = extractSenderData(messageId);
  var cards = [];

  // Build a card for each recent thread from this email's sender.
  if (senderData.recents.length > 0) {
    senderData.recents.forEach(function(threadData) {
      cards.push(buildRecentThreadCard(senderData.email, threadData));
    });
  } else {
    // Present a blank card if there are no recent threads from
    // this sender.
    cards.push(CardService.newCardBuilder()
      .setHeader(CardService.newCardHeader()
        .setTitle('No recent threads from this sender')).build());
  }
  return cards;
}

/**
 *  This function builds a set of data about this sender's presence in your
 *  inbox.
 *
 *  @param {String} messageId The message ID of the open message.
 *  @return {Object} a collection of sender information to display in cards.
 */
function extractSenderData(messageId) {
  // Use the Gmail service to access information about this message.
  var mail = GmailApp.getMessageById(messageId);
  var threadId = mail.getThread().getId();
  var senderEmail = extractEmailAddress(mail.getFrom());

  var recentThreads = GmailApp.search('from:' + senderEmail);
  var recents = [];

  // Retrieve information about up to 5 recent threads from the same sender.
  recentThreads.slice(0, MAX_THREADS).forEach(function(thread) {
    if (thread.getId() != threadId && ! thread.isInChats()) {
      recents.push({
        'subject': thread.getFirstMessageSubject(),
        'count': thread.getMessageCount(),
        'link': 'https://mail.google.com/mail/u/0/#inbox/' + thread.getId(),
        'lastDate': thread.getLastMessageDate().toDateString()
      });
    }
  });

  var senderData = {
    email: senderEmail,
    recents: recents
  };

  return senderData;
}

/**
 *  Given the result of GmailMessage.getFrom(), extract only the email address.
 *  getFrom() can return just the email address or a string in the form
 *  "Name <myemail@domain>".
 *
 *  @param {String} sender The results returned from getFrom().
 *  @return {String} Only the email address.
 */
function extractEmailAddress(sender) {
  var regex = /\<([^\@]+\@[^\>]+)\>/;
  var email = sender; // Default to using the whole string.
  var match = regex.exec(sender);
  if (match) {
    email = match[1];
  }
  return email;
}

/**
 *  Builds a card to display information about a recent thread from this sender.
 *
 *  @param {String} senderEmail The sender email.
 *  @param {Object} threadData Infomation about the thread to display.
 *  @return {Card} a card that displays thread information.
 */
function buildRecentThreadCard(senderEmail, threadData) {
  var card = CardService.newCardBuilder();
  card.setHeader(CardService.newCardHeader().setTitle(threadData.subject));
  var section = CardService.newCardSection()
    .setHeader('<font color=\"#1257e0\">Recent thread</font>');
  section.addWidget(CardService.newTextParagraph().setText(threadData.subject));
  section.addWidget(CardService.newKeyValue()
    .setTopLabel('Sender')
    .setContent(senderEmail));
  section.addWidget(CardService.newKeyValue()
    .setTopLabel('Number of messages')
    .setContent(threadData.count.toString()));
  section.addWidget(CardService.newKeyValue()
    .setTopLabel('Last updated')
    .setContent(threadData.lastDate.toString()));

  var threadLink = CardService.newOpenLink()
    .setUrl(threadData.link)
    .setOpenAs(CardService.OpenAs.FULL_SIZE);
  var button = CardService.newTextButton()
    .setText('Open Thread')
    .setOpenLink(threadLink);
  section.addWidget(CardService.newButtonSet().addButton(button));

  card.addSection(section);
  return card.build();
}
