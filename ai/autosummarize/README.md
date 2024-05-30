# Editor Add-on: Sheets - AutoSummarize AI

## Project Description

Google Workspace Editor Add-on for Google Sheets that uses AI to create AI summaries in bulk for a listing of Google Docs and Slides files.


## Prerequisites

* Google Cloud Project (aka Standard Cloud Project for Apps Script) with billing enabled

## Set up your environment


1. Create a Cloud Project
   1. Enable the Vertex AI API
   1. Create a Service Account and grant the role Service Account Token Creator Role
   1. Create a private key with type JSON. This will download the JSON file for use in the next section.
1. Open an Apps Script Project bound to a Google Sheets Spreadsheet.
   1. Rename the script to `Autosummarize AI`.
   1. From Project Settings, change project to GCP project number of Cloud Project from step 1
   1. Add a Script Property. Enter `model_id` as the property name and `gemini-pro-vision` as the value. 
   1. Add a Script Property. Enter `project_location` as the property name and `us-central1` as the value. 
   1. Add a Script Property. Enter `service_account_key` as the property name and paste the JSON key from the service account as the value. 
1. Add `OAuth2 v43` Apps Script Library using the ID `1B7FSrk5Zi6L1rSxxTDgDEUsPzlukDsi4KGuTMorsTQHhGBzBkMun4iDF`.
1. Enable the `Drive v3` advanced service.
1. Add the project code to Apps Script


## Usage

1. Insert one or more links to any Google Doc or Slides files in a column.
1. Select one or more of the links in the sheet.
1. From the `Sheets` menu, select `Extensions > AutoSummarize AI > Open AutoSummarize AI`
1. Click Get summaries button.
