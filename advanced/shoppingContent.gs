// [START productInsert]
function productInsert() {
  var merchantId = 123456; // Replace this with your Merchant Center ID.
  // Create a product resource and insert it
  var productResource = {
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

  response = ShoppingContent.Products.insert(productResource, merchantId);
  Logger.log(response); // RESTful insert returns the JSON object as a response.
}
// [END productInsert]

// [START productList]
function productList() {
  var merchantId = 123456; // Replace this with your Merchant Center ID.
  var pageToken;
  var pageNum = 1;
  var maxResults = 10;

  // List all the products for a given merchant.
  do {
    var products = ShoppingContent.Products.list(merchantId, {
      pageToken: pageToken,
      maxResults: maxResults
    });
    Logger.log('Page ' + pageNum);
    if (products.resources) {
      for (var i = 0; i < products.resources.length; i++) {
        Logger.log('Item [' + i + '] ==> ' + products.resources[i]);
      }
    } else {
      Logger.log('No more products in account ' + merchantId);
    }
    pageToken = products.nextPageToken;
    pageNum++;
  } while (pageToken);
}
// [END productList]


// [START productCustombatch]
function custombatch(productResource1, productResource2, productResource3) {
  var merchantId = 123456; // Replace this with your Merchant Center ID.
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
  var response = ShoppingContent.Products.custombatch(custombatchResource);
  Logger.log(response);
}
// [END productCustombatch]


// [START accountInfo]
// Use Accounttax to update account-level taxes.
function updateAccountTax() {
  // Replace this with your Merchant Center ID.
  var merchantId = 123456;

  // Replace this with the account that you are updating taxes for.
  var accountId = 123456;

  var accounttax = ShoppingContent.Accounttax.get(merchantId, accountId);
  Logger.log(accounttax);

  var taxInfo = {
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

  Logger.log(ShoppingContent.Accounttax.update(taxInfo, merchantId, accountId));
}
// [END accountInfo]
