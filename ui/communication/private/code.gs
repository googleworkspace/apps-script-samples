function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index');
}

function getBankBalance() {
  var email = Session.getActiveUser().getEmail()
  return deepSecret_(email);
}

function deepSecret_(email) {
 // Do some secret calculations
 return email + ' has $1,000,000 in the bank.';
}