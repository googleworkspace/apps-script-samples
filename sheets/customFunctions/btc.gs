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
 
// See https://support.coinbase.com/customer/en/portal/articles/1914910-how-can-i-generate-api-keys-within-coinbase-commerce-
var COINBASE_API_TOKEN = ''; // TODO
/**
 * Get's the bitcoin price at a date.
 *
 * @param {string} date The date in yyyy-MM-dd format. Defaults to today.
 * @return The value of BTC in USD at the date. From Coinbase's API
 * @customfunction
 */
function BTC(date) {
  var dateObject = new Date();
  if (date) {
    dateObject = new Date(date);
  }
  var dateString = Utilities.formatDate(dateObject, "GMT", "yyyy-MM-dd");
  var res = UrlFetchApp.fetch("https://api.coinbase.com/v2/prices/BTC-USD/spot?date=" + dateString, {
     headers: {
      "CB-VERSION": "2016-10-10",
      Authorization: "Bearer " + COINBASE_API_TOKEN
    }
  });
  var json = JSON.parse(res.getContentText());
  return json.data.amount;
}
