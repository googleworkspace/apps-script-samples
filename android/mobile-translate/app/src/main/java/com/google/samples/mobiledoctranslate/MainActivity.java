/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.google.samples.mobiledoctranslate;

import com.google.android.gms.auth.GoogleAuthException;
import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.GoogleApiAvailability;
import com.google.api.client.extensions.android.http.AndroidHttp;
import com.google.api.client.googleapis.extensions.android.gms.auth.GoogleAccountCredential;
import com.google.api.client.googleapis.extensions.android.gms.auth.GooglePlayServicesAvailabilityIOException;
import com.google.api.client.googleapis.extensions.android.gms.auth.UserRecoverableAuthIOException;
import com.google.api.client.http.HttpRequest;
import com.google.api.client.http.HttpRequestInitializer;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.client.util.ExponentialBackOff;
import com.google.api.services.script.model.*;
import com.google.api.services.script.Script;

import android.Manifest;
import android.accounts.Account;
import android.app.Activity;
import android.app.AlertDialog;
import android.app.Dialog;
import android.app.ProgressDialog;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.ContextWrapper;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.SharedPreferences;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.text.method.ScrollingMovementMethod;
import android.view.View;
import android.widget.AdapterView;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import java.io.IOException;
import java.lang.StringBuilder;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import pub.devrel.easypermissions.AfterPermissionGranted;
import pub.devrel.easypermissions.EasyPermissions;

/**
 * This is the main (and only) activity of the add-on. It shows the user what
 * text or cells were selected, the results of translation and provides some
 * UI controls.
 */
