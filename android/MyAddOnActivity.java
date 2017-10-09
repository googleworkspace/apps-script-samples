// [START MyAddOnActivity]
import android.accounts.Account;
import android.app.Activity;

public class MyAddOnActivity extends Activity {
  // Your activity...

  String sessionState;
  String docId;
  Account account;

  @Override
  protected void onCreate(Bundle state) {
    super.onCreate(state);
    docId = getIntent().getStringExtra(
        "com.google.android.apps.docs.addons.DocumentId");
    sessionState = getIntent().getStringExtra(
        "com.google.android.apps.docs.addons.SessionState");
    account = (Account) getIntent().getParcelableExtra(
        "com.google.android.apps.docs.addons.Account");
    // Your activity’s initialization...
  }
  // [END MyAddOnActivity]

  // [START AndroidExecutionRequest]
  protected void makeRequest() {
        // Acquire the session state String from the calling Intent.
    sessionState = getIntent().getStringExtra(
        "com.google.android.apps.docs.addons.SessionState");
    // ...
    // Construct the API request.
    ExecutionRequest request = new ExecutionRequest().
            .setFunction(functionName)
            .setSessionState(sessionState)
            .setParameters(params)   // Only needed if the function requires parameters
            .setDevMode(true);       // Optional
  }
  // [END AndroidExecutionRequest]
}
