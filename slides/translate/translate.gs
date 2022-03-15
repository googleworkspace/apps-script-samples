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
// [START apps_script_slides_translate_quickstart]
/**
 * @OnlyCurrentDoc Limits the script to only accessing the current presentation.
 */

/**
 * Create a open translate menu item.
 * @param {Event} event The open event.
 */
function onOpen(event) {
  SlidesApp.getUi().createAddonMenu()
      .addItem('Open Translate', 'showSidebar')
      .addToUi();
}

/**
 * Open the Add-on upon install.
 * @param {Event} event The install event.
 */
function onInstall(event) {
  onOpen(event);
}

/**
 * Opens a sidebar in the document containing the add-on's user interface.
 */
function showSidebar() {
  const ui = HtmlService
      .createHtmlOutputFromFile('sidebar')
      .setTitle('Translate');
  SlidesApp.getUi().showSidebar(ui);
}

/**
 * Recursively gets child text elements a list of elements.
 * @param {PageElement[]} elements The elements to get text from.
 * @return {Text[]} An array of text elements.
 */
function getElementTexts(elements) {
  let texts = [];
  elements.forEach((element)=> {
    switch (element.getPageElementType()) {
      case SlidesApp.PageElementType.GROUP:
        element.asGroup().getChildren().forEach((child)=> {
          texts = texts.concat(getElementTexts(child));
        });
        break;
      case SlidesApp.PageElementType.TABLE:
        const table = element.asTable();
        for (let y = 0; y < table.getNumColumns(); ++y) {
          for (let x = 0; x < table.getNumRows(); ++x) {
            texts.push(table.getCell(x, y).getText());
          }
        }
        break;
      case SlidesApp.PageElementType.SHAPE:
        texts.push(element.asShape().getText());
        break;
    }
  });
  return texts;
}

/**
 * Translates selected slide elements to the target language using Apps Script's Language service.
 *
 * @param {string} targetLanguage The two-letter short form for the target language. (ISO 639-1)
 * @return {number} The number of elements translated.
 */
function translateSelectedElements(targetLanguage) {
  // Get selected elements.
  const selection = SlidesApp.getActivePresentation().getSelection();
  const selectionType = selection.getSelectionType();
  let texts = [];
  switch (selectionType) {
    case SlidesApp.SelectionType.PAGE:
      selection.getPageRange().getPages().forEach((page)=> {
        texts = texts.concat(getElementTexts(page.getPageElements()));
      });
      break;
    case SlidesApp.SelectionType.PAGE_ELEMENT:
      const pageElements = selection.getPageElementRange().getPageElements();
      texts = texts.concat(getElementTexts(pageElements));
      break;
    case SlidesApp.SelectionType.TABLE_CELL:
      selection.getTableCellRange().getTableCells().forEach((cell)=> {
        texts.push(cell.getText());
      });
      break;
    case SlidesApp.SelectionType.TEXT:
      selection.getPageElementRange().getPageElements().forEach((element) =>{
        texts.push(element.asShape().getText());
      });
      break;
  }

  // Translate all elements in-place.
  texts.forEach((text)=> {
    text.setText(LanguageApp.translate(text.asRenderedString(), '', targetLanguage));
  });

  return texts.length;
}
// [END apps_script_slides_translate_quickstart]
