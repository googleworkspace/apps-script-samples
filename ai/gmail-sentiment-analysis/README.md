# Gmail sentiment analysis with Vertex AI

## Project Description

Google Workspace Add-on that extends Gmail and adds sentiment analysis capabilities.

## Prerequisites

* Google Cloud Project (aka Standard Cloud Project for Apps Script) with billing enabled

## Set up your environment

1. Create a Cloud Project
   1. Enable the Vertex AI API
   1. Create a Service Account and grant the role `Vertex AI User`
   1. Create a private key with type JSON. This will download the JSON file for use in the next section.
1. Open an Apps Script Project bound to a Google Sheets Spreadsheet
   1. From Project Settings, change project to GCP project number of Cloud Project from step 1
   1. Add a Script Property. Enter `service_account_key` as the property name and paste the JSON key from the service account as the value. 
1. Add OAuth2 v43 Apps Script Library using the ID `1B7FSrk5Zi6L1rSxxTDgDEUsPzlukDsi4KGuTMorsTQHhGBzBkMun4iDF`.
1. Add the project code to Apps Script

## Usage

1. Create a label in Gmail with this exact text and emojy (case sensitive!): UPSET TONE 😡
1. In Gmail, click on the Productivity toolbox icon (icon of a spy) in the sidepanel.
1. The sidepanel will open up. Grant the Add-on autorization to run.
1. The Add-on will load. Click on the blue button "Identify angry customers."
1. Close the Add-on by clicking on the X in the top right corner.
1. It can take a couple of minutes until the label is applied to the messages that have a negative tone.
1. If you don't want to wait until the labels are added, you can refresh the browser.