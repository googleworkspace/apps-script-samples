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

import android.app.Activity;
import android.os.Bundle;
import android.view.View;

/**
 * Since this add-on needs context from the Docs editor app, it should only be
 * launched from that app (via context menus).
 *
 * This activity handles the edge case where the app is (erroneously) launched
 * from the home screen or a notification.  This activity simply presents a
 * message to the user and provides an Exit button.
 */
public class DefaultLaunchActivity extends Activity {

    /**
     * Create the default launch activity.
     * @param savedInstanceState previously saved instance data
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.launch_default);
    }

    /**
     * Cancel the add-on and return without action.
     * @param v The button's View context
     */
    public void cancel(View v) {
        setResult(Activity.RESULT_CANCELED);
        finish();
    }
}
