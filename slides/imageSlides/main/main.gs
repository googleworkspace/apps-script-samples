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
  const [title, subtitle] = deck.getSlides()[0].getPageElements();
  title.asShape().getText().setText(NAME);
  subtitle
    .asShape()
    .getText()
    .setText("Google Apps Script\nSlides Service demo");
  for (const imageUrl of images) {
    addImageSlide(imageUrl);
  }
}
// [END apps_script_slides_image_main]
