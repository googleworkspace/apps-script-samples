/**
 * Copyright Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// [START apps_script_slides_get_selection]
const selection = SlidesApp.getActivePresentation().getSelection();
// [END apps_script_slides_get_selection]

// [START apps_script_slides_get_current_page]
const currentPage = SlidesApp.getActivePresentation().getSelection().getCurrentPage();
// [END apps_script_slides_get_current_page]

/**
 * Selection type to read the current selection in a type-appropriate way.
 */
function slidesSelectionTypes() {
  // [START apps_script_slides_selection_type]
  const selection = SlidesApp.getActivePresentation().getSelection();
  const selectionType = selection.getSelectionType();
  let currentPage;
  switch (selectionType) {
    case SlidesApp.SelectionType.NONE:
      console.log('Nothing selected');
      break;
    case SlidesApp.SelectionType.CURRENT_PAGE:
      currentPage = selection.getCurrentPage();
      console.log('Selection is a page with ID: ' + currentPage.getObjectId());
      break;
    case SlidesApp.SelectionType.PAGE_ELEMENT:
      const pageElements = selection.getPageElementRange().getPageElements();
      console.log('There are ' + pageElements.length + ' page elements selected.');
      break;
    case SlidesApp.SelectionType.TEXT:
      const tableCellRange = selection.getTableCellRange();
      if (tableCellRange !== null) {
        const tableCell = tableCellRange.getTableCells()[0];
        console.log('Selected text is in a table at row ' +
          tableCell.getRowIndex() + ', column ' +
          tableCell.getColumnIndex());
      }
      const textRange = selection.getTextRange();
      if (textRange.getStartIndex() === textRange.getEndIndex()) {
        console.log('Text cursor position: ' + textRange.getStartIndex());
      } else {
        console.log('Selection is a text range from: ' + textRange.getStartIndex() + ' to: ' +
          textRange.getEndIndex() + ' is selected');
      }
      break;
    case SlidesApp.SelectionType.TABLE_CELL:
      const tableCells = selection.getTableCellRange().getTableCells();
      const table = tableCells[0].getParentTable();
      console.log('There are ' + tableCells.length + ' table cells selected.');
      break;
    case SlidesApp.SelectionType.PAGE:
      const pages = selection.getPageRange().getPages();
      console.log('There are ' + pages.length + ' pages selected.');
      break;
    default:
      break;
  }
// [END apps_script_slides_selection_type]
}
/**
 * Selecting the current page
 */
function slideSelect() {
// [START apps_script_slides_select]
// Select the first slide as the current page selection and remove any previous selection.
  const selection = SlidesApp.getActivePresentation().getSelection();
  const slide = SlidesApp.getActivePresentation().getSlides()[0];
  slide.selectAsCurrentPage();
// State of selection
//
// selection.getSelectionType() = SlidesApp.SelectionType.CURRENT_PAGE
// selection.getCurrentPage() = slide
//
// [END apps_script_slides_select]
}
/**
 * Selecting a page element.
 */
function selectPageElement() {
// [START apps_script_slides_select_page_element]
  const slide = SlidesApp.getActivePresentation().getSlides()[0];
  const pageElement = slide.getPageElements()[0];
  // Only select this page element and remove any previous selection.
  pageElement.select();
// State of selection
//
// selection.getSelectionType() = SlidesApp.SelectionType.PAGE_ELEMENT
// selection.getCurrentPage() = slide
// selection.getPageElementRange().getPageElements()[0] = pageElement
//
// [END apps_script_slides_select_page_element]
}
/**
 * Selecting multiple page elements
 */
function selectMultiplePageElement() {
// [START apps_script_slides_select_multiple_page_elements]
  const slide = SlidesApp.getActivePresentation().getSlides()[0];
  // First select the slide page, as the current page selection.
  slide.selectAsCurrentPage();
  // Then select all the page elements in the selected slide page.
  const pageElements = slide.getPageElements();
  for (let i = 0; i < pageElements.length; i++) {
    pageElements[i].select(false);
  }
// State of selection
//
// selection.getSelectionType() = SlidesApp.SelectionType.PAGE_ELEMENT
// selection.getCurrentPage() = slide
// selection.getPageElementRange().getPageElements() = pageElements
//
// [END apps_script_slides_select_multiple_page_elements]
}
/**
 *This shows how selection can be transformed by manipulating
 * selected page elements.
 */
function slideTransformSelection() {
// [START apps_script_slides_transform_selection]
  const slide = SlidesApp.getActivePresentation().getSlides()[0];
  const shape1 = slide.getPageElements()[0].asShape();
  const shape2 = slide.getPageElements()[1].asShape();
  // Select both the shapes.
  shape1.select();
  shape2.select(false);
  // State of selection
  //
  // selection.getSelectionType() = SlidesApp.SelectionType.PAGE_ELEMENT
  // selection.getCurrentPage() = slide
  // selection.getPageElementRange().getPageElements() = [shape1, shape2]
  //
  // Remove one shape.
  shape2.remove();
// State of selection
//
// selection.getSelectionType() = SlidesApp.SelectionType.PAGE_ELEMENT
// selection.getCurrentPage() = slide
// selection.getPageElementRange().getPageElements() = [shape1]
//
// [END apps_script_slides_transform_selection]
}
/**
 * Range selection within text contained in a shape.
 */
