# Google Forms API Apps Script web app

This solution demonstrates how to interact with the new Google Forms API directly from Apps Script using REST calls, not the native Apps Script Forms Service.

## General setup

* Enable the Forms API for your Google Cloud project

## Web app setup

1. Create a new blank Apps Script project.

1. Click **Project Settings**, then:
    * Check **Show "appsscript.json" manifest file in editor**.
    * Enter the project number of the Google Cloud project that has the
       Forms API enabled and click **Change project**.

1. Copy the contents of the Apps Script, HTML and JSON files into your
   Apps Script project.

1. Edit the `FormsAPI.gs` file to customize the constants.
    * `formId`: Choose a `formId` from an existing form.
    * `topicName`: Optional, if using watches (pub/sub).

      Note: Further project setup is required to use the watch features. To
      set up pub/sub topics, see
      [Google Cloud Pubsub](https://cloud.google.com/pubsub/docs/building-pubsub-messaging-system)
      for additional details.

1. Deploy the project as a Web app, authorize access and click on the
   deployment URL.

