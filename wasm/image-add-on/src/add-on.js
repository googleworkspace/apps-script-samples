/**
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const COLORS = {
	RED: "#EA4335",
};

const properties = PropertiesService.getUserProperties();

async function card(items) {
	const builder = CardService.newCardBuilder();

	const { quality, format, width, height } = loadSettings();

	const controls = CardService.newCardSection()
		.addWidget(
			CardService.newSelectionInput()
				.setFieldName("quality")
				.setTitle("Quality")
				.setType(CardService.SelectionInputType.RADIO_BUTTON)
				.addItem("Low", "low", quality === "low")
				.addItem("Medium", "medium", quality === "medium")
				.addItem("High", "high", quality === "high"),
		)
		.addWidget(
			CardService.newTextInput()
				.setFieldName("height")
				.setTitle("Height")
				.setMultiline(false)
				.setValue(height ?? ""),
		)
		.addWidget(
			CardService.newTextInput()
				.setFieldName("width")
				.setTitle("Width")
				.setMultiline(false)
				.setValue(width ?? ""),
		)
		.addWidget(
			CardService.newTextButton()
				.setBackgroundColor(COLORS.RED)
				.setText("Apply Settings")
				.setOnClickAction(
					CardService.newAction()
						.setFunctionName("updateSettings")
						.setParameters({})
						.setLoadIndicator(CardService.LoadIndicator.SPINNER),
				),
		)
		.setCollapsible(true)
		.setNumUncollapsibleWidgets(0);

	builder.addSection(controls);

	const sections = await Promise.all(
		(
			items ??
			JSON.parse(
				PropertiesService.getUserProperties().getProperty("selectedItems"),
			)
		)
			.filter((item) => item.mimeType.startsWith("image"))
			.map(async (item) => {
				const section = CardService.newCardSection();

				const bytes = DriveApp.getFileById(item.id).getBlob().getBytes();

				const newBytes = await compress_(bytes, {
					quality: qualityToInt(quality),
					format: item.mimeType.split("/").pop(),
					width: Number.parseInt(width ?? "0"),
					height: Number.parseInt(height ?? "0"),
				});

				const dataUrl = `data:${item.mimeType};base64,${Utilities.base64Encode(
					newBytes,
				)}`;

				section.addWidget(CardService.newImage().setImageUrl(dataUrl));

				section.addWidget(
					CardService.newDecoratedText().setText(bytesToText(newBytes.length)),
				);

				section.addWidget(
					CardService.newButtonSet()
						.addButton(
							CardService.newTextButton()
								.setBackgroundColor(COLORS.RED)
								.setText("Save")
								.setOnClickAction(
									CardService.newAction()
										.setFunctionName("save")
										.setParameters({
											bytes: Utilities.base64Encode(newBytes),
											action: "save",
											item: JSON.stringify(item),
										}),
								),
						)
						.addButton(
							CardService.newTextButton()
								.setBackgroundColor(COLORS.RED)
								.setText("Save Copy")
								.setOnClickAction(
									CardService.newAction()
										.setFunctionName("save")
										.setParameters({
											bytes: Utilities.base64Encode(newBytes),
											action: "save-as",
											item: JSON.stringify(item),
										}),
								),
						),
				);
				return section;
			}),
	);

	for (const section of sections) {
		builder.addSection(section);
	}

	return builder;
}

/**
 * Build a simple card that checks selected items' quota usage. Checking
 * quota usage requires user-permissions, so this add-on provides a button
 * to request `drive.file` scope for items the add-on doesn't yet have
 * permission to access.
 *
 * @param e The event object passed containing contextual information about
 *    the Drive items selected.
 * @return {Card}
 */
async function onItemsSelectedTrigger(e) {
	PropertiesService.getUserProperties().setProperty(
		"selectedItems",
		JSON.stringify(e.drive.selectedItems),
	);
	return (await card(e.drive.selectedItems)).build();
}

/**
 * Callback function for a button action. Instructs Drive to display a
 * permissions dialog to the user, requesting `drive.file` scope for a
 * specific item on behalf of this add-on.
 *
 * @param {Object} e The parameters object that contains the item's
 *   Drive ID.
 * @return {DriveItemsSelectedActionResponse}
 */
function onRequestFileScopeButtonClicked(e) {
	const idToRequest = e.parameters.id;
	return CardService.newDriveItemsSelectedActionResponseBuilder()
		.requestFileScope(idToRequest)
		.build();
}

function onFileScopeGrantedTrigger(e) {
	console.info("after granting item");
	console.info(e);
	const builder = CardService.newCardBuilder();
	return builder.build();
}

function onHomePageTrigger() {
	return CardService.newCardBuilder()
		.setHeader(CardService.newCardHeader().setTitle("Drive Image Compress"))
		.addSection(
			CardService.newCardSection().addWidget(
				CardService.newTextParagraph().setText(
					"Select one or more files in Drive to compress the image.",
				),
			),
		)
		.build();
}

function bytesToText(bytes) {
	const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
	if (bytes === 0) return "0 Byte";
	const i = Number.parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
	return `${Math.round(bytes / 1024 ** i)} ${sizes[i]}`;
}

async function save(...args) {
	console.log(args);
	return CardService.newActionResponseBuilder()
		.setNavigation(CardService.newNavigation().popToRoot())
		.build();
}

async function updateSettings(e) {
	console.log({ e });
	const { formInput } = e;

	persistSettings(formInput);

	return CardService.newActionResponseBuilder()
		.setNavigation(
			CardService.newNavigation()
				.popToRoot()
				.updateCard((await card()).build()),
		)
		.build();
}

function persistSettings(settings) {
	properties.setProperty(
		"settings",
		JSON.stringify({
			...loadSettings,
			...settings,
		}),
	);
}

function loadSettings() {
	const defaults = {
		quality: "medium",
	};

	return {
		...defaults,
		...JSON.parse(properties.getProperty("settings") ?? "{}"),
	};
}

function qualityToInt(quality) {
	switch (quality) {
		case "low":
			return 50;
		case "medium":
			return 80;
		case "high":
			return 90;
	}
}
