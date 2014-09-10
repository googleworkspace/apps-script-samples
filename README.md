# Dialog to Sidebar Communication in Apps Script

This script demonstrates a method of setting up a communication channel between
a dialog and a sidebar in Apps Script. This helps solve the common problem
of having your sidebar know when a dialog it spawned is complete, closed, etc.

Unfortunately Apps Script doesn't support a direct communication channel
across client-side code, nor does it support an eventing framework that allows
the server to notify the client of the change. Therefore this solution relies on
both the sidebar and dialog reguarly polling the backend.

An overview is the process is as follows:

* The sidebar requests a new dialog to be spawned.
* The backend generates a new ID for the dialog, opens the dialog (passing in
  that ID as a template parameter), and sends the ID back to the sidebar.
* The sidebar regularly polls the backend using the dialog's ID to check for a
  state change.
* The dialog regulary "checks in" with the backend, so that the backend knows
  it's still open.
* When the user completes the dialog (by clicking either the "OK" or "Cancel"
  button) it sends this status change to the backend.
* If the backend notices that the dialog hasn't checked in for some time, it
  changes it's status to "lost".
* When the dialog notices a change in the dialog's status it stops polling.
