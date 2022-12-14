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
function setTextHelloWorld() {
// [START apps_script_slides_hello]
  try {
    // Get the first slide of active presentation
    const slide = SlidesApp.getActivePresentation().getSlides()[0];
    // Insert shape in the slide with dimensions
    const shape = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, 100, 200, 300, 60);
    const textRange = shape.getText();
    // Set text in TEXT_BOX
    textRange.setText('Hello world!');
    console.log('Start: ' + textRange.getStartIndex() + '; End: ' +
      textRange.getEndIndex() + '; Content: ' + textRange.asString());
    const subRange = textRange.getRange(0, 5);
    console.log('Sub-range Start: ' + subRange.getStartIndex() + '; Sub-range End: ' +
      subRange.getEndIndex() + '; Sub-range Content: ' + subRange.asString());
  } catch (err) {
    // TODO (developer) - Handle exception
    console.log('Failed with an error %s ', err.message);
  }
// [END apps_script_slides_hello]
}
/**
 * Insert Text in shape.
 */
function insertText() {
// [START apps_script_slides_insert_text]
  try {
    // Get the first slide of active presentation
    const slide = SlidesApp.getActivePresentation().getSlides()[0];
    // Insert shape in the slide with dimensions
    const shape = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, 100, 200, 300, 60);
    const textRange = shape.getText();
    textRange.setText('Hello world!');
    textRange.clear(6, 11);
    // Insert text in TEXT_BOX
    textRange.insertText(6, 'galaxy');
    console.log('Start: ' + textRange.getStartIndex() + '; End: ' +
      textRange.getEndIndex() + '; Content: ' + textRange.asString());
  } catch (err) {
    // TODO (developer) - Handle exception
    console.log('Failed with an error %s ', err.message);
  }
// [END apps_script_slides_insert_text]
}
/**
 * Style the text
 */
function styleText() {
// [START apps_script_slides_style_text]
  try {
    // Get the first slide of active presentation
    const slide = SlidesApp.getActivePresentation().getSlides()[0];
    // Insert shape in the slide with dimensions
    const shape = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, 100, 200, 300, 60);
    const textRange = shape.getText();
    // Set text in TEXT_BOX
    textRange.setText('Hello ');
    // Append text in TEXT_BOX
    const insertedText = textRange.appendText('world!');
    // Style the text with url,bold
    insertedText.getTextStyle()
        .setBold(true)
        .setLinkUrl('www.example.com')
        .setForegroundColor('#ff0000');
    const helloRange = textRange.getRange(0, 5);
    console.log('Text: ' + helloRange.asString() + '; Bold: ' + helloRange.getTextStyle().isBold());
    console.log('Text: ' + insertedText.asString() + '; Bold: ' +
      insertedText.getTextStyle().isBold());
    console.log('Text: ' + textRange.asString() + '; Bold: ' + textRange.getTextStyle().isBold());
  } catch (err) {
    // TODO (developer) - Handle exception
    console.log('Failed with an error %s ', err.message);
  }
// [END apps_script_slides_style_text]
}

/**
 * Style the paragraph
 */
function paragraphStyling() {
// [START apps_script_slides_paragraph_styling]
  try {
    // Get the first slide of active presentation
    const slide = SlidesApp.getActivePresentation().getSlides()[0];
    // Insert shape in the slide with dimensions
    const shape = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, 50, 50, 300, 300);
    const textRange = shape.getText();
    // Set the text in the shape/TEXT_BOX
    textRange.setText('Paragraph 1\nParagraph2\nParagraph 3\nParagraph 4');
    const paragraphs = textRange.getParagraphs();
    // Style the paragraph alignment center.
    for (let i = 0; i <= 3; i++) {
      const paragraphStyle = paragraphs[i].getRange().getParagraphStyle();
      paragraphStyle.setParagraphAlignment(SlidesApp.ParagraphAlignment.CENTER);
    }
  } catch (err) {
    // TODO (developer) - Handle exception
    console.log('Failed with an error %s ', err.message);
  }
// [END apps_script_slides_paragraph_styling]
}
/**
 * Style the list
 */
function listStyling() {
// [START apps_script_slides_list_styling]
  try {
    // Get the first slide of active presentation
    const slide = SlidesApp.getActivePresentation().getSlides()[0];
    // Insert shape in the slide with dimensions
    const shape = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, 50, 50, 300, 300);
    // Add and style the list
    const textRange = shape.getText();
    textRange.appendText('Item 1\n')
        .appendText('\tItem 2\n')
        .appendText('\t\tItem 3\n')
        .appendText('Item 4');
    // Preset patterns of glyphs for lists in text.
    textRange.getListStyle().applyListPreset(SlidesApp.ListPreset.DIGIT_ALPHA_ROMAN);
    const paragraphs = textRange.getParagraphs();
    for (let i = 0; i < paragraphs.length; i++) {
      const listStyle = paragraphs[i].getRange().getListStyle();
      console.log('Paragraph ' + (i + 1) + '\'s nesting level: ' + listStyle.getNestingLevel());
    }
  } catch (err) {
    // TODO (developer) - Handle exception
    console.log('Failed with an error %s ', err.message);
  }
// [END apps_script_slides_list_styling]
}
