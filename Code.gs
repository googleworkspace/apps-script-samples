/**
 * How long to wait for the dialog to check-in before assuming it's been
 * closed, in seconds.
 */
var DIALOG_TIMEOUT_SECONDS = 10;

/**
 * The various states the dialog can be in.
 */
var DialogState = {
  /**
   * The dialog is still open.
   */
  OPEN: 'open',

  /**
   * The dialog has been closed without being completed.
   */
  ABORTED: 'aborted',

  /**
   * The dialog hasn't checked-in in a while, so we assume it's been closed
   * via the "X" at the top of the dialog.
   */
  LOST: 'lost',

  /**
   * The dialog has been completed and closed.
   */
  DONE: 'done'
};

/**
 * The various proprties of a dialog we store.
 */
var DialogProperty = {
  /**
   * The state of the dialog. See DialogState.
   */
  STATE: 'state',

  /**
   * The timestamp of the last time the dialog checked-in.
   */
  LAST_CHECK_IN: 'lastCheckIn'
};

/**
 * Runs when the document opens, populating the menu.
 */
function onOpen() {
  DocumentApp.getUi().createMenu('Sidebar')
      .addItem('Show', 'showSidebar')
      .addToUi();
}

/**
 * Shows the sidebar in the document.
 */
function showSidebar() {
  var page = HtmlService.createHtmlOutputFromFile('Sidebar')
      .setTitle('Sidebar')
      .setSandboxMode(HtmlService.SandboxMode.NATIVE);
  DocumentApp.getUi().showSidebar(page);
}

/**
 * Shows the dialog in the document.
 */
function showDialog() {
  var dialogId = Utilities.base64Encode(Math.random());
  var template = HtmlService.createTemplateFromFile('Dialog');
  template.dialogId = dialogId;
  var page = template.evaluate()
      .setTitle('Dialog')
      .setSandboxMode(HtmlService.SandboxMode.NATIVE);
  DocumentApp.getUi().showDialog(page);
  checkIn(dialogId);
  return dialogId;
}

/**
 * Records the last time a dialog checked-in with the server. The dialog should
 * call this function periodically (every few seconds).
 * @param {string} dialogId The ID of the dialog.
 */
function checkIn(dialogId) {
  var key = getCacheKey_(dialogId, DialogProperty.LAST_CHECK_IN);
  var timestamp = new Date().getTime();
  CacheService.getPrivateCache().put(key, timestamp);
}

/**
 * Sets the state of a dialog. The dialog should call this function before
 * it closes itself.
 * @param {string} dialogId The ID of the dialog.
 * @param {string} state The state of the dialog.
 */
function setDialogState(dialogId, state) {
  validateDialogState_(state);
  var key = getCacheKey_(dialogId, DialogProperty.STATE);
  CacheService.getPrivateCache().put(key, state);
}

/**
 * Gets the state of a dialog. The sidebar should call this function periodically
 * to determine when the dialog is closed.
 * @param {string} dialogId The ID of the dialog.
 * @return {string} The state of the dialog.
 */
function getDialogState(dialogId) {
  var key = getCacheKey_(dialogId, DialogProperty.STATE);
  var status = CacheService.getPrivateCache().get(key);
  if (status != null) {
    return status;
  } else {
    var lastCheckInKey = getCacheKey_(dialogId, DialogProperty.LAST_CHECK_IN);
    var lastCheckIn = parseInt(CacheService.getPrivateCache().get(lastCheckInKey));
    var now = new Date().getTime();
    if (now - lastCheckIn > DIALOG_TIMEOUT_SECONDS * 1000) {
      return DialogState.LOST;
    } else {
      return DialogState.OPEN;
    }
  }
}

/**
 * Validates that a given dialog state is valid, and throws an exception if it isn't.
 * @param {string} state The dialog state to validate.
 * @private
 */
function validateDialogState_(state) {
  var validStates = Object.keys(DialogState).map(function(key) {
    return DialogState[key];
  });
  if (validStates.indexOf(state) == -1) {
    throw 'Invalid dialog state: ' + state;
  }
}

/**
 * Gets the cache key for a given property of a dialog.
 * @param {string} dialogId The ID of the dialog.
 * @param {stirng} property The property of the dialog.
 * @return {stirng} The cache key.
 */
function getCacheKey_(dialogId, property) {
  return dialogId + '-' + property;
}
