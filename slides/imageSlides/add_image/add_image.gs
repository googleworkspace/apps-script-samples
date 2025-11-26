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

// [START apps_script_slides_image_add_image]
/**
 * Adds an image to a presentation at a given slide index.
 * @param {string} imageUrl The image URL
 * @param {number} index The slide index to add the image to
 */
function addImageSlide(imageUrl, index) {
  const slide = deck.appendSlide(SlidesApp.PredefinedLayout.BLANK);
  const image = slide.insertImage(imageUrl);
}
// [END apps_script_slides_image_add_image]
