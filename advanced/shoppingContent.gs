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
// [START apps_script_shopping_product_insert]
/**
 * Inserts a product into the products list. Logs the API response.
 */
function productInsert() {
  const merchantId = 123456; // Replace this with your Merchant Center ID.
  // Create a product resource and insert it
  const productResource = {
    'offerId': 'book123',
    'title': 'A Tale of Two Cities',
    'description': 'A classic novel about the French Revolution',
    'link': 'http://my-book-shop.com/tale-of-two-cities.html',
    'imageLink': 'http://my-book-shop.com/tale-of-two-cities.jpg',
    'contentLanguage': 'en',
    'targetCountry': 'US',
    'channel': 'online',
    'availability': 'in stock',
    'condition': 'new',
    'googleProductCategory': 'Media > Books',
    'productType': 'Media > Books',
    'gtin': '9780007350896',
    'price': {
      'value': '2.50',
      'currency': 'USD'
    },
    'shipping': [{
      'country': 'US',
      'service': 'Standard shipping',
      'price': {
        'value': '0.99',
        'currency': 'USD'
      }
    }],
    'shippingWeight': {
      'value': '2',
      'unit': 'pounds'
    }
  };

  try {
    response = ShoppingContent.Products.insert(productResource, merchantId);
    // RESTful insert returns the JSON object as a response.
    console.log(response);
  } catch (e) {
    // TODO (Developer) - Handle exceptions
    console.log('Failed with error: $s', e.error);
  }
}
// [END apps_script_shopping_product_insert]

// [START apps_script_shopping_product_list]
/**
 * Lists the products for a given merchant.
 */
function productList() {
  const merchantId = 123456; // Replace this with your Merchant Center ID.
  let pageToken;
  let pageNum = 1;
  const maxResults = 10;
  try {
    do {
      const products = ShoppingContent.Products.list(merchantId, {
        pageToken: pageToken,
        maxResults: maxResults
      });
      console.log('Page ' + pageNum);
      if (products.resources) {
        for (let i = 0; i < products.resources.length; i++) {
          console.log('Item [' + i + '] ==> ' + products.resources[i]);
        }
      } else {
        console.log('No more products in account ' + merchantId);
      }
      pageToken = products.nextPageToken;
      pageNum++;
    } while (pageToken);
  } catch (e) {
    // TODO (Developer) - Handle exceptions
    console.log('Failed with error: $s', e.error);
  }
}
// [END apps_script_shopping_product_list]

// [START apps_script_shopping_product_batch_insert]
/**
 * Batch updates products. Logs the response.
 * @param  {object} productResource1 The first product resource.
 * @param  {object} productResource2 The second product resource.
 * @param  {object} productResource3 The third product resource.
 */
function custombatch(productResource1, productResource2, productResource3) {
  const merchantId = 123456; // Replace this with your Merchant Center ID.
  custombatchResource = {
    'entries': [
      {
        'batchId': 1,
        'merchantId': merchantId,
        'method': 'insert',
        'productId': 'book124',
        'product': productResource1
      },
      {
        'batchId': 2,
        'merchantId': merchantId,
        'method': 'insert',
        'productId': 'book125',
        'product': productResource2
      },
      {
        'batchId': 3,
        'merchantId': merchantId,
        'method': 'insert',
        'productId': 'book126',
        'product': productResource3
      }
    ]
  };
  try {
    const response = ShoppingContent.Products.custombatch(custombatchResource);
    console.log(response);
  } catch (e) {
    // TODO (Developer) - Handle exceptions
    console.log('Failed with error: $s', e.error);
  }
}
// [END apps_script_shopping_product_batch_insert]

// [START apps_script_shopping_account_info]
/**
 * Updates content account tax information.
 * Logs the API response.
 */
function updateAccountTax() {
  // Replace this with your Merchant Center ID.
  const merchantId = 123456;

  // Replace this with the account that you are updating taxes for.
  const accountId = 123456;

  try {
    const accounttax = ShoppingContent.Accounttax.get(merchantId, accountId);
    console.log(accounttax);

    const taxInfo = {
      accountId: accountId,
      rules: [
        {
          'useGlobalRate': true,
          'locationId': 21135,
          'shippingTaxed': true,
          'country': 'US'
        },
        {
          'ratePercent': 3,
          'locationId': 21136,
          'country': 'US'
        },
        {
          'ratePercent': 2,
          'locationId': 21160,
          'shippingTaxed': true,
          'country': 'US'
        }
      ]
    };

    console.log(ShoppingContent.Accounttax
        .update(taxInfo, merchantId, accountId));
  } catch (e) {
    // TODO (Developer) - Handle exceptions
    console.log('Failed with error: $s', e.error);
  }
}
// [END apps_script_shopping_account_info]
