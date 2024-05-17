# Google Workspace Add-on Drive - Name with Intelligence

## Project Description

Google Workspace Add-on for Google Drive, which uses AI to recommend new names for the selected Doc in Google Drive by passing the body of the document within the AI prompt for context.

## Prerequisites

* Google Cloud Project (aka Standard Cloud Project for Apps Script) with billing enabled

## Set up your environment

1. Create a Cloud Project
   1. Enable the Vertex AI API
   1. Enable Google Drive API
   1. Configure OAuth consent screen
   1. Create a Service Account and grant the role Service `Vertex AI User` role
   1. Create a private key with type JSON. This will download the JSON file for use in the next section.
1. Open a standalone Apps Script project.
   1. From Project Settings, change project to GCP project number of Cloud Project from step 1
   1. Add a Script Property. Enter `model_id` as the property name and `gemini-pro` as the value. 
   1. Add a Script Property. Enter `project_location` as the property name and `us-central1` as the value. 
   1. Add a Script Property. Enter `service_account_key` as the property name and paste the JSON key from the service account as the value. 
1. Add `Google Drive API v3` advanced service.
1. Add OAuth2 v43 Apps Script Library using the ID `1B7FSrk5Zi6L1rSxxTDgDEUsPzlukDsi4KGuTMorsTQHhGBzBkMun4iDF`.
1. Add the project code to Apps Script


