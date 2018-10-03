/**
 * Whenever a cell is edited and it's value is a string, add a note to the cell
 * with the English translation of the cell's content.
 *
 * For example, type "la gato" into a cell and this script will add a note
 * with the text "the cat".
 *
 * This script must be attached to the spreadsheet (created in Google Sheets
 * under "Tools > Script editor").
 */
function onEdit() {
  var range = SpreadsheetApp.getActiveRange();
  var value = range.getValue();
  if (typeof value === 'string') {
    var translated = LanguageApp.translate(value, null, 'en');
    range.setNote(translated);
  }
}
