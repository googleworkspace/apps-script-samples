// [START restaurantLocationsMap]
function restaurantLocationsMap() {
  // Get the sheet named 'restaurants'
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('restaurants');

  // Store the restaurant name and address data in a 2-dimensional array called
  // restaurantInfo. This is the data in cells A2:B4
  var restaurantInfo = sheet.getRange(2, 1, sheet.getLastRow() - 1, 2).getValues();

  // Create a new StaticMap
  var restaurantMap = Maps.newStaticMap();

  // Create a new UI Application, which we use to display the map
  var ui = UiApp.createApplication();

  // Create a grid widget to use for displaying the text of the restaurant names
  // and addresses. Start by populating the header row in the grid.
  var grid = ui.createGrid(restaurantInfo.length + 1, 3);
  grid.setWidget(0, 0, ui.createLabel('Store #').setStyleAttribute('fontWeight', 'bold'));
  grid.setWidget(0, 1, ui.createLabel('Store Name').setStyleAttribute('fontWeight', 'bold'));
  grid.setWidget(0, 2, ui.createLabel('Address').setStyleAttribute('fontWeight', 'bold'));

  // For each entry in restaurantInfo, create a map marker with the address and
  // the style we want. Also add the address info for this restaurant to the
  // grid widget.
  for (var i = 0; i < restaurantInfo.length; i++) {
    restaurantMap.setMarkerStyle(Maps.StaticMap.MarkerSize.MID,
                                 Maps.StaticMap.Color.GREEN,
                                 i + 1);
    restaurantMap.addMarker(restaurantInfo[i][1]);

    grid.setWidget(i + 1, 0, ui.createLabel((i + 1).toString()));
    grid.setWidget(i + 1, 1, ui.createLabel(restaurantInfo[i][0]));
    grid.setWidget(i + 1, 2, ui.createLabel(restaurantInfo[i][1]));
  }

  // Create a Flow Panel widget. We add the map and the grid to this panel.
  // The height needs to be able to accomodate the number of restaurants, so we
  // use a calculation to scale it based on the number of restaurants.
  var panel = ui.createFlowPanel().setSize('500px', 515 + (restaurantInfo.length * 25) + 'px');

  // Get the URL of the restaurant map and use that to create an image and add
  // it to the panel. Next add the grid to the panel.
  panel.add(ui.createImage(restaurantMap.getMapUrl()));
  panel.add(grid);

  // Finally, add the panel widget to our UI instance, and set its height,
  // width, and title.
  ui.add(panel);
  ui.setHeight(515 + (restaurantInfo.length * 25));
  ui.setWidth(500);
  ui.setTitle('Restaurant Locations');

  // Make the UI visible in the spreadsheet.
  SpreadsheetApp.getActiveSpreadsheet().show(ui);
}
// [END restaurantLocationsMap]

