/**
 * Copyright Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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
