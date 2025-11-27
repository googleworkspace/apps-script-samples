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
 * @OnlyCurrentDoc Limits the script to only accessing the current presentation.
 */

/**
 * Create a open translate menu item.
 * @param {object} event The open event.
 */
function onOpen(event) {
  SlidesApp.getUi()
    .createAddonMenu()
    .addItem("Open Translate", "showSidebar")
    .addToUi();
}

/**
 * Open the Add-on upon install.
 * @param {object} event The install event.
 */
function onInstall(event) {
  onOpen(event);
}

/**
 * Opens a sidebar in the document containing the add-on's user interface.
 */
function showSidebar() {
  const ui =
    HtmlService.createHtmlOutputFromFile("sidebarEnhanced").setTitle(
      "Translate",
    );
  SlidesApp.getUi().showSidebar(ui);
}

/**
 * Recursively gets child text elements a list of elements.
 * @param {GoogleAppsScript.Slides.PageElement[]} elements The elements to get text from.
 * @return {GoogleAppsScript.Slides.TextRange[]} An array of text elements.
 */
function getElementTexts(elements) {
  /** @type {GoogleAppsScript.Slides.TextRange[]} */
  let texts = [];
  for (const element of elements) {
    switch (element.getPageElementType()) {
      case SlidesApp.PageElementType.GROUP:
        for (const child of element.asGroup().getChildren()) {
          texts = texts.concat(getElementTexts([child]));
        }
        break;
      case SlidesApp.PageElementType.TABLE: {
        const table = element.asTable();
        for (let r = 0; r < table.getNumRows(); ++r) {
          for (let c = 0; c < table.getNumColumns(); ++c) {
            texts.push(table.getCell(r, c).getText());
          }
        }
        break;
      }
      case SlidesApp.PageElementType.SHAPE: {
        const shape = element.asShape();
        // Only process shapes that have text
        if (shape.getText) {
          try {
            const text = shape.getText();
            if (text.asRenderedString().trim().length > 0) {
              texts.push(text);
            }
          } catch (e) {
            // Skip shapes that don't support text (images, etc.)
          }
        }
        break;
      }
    }
  }
  return texts;
}

/**
 * Translates selected slide elements to the target language using Apps Script's Language service.
 *
 * @param {string} sourceLanguage The two-letter short form for the source language. (ISO 639-1)
 * @param {string} targetLanguage The two-letter short form for the target language. (ISO 639-1)
 * @return {number} The number of elements translated.
 */
function translateSelectedElements(sourceLanguage, targetLanguage) {
  // Get selected elements.
  const selection = SlidesApp.getActivePresentation().getSelection();
  const selectionType = selection.getSelectionType();
  /** @type {GoogleAppsScript.Slides.TextRange[]} */
  let texts = [];
  switch (selectionType) {
    case SlidesApp.SelectionType.PAGE:
      for (const page of selection.getPageRange().getPages()) {
        texts = texts.concat(getElementTexts(page.getPageElements()));
      }
      break;
    case SlidesApp.SelectionType.PAGE_ELEMENT: {
      const pageElements = selection.getPageElementRange().getPageElements();
      texts = texts.concat(getElementTexts(pageElements));
      break;
    }
    case SlidesApp.SelectionType.TABLE_CELL:
      for (const cell of selection.getTableCellRange().getTableCells()) {
        texts.push(cell.getText());
      }
      break;
    case SlidesApp.SelectionType.TEXT:
      for (const element of selection.getPageElementRange().getPageElements()) {
        if (element.getPageElementType() === SlidesApp.PageElementType.SHAPE) {
          texts.push(element.asShape().getText());
        }
      }
      break;
  }

  // Translate all elements in-place.
  for (const text of texts) {
    text.setText(
      LanguageApp.translate(
        text.asRenderedString(),
        sourceLanguage,
        targetLanguage,
      ),
    );
  }

  return texts.length;
}

/**
 * Translates all text elements in all slides of the active presentation.
 *
 * @param {string} sourceLanguage The two-letter short form for the source language. (ISO 639-1) Use empty string for auto-detect.
 * @param {string} targetLanguage The two-letter short form for the target language. (ISO 639-1)
 * @return {number} The number of elements translated.
 */
function translateAllSlides(sourceLanguage, targetLanguage) {
  // Get the active presentation and all slides
  const presentation = SlidesApp.getActivePresentation();
  const slides = presentation.getSlides();

  let totalTranslated = 0;

  // Loop through each slide
  for (const slide of slides) {
    // Get all text-containing elements from the slide
    const texts = getElementTexts(slide.getPageElements());

    // Translate all text elements in-place
    for (const text of texts) {
      const originalText = text.asRenderedString();
      if (originalText.trim().length > 0) {
        const translatedText = LanguageApp.translate(
          originalText,
          sourceLanguage,
          targetLanguage,
        );
        text.setText(translatedText);
        totalTranslated++;
      }
    }
  }

  return totalTranslated;
}
