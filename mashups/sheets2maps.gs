/**
 * A custom function that gets the county (or equivalent administrative
 * district) that an address lies within. Use within a cell like:
 *
 * =COUNTY("76 9th Ave, New York NY")
 *
 * This script must be attached to the spreadsheet (created in Google Sheets
 * under "Tools > Script editor").
 *
 * @param {String} address The address to lookup.
 * @return {String} The county (or equivalent) the address is within.
 * @customFunction
 */
function COUNTY(address) {
  var results = Maps.newGeocoder().geocode(address).results;
  if (!results || results.length === 0) {
    throw new Error('Unknown address');
  }
  var counties = results[0].address_components.filter(function(component) {
    return component.types.indexOf('administrative_area_level_2') >= 0;
  });
  if (!counties.length) {
    throw new Error('Unable to determine county');
  }
  return counties[0].long_name;
}
