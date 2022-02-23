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
// [START apps_script_slides_progress]
/**
 * @OnlyCurrentDoc Adds progress bars to a presentation.
 */
const BAR_ID = 'PROGRESS_BAR_ID';
const BAR_HEIGHT = 10; // px

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
  const presentation = SlidesApp.getActivePresentation();
  const slides = presentation.getSlides();
  for (let i = 0; i < slides.length; ++i) {
    const ratioComplete = (i / (slides.length - 1));
    const x = 0;
    const y = presentation.getPageHeight() - BAR_HEIGHT;
    const barWidth = presentation.getPageWidth() * ratioComplete;
    if (barWidth > 0) {
      const bar = slides[i].insertShape(SlidesApp.ShapeType.RECTANGLE, x, y,
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
  const presentation = SlidesApp.getActivePresentation();
  const slides = presentation.getSlides();
  for (let i = 0; i < slides.length; ++i) {
    const elements = slides[i].getPageElements();
    for (const el of elements) {
      if (el.getPageElementType() === SlidesApp.PageElementType.SHAPE &&
        el.asShape().getLink() &&
        el.asShape().getLink().getUrl() === BAR_ID) {
        el.remove();
      }
    }
  }
}
// [END apps_script_slides_progress]
