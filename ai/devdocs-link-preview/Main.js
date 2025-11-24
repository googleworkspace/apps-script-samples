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
 * Creates a link preview card for Google developer documentation links.
 *
 * @param {!Object} event
 * @return {!Card}
 */
function onLinkPreview(event) {
	const hostApp = event.hostApp;
	if (!event[hostApp].matchedUrl.url) {
		return;
	}
	const url = event[hostApp].matchedUrl.url;
	try {
		const info = getPageSummary(url);
		const card = buildCard(info.title, info.summary);
		const linkPreview = CardService.newLinkPreview()
			.setPreviewCard(card)
			.setTitle(info.title)
			.setLinkPreviewTitle(info.title);
		return linkPreview;
	} catch (error) {
		// Log the error
		console.error("Error occurred:", error);
		const errorCard = buildErrorCard();
		return CardService.newActionResponseBuilder()
			.setNavigation(CardService.newNavigation().updateCard(errorCard))
			.build();
	}
}

/**
 * Action handler for a good rating .
 *
 * @param {!Object} e The event passed from click action.
 * @return {!Card}
 */
function onRatingClicked(e) {
	const key = e.parameters.key;
	const title = e.parameters.title;
	const pageSummary = e.parameters.pageSummary;

	const properties = PropertiesService.getScriptProperties();
	let rating = Number(properties.getProperty(key) ?? 0);
	properties.setProperty(key, ++rating);

	const card = buildCard(title, pageSummary, false);
	const linkPreview = CardService.newLinkPreview()
		.setPreviewCard(card)
		.setTitle(title)
		.setLinkPreviewTitle(title);

	return linkPreview;
}
