# Google Chat API - Advanced Service samples

## Set up

1. Follow the Google Chat app quickstart for Apps Script
   https://developers.google.com/workspace/chat/quickstart/apps-script-app and
   open the resulting Apps Script project in a web browser.

1. Override the Apps Script project contents with the files `appsscript.json`,
   `AppAuthenticationUtils.gs`, and `Main.gs` from this code sample directory.

1. To run samples that use app credentials:

   1. Create a service account. For steps, see
      [Authenticate as a Google Chat app](https://developers.google.com/workspace/chat/authenticate-authorize-chat-app).

   1. Open `AppAuthenticationUtils.gs` and set the value of the constant `SERVICE_ACCOUNT` to
      the private key's JSON of the service account that you created in the previous step.

## Run

In the `Main.gs` file, each function contains a sample that calls a Chat API method
using either app or user authentication. To run one of the samples, select the name
of the function from the dropdown menu and click `Run`.
