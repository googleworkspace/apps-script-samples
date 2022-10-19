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
const title = 'my title';

// [START slides_create_presentation]
/**
 * Creates a presentation
 * @returns {*} the created presentation
 */
function createPresentation() {
  try {
    const presentation = Slides.Presentations.create({
      title: title
    });
    console.log('Created presentation with ID: %s', presentation.presentationId);

    return presentation;
  } catch (err) {
    // TODO (Developer) - Handle exception
    console.log('Failed with error: %s', err.error);
  }
};
// [END slides_create_presentation]

// [START slides_copy_presentation]
/**
 * create a presentation and copy it
 * @param {string} presentationId - ID of presentation to copy
 * @returns {*} the copy's presentation id
 */
function copyPresentation(presentationId) {
  const copyTitle = 'Copy Title';

  let copyFile = {
    title: copyTitle,
    parents: [{id: 'root'}]
  };
  try {
    copyFile = Drive.Files.copy(copyFile, presentationId);
    // (optional) copyFile.id can be returned directly
    const presentationCopyId = copyFile.id;

    return presentationCopyId;
  } catch (err) {
    // TODO (Developer) - Handle exception
    console.log('Failed with error: %s', err.error);
  }
};
// [END slides_copy_presentation]

// [START slides_create_slide]
/**
 * Creates a slide
 * @param {string} presentationId
 * @param {string} pageId
 * @returns {*}
 */
function createSlide(presentationId, pageId) {
  // See Presentation.insertSlide(...) to learn how to add a slide using SlidesApp.
  // http://developers.google.com/apps-script/reference/slides/presentation#appendslidelayout
  const requests = [{
    createSlide: {
      objectId: pageId,
      insertionIndex: '1',
      slideLayoutReference: {
        predefinedLayout: 'TITLE_AND_TWO_COLUMNS'
      }
    }
  }];

  // If you wish to populate the slide with elements, add element create requests here,
  // using the pageId.

  // Execute the request.
  try {
    const createSlideResponse = Slides.Presentations.batchUpdate({
      requests: requests
    }, presentationId);
    console.log('Created slide with ID: %s', createSlideResponse.replies[0].createSlide.objectId);
    // [END slides_create_slide]
    return createSlideResponse;
  } catch (err) {
    // TODO (Developer) - Handle exception
    console.log('Failed with error: %s', err.error);
  }
};

// [START slides_create_textbox_with_text]
/**
 * Create a new square textbox, using the supplied element ID.
 * @param {string} presentationId
 * @param {string} pageId
 * @returns {*}
 */
