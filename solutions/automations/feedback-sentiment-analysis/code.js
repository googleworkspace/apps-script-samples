// To learn how to use this script, refer to the documentation:
// https://developers.google.com/apps-script/samples/automations/feedback-sentiment-analysis

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

// Sets API key for accessing Cloud Natural Language API.
const myApiKey = "YOUR_API_KEY"; // Replace with your API key.

// Matches column names in Review Data sheet to variables.
const COLUMN_NAME = {
	COMMENTS: "comments",
	ENTITY: "entity_sentiment",
	ID: "id",
};

/**
 * Creates a Demo menu in Google Spreadsheets.
 */
function onOpen() {
	SpreadsheetApp.getUi()
		.createMenu("Sentiment Tools")
		.addItem("Mark entities and sentiment", "markEntitySentiment")
		.addToUi();
}

/**
 * Analyzes entities and sentiment for each comment in
 * Review Data sheet and copies results into the
 * Entity Sentiment Data sheet.
 */
function markEntitySentiment() {
	// Sets variables for "Review Data" sheet
	const ss = SpreadsheetApp.getActiveSpreadsheet();
	const dataSheet = ss.getSheetByName("Review Data");
	const rows = dataSheet.getDataRange();
	const numRows = rows.getNumRows();
	const values = rows.getValues();
	const headerRow = values[0];

	// Checks to see if "Entity Sentiment Data" sheet is present, and
	// if not, creates a new sheet and sets the header row.
	const entitySheet = ss.getSheetByName("Entity Sentiment Data");
	if (entitySheet == null) {
		ss.insertSheet("Entity Sentiment Data");
		const entitySheet = ss.getSheetByName("Entity Sentiment Data");
		const esHeaderRange = entitySheet.getRange(1, 1, 1, 6);
		const esHeader = [
			[
				"Review ID",
				"Entity",
				"Salience",
				"Sentiment Score",
				"Sentiment Magnitude",
				"Number of mentions",
			],
		];
		esHeaderRange.setValues(esHeader);
	}

	// Finds the column index for comments, language_detected,
	// and comments_english columns.
	const textColumnIdx = headerRow.indexOf(COLUMN_NAME.COMMENTS);
	const entityColumnIdx = headerRow.indexOf(COLUMN_NAME.ENTITY);
	const idColumnIdx = headerRow.indexOf(COLUMN_NAME.ID);
	if (entityColumnIdx == -1) {
		Browser.msgBox(
			"Error: Could not find the column named " +
				COLUMN_NAME.ENTITY +
				'. Please create an empty column with header "entity_sentiment" on the Review Data tab.',
		);
		return; // bail
	}

	ss.toast("Analyzing entities and sentiment...");
	for (let i = 0; i < numRows; ++i) {
		const value = values[i];
		const commentEnCellVal = value[textColumnIdx];
		const entityCellVal = value[entityColumnIdx];
		const reviewId = value[idColumnIdx];

		// Calls retrieveEntitySentiment function for each row that has a comment
		// and also an empty entity_sentiment cell value.
		if (commentEnCellVal && !entityCellVal) {
			const nlData = retrieveEntitySentiment(commentEnCellVal);
			// Pastes each entity and sentiment score into Entity Sentiment Data sheet.
			const newValues = [];
			for (let entity in nlData.entities) {
				entity = nlData.entities[entity];
				const row = [
					reviewId,
					entity.name,
					entity.salience,
					entity.sentiment.score,
					entity.sentiment.magnitude,
					entity.mentions.length,
				];
				newValues.push(row);
			}
			if (newValues.length) {
				entitySheet
					.getRange(
						entitySheet.getLastRow() + 1,
						1,
						newValues.length,
						newValues[0].length,
					)
					.setValues(newValues);
			}
			// Pastes "complete" into entity_sentiment column to denote completion of NL API call.
			dataSheet.getRange(i + 1, entityColumnIdx + 1).setValue("complete");
		}
	}
}

/**
 * Calls the Cloud Natural Language API with a string of text to analyze
 * entities and sentiment present in the string.
 * @param {String} the string for entity sentiment analysis
 * @return {Object} the entities and related sentiment present in the string
 */
function retrieveEntitySentiment(line) {
	const apiKey = myApiKey;
	const apiEndpoint =
		"https://language.googleapis.com/v1/documents:analyzeEntitySentiment?key=" +
		apiKey;
	// Creates a JSON request, with text string, language, type and encoding
	const nlData = {
		document: {
			language: "en-us",
			type: "PLAIN_TEXT",
			content: line,
		},
		encodingType: "UTF8",
	};
	// Packages all of the options and the data together for the API call.
	const nlOptions = {
		method: "post",
		contentType: "application/json",
		payload: JSON.stringify(nlData),
	};
	// Makes the API call.
	const response = UrlFetchApp.fetch(apiEndpoint, nlOptions);
	return JSON.parse(response);
}
