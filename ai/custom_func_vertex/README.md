# Google Sheets Custom Function with AI Studio

## Project Description

Google Sheets Custom Function to be used as a bound Apps Script project with a Google Sheets Spreadsheet.

## Prerequisites

* Google Cloud Project (aka Standard Cloud Project for Apps Script) with billing enabled

## Set up your environment

1. Create a Cloud Project
   1. Enable the Vertex AI API
   1. Create a Service Account and grant the role Service Account Token Creator Role
   1. Create a private key with type JSON. This will download the JSON file for use in the next section.
1. Open an Apps Script Project bound to a Google Sheets Spreadsheet
   1. From Project Settings, change project to GCP project number of Cloud Project from step 1
   1. Add a Script Property. Enter `model_id` as the property name and `gemini-pro` as the value. 
   1. Add a Script Property. Enter `project_location` as the property name and `us-central1` as the value. 
   1. Add a Script Property. Enter `service_account_key` as the property name and paste the JSON key from the service account as the value. 
1. Add OAuth2 v43 Apps Script Library using the ID `1B7FSrk5Zi6L1rSxxTDgDEUsPzlukDsi4KGuTMorsTQHhGBzBkMun4iDF`.
1. Add the project code to Apps Script

## Usage

Insert a custom function in Google Sheets, passing a range and a prompt as parameters

Example: 

```
=gemini(A1:A10,"Extract colors from the product description")
```
