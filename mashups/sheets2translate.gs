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
  const range = SpreadsheetApp.getActiveRange();
  const value = range.getValue();
  if (typeof value === 'string') {
    const translated = LanguageApp.translate(value, '', 'en');
    range.setNote(translated);
  }
}
