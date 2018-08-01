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
var selection = SlidesApp.getActivePresentation().getSelection();
// [END apps_script_slides_get_selection]

// [START apps_script_slides_get_current_page]
var currentPage = SlidesApp.getActivePresentation().getSelection().getCurrentPage();
// [END apps_script_slides_get_current_page]

// [START apps_script_slides_selection_type]
var selection = SlidesApp.getActivePresentation().getSelection();
var selectionType = selection.getSelectionType();
var currentPage;
switch (selectionType) {
  case SlidesApp.SelectionType.NONE:
    Logger.log('Nothing selected');
    break;
  case SlidesApp.SelectionType.CURRENT_PAGE:
    currentPage = selection.getCurrentPage();
    Logger.log('Selection is a page with ID: ' + currentPage.getObjectId());
    break;
  case SlidesApp.SelectionType.PAGE_ELEMENT:
    var pageElements = selection.getPageElementRange().getPageElements();
    Logger.log('There are ' + pageElements.length + ' page elements selected.');
    break;
  case SlidesApp.SelectionType.TEXT:
    var tableCellRange = selection.getTableCellRange();
    if (tableCellRange != null) {
      var tableCell = tableCellRange.getTableCells()[0];
      Logger.log('Selected text is in a table at row ' +
                 tableCell.getRowIndex() + ', column ' +
                 tableCell.getColumnIndex());
    }
    var textRange = selection.getTextRange();
    if (textRange.getStartIndex() == textRange.getEndIndex()) {
      Logger.log('Text cursor position: ' + textRange.getStartIndex());
    } else {
      Logger.log('Selection is a text range from: ' + textRange.getStartIndex() + ' to: ' +
                 textRange.getEndIndex() + ' is selected');
    }
    break;
  case SlidesApp.SelectionType.TABLE_CELL:
    var tableCells = selection.getTableCellRange().getTableCells();
    var table = tableCells[0].getParentTable();
    Logger.log('There are ' + tableCells.length + ' table cells selected.');
    break;
  case SlidesApp.SelectionType.PAGE:
    var pages = selection.getPageRange().getPages();
    Logger.log('There are ' + pages.length + ' pages selected.');
    break;
  default:
    break;
}
// [END apps_script_slides_selection_type]

// [START apps_script_slides_select]
// Select the first slide as the current page selection and remove any previous selection.
var selection = SlidesApp.getActivePresentation().getSelection();
var slide = SlidesApp.getActivePresentation().getSlides()[0];
slide.selectAsCurrentPage();
// State of selection
//
// selection.getSelectionType() = SlidesApp.SelectionType.CURRENT_PAGE
// selection.getCurrentPage() = slide
//
// [END apps_script_slides_select]

// [START apps_script_slides_select_page_element]
var slide = SlidesApp.getActivePresentation().getSlides()[0];
var pageElement = slide.getPageElements()[0];
// Only select this page element and remove any previous selection.
pageElement.select();
// State of selection
//
// selection.getSelectionType() = SlidesApp.SelectionType.PAGE_ELEMENT
// selection.getCurrentPage() = slide
// selection.getPageElementRange().getPageElements()[0] = pageElement
//
// [END apps_script_slides_select_page_element]

// [START apps_script_slides_select_multiple_page_elements]
var slide = SlidesApp.getActivePresentation().getSlides()[0];
// First select the slide page, as the current page selection.
slide.selectAsCurrentPage();
// Then select all the page elements in the selected slide page.
var pageElements = slide.getPageElements();
for (var i = 0; i < pageElements.length; i++) {
   pageElements[i].select(false);
}
// State of selection
//
// selection.getSelectionType() = SlidesApp.SelectionType.PAGE_ELEMENT
// selection.getCurrentPage() = slide
// selection.getPageElementRange().getPageElements() = pageElements
//
// [END apps_script_slides_select_multiple_page_elements]

// [START apps_script_slides_transform_selection]
var slide = SlidesApp.getActivePresentation().getSlides()[0];
var shape1 = slide.getPageElements()[0].asShape();
var shape2 = slide.getPageElements()[1].asShape();
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

// [START apps_script_slides_range_selection]
var slide = SlidesApp.getActivePresentation().getSlides()[0];
var shape = slide.getPageElements()[0].asShape();
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
// [END apps_script_slides_range_selection]

// [START apps_script_slides_cursor_selection]
var slide = SlidesApp.getActivePresentation().getSlides()[0];
var shape = slide.getPageElements()[0].asShape();
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
// [END apps_script_slides_cursor_selection]

// [START apps_script_slides_range_selection]
var slide = SlidesApp.getActivePresentation().getSlides()[0];
var table = slide.getPageElements()[0].asTable();
var tableCell = table.getCell(0, 1);
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
// [END apps_script_slides_range_selection]

// [START apps_script_slides_cursor_selection]
var slide = SlidesApp.getActivePresentation().getSlides()[0];
var table = slide.getPageElements()[0].asTable();
var tableCell = table.getCell(0, 1);
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
// [END apps_script_slides_cursor_selection]

// [START apps_script_slides_selection_transformation]
var slide = SlidesApp.getActivePresentation().getSlides()[0];
var shape = slide.getPageElements()[0].asShape();
var textRange = shape.getText();
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

// [START apps_script_slides_unselecting]
// Unselect one or more page elements already selected.
//
// In case one or more page elements in the first slide are selected, setting the
// same (or any other) slide page as the current page would do the unselect.
//
var slide = SlidesApp.getActivePresentation().getSlides()[0];
slide.selectAsCurrentPage();
// [END apps_script_slides_unselecting]

// [START apps_script_slides_selecting]
// Unselect one or more page elements already selected.
//
// In case one or more page elements in the first slide are selected,
// selecting any pageElement in the first slide (or any other pageElement) would
// do the unselect and select that pageElement.
//
var slide = SlidesApp.getActivePresentation().getSlides()[0];
slide.getPageElements()[0].select();
// [END apps_script_slides_selecting]
