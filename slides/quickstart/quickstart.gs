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
// [START slides_quickstart]
/**
 * Creates a Slides API service object and logs the number of slides and
 * elements in a sample presentation:
 * https://docs.google.com/presentation/d/1EAYk18WDjIG-zp_0vLm3CsfQh_i8eXc67Jo2O9C6Vuc/edit
 */
function logSlidesAndElements() {
  const presentationId = '1EAYk18WDjIG-zp_0vLm3CsfQh_i8eXc67Jo2O9C6Vuc';
  try {
    // Gets the specified presentation using presentationId
    const presentation = Slides.Presentations.get(presentationId);
    const slides = presentation.slides;
    // Print the number of slides and elements in presentation
    console.log('The presentation contains %s slides:', slides.length);
    for ( let i = 0; i < slides.length; i++) {
      console.log('- Slide # %s contains %s elements.', i + 1, slides[i].pageElements.length);
    }
  } catch (err) {
    // TODO (developer) - Handle  Presentation.get() exception from Slides API
    console.log('Failed to found Presentation with error %s', err.message);
  }
}
// [END slides_quickstart]
