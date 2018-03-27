Template: Importing Data to Sheets
==================================

This template provides a framework for creating a Sheets [add-on](https://developers.google.com/apps-script/add-ons/)
that imports data from a 3rd-party source (such as an API).

It shows the basic structure needed to define a UI and how to coordinate
communication between the client, server, and 3rd-party source.
This template also demonstrates some useful aspects of Apps Script, including:

* Writing data to a Google Sheet
* Using time-based triggers to establish automated sheet updates
* Using [Templated HTML](https://developers.google.com/apps-script/guides/html/templates)
* Using IFRAME sandbox mode

**Note**: The purpose of this template is to show a general add-on structure.
It will not run as an add-on in it's current state. To make use of this
template, you will need to fill in the sections marked **TODO** to customize
the template to a specific 3rd-party data source.

## Project manifest
The following project files are included in this template:

* **APICode.gs** - This file contains all the API-specific code for handling
  authorization, callbacks, and API calls. It will need to be modified to handle
  a specific API.
* **Auth.gs** - This file contains code that assists with constructing a
  OAuth2 service object using the [Apps Script OAuth2 library](https://github.com/googlesamples/apps-script-oauth2).
* **AuthCallbackView.html** - This file is the page that is presented to the
  user after an authorization attempt, and shows whether the authorization was
  successful.
* **AuthorizationEmail.html** - This file contains the html template of an email
  that would be sent to the user in the event that a trigger attempts to fire
  without all the required authorizations.
* **Configurations.gs** - This file contains code that controls the creation,
  updating and deletion of report configurations that describe what to import
  to Sheets from the 3rd party source. By default report configurations are
  saved to Apps Script's PropertyService, but it would be possible to adapt the
  code here to store that data elsewhere (for example, in an external database).
* **JavaScript.html** - This file contains the bulk of the control code for the
  sidebar UI.
* **Server.gs** - This file contains server-side code that responds to user
  interactions in the sidebar UI. It also sets up the add-on menu.
* **Sidebar.html** - This file contains the HTML structure for that defines
  the sidebar UI.
* **Stylesheet.html** - This file contains all the CSS properties defined for
  the template.
* **Utilities.gs** - This file contains some generic functionalities to support
  the rest of the code. The functions here are not specific to this template and
  could be taken for use in other projects without modification.
* **intercom.js.html** - This file contains a copy of
  [intercom.js](https://github.com/diy/intercom.js),
  a cross-window message broadcast interface (intercom.js is released under an
  Apache V2.0 license).

## Setup: Libraries
This template makes use of the following libraries, which much the added to the
Apps Script project before the template can be used:

* [Apps Script OAuth2 library](https://github.com/googlesamples/apps-script-oauth2)
* [Underscore](http://underscorejs.org/)

These libraries are already published as an Apps Script, making it easy to
include in your project. To add it to your script, do the following in the
Apps Script code editor:

1. Click on the menu item "Resources > Libraries..."
1. In the "Find a Library" text box, enter the project key
"MswhXl8fVhTFUH_Q3UOJbXvxhMjh3Sh48" and click the "Select" button.
1. Choose the latest version in the dropdown box.
1. Click the "Save" button.

This will add the [OAuth2 library](https://github.com/googlesamples/apps-script-oauth2)
to your project. Repeat the above steps with the project key
"MGwgKN2Th03tJ5OdmlzB8KPxhMjh3Sh48" to add Underscore to the project as well.

## Setup: API configuration
This template requires app-specific configuration before it can used.
Specifically, the template will need to be informed of the authorization
details, and certain adjustments made to ensure the correct data can be
extracted from the responses.

In the Server.gs, APICode.gs and Auth.gs project files, there are several
comments marked as **TODO**. To configure the template, visit each of these
**TODO** sections and follow the directions found there.

Note that the template design assumes that the template will connect to an API
service using OAuth 2.0; however, it would be possible adapt it to connect to
a different kind of service, such as a SQL database.

## Additional information

For more information, see:

* [Extending Google Sheets](https://developers.google.com/apps-script/guides/sheets)
* [Known Issues specific to Google Sheets](https://developers.google.com/apps-script/migration/sheets)

Note that this template must be added to a container-bound
script attached to a Google Sheet in order to function. Developed
add-ons must go through a
[publishing process](https://developers.google.com/apps-script/add-ons/publish)
before they can be made available publicly.
