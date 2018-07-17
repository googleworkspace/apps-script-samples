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


/* Salesforce config */

// Salesforce OAuth configuration, which you get by creating a developer project
// with OAuth authentication on Salesforce.
var SALESFORCE_CLIENT_ID = '<FILL IN WITH YOUR CLIENT ID>';
var SALESFORCE_CLIENT_SECRET = '<FILL IN WITH YOUR CLIENT SECRET>';

// The Salesforce instance to talk to.
var SALESFORCE_INSTANCE = 'na1';

/* Invoice generation config */

// The ID of a Google Doc that is used as a template. Defaults to
// https://docs.google.com/document/d/1awKvXXMOQomdD68PGMpP5j1kNZwk_2Z0wBbwUgjKKws/view
var INVOICE_TEMPLATE = '1awKvXXMOQomdD68PGMpP5j1kNZwk_2Z0wBbwUgjKKws';

// The ID of a Drive folder that the generated invoices are created in. Create
// a new folder that your Google account has edit access to.
var INVOICES_FOLDER = '';