// [START getDrivingDirections]
function getDrivingDirections() {
  // Set starting and ending addresses
  var start = '1600 Amphitheatre Pkwy, Mountain View, CA 94043';
  var end = '345 Spear St, San Francisco, CA 94105';

  // These regular expressions will be used to strip out
  // unneeded HTML tags
  var r1 = new RegExp('<b>', 'g');
  var r2 = new RegExp('</b>', 'g');
  var r3 = new RegExp('<div style="font-size:0.9em">', 'g');
  var r4 = new RegExp('</div>', 'g');

  // points is used for storing the points in the step-by-step directions
  var points = [];

  // currentLabel is used for number the steps in the directions
  var currentLabel = 0;

  // This will be the map on which we display the path
  var map = Maps.newStaticMap().setSize(500, 350);

  // Create a new UI Application, which we use to display the map
  var ui = UiApp.createApplication();
  // Create a Flow Panel widget, which we use for the directions text
  var directionsPanel = ui.createFlowPanel();

  // Create a new DirectionFinder with our start and end addresses, and request the directions
  // The response is a JSON object, which contains the directions
  var directions = Maps.newDirectionFinder().setOrigin(start).setDestination(end).getDirections();

  // Much of this code is based on the template referenced in
  // http://googleappsdeveloper.blogspot.com/2010/06/automatically-generate-maps-and.html
  for (var i in directions.routes) {
    for (var j in directions.routes[i].legs) {
      for (var k in directions.routes[i].legs[j].steps) {
        // Parse out the current step in the directions
        var step = directions.routes[i].legs[j].steps[k];

        // Call Maps.decodePolyline() to decode the polyline for
        // this step into an array of latitudes and longitudes
        var path = Maps.decodePolyline(step.polyline.points);
        points = points.concat(path);

        // Pull out the direction information from step.html_instructions
        // Because we only want to display text, we will strip out the
        // HTML tags that are present in the html_instructions
        var text = step.html_instructions;
        text = text.replace(r1, ' ');
        text = text.replace(r2, ' ');
        text = text.replace(r3, ' ');
        text = text.replace(r4, ' ');

        // Add each step in the directions to the directionsPanel
        directionsPanel.add(ui.createLabel((++currentLabel) + ' - ' + text));
      }
    }
  }

  // be conservative and only sample 100 times to create our polyline path
  var lpoints=[];
  if (points.length < 200)
    lpoints = points;
  else {
    var pCount = (points.length / 2);
    var step = parseInt(pCount / 100);
    for (var i = 0; i < 100; ++i) {
      lpoints.push(points[i * step * 2]);
      lpoints.push(points[(i * step * 2) + 1]);
    }
  }

  // make the polyline
  if (lpoints.length > 0) {
    // Maps.encodePolyline turns an array of latitudes and longitudes
    // into an encoded polyline
    var pline = Maps.encodePolyline(lpoints);

    // Once we have the encoded polyline, add that path to the map
    map.addPath(pline);
  }

  // Create a FlowPanel to hold the map
  var panel = ui.createFlowPanel().setSize('500px', '350px');

  // Get the URL of the map and use that to create an image and add
  // it to the panel.
  panel.add(ui.createImage(map.getMapUrl()));

  // Add both the map panel and the directions panel to the UI instance
  ui.add(panel);
  ui.add(directionsPanel);

  // Next set the title, height, and width of the UI instance
  ui.setTitle('Driving Directions');
  ui.setHeight(525);
  ui.setWidth(500);

  // Finally, display the UI within the spreadsheet
  SpreadsheetApp.getActiveSpreadsheet().show(ui);
}
// [END getDrivingDirections]

// [START foo]
function analyzeLocations() {
  // Select the sheet named 'geocoder and elevation'
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('geocoder and elevation');

  // Store the address data in an array called
  // locationInfo. This is the data in cells A2:A20
  var locationInfo = sheet.getRange(2, 1, sheet.getLastRow() - 1, 1).getValues();

  // Set up some values to use for comparisons.
  // latitudes run from -90 to 90, so we start with a max of -90 for comparison
  var maxLatitude = -90;
  var indexOfMaxLatitude = 0;

  // Set the starting max elevation to 0, or sea level
  var maxElevation = 0;
  var indexOfMaxElevation = 0;

  // geoResults will hold the JSON results array that we get when calling geocode()
  var geoResults;

  // elevationResults will hold the results object that we get when calling sampleLocation()
  var elevationResults;

  // lat and lng will temporarily hold the latitude and longitude of each
  // address
  var lat, lng;

  for (var i = 0; i < locationInfo.length; i++) {
    // Get the latitude and longitude for an address. For more details on
    // the JSON results array, geoResults, see
    // http://code.google.com/apis/maps/documentation/geocoding/#Results
    geoResults = Maps.newGeocoder().geocode(locationInfo[i]);

    // Get the latitude and longitude
    lat = geoResults.results[0].geometry.location.lat;
    lng = geoResults.results[0].geometry.location.lng;

    // Use the latitude and longitude to call sampleLocation and get the
    // elevation. For more details on the JSON-formatted results object,
    // elevationResults, see
    // http://code.google.com/apis/maps/documentation/elevation/#ElevationResponses
    elevationResults = Maps.newElevationSampler().sampleLocation(parseFloat(lat), parseFloat(lng));

    // Check to see if the current latitude is greater than our max latitude
    // so far. If so, set maxLatitude and indexOfMaxLatitude
    if (lat > maxLatitude) {
      maxLatitude = lat;
      indexOfMaxLatitude = i;
    }

    // Check if elevationResults has a good status and also if the current
    // elevation is greater than the max elevation so far. If so, set
    // maxElevation and indexOfMaxElevation
    if (elevationResults.status == 'OK' && elevationResults.results[0].elevation > maxElevation) {
      maxElevation = elevationResults.results[0].elevation;
      indexOfMaxElevation = i;
    }
  }

  // User Browser.msgBox as a simple way to display the info about highest
  // elevation and northernmost office.
  Browser.msgBox('The US Google office with the highest elevation is: ' + locationInfo[indexOfMaxElevation] +
                 '. The northernmost US Google office is: ' + locationInfo[indexOfMaxLatitude]);
}
// [END foo]
