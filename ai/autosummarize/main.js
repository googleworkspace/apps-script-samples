/*
Copyright 2024 Google LLC

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
 * Creates a menu entry in the Google Sheets Extensions menu when the document is opened.
 *
 * @param {object} e The event parameter for a simple onOpen trigger.
 */
function onOpen(e) {
	SpreadsheetApp.getUi()
		.createAddonMenu()
		.addItem("📄 Open AutoSummarize AI", "showSidebar")
		.addSeparator()
		.addItem("❎ Quick summary", "doAutoSummarizeAI")
		.addItem("❌ Remove all summaries", "removeAllSummaries")
		.addToUi();
}

/**
 * Runs when the add-on is installed; calls onOpen() to ensure menu creation and
 * any other initializion work is done immediately. This method is only used by
 * the desktop add-on and is never called by the mobile version.
 *
 * @param {object} e The event parameter for a simple onInstall trigger.
 */
function onInstall(e) {
	onOpen(e);
}

/**
 * Opens sidebar in Sheets with AutoSummarize AI interface.
 */
function showSidebar() {
	const ui =
		HtmlService.createHtmlOutputFromFile("sidebar").setTitle(
			"AutoSummarize AI",
		);
	SpreadsheetApp.getUi().showSidebar(ui);
}

/**
 * Deletes all of the AutoSummarize AI created sheets
 *  i.e. any sheets with prefix of 'AutoSummarize AI'
 */
function removeAllSummaries() {
	const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
	const allSheets = spreadsheet.getSheets();

	for (const sheet of allSheets) {
		const sheetName = sheet.getName();
		// Check if the sheet name starts with "AutoSummarize AI"
		if (sheetName.startsWith("AutoSummarize AI")) {
			spreadsheet.deleteSheet(sheet);
		}
	}
}

/**
 * Wrapper function for add-on.
 */
function doAutoSummarizeAI(
	customPrompt1,
	customPrompt2,
	temperature = 0.1,
	tokens = 2048,
) {
	// Get selected cell values.
	console.log("Getting selection...");
	const selection = SpreadsheetApp.getSelection()
		.getActiveRange()
		.getRichTextValues()
		.map((value) => {
			if (value[0].getLinkUrl()) {
				return value[0].getLinkUrl();
			}
			return value[0].getText();
		});

	// Get AI summary
	const data = summarizeFiles(
		selection,
		customPrompt1,
		customPrompt2,
		temperature,
		tokens,
	);

	// Add and format a new new sheet.
	const now = new Date();
	const nowFormatted = Utilities.formatDate(
		now,
		now.getTimezoneOffset().toString(),
		"MM/dd HH:mm",
	);
	let sheetName = `AutoSummarize AI (${nowFormatted})`;
	if (SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName)) {
		sheetName = `AutoSummarize AI (${nowFormatted}:${now.getSeconds()})`;
	}
	const aiSheet = SpreadsheetApp.getActiveSpreadsheet()
		.insertSheet()
		.setName(sheetName);
	const aiSheetHeaderStyle = SpreadsheetApp.newTextStyle()
		.setFontSize(12)
		.setBold(true)
		.setFontFamily("Google Sans")
		.setForegroundColor("#ffffff")
		.build();
	const aiSheetValuesStyle = SpreadsheetApp.newTextStyle()
		.setFontSize(10)
		.setBold(false)
		.setFontFamily("Google Sans")
		.setForegroundColor("#000000")
		.build();
	aiSheet
		.getRange("A1:E1")
		.setBackground("#434343")
		.setTextStyle(aiSheetHeaderStyle)
		.setValues([
			[
				"Link",
				"Title",
				`Summary from Gemini AI [Temperature: ${temperature}]`,
				`Custom Prompt #1: ${customPrompt1}`,
				`Custom Prompt #2: ${customPrompt2}`,
			],
		])
		.setWrap(true);
	aiSheet.setColumnWidths(1, 1, 100);
	aiSheet.setColumnWidths(2, 1, 300);
	aiSheet.setColumnWidths(3, 3, 300);

	// Copy results
	aiSheet.getRange(`A2:E${data.length + 1}`).setValues(data);

	aiSheet
		.getRange(`A2:E${data.length + 1}`)
		.setBackground("#ffffff")
		.setTextStyle(aiSheetValuesStyle)
		.setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP)
		.setVerticalAlignment("top");
	aiSheet
		.getRange(`C2:E${data.length + 1}`)
		.setBackground("#efefef")
		.setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);

	aiSheet.deleteColumns(8, 19);
	aiSheet.deleteRows(
		aiSheet.getLastRow() + 1,
		aiSheet.getMaxRows() - aiSheet.getLastRow(),
	);
}
