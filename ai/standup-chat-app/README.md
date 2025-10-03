# Chat API - Stand up with AI

## Project Description

Google Chat application that creates AI summaries of a consolidation Chat threads and posts them back within the top-level Chat message. Use case is using AI to streamline Stand up content within Google Chat.

## Prerequisites

* Google Cloud Project (aka Standard Cloud Project for Apps Script) with billing enabled

## Set up your environment

1. Create a Cloud Project
   1. Configure OAuth consent screen
   1. Enable the Admin SDK API
   1. Enable the Generative Language API
   1. Enable and configure the Google Chat API with the following values:
      1. App status: Live - available to users
      1. App name: “Standup”
      1. Avatar URL: “https://www.gstatic.com/images/branding/productlogos/chat_2020q4/v8/web-24dp/logo_chat_2020q4_color_2x_web_24dp.png”
      1. Description: “Standup App”
      1. Enable Interactive features: Disabled
1. Create a Google Gemini API Key 
   1. Navigate to https://aistudio.google.com/app/apikey 
   1. Create API key for existing project from step 1
   1. Copy the generated key 
1. Create and open a standalone Apps Script project
   1. From Project Settings, change project to GCP project number of Cloud Project from step 1
   1. Add the following script properties:
      1. Set `API_KEY` with the API key previously generated as the value.
      1. Set `SPREADSHEET_ID` with the file ID of a blank spreadsheet. 
      1. Set `SPACE_NAME` to the resource name of a Chat space (e.g. `spaces/AAAXYZ`)
   1. Enable the Google Chat advanced service
   1. Enable the AdminDirectory advanced service 
1. Add the project code to Apps Script
1. Enable triggers:
   1. Add Time-driven to run function `standup` at the desired interval frequency (e.g. Week timer)
   1. Add Time-driven to run function `summarize` at the desired interval frequency (e.g. Hour timer)
