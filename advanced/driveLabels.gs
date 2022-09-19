// [START apps_script_drive_labels_list_labels]
/**
 * List labels available to the user.
 */
function listLabels() {
  let pageToken = null;
  let labels = [];
  do {
    try {
      const response = DriveLabels.Labels.list({publishedOnly: true, pageToken: pageToken})
      pageToken = response.nextPageToken;
      labels = labels.concat(response.labels);
    } catch (err) {
      // TODO (developer) - Handle exception
      Logger.log('Failed to list labels with error %s', err.message);
    }
  } while(pageToken != null);
 
  Logger.log('Found %d labels', labels.length);
  console.log(labels[0].name)
}
// [END apps_script_drive_labels_list_labels]
 
// [START apps_script_drive_labels_get_label]
/**
 * Get a label by name.
 */
function getLabel(labelName) {
  labelName = "labels/CKQOeFVnsZLQxqiOqNQT8yBRAwNs1MJ9s7NRNNEbbFcb";
  try {
    const label = DriveLabels.Labels.get(labelName, {view: "LABEL_VIEW_FULL"});
    Logger.log("Fetched label with title: '%s' and %d fields.", label.properties.title, label.fields.length);
  } catch (err) {
    // TODO (developer) - Handle exception
    Logger.log('Failed to get label with error %s', err.message);
  }
}
// [END apps_script_drive_labels_get_label]