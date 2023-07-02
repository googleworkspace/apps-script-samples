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

// Before running these tests replace the product resource variables
const productResource1 = {};
const productResource2 = {};
const productResource3 = {};

/**
 * Tests productInsert function of shoppingContent.gs
 */
function itShouldProductInsert() {
  console.log('> itShouldPproductInsert');
  productInsert();
}

/**
 * Tests productList function of shoppingContent.gs
 */
function itShouldProductList() {
  console.log('> itShouldProductList');
  productList();
}

/**
 * Tests custombatch function of shoppingContent.gs
 */
function itShouldCustombatch() {
  console.log('> itShouldCustombatch');
  custombatch(productResource1, productResource2, productResource3);
}

/**
 * Tests updateAccountTax function of shoppingContent.gs
 */
function itShouldUpdateAccountTax() {
  console.log('> itShouldUpdateAccountTax');
  updateAccountTax();
}

/**
 * Run all tests
 */
function RUN_ALL_TESTS() {
  itShouldProductInsert();
  itShouldProductList();
  itShouldCustombatch();
  itShouldUpdateAccountTax();
}
