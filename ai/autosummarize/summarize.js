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
 * Exports a Google Doc/Sheet/Slide to the requested format.
 *
 * @param {string} fileId - ID of file to export
 * @param {string} targetType - MIME type to export as
 * @return Base64 encoded file content
 */
function exportFile(fileId, targetType = "application/pdf") {
  const exportUrl = `https://www.googleapis.com/drive/v3/files/${fileId}/export?mimeType=${encodeURIComponent(targetType)}&supportsAllDrives=true`;

  const requestOptions = {
    headers: {
      Authorization: `Bearer ${ScriptApp.getOAuthToken()}`,
    },
  };
  const response = UrlFetchApp.fetch(exportUrl, requestOptions);
  const blob = response.getBlob();

  return Utilities.base64Encode(blob.getBytes());
}

/**
 * Downloads a binary file from Drive.
 *
 * @param {string} fileId - ID of file to export
 * @param {string} targetType - MIME type to export as
 * @return Base64 encoded file content
 */
function downloadFile(fileId) {
  const exportUrl = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&supportsAllDrives=true`;

  const requestOptions = {
    headers: {
      Authorization: `Bearer ${ScriptApp.getOAuthToken()}`,
    },
  };
  const response = UrlFetchApp.fetch(exportUrl, requestOptions);
  const blob = response.getBlob();

  return Utilities.base64Encode(blob.getBytes());
}

/**
 * Main function for AutoSummarize AI process.
 */
function summarizeFiles(
  sourceSheetLinks,
  customPrompt1,
  customPrompt2,
  temperature,
  tokens,
) {
  return sourceSheetLinks.map((fileUrl) => {
    console.log("Processing:", fileUrl);

    let fileName = "";
    let summary = "";
    let customPrompt1Response = "";
    let customPrompt2Response = "";

    if (!fileUrl) {
      return [
        "",
        fileName,
        summary,
        customPrompt1Response,
        customPrompt2Response,
      ];
    }
    try {
      const promptParts = [
        {
          text: "Summarize the following document.",
        },
        {
          text: "Return your response as a single paragraph. Reformat any lists as part of the paragraph. Output only the single paragraph as plain text. Do not use more than 3 sentences. Do not use markdown.",
        },
      ];
      const fileIdMatchPattern = /\/d\/(.*?)\//gi;
      const match = fileIdMatchPattern.exec(fileUrl);
      if (!match) {
        console.log(`Could not extract file ID from URL: ${fileUrl}`);
        return [
          fileUrl,
          fileName,
          "Could not extract file ID from URL.",
          "",
          "",
        ];
      }
      const fileId = match[1];

      // Get file title and type.
      const currentFile = Drive.Files.get(fileId, { supportsAllDrives: true });
      const fileMimeType = currentFile.mimeType;
      fileName = currentFile.name;

      console.log(`Processing ${fileName} (ID: ${fileId})...`);

      // Add file content to the prompt
      switch (fileMimeType) {
        case "application/vnd.google-apps.presentation":
        case "application/vnd.google-apps.document":
        case "application/vnd.google-apps.spreadsheet":
          promptParts.push({
            inlineData: {
              mimeType: "application/pdf",
              data: exportFile(fileId, "application/pdf"),
            },
          });
          break;
        case "application/pdf":
        case "image/gif":
        case "image/jpeg":
        case "image/png":
          promptParts.push({
            inlineData: {
              mimeType: fileMimeType,
              data: downloadFile(fileId),
            },
          });
          break;
        default:
          console.log(`Unsupported file type: ${fileMimeType}`);
          return [
            fileUrl,
            fileName,
            summary,
            customPrompt1Response,
            customPrompt2Response,
          ];
      }

      // Prompt for summary
      const geminiOptions = {
        temperature,
        maxOutputTokens: tokens,
      };
      summary = getAiSummary(promptParts, geminiOptions);

      // If any custom prompts, request those too
      if (customPrompt1) {
        promptParts[0].text = customPrompt1;
        customPrompt1Response = getAiSummary(promptParts, geminiOptions);
      }
      if (customPrompt2) {
        promptParts[0].text = customPrompt2;
        customPrompt2Response = getAiSummary(promptParts, geminiOptions);
      }

      return [
        fileUrl,
        fileName,
        summary,
        customPrompt1Response,
        customPrompt2Response,
      ];
    } catch (e) {
      // Add error row values if anything else goes wrong.
      console.log(e);
      return [
        fileUrl,
        fileName,
        "Something went wrong. Make sure you have access to this row's link.",
        "",
        "",
      ];
    }
  });
}
