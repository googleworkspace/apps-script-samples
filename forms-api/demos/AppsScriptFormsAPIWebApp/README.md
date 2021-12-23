# Google Forms API Apps Script Webapp

This solution demonstrates how to interact with the new Google Forms API directly from Apps Script using REST calls, and not the native Apps Script Forms Service service.

## General Setup

### Join the Forms API EAP

1. Required: Your account and GCP project must be allowlisted as per the EAP program in order to make requests to the API. See [developers.google.com](https://developers.google.com/forms/api) for more information.

### Apps Script project customization

1. After creating a new blank Apps Script project, click Project Settings and:
    * Check 'Show "appsscript.json" manifest file in editor'
    * Enter the Project Number of the project that was allowlisted for the Forms API
      and click 'Change project'.

1. Copy the contents of the Apps Script, HTML and JSON files into your Apps Script project.

1. Edit the FormsAPI.gs file and customize the constants.
    * formId (Select one of your existing Forms id);
    * topicName (Optional, if using Watches(pub/sub). Further project setup required)
      Note: To setup pub/sub topics, see [Google Cloud Pubsub](https://cloud.google.com/pubsub/docs/building-pubsub-messaging-system) for additional details.

1. Deploy the project as a Web app, Authorize access and click on the deployment URL.

