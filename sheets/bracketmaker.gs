// This script works with the Brackets Test spreadsheet to create a tournament bracket
// given a list of players or teams.

var RANGE_PLAYER1 = 'FirstPlayer';
var SHEET_PLAYERS = 'Players';
var SHEET_BRACKET = 'Bracket';
var CONNECTOR_WIDTH = 15;

// This method adds a custom menu item to run the script
function onOpen() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.addMenu("Bracket Maker",
             [{ name: "Create Bracket", functionName: "createBracket" }]);
}

// This method creates the brackets based on the data provided on the players
function createBracket() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var rangePlayers = ss.getRangeByName(RANGE_PLAYER1);
  var sheetControl = ss.getSheetByName(SHEET_PLAYERS);
  var sheetResults = ss.getSheetByName(SHEET_BRACKET);

  // Get the players from column A.  We assume the entire column is filled here.
  rangePlayers = rangePlayers.offset(0, 0, sheetControl.getMaxRows() -
      rangePlayers.getRowIndex() + 1, 1);
  var players = rangePlayers.getValues();

  // Now figure out how many players there are(ie don't count the empty cells)
  var numPlayers = 0;
  for (var i = 0; i < players.length; i++) {
    if (!players[i][0] || players[i][0].length == 0) {
      break;
    }
    numPlayers++;
  }
  players = players.slice(0, numPlayers);

  // Provide some error checking in case there are too many or too few players/teams.
  if (numPlayers > 64) {
    Browser.msgBox("Sorry, currently this script can only create brackets for 64 or fewer players.");
    return; // Early exit
  }

  if (numPlayers < 3) {
    Browser.msgBox("Sorry, you must have at least 3 players.");
    return; // Early exit
  }

  // First clear the results sheet and all formatting
  sheetResults.clear();

  var upperPower = Math.ceil(Math.log(numPlayers) / Math.log(2));

  // Find out what is the number that is a power of 2 and lower than numPlayers.
  var countNodesUpperBound = Math.pow(2, upperPower);

  // Find out what is the number that is a power of 2 and higher than numPlayers.
  var countNodesLowerBound = countNodesUpperBound / 2;

  // This is the number of nodes that will not show in the 1st level.
  var countNodesHidden = numPlayers - countNodesLowerBound;

  // Enter the players for the 1st round
  var currentPlayer = 0;
  for (var i = 0; i < countNodesLowerBound; i++) {
    if (i < countNodesHidden) {
      // Must be on the first level
      var rng = sheetResults.getRange(i * 4 + 1, 1);
      setBracketItem_(rng, players);
      setBracketItem_(rng.offset(2, 0, 1, 1), players);
      setConnector_(sheetResults, rng.offset(0, 1, 3, 1));
      setBracketItem_(rng.offset(1, 2, 1, 1));
    } else {
      // This player gets a bye
      setBracketItem_(sheetResults.getRange(i * 4 + 2, 3), players);
    }
  }

  // Now fill in the rest of the bracket
  upperPower--;
  for (var i = 0; i < upperPower; i++) {
    var pow1 = Math.pow(2, i + 1);
    var pow2 = Math.pow(2, i + 2);
    var pow3 = Math.pow(2, i + 3);
    for (var j = 0; j < Math.pow(2, upperPower - i - 1); j++) {
      setBracketItem_(sheetResults.getRange((j * pow3) + pow2, i * 2 + 5));
      setConnector_(sheetResults, sheetResults.getRange((j * pow3) + pow1, i * 2 + 4, pow2 + 1, 1));
    }
  }
}

// Sets the value of an item in the bracket and the color.
function setBracketItem_(rng, players) {
  if (players) {
    var rand = Math.ceil(Math.random() * players.length);
    rng.setValue(players.splice(rand - 1, 1)[0][0]);
  }
  rng.setBackgroundColor('yellow');
}

// Sets the color and width for connector cells.
function setConnector_(sheet, rng) {
  sheet.setColumnWidth(rng.getColumnIndex(), CONNECTOR_WIDTH);
  rng.setBackgroundColor('green');
}
