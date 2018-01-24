/**
 * @OnlyCurrentDoc Adds progress bars to a presentation.
 */
var BAR_ID = 'PROGRESS_BAR_ID';
var BAR_HEIGHT = 10; // px
var presentation = SlidesApp.getActivePresentation();

/**
 * Runs when the add-on is installed.
 * @param {object} e The event parameter for a simple onInstall trigger. To
 *     determine which authorization mode (ScriptApp.AuthMode) the trigger is
 *     running in, inspect e.authMode. (In practice, onInstall triggers always
 *     run in AuthMode.FULL, but onOpen triggers may be AuthMode.LIMITED or
 *     AuthMode.NONE.)
 */
function onInstall(e) {
  onOpen();
}

/**
 * Trigger for opening a presentation.
 * @param {object} e The onOpen event.
 */
function onOpen(e) {
  SlidesApp.getUi().createAddonMenu()
      .addItem('Show progress bar', 'createBars')
      .addItem('Hide progress bar', 'deleteBars')
      .addToUi();
}

/**
 * Create a rectangle on every slide with different bar widths.
 */
function createBars() {
  deleteBars(); // Delete any existing progress bars
  var slides = presentation.getSlides();
  for (var i = 0; i < slides.length; ++i) {
    var ratioComplete = (i / (slides.length - 1));
    var x = 0;
    var y = presentation.getPageHeight() - BAR_HEIGHT;
    var barWidth = presentation.getPageWidth() * ratioComplete;
    if (barWidth > 0) {
      var bar = slides[i].insertShape(SlidesApp.ShapeType.RECTANGLE, x, y,
                                      barWidth, BAR_HEIGHT);
      bar.getBorder().setTransparent();
      bar.setLinkUrl(BAR_ID);
    }
  }
}

/**
 * Deletes all progress bar rectangles.
 */
function deleteBars() {
  var slides = presentation.getSlides();
  for (var i = 0; i < slides.length; ++i) {
    var elements = slides[i].getPageElements();
    for (var j = 0; j < elements.length; ++j) {
      var el = elements[j];
      if (el.getPageElementType() === SlidesApp.PageElementType.SHAPE &&
          el.asShape().getLink() &&
          el.asShape().getLink().getUrl() === BAR_ID) {
        el.remove();
      }
    }
  }
}

