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
var snippets = new Snippets(){};
var helpers = new Helpers(){};

// Constants
var TEMPLATE_PRESENTATION_ID = '1wJUN1B5CQ2wQOBzmz2apky48QNK1OsE2oNKHPMLpKDc';
var DATA_SPREADSHEET_ID = '14KaZMq2aCAGt5acV77zaA_Ps8aDt04G7T0ei4KiXLX8';
var CHART_ID = 1107320627;
var CUSTOMER_NAME = 'Fake Customer';

function expectToExist(value) {
  if (!value) {
    console.log('DNE');
  }
}

function expectToEqual(expected, actual) {
  if (actual !== expected) {
    console.log('actual: %s expected: %s', actual, expected);
  }
}

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

function itShouldCreateAPresentation() {
  console.log('> itShouldCreateAPresentation');
  var presentation = snippets.createPresentation();
  expectToExist(presentation.presentationId);
  helpers.deleteFileOnCleanup(presentation.presentationId);
}

function itShouldCopyAPresentation() {
  console.log('> itShouldCopyAPresentation');
  var presentationId = helpers.createTestPresentation();
  var copyId = snippets.copyPresentation(presentationId, 'My Duplicate, Presentation');
  expectToExist(copyId);
  helpers.deleteFileOnCleanup(copyId);
}

function itShouldCreateASlide() {
  console.log('> itShouldCreateASlide');
  var presentationId = helpers.createTestPresentation();
  helpers.addSlides(presentationId, 3, 'TITLE_AND_TWO_COLUMNS');
  var pageId = 'my_page_id';
  var response = snippets.createSlide(presentationId, pageId);
  expectToExist(response.replies[0].createSlide.objectId);
}

function itShouldCreateATextboxWithText() {
  console.log('> itShouldCreateATextboxWithText');
  var presentationId = helpers.createTestPresentation();
  var ids = helpers.addSlides(presentationId, 3, 'TITLE_AND_TWO_COLUMNS');
  var pageId = ids[0];
  var response = snippets.createTextboxWithText(presentationId, pageId);
  expectToEqual(2, response.replies.length);
  var boxId = response.replies[0].createShape.objectId;
  expectToExist(boxId);
}

function itShouldCreateAnImage() {
  console.log('> itShouldCreateAnImage');
  var presentationId = helpers.createTestPresentation();
  var ids = helpers.addSlides(presentationId, 1, 'BLANK');
  var pageId = ids[0];
  var response = snippets.createImage(presentationId, pageId);
  expectToEqual(1, response.length);
  var imageId = response[0].createImage.objectId;
  expectToExist(imageId);
}

function itShouldMergeText() {
  console.log('> itShouldMergeText');
  var responses = snippets.textMerging(TEMPLATE_PRESENTATION_ID, DATA_SPREADSHEET_ID);
  expectToEqual(5, responses.length);
  responses.forEach(function(response) {
    var numReplacements = 0;
    response.forEach(function(res) {
      numReplacements += res.replaceAllText.occurrencesChanged;
    });
    expectToEqual(4, numReplacements);
  });
}

function itShouldImageMerge() {
  console.log('> itShouldImageMerge');
  var response = snippets.imageMerging(TEMPLATE_PRESENTATION_ID, IMAGE_URL, CUSTOMER_NAME);
  expectToEqual(2, response.replies.length);
  var numReplacements = 0;
  response.replies.forEach(function(reply) {
    numReplacements += reply.replaceAllShapesWithImage.occurrencesChanged;
  });
  expectToEqual(2, numReplacements);
}

function itShouldSimpleTextReplace() {
  console.log('> itShouldSimpleTextReplace');
  var presentationId = helpers.createTestPresentation();
  var pageIds = helpers.addSlides(presentationId, 1, 'BLANK');
  var pageId = pageIds[0];
  var boxId = helpers.createTestTextbox(presentationId, pageId);
  var response = snippets.simpleTextReplace(presentationId, boxId, 'MY NEW TEXT');
  expectToEqual(2, response.replies.length);
}

function itShouldTextStyleUpdate() {
  console.log('> itShouldTextStyleUpdate');
  var presentationId = helpers.createTestPresentation();
  var pageIds = helpers.addSlides(presentationId, 1, 'BLANK');
  var pageId = pageIds[0];
  var boxId = helpers.createTestTextbox(presentationId, pageId);
  var response = snippets.textStyleUpdate(presentationId, boxId);
  expectToEqual(3, response.replies.length);
}

function itShouldCreateBulletedText() {
  console.log('> itShouldCreateBulletedText');
  var presentationId = helpers.createTestPresentation();
  var pageIds = helpers.addSlides(presentationId, 1, 'BLANK');
  var pageId = pageIds[0];
  var boxId = helpers.createTestTextbox(presentationId, pageId);
  var response = snippets.createBulletedText(presentationId, boxId);
  expectToEqual(1, response.replies.length);
}

function itShouldCreateSheetsChart() {
  console.log('> itShouldCreateSheetsChart');
  var presentationId = helpers.createTestPresentation();
  var pageIds = helpers.addSlides(presentationId, 1, 'BLANK');
  var pageId = pageIds[0];
  var response = snippets.createSheetsChart(presentationId, pageId, DATA_SPREADSHEET_ID, CHART_ID);
  expectToEqual(1, response.replies.length);
  var chartId = response.replies[0].createSheetsChart.objectId;
  expectToExist(chartId);
}

function itShouldRefreshSheetsChart() {
  console.log('> itShouldRefreshSheetsChart');
  var presentationId = helpers.createTestPresentation();
  var pageIds = helpers.addSlides(presentationId, 1, 'BLANK');
  var pageId = pageIds[0];
  var sheetChartId = helpers.createTestSheetsChart(presentationId, pageId, DATA_SPREADSHEET_ID, CHART_ID);
  var response = snippets.refreshSheetsChart(presentationId, sheetChartId);
  expectToEqual(1, response.replies.length);
}
