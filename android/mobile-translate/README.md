Mobile Doc Translate Add-on
===========================

A sample Google Apps Script mobile add-on for Google Docs. This add-on is
essentially a mobile version of the Docs
[Translate Add-on Quickstart](https://developers.google.com/apps-script/quickstart/docs).

Introduction
------------

Google Apps Script now allows developers to construct Mobile Add-ons -- Android
applications which extend and support Google Docs and Sheets.

This sample shows how to construct a mobile add-on called
**Mobile Doc Translate**. This add-on allows users to select text in a
Google Doc on their mobile device and see a translation of that text in one
of several languages. The user can then edit the translation as needed and
replace the original selected text in the Doc with the translation.


Getting Started
---------------

The add-on will need to call an Apps Script project to get Doc text, make
translations, and insert text into the Doc. Users can access this add-on from
the Google Docs Android app by highlighting text and selecting the add-on in the
text context menu.

The Apps Script code file for this project is `Code.gs`. This is the same code
used in the [Translate Add-on Quickstart](https://developers.google.com/apps-script/quickstart/docs),
but does not include the HTML code that defines the quickstart's sidebar.

The mobile add-on will make use of the
[Apps Script Execution API](https://developers.google.com/apps-script/guides/rest/)
to call the `Code.gs` functions. The
[Execution API quickstart for Android](https://developers.google.com/apps-script/guides/rest/quickstart/android)
describes how to call Apps Script functions from Android applications.

To build this sample:

1. The `app/` folder in this repository contains all the required Android files
   for this add-on. These can be manually copied or imported into a new Android
   Studio project.
1. Create a new Apps Script project.
1. Replace the code in the new project's `Code.gs` file with the code from this
   repo.
1. Save the project.
1. In the code editor, select **Publish > Deploy as API** executable.
1. In the dialog that opens, leave the **Version** as "New" and enter
   "Target-v1" into the text box. Click **Deploy**.
1. Follow the
   [Keytool SHA1 Fingerprint](https://developers.google.com/apps-script/guides/rest/quickstart/android#step_1_acquire_a_sha1_fingerprint)
   instructions to acquire a SHA1 fingerprint for your project.
1. Using that SHA code, follow the
   [Turn on the Execution API](https://developers.google.com/apps-script/guides/rest/quickstart/android#step_2_turn_on_the_api_name)
   instructions to enable the API for your script project and create OAuth
   credentials. Be sure to match the same package name used in your Android
   code.
1. Edit the `MainActivity.java` file so that the `SCRIPT_ID` constant is set to
   your Apps Script project ID (in the script editor, select
   **File > Project properties**, and use the **Project key**).

 These steps should allow you to build the Android app and have it successfully
 call the Apps Script code. You can test it by:

 1. Install the app on a test Android device.
 1. Set the app as the debug app on the device by running this
   [ADB](https://developer.android.com/studio/command-line/adb.html)
    command:
    `$ adb shell am set-debug-app --persistent <YOUR_PACKAGE_NAME>`
 1. Open a docucment using the Google Docs app on the device.
 1. Highlight some text in the doc and select the three-dot icon to open the
    context menu, and then select **Mobile Doc Translate**.

Learn more
----------

To continue learning about mobile add-ons for Google Docs and Sheets,
take a look at the following resources:

* [Mobile Add-ons](https://developers.google.com/apps-script/add-ons/mobile)
* [Apps Script Execution API](https://developers.google.com/apps-script/guides/)

Support
-------

For general Apps Script support, check the following:

- Stack Overflow Tag: [google-apps-script](http://stackoverflow.com/questions/tagged/google-apps-script)
- Issue Tracker: [google-apps-script-issues](https://code.google.com/p/google-apps-script-issues/issues/list)

If you've found an error in this sample, please file an issue:
https://github.com/googlesamples/apps-script-mobile-addons

Patches are encouraged, and may be submitted by forking this project and
submitting a pull request through GitHub.

License
-------

Copyright 2016 Google, Inc.

Licensed to the Apache Software Foundation (ASF) under one
or more contributor license agreements.  See the NOTICE file
distributed with this work for additional information
regarding copyright ownership.  The ASF licenses this file
to you under the Apache License, Version 2.0 (the
"License"); you may not use this file except in compliance
with the License.  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing,
software distributed under the License is distributed on an
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied.  See the License for the
specific language governing permissions and limitations
under the License.