# Gmail Sentiment Analysis with Gemini and Vertex AI

This project guides you through building a Google Workspace Add-on that
leverages Gemini and Vertex AI for conducting sentiment analysis on emails in
Gmail. The add-on automatically identifies emails with different tones and
labels them accordingly, helping prioritize customer service responses or
identify potentially sensitive emails.

> [!NOTE]
You can also run this lab on [https://www.cloudskillsboost.google/catalog_lab/31942](Cloud Skills Boost).

## What you'll learn

* Build a Google Workspace Add-on
* Integrate Vertex AI with Google Workspace
* Implement OAuth2 authentication
* Apply sentiment analysis
* Utilize Apps Script

## Setup and Requirements

* **Web Browser:** Chrome (recommended)
* **Dedicated Time:** Set aside uninterrupted time.
* **Incognito/Private Window:**  **Important:** Use an incognito or private browsing window to prevent conflicts with your personal accounts.

## Steps

### Setup Google Cloud Platform

1. Create a new project.
2. Associate a billing account with the project.
3. Enable the Vertex AI API.

### Setup an Apps Script Project

1. Navigate to [https://script.google.com](Apps Script homepage).
2. Click **New project**.
3. Rename the project to "Gmail Sentiment Analysis with Gemini and Vertex AI".
4. In Project Settings (gear icon), select "Show 'appsscript.json' manifest file in editor".
5. In Project Settings, under Google Cloud Platform (GCP) Project, click **Change project**.
6. Copy the **Project number** (numerical value, not Project ID) from Cloud Console.
7. Paste the Project number into the Apps Script project settings and click **Set project**.
8. Click the **OAuth Consent details** link in the error message.
9. Click **Configure Consent Screen**.
10. Click on **Get started** and follow the prompts to configure the consent screen as follows:
    1.  Set the App name to "Gmail Sentiment Analysis with Gemini and Vertex AI".
    2.  Set the User support email to your email.
    3.  Select **Internal** for Audience.
    4.  Set the email address under Contact Information to your email.
    5.  Review and agree to the "Google API Services: User Data Policy".
    6.  Click on **Create**.
11. Return to the Apps Script tab and set the project number again. You should not get an error this time.

### Populate the Apps Script project with code

1. Replace the content of `appsscript.json` and `Code.gs` with the code from this repo.
2. Create new files (`Cards`, `Gmail`, `Vertex`) and replace the contect with the relevant code from this repo.
3. Open the `Vertex.gs` file and replace the `PROJECT_ID` value with your Google Cloud project ID.
4. Make sure to save the content before proceeding.

### Deploy the Add-on

1. On the Apps Script screen, click **Deploy > Test deployments**.
2. Confirm **Gmail** is listed under Application(s) and click **Install**.
3. Click **Done**.

### Verify Installation

Open [https://mail.google.com/](Gmail) and expand the right side panel. You should see a new add-on icon in the right side panel.

**Troubleshooting:**

* Refresh the browser if the add-on isn't visible.
* Uninstall and reinstall the add-on from the Test deployments window if it's still missing.

### Run the Add-on

1. **Open the Add-on:** Click the add-on icon in the Gmail side panel.
2. **Authorize the Add-on:** Grant the necessary permissions for the add-on to access your inbox and connect with Vertex AI.
3. **Generate sample emails:** Click the green "Generate sample emails" button.
4. **Wait for emails:** Wait for the sample emails to appear in your inbox, or refresh your inbox.
5. **Start the analysis:** Click the red "Analyze emails" button.
6. **Wait for labels:** Wait for the "UPSET TONE 😡" label to appear on negative emails, or refresh.
7. **Close the Add-on:** Click the X in the top right corner of the side panel.


## Congratulations!

You've completed the Gmail Sentiment Analysis with Gemini and Vertex AI lab!
You now have a functional Gmail add-on for prioritizing emails. Experiment
further by customizing the sentiment analysis or adding new features!
