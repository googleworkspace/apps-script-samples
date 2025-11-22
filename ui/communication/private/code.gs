function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index');
}

function getBankBalance() {
  var email = Session.getActiveUser().getEmail()
  return deepSecret_(email);
}

/**
 * @param {string} email The user's email address.
 * @return {string} A string with the user's balance.
 * @private
 */
function deepSecret_(email) {
  // Do some secret calculations
  return email + ' has $1,000,000 in the bank.';
}
