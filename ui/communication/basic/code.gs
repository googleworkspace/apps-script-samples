function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index');
}

function doSomething() {
  Logger.log('I was called!');
}