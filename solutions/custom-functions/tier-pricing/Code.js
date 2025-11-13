// To learn how to use this script, refer to the documentation:
// https://developers.google.com/apps-script/samples/custom-functions/tier-pricing

/*
Copyright 2022 Google LLC

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

/**
 * Calculates the tiered pricing discount.  
 *  
 * You must provide a value to calculate its discount. The value can be a string or a reference
 * to a cell that contains a string.
 * You must provide a data table range, for example, $B$4:$D$7, that includes the 
 * tier start, end, and percent columns. If your table has headers, don't include
 * the headers in the range.
 * 
 * @param {string} value The value to calculate the discount for, which can be a string or a 
 * reference to a cell that contains a string.
 * @param {string} table The tier table data range using A1 notation.
 * @return number The total discount amount for the value.
 * @customfunction
 *  
 */
function tierPrice(value, table) {
  let total = 0;
  // Creates an array for each row of the table and loops through each array.
  for (let [start, end, percent] of table) {
  // Checks if the value is less than the starting value of the tier. If it is less, the loop stops.
    if (value < start) {
      break;
    }
  // Calculates the portion of the value to be multiplied by the tier's percent value.
    let amount = Math.min(value, end) - start;
  // Multiplies the amount by the tier's percent value and adds the product to the total.
    total += amount * percent;
  }
  return total;
}
  