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
const helpers = new Helpers();

// Constants
const IMAGE_URL =
    'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png';
const TEMPLATE_PRESENTATION_ID = '1iwq83aR9SIQbqVY-3ozLkJjKhdXErfS_m3zD8VZhtFA';
const DATA_SPREADSHEET_ID = '1Y3GVGdJHDzlyMB9aLDWV2o_e2RstzUHK1iLDaBgbMwc';
const CHART_ID = 1107320627;
const CUSTOMER_NAME = 'Fake Customer';

/**
 * A simple existance assertion. Logs if the value is falsy.
 * @param {object} value The value we expect to exist.
 */
function expectToExist(value) {
  if (!value) {
    console.log('DNE');
  }
}

/**
 * A simple equality assertion. Logs if there is a mismatch.
 * @param {object} expected The expected value.
 * @param {object} actual The actual value.
 */
function expectToEqual(expected, actual) {
  if (actual !== expected) {
    console.log('actual: %s expected: %s', actual, expected);
  }
}

/**
 * Runs all tests.
 */
function RUN_ALL_TESTS() {
  itShouldCreateAPresentation();
  itShouldCopyAPresentation();
  itShouldCreateASlide();
  itShouldCreateATextboxWithText();
  itShouldCreateAnImage();
  itShouldMergeText();
  itShouldImageMerge();
  itShouldSimpleTextReplace();
  itShouldTextStyleUpdate();
  itShouldCreateBulletedText();
  itShouldCreateSheetsChart();
  itShouldRefreshSheetsChart();
}

/**
 * Creates a presentation.
 */
function itShouldCreateAPresentation() {
  console.log('> itShouldCreateAPresentation');
  const presentation = createPresentation();
  expectToExist(presentation.presentationId);
  helpers.deleteFileOnCleanup(presentation.presentationId);
}

/**
 * Copies a presentation.
 */
function itShouldCopyAPresentation() {
  console.log('> itShouldCopyAPresentation');
  const presentationId = helpers.createTestPresentation();
  const copyId = copyPresentation(presentationId, 'My Duplicate, Presentation');
  expectToExist(copyId);
  helpers.deleteFileOnCleanup(copyId);
}

/**
 * Creates a new slide.
 */
function itShouldCreateASlide() {
  console.log('> itShouldCreateASlide');
  const presentationId = helpers.createTestPresentation();
  helpers.addSlides(presentationId, 3, 'TITLE_AND_TWO_COLUMNS');
  const pageId = 'my_page_id';
  const response = createSlide(presentationId, pageId);
  expectToExist(response.replies[0].createSlide.objectId);
}

/**
 * Creates a slide with text.
 */
function itShouldCreateATextboxWithText() {
  console.log('> itShouldCreateATextboxWithText');
  const presentationId = helpers.createTestPresentation();
  const ids = helpers.addSlides(presentationId, 3, 'TITLE_AND_TWO_COLUMNS');
  const pageId = ids[0];
  const response = createTextboxWithText(presentationId, pageId);
  expectToEqual(2, response.replies.length);
  const boxId = response.replies[0].createShape.objectId;
  expectToExist(boxId);
}

/**
 * Adds an image to a slide.
 */
function itShouldCreateAnImage() {
  console.log('> itShouldCreateAnImage');
  const presentationId = helpers.createTestPresentation();
  const ids = helpers.addSlides(presentationId, 1, 'BLANK');
  const pageId = ids[0];
  const response = createImage(presentationId, pageId);
  expectToEqual(1, response.length);
  const imageId = response[0].createImage.objectId;
  expectToExist(imageId);
}

/**
 * Merges presentation text from a spreadsheet.
 */
function itShouldMergeText() {
  console.log('> itShouldMergeText');
  let responses = textMerging(TEMPLATE_PRESENTATION_ID, DATA_SPREADSHEET_ID);
  expectToEqual(5, responses.length);
  responses.forEach(function(response) {
    let numReplacements = 0;
    response.forEach(function(res) {
      numReplacements += res.replaceAllText.occurrencesChanged;
    });
    expectToEqual(4, numReplacements);
  });
}

/**
 * Merges images into a spreadsheet.
 */
function itShouldImageMerge() {
  console.log('> itShouldImageMerge');
  let response = imageMerging(TEMPLATE_PRESENTATION_ID, IMAGE_URL, CUSTOMER_NAME);
  expectToEqual(2, response.replies.length);
  let numReplacements = 0;
  response.replies.forEach(function(reply) {
    numReplacements += reply.replaceAllShapesWithImage.occurrencesChanged;
  });
  expectToEqual(2, numReplacements);
}

/**
 * Replaces a text box with some text.
 */
function itShouldSimpleTextReplace() {
  console.log('> itShouldSimpleTextReplace');
  const presentationId = helpers.createTestPresentation();
  const pageIds = helpers.addSlides(presentationId, 1, 'BLANK');
  const pageId = pageIds[0];
  const boxId = helpers.createTestTextbox(presentationId, pageId);
  const response = simpleTextReplace(presentationId, boxId, 'MY NEW TEXT');
  expectToEqual(2, response.replies.length);
}

/**
 * Updates style for text.
 */
function itShouldTextStyleUpdate() {
  console.log('> itShouldTextStyleUpdate');
  const presentationId = helpers.createTestPresentation();
  const pageIds = helpers.addSlides(presentationId, 1, 'BLANK');
  const pageId = pageIds[0];
  const boxId = helpers.createTestTextbox(presentationId, pageId);
  const response = textStyleUpdate(presentationId, boxId);
  expectToEqual(3, response.replies.length);
}

/**
 * Creates bulleted text.
 */
function itShouldCreateBulletedText() {
  console.log('> itShouldCreateBulletedText');
  const presentationId = helpers.createTestPresentation();
  const pageIds = helpers.addSlides(presentationId, 1, 'BLANK');
  const pageId = pageIds[0];
  const boxId = helpers.createTestTextbox(presentationId, pageId);
  const response = createBulletedText(presentationId, boxId);
  expectToEqual(1, response.replies.length);
}

/**
 * Adds a sheets chart in a presentation.
 */
function itShouldCreateSheetsChart() {
  console.log('> itShouldCreateSheetsChart');
  const presentationId = helpers.createTestPresentation();
  const pageIds = helpers.addSlides(presentationId, 1, 'BLANK');
  const pageId = pageIds[0];
  const response = createSheetsChart(presentationId, pageId, DATA_SPREADSHEET_ID, CHART_ID);
  expectToEqual(1, response.replies.length);
  const chartId = response.replies[0].createSheetsChart.objectId;
  expectToExist(chartId);
}

/**
 * Refreshes a sheets chart in a presentation.
 */
function itShouldRefreshSheetsChart() {
  console.log('> itShouldRefreshSheetsChart');
  const presentationId = helpers.createTestPresentation();
  const pageIds = helpers.addSlides(presentationId, 1, 'BLANK');
  const pageId = pageIds[0];
  const sheetChartId = helpers.createTestSheetsChart(presentationId, pageId, DATA_SPREADSHEET_ID,
      CHART_ID);
  const response = refreshSheetsChart(presentationId, sheetChartId);
  expectToEqual(1, response.replies.length);
}