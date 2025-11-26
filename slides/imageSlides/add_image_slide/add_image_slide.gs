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

// [START apps_script_slides_image_add_image_slide]
/**
 * Creates a single slide using the image from the given link;
 * used directly by foreach(), hence the parameters are fixed.
 * @param {string} imageUrl A String object representing an image URL
 * @param {number} index The index into the array; unused (req'd by forEach)
 */
function addImageSlide(imageUrl, index) {
  const slide = deck.appendSlide(SlidesApp.PredefinedLayout.BLANK);
  const image = slide.insertImage(imageUrl);
  const imgWidth = image.getWidth();
  const imgHeight = image.getHeight();
  const pageWidth = deck.getPageWidth();
  const pageHeight = deck.getPageHeight();
  const newX = pageWidth / 2 - imgWidth / 2;
  const newY = pageHeight / 2 - imgHeight / 2;
  image.setLeft(newX).setTop(newY);
}
// [END apps_script_slides_image_add_image_slide]
