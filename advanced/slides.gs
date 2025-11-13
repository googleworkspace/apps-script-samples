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

// [START apps_script_slides_create_presentation]
/**
 * Create a new presentation.
 * @return {string} presentation Id.
 * @see https://developers.google.com/slides/api/reference/rest/v1/presentations/create
 */
function createPresentation() {
  try {
    const presentation =
      Slides.Presentations.create({'title': 'MyNewPresentation'});
    console.log('Created presentation with ID: ' + presentation.presentationId);
    return presentation.presentationId;
  } catch (e) {
    // TODO (developer) - Handle exception
    console.log('Failed with error %s', e.message);
  }
}
// [END apps_script_slides_create_presentation]

// [START apps_script_slides_create_slide]
/**
 * Create a new slide.
 * @param {string} presentationId The presentation to add the slide to.
 * @return {Object} slide
 * @see https://developers.google.com/slides/api/reference/rest/v1/presentations/batchUpdate
 */
function createSlide(presentationId) {
  // You can specify the ID to use for the slide, as long as it's unique.
  const pageId = Utilities.getUuid();

  const requests = [{
    'createSlide': {
      'objectId': pageId,
      'insertionIndex': 1,
      'slideLayoutReference': {
        'predefinedLayout': 'TITLE_AND_TWO_COLUMNS'
      }
    }
  }];
  try {
    const slide =
      Slides.Presentations.batchUpdate({'requests': requests}, presentationId);
    console.log('Created Slide with ID: ' + slide.replies[0].createSlide.objectId);
    return slide;
  } catch (e) {
    // TODO (developer) - Handle Exception
    console.log('Failed with error %s', e.message);
  }
}
// [END apps_script_slides_create_slide]

// [START apps_script_slides_read_page]
/**
 * Read page element IDs.
 * @param {string} presentationId The presentation to read from.
 * @param {string} pageId The page to read from.
 * @return {Object} response
 * @see https://developers.google.com/slides/api/reference/rest/v1/presentations.pages/get
 */
function readPageElementIds(presentationId, pageId) {
  // You can use a field mask to limit the data the API retrieves
  // in a get request, or what fields are updated in an batchUpdate.
  try {
    const response = Slides.Presentations.Pages.get(
        presentationId, pageId, {'fields': 'pageElements.objectId'});
    console.log(response);
    return response;
  } catch (e) {
    // TODO (developer) - Handle Exception
    console.log('Failed with error %s', e.message);
  }
}
// [END apps_script_slides_read_page]

// [START apps_script_slides_add_text_box]
/**
 * Add a new text box with text to a page.
 * @param {string} presentationId The presentation ID.
 * @param {string} pageId The page ID.
 * @return {Object} response
 * @see https://developers.google.com/slides/api/reference/rest/v1/presentations/batchUpdate
 */
function addTextBox(presentationId, pageId) {
  // You can specify the ID to use for elements you create,
  // as long as the ID is unique.
  const pageElementId = Utilities.getUuid();

  const requests = [{
    'createShape': {
      'objectId': pageElementId,
      'shapeType': 'TEXT_BOX',
      'elementProperties': {
        'pageObjectId': pageId,
        'size': {
          'width': {
            'magnitude': 150,
            'unit': 'PT'
          },
          'height': {
            'magnitude': 50,
            'unit': 'PT'
          }
        },
        'transform': {
          'scaleX': 1,
          'scaleY': 1,
          'translateX': 200,
          'translateY': 100,
          'unit': 'PT'
        }
      }
    }
  }, {
    'insertText': {
      'objectId': pageElementId,
      'text': 'My Added Text Box',
      'insertionIndex': 0
    }
  }];
  try {
    const response =
      Slides.Presentations.batchUpdate({'requests': requests}, presentationId);
    console.log('Created Textbox with ID: ' +
      response.replies[0].createShape.objectId);
    return response;
  } catch (e) {
    // TODO (developer) - Handle Exception
    console.log('Failed with error %s', e.message);
  }
}
// [END apps_script_slides_add_text_box]

// [START apps_script_slides_format_shape_text]
/**
 * Format the text in a shape.
 * @param {string} presentationId The presentation ID.
 * @param {string} shapeId The shape ID.
 * @return {Object} replies
 * @see https://developers.google.com/slides/api/reference/rest/v1/presentations/batchUpdate
 */
function formatShapeText(presentationId, shapeId) {
  const requests = [{
    'updateTextStyle': {
      'objectId': shapeId,
      'fields': 'foregroundColor,bold,italic,fontFamily,fontSize,underline',
      'style': {
        'foregroundColor': {
          'opaqueColor': {
            'themeColor': 'ACCENT5'
          }
        },
        'bold': true,
        'italic': true,
        'underline': true,
        'fontFamily': 'Corsiva',
        'fontSize': {
          'magnitude': 18,
          'unit': 'PT'
        }
      },
      'textRange': {
        'type': 'ALL'
      }
    }
  }];
  try {
    const response =
      Slides.Presentations.batchUpdate({'requests': requests}, presentationId);
    return response.replies;
  } catch (e) {
    // TODO (developer) - Handle Exception
    console.log('Failed with error %s', e.message);
  }
}
// [END apps_script_slides_format_shape_text]

// [START apps_script_slides_save_thumbnail]
/**
 * Saves a thumbnail image of the current Google Slide presentation in Google Drive.
 * Logs the image URL.
 * @param {number} i The zero-based slide index. 0 is the first slide.
 * @example saveThumbnailImage(0)
 * @see https://developers.google.com/slides/api/reference/rest/v1/presentations.pages/getThumbnail
 */
function saveThumbnailImage(i) {
  try {
    const presentation = SlidesApp.getActivePresentation();
    // Get the thumbnail of specified page
    const thumbnail = Slides.Presentations.Pages.getThumbnail(
        presentation.getId(), presentation.getSlides()[i].getObjectId());
    // fetch the  URL to the thumbnail image.
    const response = UrlFetchApp.fetch(thumbnail.contentUrl);
    const image = response.getBlob();
    // Creates a file in the root of the user's Drive from a given Blob of arbitrary data.
    const file = DriveApp.createFile(image);
    console.log(file.getUrl());
  } catch (e) {
    // TODO (developer) - Handle Exception
    console.log('Failed with error %s', e.message);
  }
}
// [END apps_script_slides_save_thumbnail]
