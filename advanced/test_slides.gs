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
 * A simple existance assertion. Logs if the value is falsy.
 * @param {object} value The value we expect to exist.
 */
function expectToExist(value) {
  if (!value) {
    console.log('DNE');
    return;
  }
  console.log('TEST: Exists');
}

/**
 * A simple equality assertion. Logs if there is a mismatch.
 * @param {object} expected The expected value.
 * @param {object} actual The actual value.
 */
function expectToEqual(expected, actual) {
  if (actual !== expected) {
    console.log('TEST: actual: %s = expected: %s', actual, expected);
    return;
  }
  console.log('TEST: actual: %s = expected: %s', actual, expected);
}
/**
 * Creates a presentation.
 * @param {string} presentationId The presentation ID.
 * @param {string} pageId The page ID.
 * @return {string} objectId
 */
function addShape(presentationId, pageId) {
  // Create a new square textbox, using the supplied element ID.
  const elementId = 'MyTextBox_01';
  const pt350 = {
    magnitude: 350,
    unit: 'PT'
  };
  const requests = [{
    createShape: {
      objectId: elementId,
      shapeType: 'ELLIPSE',
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
  },

  // Insert text into the box, using the supplied element ID.
  {
    insertText: {
      objectId: elementId,
      insertionIndex: 0,
      text: 'Text Formatted!'
    }
  }];

  // Execute the request.
  const createTextboxWithTextResponse = Slides.Presentations.batchUpdate({
    requests: requests
  }, presentationId);
  const createShapeResponse = createTextboxWithTextResponse.replies[0].createShape;
  console.log('Created textbox with ID: %s', createShapeResponse.objectId);
  // [END slides_create_textbox_with_text]
  return createShapeResponse.objectId;
}


/**
 * Runs all tests.
 */
function RUN_ALL_TESTS() {
  itShouldCreateAPresentation();
  itShouldCreateASlide();
  itShouldCreateATextboxWithText();
  itShouldFormatShapes();
  itShouldReadPage();
}

/**
 * Creates a presentation.
 */
function itShouldCreateAPresentation() {
  const presentationId = createPresentation();
  expectToExist(presentationId);
  deleteFileOnCleanup(presentationId);
}


/**
 * Creates a new slide.
 */
function itShouldCreateASlide() {
  console.log('> itShouldCreateASlide');
  const presentationId = createPresentation();
  const slideId=createSlide(presentationId);
  expectToExist(slideId);
  deleteFileOnCleanup(presentationId);
}

/**
 * Creates a slide with text.
 */
function itShouldCreateATextboxWithText() {
  const presentationId = createPresentation();
  const slide=createSlide(presentationId);
  const pageId = slide.replies[0].createSlide.objectId;
  const response = addTextBox(presentationId, pageId);
  expectToEqual(2, response.replies.length);
  const boxId = response.replies[0].createShape.objectId;
  expectToExist(boxId);
  deleteFileOnCleanup(presentationId);
}

/**
 * Test for Read Page.
 */
function itShouldReadPage() {
  const presentationId = createPresentation();
  const slide=createSlide(presentationId);
  const pageId = slide.replies[0].createSlide.objectId;
  const response = readPageElementIds(presentationId, pageId);
  expectToEqual(3, response.pageElements.length);
  deleteFileOnCleanup(presentationId);
}
/**
 * Test for format shapes
 */
function itShouldFormatShapes() {
  const presentationId = createPresentation();
  const slide=createSlide(presentationId);
  const pageId = slide.replies[0].createSlide.objectId;
  const shapeId=addShape(presentationId, pageId);
  const replies=formatShapeText(presentationId, shapeId);
  expectToExist(replies);
  deleteFileOnCleanup(presentationId);
}
/**
 * Delete the file
 * @param {string} id presentationId
 */
function deleteFileOnCleanup(id) {
  Drive.Files.remove(id);
}
