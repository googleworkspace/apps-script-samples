# Google Chat API - Advanced Service samples

## Set up

1. Follow the Google Chat app quickstart for Apps Script
   https://developers.google.com/workspace/chat/quickstart/apps-script-app and
   open the resulting Apps Script project in a web browser.

1. Override the Apps Script project contents with the files `appsscript.json`,
   `AppAuthenticationUtils.gs`, and `Main.gs` from this code sample directory.

1. Set the value of the constant `SERVICE_ACCOUNT` in the script
   `AppAuthenticationUtils.gs` to the service account private key's JSON.

   It's only required for code samples that use app credentials, please refer to
   https://developers.google.com/workspace/chat/authenticate-authorize-chat-app
   to learn more.

## Run

In the `Main.gs` file, each function contains a sample that calls a Chat API method
using either app or user authentication. To run one of the samples, select the name
of the function from the dropdown menu and click `Run`.
