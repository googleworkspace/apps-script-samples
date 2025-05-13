# Email Classifier

This Apps Script project provides a Gmail add-on that classifies emails based on
their content and subject, and performs actions such as adding labels, creating
draft responses, and logging results in a Google Sheet. It leverages the Gemini
API for natural language processing.

## Features

*   **Email Classification:** Classifies unread emails in your inbox into three
    categories:
    *   `needs-response`: Emails requiring a direct reply.
    *   `action-required`: Emails requiring a specific task or decision.
    *   `for-your-info`: Emails for information only, no action needed.
*   **Labeling:** Adds Gmail labels to emails based on their classification.
*   **Draft Responses:** Generates draft email responses for emails classified
    as `needs-response`.
*   **Spreadsheet Logging:** Logs email details, classification, and reason to a
    Google Sheet.
*   **User-Friendly Interface:** Provides a Gmail add-on with buttons for
    classification, label creation, and removal.

## Setup

### 1. Enable Google APIs

*   Go to the [Google Cloud Console](https://console.cloud.google.com/).
*   Create or select a project.
*   **Gemini API:**
    *   [Enable the Gemini API](https://console.cloud.google.com/flows/enableapi?apiid=aiplatform.googleapis.com)
*   **Gmail API:**
    *   [Enable the Gmail API](https://console.cloud.google.com/flows/enableapi?apiid=gmail.googleapis.com)
*   **Sheets API:**
    *   [Enable the Sheets API](https://console.cloud.google.com/flows/enableapi?apiid=sheets.googleapis.com)

### 2. Apps Script Project

1.  **Create a New Project:**
    *   Go to [script.google.com](https://script.google.com).
    *   Create a new project.
1.  **Enable `appsscript.json` Manifest:**
    *   Go to **Project Settings**.
    *   Check the **Show "appsscript.json" manifest file in editor** option.
1.  **Associate with Google Cloud Project:**
    *   In your Apps Script project, go to **Project Settings**.
    *   Under **Google Cloud Platform (GCP) Project**, click **Change project**.
    *   Enter your Google Cloud Project number and click **Set project**.
1.  **Copy Code:**
    *   Copy the code from each `.gs` file in this directory into the
        corresponding file in your Apps Script project.
1.  **Update `Constants.gs`:**
    *   Replace the placeholder values in `Constants.gs`:
        *   `PROJECT_ID`: Your Google Cloud Project ID.
        *   `ME`: Your name.
1.  **Update `appsscript.gson`:**
    *   Ensure the `appsscript.gson` file is configured correctly.

### 3. Configure OAuth Consent Screen

Google Workspace add-ons require a consent screen configuration. Configuring
your add-on's OAuth consent screen defines what Google displays to users.

1.  **Go to Google Cloud Console:**
    *   Navigate to the [Google Auth Platform - Branding page](https://console.cloud.google.com/auth/branding).
1.  **App Information:**
    *   **App name:** Enter a name for your add-on (e.g., "Email Classifier").
    *   **User support email:** Select your email address.
    *   **Developer contact information:** Enter your email address.
    * Click **Next**.
1. **Audience:**
    *  Select **Internal**.
    * Click **Next**.
1. **Contact Information:**
    *   Select your email address.
    * Click **Next**.
1. **Finish:**
    *   Check **I agree to the [Google API Services: User Data Policy](https://developers.google.com/terms/api-services-user-data-policy)**.
    * Click **Continue**.
1. **Create:**
    * Click **Create**.

### 4. Deploy the Add-on

1.  **Deploy:**
    *   Click "Deploy" > "Test deployments".
    *   Select "Gmail add-on".
    *   Click "Install" to install the add-on for your account.

## How to Run

1.  **Open Gmail:**
    *   Open Gmail in your browser.
1.  **Open the Add-on:**
    *   The "Email Classifier" add-on should appear in the right sidebar.
1.  **Classify Emails:**
    *   Click the "Classify emails" button.
    *   The add-on will process unread emails from the last 7 days.
1.  **View Results:**
    *   A link to the generated Google Sheet will be displayed.
    *   Open the sheet to view the classification results.
1.  **Create/Remove Labels:**
    *   Use the "Create labels" or "Remove labels" buttons to manage Gmail labels.

## Code Overview

*   **`Cards.gs`:**
    *   Defines the UI for the Gmail add-on, including buttons and actions.
*   **`ClassifyEmail.gs`:**
    *   Constructs prompts for the Gemini API.
    *   Sends email content to the Gemini API for classification.
    *   Parses the API response.
*   **`Code.gs`:**
    *   Main function to search, classify, label, and log emails.
*   **`Constants.gs`:**
    *   Stores project-specific constants (e.g., API URL, project ID, email).
*   **`DraftEmail.gs`:**
    *   Constructs prompts for the Gemini API to generate draft responses.
    *   Sends email content to the Gemini API for draft generation.
    *   Parses the API response.
*   **`Labels.gs`:**
    *   Creates, updates, and removes Gmail labels.
*   **`Sheet.gs`:**
    *   Creates and updates Google Sheets for logging.
*   **`appsscript.gson`:**
    *   Configuration file for the Apps Script project.

## Important Notes

*   **Gemini API Usage:** This project relies on the Gemini API for natural
    language processing. Make sure you have the API enabled and have sufficient
    quota.
*   **OAuth Scopes:** The `appsscript.json` file includes the necessary OAuth
    scopes for Gmail, Sheets, and the Gemini API.
*   **Error Handling:** The code includes basic error handling, but you may need
    to add more robust error handling for production use.
*   **Rate Limits:** Be mindful of API rate limits, especially when processing
    large numbers of emails.
*   **Security:** Ensure that you are handling user data securely.

## Disclaimer

This code is provided as-is, without any warranty. Use at your own risk.

Feel free to modify and adapt this code to your specific needs.
