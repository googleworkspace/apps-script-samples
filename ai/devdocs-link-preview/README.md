# Google Workspace Add-on - Developer Docs Link previews


## Project Description

A Google Workspace Add-on that creates custom link previews for pages on the Google developer documentation site. The link preview uses AI to generate page summaries.

## Prerequisites

* Google Cloud Project (aka Standard Cloud Project for Apps Script) with billing enabled

## Set up your environment

1. Create a Cloud Project
   1. Enable the Vertex AI API
   1. Create a Service Account and grant the role `Vertex AI User`
   1. Create a private key with type JSON. This will download the JSON file for use in the next section.
1. Open a stand alone Apps Script Project 
   1. From Project Settings, change project to GCP project number of Cloud Project from step 1
   1. Add a Script Property. Enter `service_account_key` as the property name and paste the JSON key from the service account as the value. 
1. Add OAuth2 v43 Apps Script Library using the ID `1B7FSrk5Zi6L1rSxxTDgDEUsPzlukDsi4KGuTMorsTQHhGBzBkMun4iDF`.
1. Add the project code to Apps Script

