# Google Sheets Custom Function with AI Studio

## Project Description

Google Sheets Custom Function to be used as a bound Apps Script project with a Google Sheets Spreadsheet

## Prerequisites

* Google Cloud Project (aka Standard Cloud Project for Apps Script) with billing enabled

## Set up your environment

1. Create a Cloud Project
   1. Enable Generative Language API - (may skip as is automatically done in step 2)
1. Create a Google Gemini API Key 
   1. Navigate to https://aistudio.google.com/app/apikey 
   1. Create API key for existing project from step 1
   1. Copy the generated key for use in the next step.
1. Open an Apps Script Project bound to a Google Sheets Spreadsheet
   1. From Project Settings, change project to GCP project number of Cloud Project from step 1
   1. Add a Script Property. Enter `api_key` as the property name and use the Gemini API Key as the value 
1. Add the project code to Apps Script

## Usage

Insert a custom function in Google Sheets, passing a range and a prompt as parameters

Example: 

```
=gemini(A1:A10,"Extract colors from the product description")
```