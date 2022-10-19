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
 * Helper functions.
 */
function Helpers() {
  this.filesToDelete = [];
}

Helpers.prototype.reset = function() {
  this.filesToDelete = [];
};

Helpers.prototype.deleteFileOnCleanup = function(id) {
  this.filesToDelete.push(id);
};

Helpers.prototype.cleanup = function() {
  this.filesToDelete.forEach(Drive.Files.remove);
};

Helpers.prototype.createTestPresentation = function() {
  const presentation = Slides.Presentations.create({
    title: 'Test Preso'
  });
  this.deleteFileOnCleanup(presentation.presentationId);
  return presentation.presentationId;
};

Helpers.prototype.addSlides = function(presentationId, num, layout) {
  let requests = [];
  let slideIds = [];
  for (let i = 0; i < num; ++i) {
    slideIds.push('slide_' + i);
    requests.push({
      createSlide: {
        objectId: slideIds[i],
        slideLayoutReference: {
          predefinedLayout: layout
        }
      }
    });
  }
  Slides.Presentations.batchUpdate({requests: requests}, presentationId);
  return slideIds;
};

Helpers.prototype.createTestTextbox = function(presentationId, pageId, callback) {
  const boxId = 'MyTextBox_01';
  const pt350 = {
    magnitude: 350,
    unit: 'PT'
  };
  const requests = [{
    createShape: {
      objectId: boxId,
      shapeType: 'TEXT_BOX',
      elementProperties: {
        pageObjectId: pageId,
        size: {
          height: pt350,
          width: pt350
        },
        transform: {
          scaleX: 1,
          scaleY: 1,
          translateX: 350,
          translateY: 100,
          unit: 'PT'
        }
      }
    }
  }, {
    insertText: {
      objectId: boxId,
      insertionIndex: 0,
      text: 'New Box Text Inserted'
    }
  }];
  const createTextboxResponse = Slides.Presentations.batchUpdate({
    requests: requests
  }, presentationId);
  return createTextboxResponse.replies[0].createShape.objectId;
};

Helpers.prototype.createTestSheetsChart = function(presentationId, pageId,
                                                   spreadsheetId, sheetChartId, callback) {
  const chartId = 'MyChart_01';
  const emu4M = {
    magnitude: 4000000,
    unit: 'EMU'
  };
  const requests = [{
    createSheetsChart: {
      objectId: chartId,
      spreadsheetId: spreadsheetId,
      chartId: sheetChartId,
      linkingMode: 'LINKED',
      elementProperties: {
        pageObjectId: pageId,
        size: {
          height: emu4M,
          width: emu4M
        },
        transform: {
          scaleX: 1,
          scaleY: 1,
          translateX: 100000,
          translateY: 100000,
          unit: 'EMU'
        }
      }
    }
  }];
  const createSheetsChartResponse = Slides.Presentations.batchUpdate({
    requests: requests
  }, presentationId);
  return createSheetsChartResponse.replies[0].createSheetsChart.objectId;
};