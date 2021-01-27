# Invoicing Demo for Google Sheets

This sample was created for a talk for Google Cloud NEXT'18 entitled "Building
on the Docs Editors: APIs and Apps Script". It is an implementation of a
Google Sheets add-on that:

* Authenticates with Salesforce via OAuth2, using the
[Apps Script OAuth2 library](https://github.com/googleworkspace/apps-script-oauth2).
* Runs [SOQL](https://developer.salesforce.com/docs/atlas.en-us.soql_sosl.meta/soql_sosl/sforce_api_calls_soql_sosl_intro.htm)
  queries against Salesforce and outputs the results into a new sheet
* Creates invoices in Google Docs and a sample presentation in Google Slides
  using the imported data.

![Demo gif](demo.gif?raw=true "Demo")


## Getting started

* Install [clasp](https://github.com/google/clasp)
* Run `clasp create <script name>` to create a new script
* Follow Salesforce's [instructions](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/quickstart.htm)
  to sign up as a developer and create an OAuth2 application
  * Set your callback URL to `https://script.google.com/macros/d/{SCRIPT ID}/usercallback`
    where `{SCRIPT ID}` is taken from the URL outputted by `clasp create`.
* Update `Constants.gs` with your Salesforce client ID and client secret
* Run `clasp push` to upload the contents of this folder to Apps Script
* Run `clasp open` to open the project in the Apps Script IDE
* Follow the [Test as Add-on](https://developers.google.com/apps-script/add-ons/test)
  instructions to run the add-on in a spreadsheet
  * On your test spreadsheet's menu, visit Add-ons -> &lt;script name&gt; ->
    Login to Salesforce to sign in to Salesforce.