public class MainActivity extends Activity
        implements EasyPermissions.PermissionCallbacks {

    /**
     * The script ID for the Apps Script the add-on will call
     */
    private static final String SCRIPT_ID = "ENTER_YOUR_SCRIPT_ID_HERE";

    // Constants
    private static final String FUNCTION_GET_TEXT = "getTextAndTranslation";
    private static final String FUNCTION_TRANSLATE_TEXT = "translateText";
    private static final String FUNCTION_INSERT_TEXT = "insertText";
    static final int REQUEST_AUTHORIZATION = 1001;
    static final int REQUEST_GOOGLE_PLAY_SERVICES = 1002;
    static final int REQUEST_PERMISSION_GET_ACCOUNTS = 1003;
    private static final String[] SCOPES = {
            "https://www.googleapis.com/auth/documents.currentonly",
            "https://www.googleapis.com/auth/script.scriptapp",
            "https://www.googleapis.com/auth/script.storage"
    };
    static final String SAVED_ORIG_LANG = "origLangPosition";
    static final String SAVED_DEST_LANG = "destLangPosition";
    private static final int CALL_GET_TEXT = 0;
    private static final int CALL_TRANSLATE_TEXT = 1;
    private static final int CALL_REPLACE_TEXT = 2;

    /**
     * An Apps Script API service object used to access the API, and related
     * objects
     */
    Script mService = null;
    GoogleAccountCredential mCredential = null;
    final HttpTransport mTransport = AndroidHttp.newCompatibleTransport();
    final JsonFactory mJsonFactory = JacksonFactory.getDefaultInstance();

    // Layout components
    private TextView mSelectedText;
    private EditText mTranslationText;
    private Button mReplaceButton;
    private ProgressDialog mProgress;

    // Translation language controls
    private String mOrigLang;
    private String mDestLang;
    private int mPrevOrigSpinnerPos;
    private int mPrevDestSpinnerPos;

    // Other variables
    private NetworkReceiver mReceiver;
    private boolean mConnectionAvailable;
    private int mLastFunctionCalled;
    private String mState;
    private Account mAccount;

    /**
     * Create the main activity.
     * @param savedInstanceState previously saved instance data
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Verify the add-on was called from the Docs editor.
        if (! "com.google.android.apps.docs.editors.docs".equals(
                getCallingPackage())) {
            showErrorDialog(getString(R.string.unexpected_app)
                    + getCallingPackage());
        }

        // Acquire the doc/sheet state from the incoming intent.
        // It's also possible to acquire the docId from the intent;
        // that is not used in this example, however.
        mState = getIntent().getStringExtra(
                "com.google.android.apps.docs.addons.SessionState");
        mAccount = getIntent().getParcelableExtra(
                "com.google.android.apps.docs.addons.Account");

        // Load previously chosen language selections, if any
        SharedPreferences settings = getPreferences(Context.MODE_PRIVATE);
        mPrevOrigSpinnerPos = settings.getInt(SAVED_ORIG_LANG, 0);
        mOrigLang = getLangIdFromSpinnerPosition(mPrevOrigSpinnerPos, false);
        mPrevDestSpinnerPos = settings.getInt(SAVED_DEST_LANG, 0);
        mDestLang = getLangIdFromSpinnerPosition(mPrevDestSpinnerPos, true);

        // Initialize layout objects
        mProgress = new ProgressDialog(MainActivity.this);

        mSelectedText = (TextView) findViewById(R.id.selected_text);
        mSelectedText.setVerticalScrollBarEnabled(true);
        mSelectedText.setMovementMethod(new ScrollingMovementMethod());

        mTranslationText = (EditText) findViewById(R.id.translated_text);
        mTranslationText.setVerticalScrollBarEnabled(true);
        mTranslationText.setMovementMethod(new ScrollingMovementMethod());

        mReplaceButton = (Button) findViewById(R.id.replace_button);

        Spinner origLangSpinner = (Spinner) findViewById(R.id.origin_lang);
        Spinner destLangSpinner = (Spinner) findViewById(R.id.dest_lang);
        origLangSpinner.setSelection(mPrevOrigSpinnerPos);
        destLangSpinner.setSelection(mPrevDestSpinnerPos);
        origLangSpinner.setOnItemSelectedListener(
                new AdapterView.OnItemSelectedListener() {
                    @Override
                    public void onItemSelected(
                            AdapterView<?> parent, View view, int pos, long id) {
                        if (pos != mPrevOrigSpinnerPos) {
                            mPrevOrigSpinnerPos = pos;
                            mOrigLang = getLangIdFromSpinnerPosition(pos, false);
                            SharedPreferences settings =
                                    getPreferences(Context.MODE_PRIVATE);
                            SharedPreferences.Editor editor = settings.edit();
                            editor.putInt(SAVED_ORIG_LANG, pos);
                            editor.apply();
                            translate();
                        }
                    }

                    @Override
                    public void onNothingSelected(AdapterView<?> parent) {}
                });
        destLangSpinner.setOnItemSelectedListener(
                new AdapterView.OnItemSelectedListener() {
                    @Override
                    public void onItemSelected(
                            AdapterView<?> parent, View view, int pos, long id) {
                        if (pos != mPrevDestSpinnerPos) {
                            mPrevDestSpinnerPos = pos;
                            mDestLang = getLangIdFromSpinnerPosition(pos, true);
                            SharedPreferences settings =
                                    getPreferences(Context.MODE_PRIVATE);
                            SharedPreferences.Editor editor = settings.edit();
                            editor.putInt(SAVED_DEST_LANG, pos);
                            editor.apply();
                            translate();
                        }
                    }

                    @Override
                    public void onNothingSelected(AdapterView<?> parent) {}
                });

        // Register BroadcastReceiver to track connection changes, and
        // determine if a connection is initially available
        IntentFilter filter =
                new IntentFilter(ConnectivityManager.CONNECTIVITY_ACTION);
        mReceiver = new NetworkReceiver();
        MainActivity.this.registerReceiver(mReceiver, filter);
        updateButtonEnableStatus();

        // Start the add-on by attempting to retrieve the selected text from
        // the Doc that fired the add-on
        callAppsScriptTask(CALL_GET_TEXT);
    }

    /**
     * Extend the given HttpRequestInitializer (usually a Credentials object)
     * with additional initialize() instructions.
     *
     * @param requestInitializer the initializer to copy and adjust; typically
     *         a Credential object
     * @return an initializer with an extended read timeout
     */
    private static HttpRequestInitializer setHttpTimeout(
            final HttpRequestInitializer requestInitializer) {
        return new HttpRequestInitializer() {
            @Override
            public void initialize(HttpRequest httpRequest)
                    throws java.io.IOException {
                requestInitializer.initialize(httpRequest);
                // This allows the API to call (and avoid timing out on)
                // functions that take up to 30 seconds to complete. Note that
                // the maximum allowed script run time is 6 minutes.
                httpRequest.setReadTimeout(30000);
            }
        };
    }

    /**
     * Clean up and destroy the main activity.
     */
    @Override
    public void onDestroy() {
        super.onDestroy();
        // Unregister the connectivity broadcast receiver.
        if (mReceiver != null) {
            MainActivity.this.unregisterReceiver(mReceiver);
        }
    }

    /**
     * Called when an activity launched here (specifically, AccountPicker
     * and authorization) exits, giving you the requestCode you started it with,
     * the resultCode it returned, and any additional data from it.
     * @param requestCode code indicating which activity result is incoming
     * @param resultCode code indicating the result of the incoming
     *     activity result
     * @param data Intent (containing result data) returned by incoming
     *     activity result
     */
    @Override
    protected void onActivityResult(
            int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        switch(requestCode) {
            case REQUEST_GOOGLE_PLAY_SERVICES:
                if (resultCode == RESULT_OK) {
                    callAppsScriptTask(mLastFunctionCalled);
                } else {
                    showErrorDialog(getString(R.string.gps_required));
                }
                break;
            case REQUEST_AUTHORIZATION:
                if (resultCode == RESULT_OK) {
                    callAppsScriptTask(mLastFunctionCalled);
                } else {
                    showErrorDialog(getString(R.string.no_auth_provided));
                }
                break;
        }
    }

    /**
     * Call the API to execute an Apps Script function, after verifying
     * all the preconditions are satisfied. The preconditions are: Google
     * Play Services is installed, the device has a network connection, and
     * the Execution API service and credentials have been created.
     * @param functionToCall code indicating which function to call using
     *          the API
     */
    private void callAppsScriptTask(int functionToCall) {
        mLastFunctionCalled = functionToCall;
        if (! isGooglePlayServicesAvailable()) {
            toast(getString(R.string.gps_required));
            acquireGooglePlayServices();
        } else if (! mConnectionAvailable) {
            toast(getString(R.string.no_network));
        } else if (! hasValidCredentials()) {
            createCredentialsAndService();
        } else {
            switch (functionToCall) {
                case CALL_GET_TEXT:
                    new GetTextTask().execute(mOrigLang, mDestLang, false);
                    break;
                case CALL_TRANSLATE_TEXT:
                    String originalText = mSelectedText.getText().toString();
                    new TranslateTextTask().execute(
                            originalText, mOrigLang, mDestLang);
                    break;
                case CALL_REPLACE_TEXT:
                    String translation = mTranslationText.getText().toString();
                    new ReplaceTextTask().execute(translation);
                    break;
            }
        }
    }

    /**
     * Attempts to initialize credentials and service object (prior to a call
     * to the API); uses the account provided by the calling app. This
     * requires the GET_ACCOUNTS permission to be explicitly granted by the
     * user; this will be requested here if it is not already granted. The
     * AfterPermissionGranted annotation indicates that this function will be
     * rerun automatically whenever the GET_ACCOUNTS permission is granted.
     */
    @AfterPermissionGranted(REQUEST_PERMISSION_GET_ACCOUNTS)
    private void createCredentialsAndService() {
        if (EasyPermissions.hasPermissions(
                MainActivity.this, Manifest.permission.GET_ACCOUNTS)) {
            mCredential = GoogleAccountCredential.usingOAuth2(
                    getApplicationContext(), Arrays.asList(SCOPES))
                    .setBackOff(new ExponentialBackOff())
                    .setSelectedAccountName(mAccount.name);
            mService = new com.google.api.services.script.Script.Builder(
                    mTransport, mJsonFactory, setHttpTimeout(mCredential))
                    .setApplicationName(getString(R.string.app_name))
                    .build();
            updateButtonEnableStatus();

            // Callback to retry the API call with valid service/credentials
            callAppsScriptTask(mLastFunctionCalled);
        } else {
            // Request the GET_ACCOUNTS permission via a user dialog
            EasyPermissions.requestPermissions(
                    MainActivity.this,
                    getString(R.string.get_accounts_rationale),
                    REQUEST_PERMISSION_GET_ACCOUNTS,
                    Manifest.permission.GET_ACCOUNTS);
        }
    }

    /**
     * Returns true if a valid service object has been created and instantiated
     * with valid OAuth credentials; returns false otherwise.
     * @return true if the service and credentials are valid; false otherwise.
     */
    private boolean hasValidCredentials() {
        return mService != null
                && mCredential != null
                && mCredential.getSelectedAccountName() != null;
    }

    /**
     * Respond to requests for permissions at runtime for SDK 23 and above.
     * @param requestCode The request code passed in
     *     requestPermissions(android.app.Activity, String, int, String[])
     * @param permissions The requested permissions. Never null.
     * @param grantResults The grant results for the corresponding permissions
     *     which is either PERMISSION_GRANTED or PERMISSION_DENIED. Never null.
     */
    @Override
    public void onRequestPermissionsResult(int requestCode,
                                           @NonNull String[] permissions,
                                           @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        EasyPermissions.onRequestPermissionsResult(
                requestCode, permissions, grantResults, MainActivity.this);
    }

    /**
     * Callback for when a permission is granted using the EasyPermissions
     * library.
     * @param requestCode The request code associated with the requested
     *         permission
     * @param list The requested permission list. Never null.
     */
    @Override
    public void onPermissionsGranted(int requestCode, List<String> list) {
        // Do nothing.
    }

    /**
     * Callback for when a permission is denied using the EasyPermissions
     * library. Displays status message and disables functionality that
     * would require that permission.
     * @param requestCode The request code associated with the requested
     *         permission
     * @param list The requested permission list. Never null.
     */
    @Override
    public void onPermissionsDenied(int requestCode, List<String> list) {
        toast(getString(R.string.get_accounts_denied_message));
        updateButtonEnableStatus();
    }

    /**
     * Given the position of one of the language spinners, return the language
     * id corresponding to that position.
     * @param pos spinner position
     * @param omitAutoDetect true if the spinner does not include 'Auto-detect'
     *                       as the first option
     * @return String two-letter language id
     */
    private String getLangIdFromSpinnerPosition(int pos, boolean omitAutoDetect) {
        String id;
        if (omitAutoDetect) {
            pos++;
        }
        switch (pos) {
            case 0:  id = "";  break;       // Auto-detect (input language only)
            case 1:  id = "ar";  break;     // Arabic
            case 2:  id = "zh-CN";  break;  // Chinese (Simplified)
            case 3:  id = "en";  break;     // English
            case 4:  id = "fr";  break;     // French
            case 5:  id = "de";  break;     // German
            case 6:  id = "hi";  break;     // Hindi
            case 7:  id = "ja";  break;     // Japanese
            case 8:  id = "pt";  break;     // Portuguese
            case 9:  id = "es";  break;     // Spanish
            default: id = "en"; break;
        }
        return id;
    }

    /**
     * Call the API to translate the selected text.
     */
    private void translate() {
        String originalText = mSelectedText.getText().toString();
        if (originalText.length() != 0) {
            callAppsScriptTask(CALL_TRANSLATE_TEXT);
        }
    }

    /**
     * Call the API to replace the translated text back to the original
     * document.
     * @param v The button's View context
     */
    public void replace(View v) {
        String translation = mTranslationText.getText().toString();
        if (translation.length() != 0) {
            callAppsScriptTask(CALL_REPLACE_TEXT);
        }
    }

    /**
     * Cancel the add-on and return without action to the calling app.
     * @param v The button's View context
     */
    public void cancel(View v) {
        finishWithState(Activity.RESULT_CANCELED);
    }

    /**
     * End the add-on and return to the calling application.
     * @param state result code for add-on: one of Activity.RESULT_CANCELED or
     *              Activity.RESULT_OK
     */
    private void finishWithState(int state) {
        dismissProgressDialog();
        setResult(state);
        finish();
    }

    /**
     * Display a short toast message.
     * @param message text to display
     */
    private void toast(String message) {
        Toast.makeText(MainActivity.this, message, Toast.LENGTH_SHORT).show();
    }

    /**
     * Checks whether the device currently has a network connection.
     * @return true if the device has a network connection, false otherwise
     */
    private boolean isDeviceOnline() {
        ConnectivityManager connMgr =
                (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo networkInfo = connMgr.getActiveNetworkInfo();
        return (networkInfo != null && networkInfo.isConnected());
    }

    /**
     * Check that Google Play services APK is installed and up to date.
     * @return true if Google Play Services is available and up to
     *     date on this device; false otherwise.
     */
    private boolean isGooglePlayServicesAvailable() {
        GoogleApiAvailability apiAvailability =
                GoogleApiAvailability.getInstance();
        final int connectionStatusCode =
                apiAvailability.isGooglePlayServicesAvailable(MainActivity.this);
        return connectionStatusCode == ConnectionResult.SUCCESS;
    }

    /**
     * Attempt to resolve a missing, out-of-date, invalid or disabled Google
     * Play Services installation via a user dialog, if possible.
     */
    private void acquireGooglePlayServices() {
        GoogleApiAvailability apiAvailability =
                GoogleApiAvailability.getInstance();
        final int connectionStatusCode =
                apiAvailability.isGooglePlayServicesAvailable(MainActivity.this);
        if (apiAvailability.isUserResolvableError(connectionStatusCode)) {
            showGooglePlayServicesAvailabilityErrorDialog(connectionStatusCode);
        }
    }
    /**
     * Display an error dialog showing that Google Play Services is missing
     * or out of date.
     * @param connectionStatusCode code describing the presence (or lack of)
     *     Google Play Services on this device
     */
    private void showGooglePlayServicesAvailabilityErrorDialog(
            final int connectionStatusCode) {
        Dialog dialog =
                GoogleApiAvailability.getInstance().getErrorDialog(
                        MainActivity.this,
                        connectionStatusCode,
                        REQUEST_GOOGLE_PLAY_SERVICES);
        dialog.show();
    }

    /**
     * Check the current connectivity status of the device and enable/disable
     * the highlight buttons if the device is online/offline, respectively.
     */
    private void updateButtonEnableStatus() {
        mConnectionAvailable = isDeviceOnline();
        boolean enable = mConnectionAvailable && hasValidCredentials();
        mReplaceButton.setEnabled(enable);
    }

    /**
     * Show a dialog with an error message, with a button to cancel out of
     * the add-on.
     * @param errorMessage Error message to display
     */
    protected void showErrorDialog(String errorMessage) {
        AlertDialog.Builder alertDialogBuilder =
                new AlertDialog.Builder(MainActivity.this);
        alertDialogBuilder.setTitle(getString(R.string.error_occurred));
        alertDialogBuilder
                .setMessage(errorMessage)
                .setCancelable(false)
                .setNegativeButton(
                        getString(R.string.exit_button),
                        new DialogInterface.OnClickListener() {
                            public void onClick(DialogInterface dialog, int id) {
                                finishWithState(Activity.RESULT_CANCELED);
                            }
                        });
        dismissProgressDialog();
        AlertDialog alertDialog = alertDialogBuilder.create();
        alertDialog.show();
    }

    /**
     * Dismiss the ProgressDialog, if it is visible.
     */
    public void dismissProgressDialog() {
        if (mProgress != null && mProgress.isShowing()) {
            Context context =
                    ((ContextWrapper) mProgress.getContext()).getBaseContext();
            // Dismiss only if launching activity hasn't been finished or
            // destroyed
            if(! (context instanceof Activity &&
                    ((Activity)context).isFinishing() ||
                            ((Activity)context).isDestroyed())) {
                mProgress.dismiss();
            }
        }
    }

    /**
     * This BroadcastReceiver intercepts the
     * android.net.ConnectivityManager.CONNECTIVITY_ACTION, which indicates a
     * connection change. This is used to determine if the API can be called.
     */
    public class NetworkReceiver extends BroadcastReceiver {
        /**
         * Responds to a connection change, recording whether a connection is
         * available.
         * @param context The Context in which the receiver is running
         * @param intent The Intent being received
         */
        @Override
        public void onReceive(Context context, Intent intent) {
            // Checks the network connection. Based on the
            // result, enables/disables flag to allow API calls and
            // enables/disables buttons.
            updateButtonEnableStatus();
            if (!mConnectionAvailable) {
                toast(getString(R.string.no_network));
            }
        }
    }

    /**
     * Abstract class for handling Execution API calls. Typically a subclass of
     * this is created for each Apps Script function that will be called.
     * Placing the API calls in their own task ensures the UI stays responsive.
     */
    public abstract class CallApiTask extends AsyncTask<Object, Void, Object> {

        private Exception mLastError = null;
        protected String mFunctionName;

        /**
         * Background task to call Apps Script API.
         * @param params Object parameters; used as parameters for that
         *               function, in the given order
         * @return an object returned by the API; may be null
         */
        @Override
        protected Object doInBackground(Object... params) {
            try {
                return executeCall(mFunctionName, Arrays.asList(params));
            } catch (Exception e) {
                mLastError = e;
                cancel(true);
                return null;
            }
        }

        /**
         * Handle cancel requests -- specifically, those caused by exceptions
         * raised when attempting to call the API.
         */
        @Override
        protected void onCancelled() {
            mProgress.hide();
            if (mLastError != null) {
                if (mLastError instanceof GooglePlayServicesAvailabilityIOException) {
                    showGooglePlayServicesAvailabilityErrorDialog(
                            ((GooglePlayServicesAvailabilityIOException) mLastError).getConnectionStatusCode());
                } else if (mLastError instanceof UserRecoverableAuthIOException) {
                    startActivityForResult(
                            ((UserRecoverableAuthIOException) mLastError).getIntent(),
                            MainActivity.REQUEST_AUTHORIZATION);
                } else {
                    showErrorDialog(mLastError.toString());
                }
            }
        }

        /**
         * Interpret an error response returned by the API and return a String
         * summary. The summary will include the general error message and
         * (in most cases) a stack trace.
         * @param op the Operation returning an error response
         * @return summary of error response, or null if Operation returned no
         *     error
         */
        protected String getScriptError(Operation op) {
            if (op.getError() == null) {
                return null;
            }

            // Extract the first (and only) set of error details and cast as a
            // Map. The values of this map are the script's 'errorMessage' and
            // 'errorType', and an array of stack trace elements (which also
            // need to be cast as Maps).
            Map<String, Object> detail = op.getError().getDetails().get(0);
            List<Map<String, Object>> stacktrace =
                    (List<Map<String, Object>>)detail.get("scriptStackTraceElements");

            StringBuilder sb =
                    new StringBuilder(getString(R.string.script_error));
            sb.append(detail.get("errorMessage"));

            if (stacktrace != null) {
                // There may not be a stacktrace if the script didn't start
                // executing.
                sb.append(getString(R.string.script_error_trace));
                for (Map<String, Object> elem : stacktrace) {
                    sb.append("\n  ");
                    sb.append(elem.get("function"));
                    sb.append(":");
                    sb.append(elem.get("lineNumber"));
                }
            }
            sb.append("\n");
            return sb.toString();
        }

        /**
         * Given a script function and a list of parameter objects, create a
         * request and run it with the API.
         * @param functionName script function name to call
         * @param params parameters needed by that function; may be null
         * @return Object returned from a successful execution; may be null
         * @throws IOException
         * @throws GoogleAuthException
         */
        protected Object executeCall(String functionName, List<Object> params)
                throws IOException, GoogleAuthException {
            // Create execution request.
            ExecutionRequest request = new ExecutionRequest()
                    .setFunction(functionName)
                    .setSessionState(mState);
            if (params != null) {
                request.setParameters(params);
            }

            // Call the API and return the results (as an Operation object).
            Operation op = mService.scripts().run(SCRIPT_ID, request).execute();

            // If the response from the API contains an error, throw an
            // exception to display it.
            if (op.getError() != null) {
                throw new IOException(getScriptError(op));
            }

            // Return null if the API didn't yield a result.
            if (op.getResponse() == null ||
                    op.getResponse().get("result") == null) {
                return null;
            }

            return op.getResponse().get("result");
        }
    }

    /**
     * An asynchronous task that handles the Apps Script API call to get
     * selected text data, and the translation of it to the previously chosen
     * destination language (or the default destination language).
     */
    public class GetTextTask extends CallApiTask {
        /**
         * Clear the display and show the progress bar prior to calling the
         * API.
         */
        @Override
        protected void onPreExecute() {
            mFunctionName = FUNCTION_GET_TEXT;
            mProgress.setMessage(getString(R.string.retrieve_status));
            mProgress.show();
        }

        /**
         * Take the text output and display it. If no data is returned, update
         * the status bar accordingly.
         * @param scriptResult object returned by the script function; may be
         *                     null
         */
        @Override
        protected void onPostExecute(Object scriptResult) {
            mProgress.hide();
            if (scriptResult != null) {
                // Place the original text and default translation into the UI.
                Map<String, String> data = (Map<String, String>) scriptResult;
                mSelectedText.setText(data.get("text"));
                mTranslationText.setText(data.get("translation"));
            }
        }
    }

    /**
     * An asynchronous task that handles the Apps Script API call to
     * translate text data.
     */
    public class TranslateTextTask extends CallApiTask {
        /**
         * Clear the display and show the progress bar prior to calling the
         * API.
         */
        @Override
        protected void onPreExecute() {
            mFunctionName = FUNCTION_TRANSLATE_TEXT;
            mProgress.setMessage(getString(R.string.translate_status));
            mProgress.show();
        }

        /**
         * Take the text output and display it. If no data is returned, update
         * the status bar accordingly.
         * @param scriptResult object returned by the script function; may be
         *                     null
         */
        @Override
        protected void onPostExecute(Object scriptResult) {
            mProgress.hide();
            if (scriptResult != null) {
                String data = (String) scriptResult;
                mTranslationText.setText(data);
            }
        }
    }

    /**
     * An asynchronous task that handles the Apps Script API call to send
     * (translated) text back into the document, replacing the previous
     * selection.
     */
    public class ReplaceTextTask extends CallApiTask {
        /**
         * Show the progress bar prior to calling the API.
         */
        @Override
        protected void onPreExecute() {
            mFunctionName = FUNCTION_INSERT_TEXT;
            mProgress.setMessage(getString(R.string.replace_status));
            mProgress.show();
        }

        /**
         * After finishing the API call, clear the progress bar and close
         * the add-on.
         * @param scriptResult object returned by the script function; should
         *                     always be null for this script function
         */
        @Override
        protected void onPostExecute(Object scriptResult) {
            mProgress.hide();
            finishWithState(Activity.RESULT_OK);
        }
    }
}
