# Simple Tasks

Simple Tasks is a sample web app built using Apps Script that provides limited
read and write access to your data in
[Google Tasks](https://mail.google.com/tasks/canvas). It was created using the
[Html Service](https://developers.google.com/apps-script/guides/html-service)
and demonstrates some common patterns and best practices to use when developing
user interfaces.

![Simple tasks screenshot](https://googledrive.com/host/0BwzA1Orbvy5WV0tUQl9WX0FhRTA/simple_tasks.png)

## Try it out

For your convience we have a
[deployed instance](https://script.google.com/macros/s/AKfycbx-sB0Lp8JVgfvVoXkFtLsxMzqvOdfjG7VDo8OAeLusUDkFLj8/exec)
of the script already running. The application supports reading your task lists
and tasks, marking tasks as complete or incomplete, and adding new tasks to a
task list.

## Setup

The first step is to create your script and copy in the code. The simplest way
to do this is to
[make a copy](https://script.google.com/d/1HCsbqH8WNEKFwRZCw8KEhykCGEzfXi-1k5eN-7t8lZoEAAvfqzOOsKtu/edit?newcopy=true)
of the deployed instance of the script. If you wish to create your project from
scratch, follow the steps below.

1. Create a new standalone script in your Google Drive
   ([instructions available here](https://developers.google.com/apps-script/managing_projects#creatingDrive))
   and add in each of the files in this directory. You should already  have a
   file named Code.gs in your project, and you can replace its contents with
   the new code. For the remaining files, ensure you select
   **File > New > Html file** when creating the files, and when entering the
   file name omit the .html suffix as it will be added automatically.

2. Enabled the Google Tasks API on the script
   ([instructions available here](https://developers.google.com/apps-script/built_in_services#advanced_google_services)).
3. Save a new version of your script and publish it as a web app that runs as
   the **User acessing the web app**.
   ([instructions available here](https://developers.google.com/apps-script/execution_web_apps)).

[![Analytics](https://ga-beacon.appspot.com/UA-42085206-1/google-apps-script-samples/simple_tasks)](https://github.com/igrigorik/ga-beacon)
