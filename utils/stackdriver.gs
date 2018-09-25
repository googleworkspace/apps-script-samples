// [START apps_script_stackdriver]
function measuringExecutionTime() {
  // A simple INFO log message, using sprintf() formatting.
  console.info('Timing the %s function (%d arguments)', 'myFunction', 1);

  // Log a JSON object at a DEBUG level. The log is labeled
  // with the message string in the log viewer, and the JSON content
  // is displayed in the expanded log structure under "structPayload".
  var parameters = {
      isValid: true,
      content: 'some string',
      timestamp: new Date()
  };
  console.log({message: 'Function Input', initialData: parameters});

  var label = 'myFunction() time';  // Labels the timing log entry.
  console.time(label);              // Starts the timer.
  try {
    myFunction(parameters);         // Function to time.
  } catch (e) {
    // Logs an ERROR message.
    console.error('myFunction() yielded an error: ' + e);
  }
  console.timeEnd(label);      // Stops the timer, logs execution duration.
}
// [END apps_script_stackdriver]
