This sample shows how to use a task runner and command line tools to develop Apps Script projects. There are quite a few setup steps, but they do mimic some typical one-time tasks you'd be doing in any given development project.

### Getting started

This sample uses the community project [node-google-apps-script](https://www.npmjs.com/package/node-google-apps-script). Before working with the sample, perform the following steps:

1. run `npm install -g node-google-apps-script` to install it globally. This will allow you to run a few of the steps below from the command line.
2. Go through the [configuration and authorization steps](https://www.npmjs.com/package/node-google-apps-script).
2. Run `npm install -g gulp` if you do not already have the [gulp](http://gulpjs.com/) task runner installed globally.
3. Clone this repository, `cd google-apps-script-samples/import_export_development`, and run `npm install`. This will set up all of the local dependencies for the project.

### Demonstrating the developer flow
To get the initial setup working for you, perform the following steps. In a real project, each developer would perform these steps, so that they can do development in isolation from other developers:

1. Create a [new Google Spreadsheet](https://docs.google.com/spreadsheets/create), and copy the ID of the file. The file ID is found in the URL to the spreadsheet:
	docs.google.com/spreadsheets/d/***DRIVE_FILE_ID***/edit#gid=123
2. Open the file *src/environments/dev/debug.local.config.js*, and replace DRIVE_FILE_ID with the ID that you copied.
3. Create a new standalone [Google Apps Script](https://script.google.com) project, and copy the ID of the script. The file ID is found in the URL to the script project:
	script.google.com/a/macros/google.com/d/***DRIVE_FILE_ID***/edit
4. Perform the following commands:

    ```
    mkdir build
    cd build
    mkdir dev
    cd dev
    gapps init *DRIVE_FILE_ID*
    cd ../..
    gulp upload-latest --env dev
    ```

5. Refresh your Apps Script project. You should now see a copy of some of the files from the local source location.

You can run the code either by publishing it as a web app, or testing it as an addon (It just counts the number of sheets in your spreadsheet). Because the code finds a valid Spreadsheet ID in the configuration, it uses that instead of `SpreadsheetApp.getActiveSpreadsheet`.


### Deploying for testing
This second phase mimics the setup to isolate testing from development. This would typically be a single Apps Script file for the project, and would have some different code added to enable testing scenarios. In a real project, a testing coordinator or other similar role would perform these steps:

1. Create a [new Google Spreadsheet](https://docs.google.com/spreadsheets/create), and copy the ID of the file. Add 4 additional sheets to the file (the test looks for 5 sheets).
2. Open the file *src/environments/tst/a.myproj.tst.config.js*, and replace DRIVE_FILE_ID with the ID that you copied.
3. Perform the same steps #3 and #4 from above, replacing `dev` with `tst`.
4. Refresh the Apps Script project, open the file `a.myproj.tests.server.main.js`, and then run the function `runAllTests`. Once the run completes, open the log view to see the output.

Once again, this example uses the configured spreadsheet to allow unit testing without having to change code for testing in the primary codebase.


### Deploying for production
This final phase mimics the setup to prepare for a production deployment. This would typically be a single Apps Script file for the project, with the "edit" permission granted to a very limited number of users. In a real project, a deployment coordinator or other similar role would perform these steps:


1. Perform the same steps #3 and #4 from above, replacing `dev` with `prd`.
2. Refresh the Apps Script project, open the project properties (File --> Project properties), and click on the "Scopes" tab. You will see that the spreadsheet scope now only allows the current attached doc (`spreadsheets.currentonly`), which is what we would want for production.
3. You can also create a new spreadsheet, set up for add-on testing, and the code will run successfully.

For production, the configuration file does *not* have a specific spreadsheet, and has the annotation @onlycurrent doc. That will ensure that only Spreadsheets that the code has been linked via the Add-on can be accessed. This limiting of scope is a good practice to provide more confidence to your users that you are only working on sheets that they have linked to your add-on.

