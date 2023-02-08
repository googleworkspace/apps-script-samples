// To learn how to use this script, refer to the documentation:
// https://developers.google.com/apps-script/samples/automations/bracket-maker

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

const RANGE_PLAYER1 = 'FirstPlayer';
const SHEET_PLAYERS = 'Players';
const SHEET_BRACKET = 'Bracket';
const CONNECTOR_WIDTH = 15;

/**
 * Adds a custom menu item to run the script.
 */
function onOpen() {
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.addMenu('Bracket maker',
             [{name: 'Create bracket', functionName: 'createBracket'}]);
}

/**
 * Creates the brackets based on the data provided on the players.
 */
function createBracket() {
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let rangePlayers = ss.getRangeByName(RANGE_PLAYER1);
  let sheetControl = ss.getSheetByName(SHEET_PLAYERS);
  let sheetResults = ss.getSheetByName(SHEET_BRACKET);

  // Gets the players from column A.  Assumes the entire column is filled.
  rangePlayers = rangePlayers.offset(0, 0, sheetControl.getMaxRows() -
      rangePlayers.getRowIndex() + 1, 1);
  let players = rangePlayers.getValues();

  // Figures out how many players there are by skipping the empty cells.
  let numPlayers = 0;
  for (let i = 0; i < players.length; i++) {
    if (!players[i][0] || players[i][0].length == 0) {
      break;
    }
    numPlayers++;
  }
  players = players.slice(0, numPlayers);

  // Provides some error checking in case there are too many or too few players/teams.
  if (numPlayers > 64) {
    Browser.msgBox('Sorry, this script can only create brackets for 64 or fewer players.');
    return; // Early exit
  }

  if (numPlayers < 3) {
    Browser.msgBox('Sorry, you must have at least 3 players.');
    return; // Early exit
  }

  // Clears the 'Bracket' sheet and all formatting.
  sheetResults.clear();

  let upperPower = Math.ceil(Math.log(numPlayers) / Math.log(2));

  // Calculates the number that is a power of 2 and lower than numPlayers.
  let countNodesUpperBound = Math.pow(2, upperPower);

  // Calculates the number that is a power of 2 and higher than numPlayers.
  let countNodesLowerBound = countNodesUpperBound / 2;

  // Determines the number of nodes that will not show in the 1st level.
  let countNodesHidden = numPlayers - countNodesLowerBound;

  // Enters the players for the 1st round.
  let currentPlayer = 0;
  for (let i = 0; i < countNodesLowerBound; i++) {
    if (i < countNodesHidden) {
      // Must be on the first level
      let rng = sheetResults.getRange(i * 4 + 1, 1);
      setBracketItem_(rng, players);
      setBracketItem_(rng.offset(2, 0, 1, 1), players);
      setConnector_(sheetResults, rng.offset(0, 1, 3, 1));
      setBracketItem_(rng.offset(1, 2, 1, 1));
    } else {
      // This player gets a bye.
      setBracketItem_(sheetResults.getRange(i * 4 + 2, 3), players);
    }
  }

  // Fills in the rest of the bracket.
  upperPower--;
  for (let i = 0; i < upperPower; i++) {
    let pow1 = Math.pow(2, i + 1);
    let pow2 = Math.pow(2, i + 2);
    let pow3 = Math.pow(2, i + 3);
    for (let j = 0; j < Math.pow(2, upperPower - i - 1); j++) {
      setBracketItem_(sheetResults.getRange((j * pow3) + pow2, i * 2 + 5));
      setConnector_(sheetResults, sheetResults.getRange((j * pow3) + pow1, i * 2 + 4, pow2 + 1, 1));
    }
  }
}

/**
 * Sets the value of an item in the bracket and the color.
 * @param {Range} rng The Spreadsheet Range.
 * @param {string[]} players The list of players.
 */
function setBracketItem_(rng, players) {
  if (players) {
    let rand = Math.ceil(Math.random() * players.length);
    rng.setValue(players.splice(rand - 1, 1)[0][0]);
  }
  rng.setBackgroundColor('yellow');
}

/**
 * Sets the color and width for connector cells.
 * @param {Sheet} sheet The spreadsheet to setup.
 * @param {Range} rng The spreadsheet range.
 */
function setConnector_(sheet, rng) {
  sheet.setColumnWidth(rng.getColumnIndex(), CONNECTOR_WIDTH);
  rng.setBackgroundColor('green');
}