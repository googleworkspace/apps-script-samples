# Gmail Sentiment Analysis with Gemini and Vertex AI

This project guides you through building a Google Workspace Add-on that
leverages Gemini and Vertex AI for conducting sentiment analysis on emails in
Gmail. The add-on automatically identifies emails with a negative tone and
labels them accordingly, helping prioritize customer service responses or
identify potentially sensitive emails.

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


### Set up Cloud Console

1. Open the provided **Cloud Console URL** in your incognito window.
2. Check **I agree** and click **AGREE AND CONTINUE**.

### Enable Vertex AI API

1. Open the provided link to enable the Vertex AI API.
2. Click **Next** to confirm the project.
3. Click **Enable**.


### Set Up the Apps Script Project

1. Open the provided **Apps Script link** in a new incognito tab.
2. Click **New project**.
3. Rename the project to "Gmail Sentiment Analysis with Gemini and Vertex AI".
4. In Project Settings (gear icon), select "Show 'appsscript.json' manifest file in editor".
5. In Project Settings, under Google Cloud Platform (GCP) Project, click **Change project**.
6. Copy the **Project number** (numerical value, not Project ID) from Cloud Console.
7. Paste the Project number into the Apps Script project settings and click **Set project**.
8. Click the **OAuth Consent details** link in the error message.
9. Click **CONFIGURE CONSENT SCREEN**.
10. Select **Internal** for User Type and click **CREATE**.
11. Set the App name to "Gmail Sentiment Analysis with Gemini and Vertex AI".
12. Set the User support email and Developer contact information using the provided email.
13. Click **SAVE AND CONTINUE** twice.
14. Return to the Apps Script tab and set the project.


### Make a copy of the Apps Script project

1. Make a copy of this
[Apps Script project](https://script.google.com/corp/home/projects/1Z2gfvr0oYn68ppDtQbv0qIuKKVWhvwOTr-gCE0GFKVjNk8NDlpfJAGAr).
1. Rename the Apps Script project to `Gmail Sentiment Analysis with Gemini and Vertex AI`.
1. Make sure to replace `[ADD YOUR GCP PROJECT ID HERE]` in `Vertex.gs` with your actual **Project ID**.
1. Click **Save**.


### Deploy the Add-on

1. Click **Deploy > Test deployments**.
2. Confirm **Gmail** is listed under Application(s) and click **Install**.
3. Click **Done**.

### Verify Installation

Refresh the Gmail tab. You should see a new add-on icon in the right side panel.

**Troubleshooting:**

* Refresh the browser if the add-on isn't visible.
* Uninstall and reinstall the add-on from the Test deployments window if it's still missing.


### Run the Add-on

1. **Open the Add-on:** Click the add-on icon in the Gmail side panel.
2. **Authorize the Add-on:** Click **Authorize access**. Select your email and click **Allow** in the consent screen.
3. **Generate sample emails:** Click the green "Generate sample emails" button.
4. **Wait for emails:** Wait for the sample emails to appear in your inbox, or refresh.
5. **Start the analysis:** Click the red "Analyze emails" button.
6. **Wait for labels:** Wait for the "UPSET TONE 😡" label to appear on negative emails, or refresh.
7. **Close the Add-on:** Click the X in the top right corner of the side panel.


## Congratulations!

You've completed the Gmail Sentiment Analysis with Gemini and Vertex AI lab!
You now have a functional Gmail add-on for prioritizing emails. Experiment
further by customizing the sentiment analysis or adding new features!
