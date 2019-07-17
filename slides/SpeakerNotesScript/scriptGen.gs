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

// [START apps_script_slides_speaker_notes_script]
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
      .addItem('Generate Script Document', 'generateSlidesScript')
      .addToUi();
}

/**
 * Creates a 'script' for the presentation user in a document
 * with the speaker notes for each slide.
 */
function generateSlidesScript() {
  var presentation = SlidesApp.getActivePresentation();
  var docTitle = presentation.getName() + ' Script';
  var slides = presentation.getSlides();

  // Creates a document in the user's home Drive directory.
  var speakerNotesDoc = DocumentApp.create(docTitle);
  console.log('Created document with id %s', speakerNotesDoc.getId());

  var docBody = speakerNotesDoc.getBody();
  var header = docBody.appendParagraph(docTitle);
  header.setHeading(DocumentApp.ParagraphHeading.HEADING1);

  // Iterate through each slide and extract the speaker notes
  // into the document body.
  for (var i = 0; i < slides.length; i++) {
    var section = docBody.appendParagraph('Slide ' + (i + 1))
        .setHeading(DocumentApp.ParagraphHeading.HEADING2);

    var notes = slides[i].getNotesPage().getSpeakerNotesShape().getText().asString();
    docBody.appendParagraph(notes)
        .appendHorizontalRule();
  }

  SlidesApp.getUi().alert(speakerNotesDoc.getName() + ' has been created in your Drive files.');
}
// [END apps_script_slides_speaker_notes_script]
