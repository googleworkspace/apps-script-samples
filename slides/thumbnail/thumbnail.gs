/**
 * Saves a thumbnail image of the current Google Slide presentation in Google Drive.
 * Logs the image URL.
 * @param {number} i The zero-based slide index. 0 is the first slide.
 * @example saveThumbnailImage(0)
 */
function saveThumbnailImage(i) {
  var presentation =  SlidesApp.getActivePresentation();
  var thumbnail = Slides.Presentations.Pages.getThumbnail(presentation.getId(),
                                                          presentation.getSlides()[i].getObjectId());
  var response = UrlFetchApp.fetch(thumbnail.contentUrl);
  var image = response.getBlob();
  var file = DriveApp.createFile(image);
  Logger.log(file.getUrl());
}
