// [START getSelection]
var selection = SlidesApp.getActivePresentation().getSelection();
// [END getSelection]

// [START getCurrentPage]
var currentPage = SlidesApp.getActivePresentation().getSelection().getCurrentPage();
// [END getCurrentPage]

// [START selectionType]
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
    Logger.log('There are ' + pages.length +  ' pages selected.');
    break;
  default:
    break;
}
// [END selectionType]

// [START select]
// Select the first slide as the current page selection and remove any previous selection.
var selection = SlidesApp.getActivePresentation().getSelection();
var slide = SlidesApp.getActivePresentation().getSlides()[0];
slide.selectAsCurrentPage();
// State of selection
//
// selection.getSelectionType() = SlidesApp.SelectionType.CURRENT_PAGE
// selection.getCurrentPage() = slide
//
// [END select]

// [START selectPageElement]
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
// [END selectPageElement]

// [START selectMultiplePageElements]
var slide = SlidesApp.getActivePresentation().getSlides()[0];
// First select the slide page, as the current page selection.
slide.selectAsCurrentPage();
// Then select all the page elements in the selected slide page.
var pageElements = slide.getPageElements();
for (var i = 0; i &lt; pageElements.length; i++) {
   pageElements[i].select(false);
}
// State of selection
//
// selection.getSelectionType() = SlidesApp.SelectionType.PAGE_ELEMENT
// selection.getCurrentPage() = slide
// selection.getPageElementRange().getPageElements() = pageElements
//
// [END selectMultiplePageElements]

// [START transformSelection]
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
// [END transformSelection]

// [START rangeSelection]
var slide = SlidesApp.getActivePresentation().getSlides()[0];
var shape = slide.getPageElements()[0].asShape();
shape.getText().setText("Hello");
// Range selection: Select the text range "He".
shape.getText().getRange(0, 2).select();
// State of selection
//
// selection.getSelectionType() = SlidesApp.SelectionType.TEXT
// selection.getCurrentPage() = slide
// selection.getPageElementRange().getPageElements()[0] = shape
// selection.getTextRange().getStartIndex() = 0
// selection.getTextRange().getEndIndex() = 2
//
// [END rangeSelection]

// [START cursorSelection]
var slide = SlidesApp.getActivePresentation().getSlides()[0];
var shape = slide.getPageElements()[0].asShape();
shape.getText().setText("Hello");
// Cursor selection: Place the cursor after "H" like "H|ello".
shape.getText().getRange(1, 1).select();
// State of selection
//
// selection.getSelectionType() = SlidesApp.SelectionType.TEXT
// selection.getCurrentPage() = slide
// selection.getPageElementRange().getPageElements()[0] = shape
// selection.getTextRange().getStartIndex() = 1
// selection.getTextRange().getEndIndex() = 1
//
// [END cursorSelection]

// [START rangeSelectionInTable]
var slide = SlidesApp.getActivePresentation().getSlides()[0];
var table = slide.getPageElements()[0].asTable();
var tableCell = table.getCell(0, 1);
tableCell.getText().setText("Hello");
// Range selection: Select the text range "He".
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
// [END rangeSelectionInTable]

// [START cursorSelectionInTableCell]
var slide = SlidesApp.getActivePresentation().getSlides()[0];
var table = slide.getPageElements()[0].asTable();
var tableCell = table.getCell(0, 1);
tableCell.getText().setText("Hello");
// Cursor selection: Place the cursor after "H" like "H|ello".
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
// [END cursorSelectionInTableCell]

// [START selectionTransformation]
var slide = SlidesApp.getActivePresentation().getSlides()[0];
var shape = slide.getPageElements()[0].asShape();
var textRange = shape.getText();
textRange.setText("World");
// Select all the text "World".
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
// [END selectionTransformation]

// [START unselecting]
// Unselect one or more page elements already selected.
//
// In case one or more page elements in the first slide are selected, setting the
// same (or any other) slide page as the current page would do the unselect.
//
var slide = SlidesApp.getActivePresentation().getSlides()[0];
slide.selectAsCurrentPage();
// [END unselecting]

// [START selecting]
// Unselect one or more page elements already selected.
//
// In case one or more page elements in the first slide are selected,
// selecting any pageElement in the first slide (or any other pageElement) would
// do the unselect and select that pageElement.
//
var slide = SlidesApp.getActivePresentation().getSlides()[0];
slide.getPageElements()[0].select();
// [END selecting]
