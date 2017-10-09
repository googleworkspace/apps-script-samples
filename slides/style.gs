// [START hello]
var slide = SlidesApp.getActivePresentation().getSlides()[0];
var shape = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, 100, 200, 300, 60);
var textRange = shape.getText();
textRange.setText('Hello world!');
Logger.log('Start: ' + textRange.getStartIndex() + '; End: ' +
    textRange.getEndIndex() + '; Content: ' + textRange.asString());
var subRange = textRange.getRange(0, 5);
Logger.log('Sub-range Start: ' + subRange.getStartIndex() + '; Sub-range End: ' +
    subRange.getEndIndex() + '; Sub-range Content: ' + subRange.asString());
// [END hello]

// [START insertText]
var slide = SlidesApp.getActivePresentation().getSlides()[0];
var shape = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, 100, 200, 300, 60);
var textRange = shape.getText();
textRange.setText('Hello world!');
textRange.clear(6, 11);
textRange.insertText(6, 'galaxy');
Logger.log('Start: ' + textRange.getStartIndex() + '; End: ' +
    textRange.getEndIndex() + '; Content: ' + textRange.asString());
// [END insertText]

// [START styleText]
var slide = SlidesApp.getActivePresentation().getSlides()[0];
var shape = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, 100, 200, 300, 60);
var textRange = shape.getText();
textRange.setText('Hello ');
var insertedText = textRange.appendText('world!');
insertedText.getTextStyle()
    .setBold(true)
    .setLinkUrl('www.example.com')
    .setForegroundColor('#ff0000');
var helloRange = textRange.getRange(0, 5);
Logger.log('Text: ' + helloRange.asString() + '; Bold: ' + helloRange.getTextStyle().isBold());
Logger.log('Text: ' + insertedText.asString() + '; Bold: ' + insertedText.getTextStyle().isBold());
Logger.log('Text: ' + textRange.asString() + '; Bold: ' + textRange.getTextStyle().isBold());
// [END styleText]

// [START paragraphStyling]
var slide = SlidesApp.getActivePresentation().getSlides()[0];
var shape = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, 50, 50, 300, 300);
var textRange = shape.getText();
textRange.setText('Paragraph 1\nParagraph2\nParagraph 3\nParagraph 4');
var paragraphs = textRange.getParagraphs();
for (var i = 0; i < 3; i++) {
  var paragraphStyle = paragraphs[i].getRange().getParagraphStyle();
  paragraphStyle.setParagraphAlignment(SlidesApp.ParagraphAlignment.CENTER);
}
// [END paragraphStyling]

// [START listStyling]
var slide = SlidesApp.getActivePresentation().getSlides()[0];
var shape = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, 50, 50, 300, 300);
var textRange = shape.getText();
textRange.appendText('Item 1\n')
    .appendText('\tItem 2\n')
    .appendText('\t\tItem 3\n')
    .appendText('Item 4');
textRange.getListStyle().applyListPreset(SlidesApp.ListPreset.DIGIT_ALPHA_ROMAN);
var paragraphs = textRange.getParagraphs();
for (var i = 0; i < paragraphs.length; i++) {
  var listStyle = paragraphs[i].getRange().getListStyle();
  Logger.log('Paragraph ' + (i + 1) + ''s nesting level: ' + listStyle.getNestingLevel());';
}
// [END listStyling]
