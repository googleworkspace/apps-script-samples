// To learn how to use this script, refer to the documentation:
// https://developers.google.com/apps-script/samples/automations/youtube-tracker

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

// Sets preferences for email notification. Choose 'Y' to send emails, 'N' to skip emails.
const EMAIL_ON = "Y";

// Matches column names in Video sheet to variables. If the column names change, update these variables.
const COLUMN_NAME = {
	VIDEO: "Video Link",
	TITLE: "Video Title",
};

/**
 * Gets YouTube video details and statistics for all
 * video URLs listed in 'Video Link' column in each
 * sheet. Sends email summary, based on preferences above,
 * when videos have new comments or replies.
 */
function markVideos() {
	const ss = SpreadsheetApp.getActiveSpreadsheet();
	const sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();

	// Runs through process for each tab in Spreadsheet.
	sheets.forEach((dataSheet) => {
		const tabName = dataSheet.getName();
		const range = dataSheet.getDataRange();
		const numRows = range.getNumRows();
		const rows = range.getValues();
		const headerRow = rows[0];

		// Finds the column indices.
		const videoColumnIdx = headerRow.indexOf(COLUMN_NAME.VIDEO);
		const titleColumnIdx = headerRow.indexOf(COLUMN_NAME.TITLE);

		// Creates empty array to collect data for email table.
		const emailContent = [];

		// Processes each row in spreadsheet.
		for (let i = 1; i < numRows; ++i) {
			const row = rows[i];
			// Extracts video ID.
			const videoId = extractVideoIdFromUrl(row[videoColumnIdx]);
			// Processes each row that contains a video ID.
			if (!videoId) {
				continue;
			}
			// Calls getVideoDetails function and extracts target data for the video.
			const detailsResponse = getVideoDetails(videoId);
			const title = detailsResponse.items[0].snippet.title;
			const publishDate = detailsResponse.items[0].snippet.publishedAt;
			const publishDateFormatted = new Date(publishDate);
			const views = detailsResponse.items[0].statistics.viewCount;
			const likes = detailsResponse.items[0].statistics.likeCount;
			const comments = detailsResponse.items[0].statistics.commentCount;
			const channel = detailsResponse.items[0].snippet.channelTitle;

			// Collects title, publish date, channel, views, comments, likes details and pastes into tab.
			const detailsRow = [
				title,
				publishDateFormatted,
				channel,
				views,
				comments,
				likes,
			];
			dataSheet
				.getRange(i + 1, titleColumnIdx + 1, 1, 6)
				.setValues([detailsRow]);

			// Determines if new count of comments/replies is greater than old count of comments/replies.
			const addlCommentCount = comments - row[titleColumnIdx + 4];

			// Adds video title, link, and additional comment count to table if new counts > old counts.
			if (addlCommentCount > 0) {
				const emailRow = [title, row[videoColumnIdx], addlCommentCount];
				emailContent.push(emailRow);
			}
		}
		// Sends notification email if Content is not empty.
		if (emailContent.length > 0 && EMAIL_ON == "Y") {
			sendEmailNotificationTemplate(emailContent, tabName);
		}
	});
}

/**
 * Gets video details for YouTube videos
 * using YouTube advanced service.
 */
function getVideoDetails(videoId) {
	const part = "snippet,statistics";
	const response = YouTube.Videos.list(part, { id: videoId });
	return response;
}

/**
 * Extracts YouTube video ID from url.
 * (h/t https://stackoverflow.com/a/3452617)
 */
function extractVideoIdFromUrl(url) {
	let videoId = url.split("v=")[1];
	const ampersandPosition = videoId.indexOf("&");
	if (ampersandPosition != -1) {
		videoId = videoId.substring(0, ampersandPosition);
	}
	return videoId;
}

/**
 * Assembles notification email with table of video details.
 * (h/t https://stackoverflow.com/questions/37863392/making-table-in-google-apps-script-from-array)
 */
function sendEmailNotificationTemplate(content, emailAddress) {
	const template = HtmlService.createTemplateFromFile("email");
	template.content = content;
	const msg = template.evaluate();
	MailApp.sendEmail(
		emailAddress,
		"New comments or replies on YouTube",
		msg.getContent(),
		{ htmlBody: msg.getContent() },
	);
}