function slidesRangeSelection() {
// [START apps_script_slides_range_selection_in_shape]
  const slide = SlidesApp.getActivePresentation().getSlides()[0];
  const shape = slide.getPageElements()[0].asShape();
  shape.getText().setText('Hello');
  // Range selection: Select the text range 'He'.
  shape.getText().getRange(0, 2).select();
// State of selection
//
// selection.getSelectionType() = SlidesApp.SelectionType.TEXT
// selection.getCurrentPage() = slide
// selection.getPageElementRange().getPageElements()[0] = shape
// selection.getTextRange().getStartIndex() = 0
// selection.getTextRange().getEndIndex() = 2
//
// [END apps_script_slides_range_selection_in_shape]
}
/**
 * Cursor selection within text contained in a shape.
 */
function slidesCursorSelection() {
// [START apps_script_slides_cursor_selection_in_shape]
  const slide = SlidesApp.getActivePresentation().getSlides()[0];
  const shape = slide.getPageElements()[0].asShape();
  shape.getText().setText('Hello');
  // Cursor selection: Place the cursor after 'H' like 'H|ello'.
  shape.getText().getRange(1, 1).select();
// State of selection
//
// selection.getSelectionType() = SlidesApp.SelectionType.TEXT
// selection.getCurrentPage() = slide
// selection.getPageElementRange().getPageElements()[0] = shape
// selection.getTextRange().getStartIndex() = 1
// selection.getTextRange().getEndIndex() = 1
//
// [END apps_script_slides_cursor_selection_in_shape]
}
/**
 * Range selection in table cell.
 */
function slideRangeSelection() {
// [START apps_script_slides_range_selection_in_table]
  const slide = SlidesApp.getActivePresentation().getSlides()[0];
  const table = slide.getPageElements()[0].asTable();
  const tableCell = table.getCell(0, 1);
  tableCell.getText().setText('Hello');
  // Range selection: Select the text range 'He'.
  tableCell.getText().getRange(0, 2).select();
// State of selection
//
// selection.getSelectionType() = SlidesApp.SelectionType.TEXT
// selection.getCurrentPage() = slide
// selection.getPageElementRange().getPageElements()[0] = table
// selection.getTableCellRange().getTableCells()[0] = tableCell
// selection.getTextRange().getStartIndex() = 0
// selection.getTextRange().getEndIndex() = 2
//
// [END apps_script_slides_range_selection_in_table]
}
/**
 * Cursor selection in table cell.
 */
function cursorSelection() {
// [START apps_script_slides_cursor_selection_in_table]
  const slide = SlidesApp.getActivePresentation().getSlides()[0];
  const table = slide.getPageElements()[0].asTable();
  const tableCell = table.getCell(0, 1);
  tableCell.getText().setText('Hello');
  // Cursor selection: Place the cursor after 'H' like 'H|ello'.
  tableCell.getText().getRange(1, 1).select();
// State of selection
//
// selection.getSelectionType() = SlidesApp.SelectionType.TEXT
// selection.getCurrentPage() = slide
// selection.getPageElementRange().getPageElements()[0] = table
// selection.getTableCellRange().getTableCells()[0] = tableCell
// selection.getTextRange().getStartIndex() = 1
// selection.getTextRange().getEndIndex() = 1
//
// [END apps_script_slides_cursor_selection_in_table]
}
/**
 * This shows how the selection can be transformed by editing the selected text.
 */
function selectTransformation() {
// [START apps_script_slides_selection_transformation]
  const slide = SlidesApp.getActivePresentation().getSlides()[0];
  const shape = slide.getPageElements()[0].asShape();
  const textRange = shape.getText();
  textRange.setText('World');
  // Select all the text 'World'.
  textRange.select();
  // State of selection
  //
  // selection.getSelectionType() = SlidesApp.SelectionType.TEXT
  // selection.getCurrentPage() = slide
  // selection.getPageElementRange().getPageElements()[0] = shape
  // selection.getTextRange().getStartIndex() = 0
  // selection.getTextRange().getEndIndex() = 6
  //
  // Add some text to the shape, and the selection will be transformed.
  textRange.insertText(0, 'Hello ');

// State of selection
//
// selection.getSelectionType() = SlidesApp.SelectionType.TEXT
// selection.getCurrentPage() = slide
// selection.getPageElementRange().getPageElements()[0] = shape
// selection.getTextRange().getStartIndex() = 0
// selection.getTextRange().getEndIndex() = 12
//
// [END apps_script_slides_selection_transformation]
}
/**
 * The following example shows how to unselect any current selections on a page
 * by setting that page as the current page.
 */
function slidesUnselectingCurrentPage() {
// [START apps_script_slides_unselecting]
// Unselect one or more page elements already selected.
//
// In case one or more page elements in the first slide are selected, setting the
// same (or any other) slide page as the current page would do the unselect.
//
  const slide = SlidesApp.getActivePresentation().getSlides()[0];
  slide.selectAsCurrentPage();
// [END apps_script_slides_unselecting]
}
/**
 * The following example shows how to unselect any current selections on a page
 * by selecting one page element, thus removing all other items from the selection.
 */
function slideUnselectingPageElements() {
// [START apps_script_slides_selecting]
// Unselect one or more page elements already selected.
//
// In case one or more page elements in the first slide are selected,
// selecting any pageElement in the first slide (or any other pageElement) would
// do the unselect and select that pageElement.
//
  const slide = SlidesApp.getActivePresentation().getSlides()[0];
  slide.getPageElements()[0].select();
// [END apps_script_slides_selecting]
}
