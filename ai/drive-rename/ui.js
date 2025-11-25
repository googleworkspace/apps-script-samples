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

const ICO_HEADER =
	"https://fonts.gstatic.com/s/i/googlematerialicons/drive_file_rename_outline/v12/googblue-48dp/2x/gm_drive_file_rename_outline_googblue_48dp.png";
const ICON_RENAME =
	"https://fonts.gstatic.com/s/i/googlematerialicons/drive_file_rename_outline/v12/googblue-18dp/2x/gm_drive_file_rename_outline_googblue_18dp.png";
const ICON_RETRY =
	"https://fonts.gstatic.com/s/i/googlematerialicons/refresh/v16/googblue-18dp/2x/gm_refresh_googblue_18dp.png";
const ICON_DELETE =
	"https://fonts.gstatic.com/s/i/googlematerialicons/delete/v17/black-18dp/2x/gm_delete_black_18dp.png";

/**
 * Builds the card for the selected active item.
 *
 * @param e - Add-on event context
 */
function buildSelectionPage(e) {
	const selected = e.drive.activeCursorItem;

	// Check if Google Doc type, respond unsupported if not
	if (selected.mimeType !== "application/vnd.google-apps.document") {
		return {
			sections: [
				{
					widgets: [
						{
							textParagraph: {
								text: "<b>Note</b>: currently only <i>Google Docs<i/> file types are supported.",
							},
						},
					],
				},
			],
			header: buildHeader(),
		};
	}

	// Get document body
	const docBody = getDocumentBody(selected.id);

	//  Create widgets starting with Title
	const widgets = [
		{
			textParagraph: {
				text: `<b>${selected.title}</b>`,
			},
		},
	];

	// Check if doc is empty before calling AI
	if (docBody.length > 1) {
		// Get AI data
		const aiResponse = getAiSummary(docBody);

		console.log("RESPONSE");

		console.log(aiResponse);

		//  Add the Summary text
		widgets.push({
			decoratedText: {
				topLabel: "Summary",
				text: aiResponse.summary,
				wrapText: true,
			},
		});

		// Divider
		widgets.push({ divider: {} });

		// Create an object of items
		const items = [];
		for (const name of aiResponse.names) {
			items.push({
				text: name,
				value: name,
				selected: false,
			});
		}

		// Set first item as selected
		items[0].selected = true;

		// Add the Radio button of 'names' as items
		widgets.push({
			selectionInput: {
				name: "names",
				label: "Select a new name",
				type: "RADIO_BUTTON",
				items: items,
			},
		});

		// Create the 'Rename' button
		widgets.push({
			buttonList: {
				buttons: [
					{
						text: "Rename",
						icon: {
							iconUrl: ICON_RENAME,
							altText: "Rename",
						},
						onClick: {
							action: {
								function: "renameFile",
								parameters: [
									{
										key: "id",
										value: selected.id,
									},
								],
								loadIndicator: "SPINNER",
							},
						},
					},
					{
						text: "",
						icon: {
							iconUrl: ICON_RETRY,
							altText: "Retry",
						},
						onClick: {
							action: {
								function: "updateCard",
								parameters: [
									{
										key: "id",
										value: selected.id,
									},
								],
								loadIndicator: "SPINNER",
							},
						},
					},
				],
			},
			horizontalAlignment: "CENTER",
		});
	} // end if

	// Don't call AI, but offer to delete
	else {
		//  Add the Summary text
		widgets.push({
			decoratedText: {
				topLabel: "Summary",
				text: "Empty document",
				wrapText: true,
			},
		});

		// Divider
		widgets.push({ divider: {} });

		// Create the 'Delete' button
		widgets.push({
			buttonList: {
				buttons: [
					{
						text: "Move to trash",
						icon: {
							iconUrl: ICON_DELETE,
							altText: "Move to trash",
						},
						onClick: {
							action: {
								function: "moveFileToTrash",
								parameters: [
									{
										key: "id",
										value: selected.id,
									},
								],
								loadIndicator: "SPINNER",
							},
						},
						color: {
							red: 0.961,
							green: 0.6,
							blue: 0.667,
							alpha: 1,
						},
					},
				],
			},
			horizontalAlignment: "CENTER",
		});
	} // end else

	return {
		sections: [
			{
				widgets,
			},
		],
		header: buildHeader(),
	};
}

/**
 * Builds the header for the Add-on Cards.
 */
function buildHeader() {
	const header = {
		title: "Name with Intelligence",
		subtitle: `"<i>Untitled documents</i>" no more!`, // Better Doc names w/ Gemini AI",
		imageUrl: ICO_HEADER,
		imageType: "SQUARE",
	};
	return header;
}

/**
 * Builds the home page card.
 */
function buildHomePage() {
	const widgets = [
		{
			textParagraph: {
				text: "<b>Name with Intelligence</b> enables you to quickly rename any Google Doc using suggestions provided via Google Gemini.",
			},
		},
		{ divider: {} },
		{
			textParagraph: {
				text: "👉 To use, select a Google Doc to rename. Then choose a new name from the list of AI generated names provided for you. A quick summary of the file is also provided by Google Gemini to help you make your decision.",
			},
		},
		{ divider: {} },
		{
			textParagraph: {
				text: "<b>Note</b>: currently only <i>Google Docs<i/> file types are supported.",
			},
		},
	];

	return {
		sections: [
			{
				widgets,
			},
		],
		header: buildHeader(),
	};
}
