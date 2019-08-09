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
var title = 'my title';

/**
 * Snippet class for the Google Slides Advanced Service.
 */
function Snippets() {}

Snippets.prototype.createPresentation = function() {
  // [START slides_create_presentation]
  var presentation = Slides.Presentations.create({
    title: title
  });
  console.log('Created presentation with ID: %s', presentation.presentationId);
  // [END slides_create_presentation]
  return presentation;
};

Snippets.prototype.copyPresentation = function() {
  var presentationId = this.createPresentation().presentationId;
  var copyTitle = 'Copy Title';
  // [START slides_copy_presentation]
  var copyFile = {
    title: copyTitle,
    parents: [{id: 'root'}]
  };
  copyFile = Drive.Files.copy(copyFile, presentationId);
  var presentationCopyId = copyFile.id;
  // [END slides_copy_presentation]
  return presentationCopyId;
};

Snippets.prototype.createSlide = function(presentationId, pageId) {
  // [START slides_create_slide]
  // See Presentation.insertSlide(...) to learn how to add a slide using SlidesApp.
  // http://developers.google.com/apps-script/reference/slides/presentation#appendslidelayout
  var requests = [{
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
  var createSlideResponse = Slides.Presentations.batchUpdate({
    requests: requests
  }, presentationId);
  console.log('Created slide with ID: %s', createSlideResponse.replies[0].createSlide.objectId);
  // [END slides_create_slide]
  return createSlideResponse;
};

Snippets.prototype.createTextboxWithText = function(presentationId, pageId) {
  // [START slides_create_textbox_with_text]
  // Create a new square textbox, using the supplied element ID.
  var elementId = 'MyTextBox_01';
  var pt350 = {
    magnitude: 350,
    unit: 'PT'
  };
  var requests = [{
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
  }];

  // Execute the request.
  var createTextboxWithTextResponse = Slides.Presentations.batchUpdate({
    requests: requests
  }, presentationId);
  var createShapeResponse = createTextboxWithTextResponse.replies[0].createShape;
  console.log('Created textbox with ID: %s', createShapeResponse.objectId);
  // [END slides_create_textbox_with_text]
  return createTextboxWithTextResponse;
};

Snippets.prototype.createImage = function(presentationId, pageId) {
  // [START slides_create_image]
  // Temporarily upload a local image file to Drive, in order to obtain a URL
  // for the image. Alternatively, you can provide the Slides service a URL of
  // an already hosted image.
  //
  // We will use an existing image under the variable: imageUrl.
  //
  // Create a new image, using the supplied object ID, with content downloaded from imageUrl.
  var requests = [];
  var imageId = 'MyImage_01';
  var imageUrl = 'https://www.google.com/images/branding/googlelogo/2x/' +
      'googlelogo_color_272x92dp.png';
  var emu4M = {
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
  var response = Slides.Presentations.batchUpdate({
    requests: requests
  }, presentationId);

  var createImageResponse = response.replies;
  console.log('Created image with ID: %s', createImageResponse[0].createImage.objectId);
  // [END slides_create_image]
  return createImageResponse;
};

Snippets.prototype.textMerging = function(templatePresentationId, dataSpreadsheetId) {
  var responses = [];
  // [START slides_text_merging]
  // Use the Sheets API to load data, one record per row.
  var dataRangeNotation = 'Customers!A2:M6';
  var values = SpreadsheetApp.openById(dataSpreadsheetId).getRange(dataRangeNotation).getValues();

  // For each record, create a new merged presentation.
  for (var i = 0; i < values.length; ++i) {
    var row = values[i];
    var customerName = row[2]; // name in column 3
    var caseDescription = row[5]; // case description in column 6
    var totalPortfolio = row[11]; // total portfolio in column 12

    // Duplicate the template presentation using the Drive API.
    var copyTitle = customerName + ' presentation';
    var copyFile = {
      title: copyTitle,
      parents: [{id: 'root'}]
    };
    copyFile = Drive.Files.copy(copyFile, templatePresentationId);
    var presentationCopyId = copyFile.id;

    // Create the text merge (replaceAllText) requests for this presentation.
    requests = [{
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
    var result = Slides.Presentations.batchUpdate({
      requests: requests
    }, presentationCopyId);
    // Count the total number of replacements made.
    var numReplacements = 0;
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
  // [END slides_text_merging]
};

Snippets.prototype.imageMerging = function(templatePresentationId, imageUrl, customerName) {
  var logoUrl = imageUrl;
  var customerGraphicUrl = imageUrl;

  // [START slides_image_merging]
  // Duplicate the template presentation using the Drive API.
  var copyTitle = customerName + ' presentation';
  var copyFile = {
    title: copyTitle,
    parents: [{id: 'root'}]
  };
  copyFile = Drive.Files.copy(copyFile, templatePresentationId);
  var presentationCopyId = copyFile.id;

  // Create the image merge (replaceAllShapesWithImage) requests.
  var requests = [{
    replaceAllShapesWithImage: {
      imageUrl: logoUrl,
      replaceMethod: 'CENTER_INSIDE',
      containsText: {
        text: '{{company-logo}}',
        matchCase: true
      }
    }
  }, {
    replaceAllShapesWithImage: {
      imageUrl: customerGraphicUrl,
      replaceMethod: 'CENTER_INSIDE',
      containsText: {
        text: '{{customer-graphic}}',
        matchCase: true
      }
    }
  }];

  // Execute the requests for this presentation.
  var batchUpdateResponse = Slides.Presentations.batchUpdate({
    requests: requests
  }, presentationCopyId);
  var numReplacements = 0;
  batchUpdateResponse.replies.forEach(function(reply) {
    numReplacements += reply.replaceAllShapesWithImage.occurrencesChanged;
  });
  console.log('Created merged presentation with ID: %s', presentationCopyId);
  console.log('Replaced %s shapes with images.', numReplacements);
  // [END slides_image_merging]
  return batchUpdateResponse;
};

Snippets.prototype.simpleTextReplace = function(presentationId, shapeId, replacementText) {
  // [START slides_simple_text_replace]
  // Remove existing text in the shape, then insert new text.
  var requests = [{
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
  var batchUpdateResponse = Slides.Presentations.batchUpdate({
    requests: requests
  }, presentationId);
  console.log('Replaced text in shape with ID: %s', shapeId);
  // [END slides_simple_text_replace]
  return batchUpdateResponse;
};

Snippets.prototype.textStyleUpdate = function(presentationId, shapeId) {
  // [START slides_text_style_update]
  // Update the text style so that the first 5 characters are bolded
  // and italicized, the next 5 are displayed in blue 14 pt Times
  // New Roman font, and the next 5 are hyperlinked.
  var requests = [{
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
  var batchUpdateResponse = Slides.Presentations.batchUpdate({
    requests: requests
  }, presentationId);
  console.log('Updated the text style for shape with ID: %s', shapeId);
  // [END slides_text_style_update]
  return batchUpdateResponse;
};

Snippets.prototype.createBulletedText = function(presentationId, shapeId) {
  // [START slides_create_bulleted_text]
  // Add arrow-diamond-disc bullets to all text in the shape.
  var requests = [{
    createParagraphBullets: {
      objectId: shapeId,
      textRange: {
        type: 'ALL'
      },
      bulletPreset: 'BULLET_ARROW_DIAMOND_DISC'
    }
  }];

  // Execute the requests.
  var batchUpdateResponse = Slides.Presentations.batchUpdate({
    requests: requests
  }, presentationId);
  console.log('Added bullets to text in shape with ID: %s', shapeId);
  // [END slides_create_bulleted_text]
  return batchUpdateResponse;
};

Snippets.prototype.createSheetsChart = function(presentationId, pageId, shapeId, sheetChartId) {
  // [START slides_create_sheets_chart]
  // Embed a Sheets chart (indicated by the spreadsheetId and sheetChartId) onto
  // a page in the presentation. Setting the linking mode as 'LINKED' allows the
  // chart to be refreshed if the Sheets version is updated.
  var emu4M = {
    magnitude: 4000000,
    unit: 'EMU'
  };
  var presentationChartId = 'MyEmbeddedChart';
  var requests = [{
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
  var batchUpdateResponse = Slides.Presentations.batchUpdate({
    requests: requests
  }, presentationId);
  console.log('Added a linked Sheets chart with ID: %s', presentationChartId);
  // [END slides_create_sheets_chart]
  return batchUpdateResponse;
};

Snippets.prototype.refreshSheetsChart = function(presentationId, presentationChartId) {
  // [START slides_refresh_sheets_chart]
  var requests = [{
    refreshSheetsChart: {
      objectId: presentationChartId
    }
  }];

  // Execute the request.
  var batchUpdateResponse = Slides.Presentations.batchUpdate({
    requests: requests
  }, presentationId);
  console.log('Refreshed a linked Sheets chart with ID: %s', presentationChartId);
  // [END slides_refresh_sheets_chart]
  return batchUpdateResponse;
};
