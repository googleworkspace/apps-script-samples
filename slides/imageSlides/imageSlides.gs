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

// [START apps_script_slides_image_create]
const NAME_1 = "My favorite images";
const deck_1 = SlidesApp.create(NAME_1);
// [END apps_script_slides_image_create]

// [START apps_script_slides_image_add_image]
/**
 * Adds an image to a presentation at a given slide index.
 * @param {string} imageUrl The image URL
 * @param {number} index The slide index to add the image to
 */
function addImageSlide_1(imageUrl, index) {
  const slide = deck_1.appendSlide(SlidesApp.PredefinedLayout.BLANK);
  const image = slide.insertImage(imageUrl);
}
// [END apps_script_slides_image_add_image]

// [START apps_script_slides_image_main]
/**
 * Adds images to a slides presentation.
 */
function main() {
  const images = [
    "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
    "http://www.google.com/services/images/phone-animation-results_2x.png",
    "http://www.google.com/services/images/section-work-card-img_2x.jpg",
    "http://gsuite.google.com/img/icons/product-lockup.png",
    "http://gsuite.google.com/img/home-hero_2x.jpg",
  ];
  const [title, subtitle] = deck_1.getSlides()[0].getPageElements();
  title.asShape().getText().setText(NAME_1);
  subtitle
    .asShape()
    .getText()
    .setText("Google Apps Script\nSlides Service demo");
  for (const imageUrl of images) {
    addImageSlide_3(imageUrl);
  }
}
// [END apps_script_slides_image_main]

// [START apps_script_slides_image_add_image_slide]
/**
 * Creates a single slide using the image from the given link;
 * used directly by foreach(), hence the parameters are fixed.
 * @param {string} imageUrl A String object representing an image URL
 * @param {number} index The index into the array; unused (req'd by forEach)
 */
function addImageSlide_2(imageUrl, index) {
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

// [START apps_script_slides_image_full_script]
const NAME_2 = "My favorite images";
const presentation_2 = SlidesApp.create(NAME_2);

/**
 * Creates a single slide using the image from the given link;
 * used directly by foreach(), hence the parameters are fixed.
 * @param {string} imageUrl A String object representing an image URL
 * @param {number} index The index into the array; unused (req'd by forEach)
 */
function addImageSlide_3(imageUrl, index) {
  const slide = presentation_2.appendSlide(SlidesApp.PredefinedLayout.BLANK);
  const image = slide.insertImage(imageUrl);
  const imgWidth = image.getWidth();
  const imgHeight = image.getHeight();
  const pageWidth = presentation_2.getPageWidth();
  const pageHeight = presentation_2.getPageHeight();
  const newX = pageWidth / 2 - imgWidth / 2;
  const newY = pageHeight / 2 - imgHeight / 2;
  image.setLeft(newX).setTop(newY);
}

/**
 * The driver application features an array of image URLs, setting of the
 * main title & subtitle, and creation of individual slides for each image.
 */
function main_2() {
  const images = [
    "http://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
    "http://www.google.com/services/images/phone-animation-results_2x.png",
    "http://www.google.com/services/images/section-work-card-img_2x.jpg",
    "http://gsuite.google.com/img/icons/product-lockup.png",
    "http://gsuite.google.com/img/home-hero_2x.jpg",
  ];
  const [title, subtitle] = presentation_2.getSlides()[0].getPageElements();
  title.asShape().getText().setText(NAME_2);
  subtitle
    .asShape()
    .getText()
    .setText("Google Apps Script\nSlides Service demo");
  for (const imageUrl of images) {
    addImageSlide_3(imageUrl);
  }
}
// [END apps_script_slides_image_full_script]
