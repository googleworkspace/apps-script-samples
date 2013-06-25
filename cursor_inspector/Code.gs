/**
 * Runs when the document is opened.
 */
function onOpen() {
  DocumentApp.getUi().createMenu('Inspector')
    .addItem('Show sidebar', 'showSidebar')
    .addToUi();
}

/**
 * Show the sidebar.
 */
function showSidebar() {
  DocumentApp.getUi().showSidebar(
    HtmlService.createTemplateFromFile('Sidebar').evaluate()
      .setSandboxMode(HtmlService.SandboxMode.NATIVE)
      .setTitle('Cursor Inspector')
      .setWidth(350));
}

/**
 * Returns the contents of an HTML file.
 * @param {string} file The name of the file to retrieve.
 * @return {string} The content of the file.
 */
function include(file) {
  return HtmlService.createTemplateFromFile(file).evaluate().getContent();
}

/**
 * Gets the current cursor and selector information for the document.
 * @return {Object} The infomration.
 */
function getDocumentInfo() {
  var document = DocumentApp.getActiveDocument();
  var cursor = document.getCursor();
  var selection = document.getSelection();
  var result = {};
  if (cursor) {
    result.cursor = {
      element: getElementInfo(cursor.getElement()),
      offset: cursor.getOffset(),
      surroundingText: cursor.getSurroundingText().getText(),
      surroundingTextOffset: cursor.getSurroundingTextOffset()
    };
  }
  if (selection) {
    result.selection = {
      selectedElements: selection.getSelectedElements().map(function(selectedElement) {
        return {
          element: getElementInfo(selectedElement.getElement()),
          partial: selectedElement.isPartial(),
          startOffset: selectedElement.getStartOffset(),
          endOffsetInclusive: selectedElement.getEndOffsetInclusive()
        }
      })
    }
  }
  return result;
}

/**
 * Gets information about a given element.
 * @param {Element} element The element.
 * @return {Object} The information.
 */
function getElementInfo(element) {
  return {
    type: String(element.getType()),
  };
}
