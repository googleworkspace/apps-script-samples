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

/**
 * Tests listPartners function of displayvideo.gs
 */
function itShouldListPartners() {
  console.log('> itShouldListPartners');
  listPartners();
}

/**
 * Tests listActiveCampaigns function of displayvideo.gs
 */
function itShouldListActiveCampaigns() {
  console.log('> itShouldListActiveCampaigns');
  listActiveCampaigns();
}

/**
 * Tests updateLineItemName function of displayvideo.gs
 */
function itShouldUpdateLineItemName() {
  console.log('> itShouldUpdateLineItemName');
  updateLineItemName();
}

/**
 * Run all tests
 */
function RUN_ALL_TESTS() {
  itShouldListPartners();
  itShouldListActiveCampaigns();
  itShouldUpdateLineItemName();
}
