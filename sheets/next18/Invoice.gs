/**
 * Copyright Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


/**
 * Generates invoices based on the selected rows in the spreadsheet. Assumes
 * that the Salesforce accountId is in the first selected column and the
 * amount owed is the 4th selected column.
 */
function generateInvoices() {
  var range = SpreadsheetApp.getActiveRange();
  var values = range.getDisplayValues();
  var sheet = SpreadsheetApp.getActiveSheet();

  for (var i = 0; i < values.length; i++) {
    var row = values[i];
    var accountId = row[0];
    var amount = row[3];
    var invoiceUrl = generateInvoice(accountId, amount);
    sheet.getRange(range.getRow() + i, range.getLastColumn() + 1)
        .setValue(invoiceUrl);
  }
}

/**
 * Generates a single invoice in Google Docs for a given Salesforce account and
 * an owed amount.
 *
 * @param {string} accountId The Salesforce account Id to invoice
 * @param {string} amount The owed amount to invoice
 * @return {string} the url of the created invoice
 */
function generateInvoice(accountId, amount) {
  var folder = DriveApp.getFolderById(INVOICES_FOLDER);
  var copied = DriveApp.getFileById(INVOICE_TEMPLATE)
      .makeCopy('Invoice for ' + accountId, folder);
  var invoice = DocumentApp.openById(copied.getId());
  var results = fetchSoqlResults(
      'select Name, BillingAddress from Account where Id = \'' +
      accountId + '\'');
  var account = results['records'][0];

  invoice.getBody().replaceText(
      '{{account name}}', account['Name']);
  invoice.getBody().replaceText(
      '{{account address}}', account['BillingAddress']['street']);
  invoice.getBody().replaceText(
      '{{date}}', Utilities.formatDate(new Date(), 'GMT', 'yyyy-MM-dd'));
  invoice.getBody().replaceText('{{amount}}', amount);
  invoice.saveAndClose();
  return invoice.getUrl();
}

/**
 * Generates a report in Google Slides with a chart generated from the sheet.
 */
function generateReport() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var chart = sheet.newChart()
    .asColumnChart()
    .addRange(sheet.getRange('A:A'))
    .addRange(sheet.getRange('C:D'))
    .setNumHeaders(1)
    .setMergeStrategy(Charts.ChartMergeStrategy.MERGE_COLUMNS)
    .setOption('useFirstColumnAsDomain', true)
    .setOption('isStacked', 'absolute')
    .setOption('title', 'Expected Payments')
    .setOption('treatLabelsAsText', false)
    .setXAxisTitle('AccountId')
    .setPosition(3, 1, 114, 138)
    .build();

  sheet.insertChart(chart);

  // Force the chart to be created before adding it to the presentation
  SpreadsheetApp.flush();

  var preso = SlidesApp.create('Invoicing Report');
  var titleSlide = preso.getSlides()[0];

  var titleShape = titleSlide.getPlaceholder(
      SlidesApp.PlaceholderType.CENTERED_TITLE).asShape();
  titleShape.getText().setText('Invoicing Report');

  var newSlide = preso.appendSlide(SlidesApp.PredefinedLayout.BLANK);
  newSlide.insertSheetsChart(chart);

  showLinkDialog(preso.getUrl(), 'Open report', 'Report created');
}
