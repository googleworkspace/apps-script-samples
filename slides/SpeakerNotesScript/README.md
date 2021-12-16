# Speaker Notes Script

This add-on will extract all your Speaker Notes and creates a Google Doc with your 'formatted' script.
To run this add-on, first go to your Google slides with Speaker Notes.

![scriptscreenshot](https://user-images.githubusercontent.com/380123/45267455-878bf780-b43a-11e8-9aeb-9c909feb9613.jpg)

## Set Up

1. From within your new presentation, select the menu item
   **Tools > Script editor**. If you are presented with a welcome screen, click **Blank Project**.
1. Delete any code in the script editor and rename `Code.gs` to `scriptGen.gs`. Copy and paste the contents of `scriptGen.gs` into this file.
1. Then select the menu item **View > Show manifest file** in your Script Editor screen. Copy and paste the contents of `appsscript.json` in here. You need 2 scopes to run this sample:
    * To create and write a document: `https://www.googleapis.com/auth/documents`
    * To read the current presentation: `https://www.googleapis.com/auth/presentations.currentonly`

## Try It Out

1. Switch back to your presentation and reload the page.
1. After a few seconds, a **Speaker Notes Script** sub-menu appears under the
   **Add-ons** menu. Click **Add-ons > Speaker Notes Script > Generate Script Document**.
1. A dialog box indicates that the script requires authorization.
   Click **Continue**. A second dialog box requests authorization for
   specific Google services. Click **Allow**.
1. Check your Drive folder for script!