function createTextboxWithText(presentationId, pageId) {
  const elementId = 'MyTextBox_01';
  const pt350 = {
    magnitude: 350,
    unit: 'PT'
  };
  const requests = [
    {
      createShape: {
        objectId: elementId,
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
    },
    // Insert text into the box, using the supplied element ID.
    {
      insertText: {
        objectId: elementId,
        insertionIndex: 0,
        text: 'New Box Text Inserted!'
      }
    }
  ];

  // Execute the request.
  try {
    const createTextboxWithTextResponse = Slides.Presentations.batchUpdate({
      requests: requests
    }, presentationId);
    const createShapeResponse = createTextboxWithTextResponse.replies[0].createShape;
    console.log('Created textbox with ID: %s', createShapeResponse.objectId);

    return createTextboxWithTextResponse;
  } catch (err) {
    // TODO (Developer) - Handle exception
    console.log('Failed with error: %s', err.error);
  }
};
// [END slides_create_textbox_with_text]

// [START slides_create_image]
/**
 * Create a new image, using the supplied object ID, with content downloaded from imageUrl.
 * @param {string} presentationId
 * @param {string} pageId
 * @returns {*}
 */
function createImage(presentationId, pageId) {
  let requests = [];
  const imageId = 'MyImage_01';
  const imageUrl = 'https://www.google.com/images/branding/googlelogo/2x/' +
      'googlelogo_color_272x92dp.png';
  const emu4M = {
    magnitude: 4000000,
    unit: 'EMU'
  };
  requests.push({
    createImage: {
      objectId: imageId,
      url: imageUrl,
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
  });

  // Execute the request.
  try {
    const response = Slides.Presentations.batchUpdate({
      requests: requests
    }, presentationId);

    const createImageResponse = response.replies;
    console.log('Created image with ID: %s', createImageResponse[0].createImage.objectId);

    return createImageResponse;
  } catch (err) {
    // TODO (Developer) - Handle exception
    console.log('Failed with error: %s', err.error);
  }
};
// [END slides_create_image]

// [START slides_text_merging]
/**
 * Use the Sheets API to load data, one record per row.
 * @param {string} templatePresentationId
 * @param {string} dataSpreadsheetId
 * @returns {*[]}
 */
function textMerging(templatePresentationId, dataSpreadsheetId) {
  let responses = [];
  const dataRangeNotation = 'Customers!A2:M6';
  try {
    let values = SpreadsheetApp.openById(dataSpreadsheetId).getRange(dataRangeNotation).getValues();

    // For each record, create a new merged presentation.
    for (let i = 0; i < values.length; ++i) {
      const row = values[i];
      const customerName = row[2]; // name in column 3
      const caseDescription = row[5]; // case description in column 6
      const totalPortfolio = row[11]; // total portfolio in column 12

      // Duplicate the template presentation using the Drive API.
      const copyTitle = customerName + ' presentation';
      let copyFile = {
        title: copyTitle,
        parents: [{id: 'root'}]
      };
      copyFile = Drive.Files.copy(copyFile, templatePresentationId);
      const presentationCopyId = copyFile.id;

      // Create the text merge (replaceAllText) requests for this presentation.
      const requests = [{
        replaceAllText: {
          containsText: {
            text: '{{customer-name}}',
            matchCase: true
          },
          replaceText: customerName
        }
      }, {
        replaceAllText: {
          containsText: {
            text: '{{case-description}}',
            matchCase: true
          },
          replaceText: caseDescription
        }
      }, {
        replaceAllText: {
          containsText: {
            text: '{{total-portfolio}}',
            matchCase: true
          },
          replaceText: totalPortfolio + ''
        }
      }];

      // Execute the requests for this presentation.
      const result = Slides.Presentations.batchUpdate({
        requests: requests
      }, presentationCopyId);
      // Count the total number of replacements made.
      let numReplacements = 0;
      result.replies.forEach(function(reply) {
        numReplacements += reply.replaceAllText.occurrencesChanged;
      });
      console.log('Created presentation for %s with ID: %s', customerName, presentationCopyId);
      console.log('Replaced %s text instances', numReplacements);
      // [START_EXCLUDE silent]
      responses.push(result.replies);
      if (responses.length === values.length) { // return for the last value
        return responses;
      }
      // [END_EXCLUDE]
    }
  } catch (err) {
    // TODO (Developer) - Handle exception
    console.log('Failed with error: %s', err.error);
  }
};
// [END slides_text_merging]

// [START slides_image_merging]
/**
 * Duplicate the template presentation using the Drive API.
 * @param {string} templatePresentationId
 * @param {string} imageUrl
 * @param {string} customerName
 * @returns {*}
 */
function imageMerging(templatePresentationId, imageUrl, customerName) {
  const logoUrl = imageUrl;
  const customerGraphicUrl = imageUrl;

  const copyTitle = customerName + ' presentation';
  let copyFile = {
    title: copyTitle,
    parents: [{id: 'root'}]
  };

  try {
    copyFile = Drive.Files.copy(copyFile, templatePresentationId);
    const presentationCopyId = copyFile.id;

    // Create the image merge (replaceAllShapesWithImage) requests.
    const requests = [{
      replaceAllShapesWithImage: {
        imageUrl: logoUrl,
        imageReplaceMethod: 'CENTER_INSIDE',
        containsText: {
          text: '{{company-logo}}',
          matchCase: true
        }
      }
    }, {
      replaceAllShapesWithImage: {
        imageUrl: customerGraphicUrl,
        imageReplaceMethod: 'CENTER_INSIDE',
        containsText: {
          text: '{{customer-graphic}}',
          matchCase: true
        }
      }
    }];

    // Execute the requests for this presentation.
    let batchUpdateResponse = Slides.Presentations.batchUpdate({
      requests: requests
    }, presentationCopyId);
    let numReplacements = 0;
    batchUpdateResponse.replies.forEach(function(reply) {
      numReplacements += reply.replaceAllShapesWithImage.occurrencesChanged;
    });
    console.log('Created merged presentation with ID: %s', presentationCopyId);
    console.log('Replaced %s shapes with images.', numReplacements);

    return batchUpdateResponse;
  } catch (err) {
    // TODO (Developer) - Handle exception
    console.log('Failed with error: %s', err.error);
  }
};
// [END slides_image_merging]

// [START slides_simple_text_replace]
/**
 * Remove existing text in the shape, then insert new text.
 * @param {string} presentationId
 * @param {string?} shapeId
 * @param {string} replacementText
 * @returns {*}
 */
function simpleTextReplace(presentationId, shapeId, replacementText) {
  const requests = [{
    deleteText: {
      objectId: shapeId,
      textRange: {
        type: 'ALL'
      }
    }
  }, {
    insertText: {
      objectId: shapeId,
      insertionIndex: 0,
      text: replacementText
    }
  }];

  // Execute the requests.
  try {
    const batchUpdateResponse = Slides.Presentations.batchUpdate({
      requests: requests
    }, presentationId);
    console.log('Replaced text in shape with ID: %s', shapeId);

    return batchUpdateResponse;
  } catch (err) {
    // TODO (Developer) - Handle exception
    console.log('Failed with error: %s', err.error);
  }
};
// [END slides_simple_text_replace]

// [START slides_text_style_update]
/**
 * Update the text style so that the first 5 characters are bolded
 * and italicized, the next 5 are displayed in blue 14 pt Times
 * New Roman font, and the next 5 are hyperlinked.
 * @param {string} presentationId
 * @param {string} shapeId
 * @returns {*}
 */
function textStyleUpdate(presentationId, shapeId) {
  const requests = [{
    updateTextStyle: {
      objectId: shapeId,
      textRange: {
        type: 'FIXED_RANGE',
        startIndex: 0,
        endIndex: 5
      },
      style: {
        bold: true,
        italic: true
      },
      fields: 'bold,italic'
    }
  }, {
    updateTextStyle: {
      objectId: shapeId,
      textRange: {
        type: 'FIXED_RANGE',
        startIndex: 5,
        endIndex: 10
      },
      style: {
        fontFamily: 'Times New Roman',
        fontSize: {
          magnitude: 14,
          unit: 'PT'
        },
        foregroundColor: {
          opaqueColor: {
            rgbColor: {
              blue: 1.0,
              green: 0.0,
              red: 0.0
            }
          }
        }
      },
      fields: 'foregroundColor,fontFamily,fontSize'
    }
  }, {
    updateTextStyle: {
      objectId: shapeId,
      textRange: {
        type: 'FIXED_RANGE',
        startIndex: 10,
        endIndex: 15
      },
      style: {
        link: {
          url: 'www.example.com'
        }
      },
      fields: 'link'
    }
  }];

  // Execute the requests.
  try {
    const batchUpdateResponse = Slides.Presentations.batchUpdate({
      requests: requests
    }, presentationId);
    console.log('Updated the text style for shape with ID: %s', shapeId);

    return batchUpdateResponse;
  } catch (err) {
    // TODO (Developer) - Handle exception
    console.log('Failed with error: %s', err.error);
  }
};
// [END slides_text_style_update]

// [START slides_create_bulleted_text]
/**
 * Add arrow-diamond-disc bullets to all text in the shape.
 */
function createBulletedText(presentationId, shapeId) {
  const requests = [{
    createParagraphBullets: {
      objectId: shapeId,
      textRange: {
        type: 'ALL'
      },
      bulletPreset: 'BULLET_ARROW_DIAMOND_DISC'
    }
  }];

  // Execute the requests.
  try {
    const batchUpdateResponse = Slides.Presentations.batchUpdate({
      requests: requests
    }, presentationId);
    console.log('Added bullets to text in shape with ID: %s', shapeId);

    return batchUpdateResponse;
  } catch (err) {
    // TODO (Developer) - Handle exception
    console.log('Failed with error: %s', err.error);
  }
};
// [END slides_create_bulleted_text]

// [START slides_create_sheets_chart]
/**
 * Embed a Sheets chart (indicated by the spreadsheetId and sheetChartId) onto
 *   a page in the presentation. Setting the linking mode as 'LINKED' allows the
 *   chart to be refreshed if the Sheets version is updated.
 * @param {string} presentationId
 * @param {string} pageId
 * @param {string} shapeId
 * @param {string} sheetChartId
 * @returns {*}
 */
function createSheetsChart(presentationId, pageId, shapeId, sheetChartId) {
  const emu4M = {
    magnitude: 4000000,
    unit: 'EMU'
  };
  const presentationChartId = 'MyEmbeddedChart';
  const requests = [{
    createSheetsChart: {
      objectId: presentationChartId,
      spreadsheetId: shapeId,
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

  // Execute the request.
  try {
    const batchUpdateResponse = Slides.Presentations.batchUpdate({
      requests: requests
    }, presentationId);
    console.log('Added a linked Sheets chart with ID: %s', presentationChartId);

    return batchUpdateResponse;
  } catch (err) {
    // TODO (Developer) - Handle exception
    console.log('Failed with error: %s', err.error);
  }
};
// [END slides_create_sheets_chart]

// [START slides_refresh_sheets_chart]
/**
 * Refresh the sheets charts
 * @param {string} presentationId
 * @param {string} presentationChartId
 * @returns {*}
 */
function refreshSheetsChart(presentationId, presentationChartId) {
  const requests = [{
    refreshSheetsChart: {
      objectId: presentationChartId
    }
  }];

  // Execute the request.
  try {
    const batchUpdateResponse = Slides.Presentations.batchUpdate({
      requests: requests
    }, presentationId);
    console.log('Refreshed a linked Sheets chart with ID: %s', presentationChartId);

    return batchUpdateResponse;
  } catch (err) {
    // TODO (Developer) - Handle exception
    console.log('Failed with error: %s', err.error);
  }
};
// [END slides_refresh_sheets_chart]
