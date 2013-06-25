// Copyright 2013 Google Inc. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileOverview Google Apps Script and Google Docs demo: Bibstro. Controller
 * class. User interaction event handlers call into this class to perform any
 * real work. The controller is responsible for showing UI, as well as managing
 * interactions with the {@code ScriptDb}-based data store and the
 * {@code DocumentApp}-based document model.
 * @author Jonathan Rascher
 * @author Saurabh Gupta
 */



/**
 * Constructs a new instance of the controller class. Though this is not
 * enforced in code, the controller should be treated as a singleton; i.e., at
 * most once instance should be created by server-side script execution.
 * @constructor
 */
var Controller = function() {
  /**
   * A caching wrapper around the {@code ScriptDb} data store.
   * @type {!DataStore}
   * @private
   */
  this.dataStore_ = new DataStore();

  /**
   * A simple, abstract document model based on the {@code DocumentApp} service.
   * @type {!DocumentModel}
   * @private
   */
  this.documentModel_ = new DocumentModel(DocumentApp.getActiveDocument());

  var config = this.dataStore_.getConfig();
};


/**
 * The desired width in pixels of {@code citationdialog.html}.
 * @type {number}
 * @const
 * @private
 */
Controller.CITATION_DIALOG_WIDTH_ = 600;


/**
 * The desired height in pixels of {@code citationdialog.html}.
 * @type {number}
 * @const
 * @private
 */
Controller.CITATION_DIALOG_HEIGHT_ = 575;


/**
 * The desired width in pixels of {@code configdialog.html}.
 * @type {number}
 * @const
 * @private
 */
Controller.CONFIG_DIALOG_WIDTH_ = 625;


/**
 * The desired height in pixels of {@code configdialog.html}.
 * @type {number}
 * @const
 * @private
 */
Controller.CONFIG_DIALOG_HEIGHT_ = 525;


/**
 * The desired width in pixels of {@code referencedialog.html}.
 * @type {number}
 * @const
 * @private
 */
Controller.REFERENCE_DIALOG_WIDTH_ = 700;


/**
 * The desired height in pixels of {@code referencedialog.html}.
 * @type {number}
 * @const
 * @private
 */
Controller.REFERENCE_DIALOG_HEIGHT = 650;


/**
 * The desired width in pixels of {@code managereferencessidebar.html}.
 * @type {number}
 * @const
 * @private
 */
Controller.MANAGE_REFERENCES_SIDEBAR_WIDTH_ = 450;


/**
 * Email address format strings for various cell phone carriers' email-to-SMS
 * gateways.
 * @enum {string}
 * @private
 */
Controller.PhoneCarriersToEmailAddressFormats_ = {
  'att': '%s@txt.att.net',
  'sprint': '%s@messaging.sprintpcs.com',
  'tmobile': '%s@tmomail.net',
  'verizon': '%s@vtext.com'
};


/**
 * On initial installation, this method shows a configuration dialog prompting
 * the user to chose the citation format of their desire. If configuration
 * already exists, this method does nothing.
 * @return {boolean} True if the initial setup dialog was shown and false if
 *     initial setup has already been performed for this document.
 */
Controller.prototype.showInitialSetupDialog = function() {
  if (!this.dataStore_.getConfig()) {
    // If there's no configuration saved in the data store, this must be the
    // first time the user has opened the current document with the extension
    // installed. Show a configuration dialog allowing the user to choose a
    // citation format.
    this.showConfigDialog(true /* opt_initialSetup */);
    return true;  // Don't proceed with initialization until configured.
  }
  return false;  // If we already have a config, proceed with initialization.
};


/**
 * Displays {@code configdialog.html}, allowing the user to add or edit
 * Bibstro's configuration for this document.
 * @param {boolean=} opt_initialSetup Whether this is the app's initial setup
 *     step (in which case no configuration currently exists in
 *     {@code ScriptDb}.
 */
Controller.prototype.showConfigDialog = function(opt_initialSetup) {
  var config = this.dataStore_.getConfig();
  var args = {'initialSetup': !!opt_initialSetup, 'bibStrategies': []};

  // Populate human-readable bibliography strategy names for the various
  // citation formats Bibstro supports (e.g., MLA and APA). These names are
  // passed into the dialog view.
  for (var bibStrategyName in BibStrategy.Implementation) {
    var bibStrategy = {
      'name': bibStrategyName,
      'description': BibStrategy.Implementation[bibStrategyName].description
    };
    if (config && config.bibStrategy == bibStrategyName) {
      bibStrategy['selected'] = true;
    }
    args['bibStrategies'].push(bibStrategy);
  }

  this.showDialog('configdialog.html', Controller.CONFIG_DIALOG_WIDTH_,
      Controller.CONFIG_DIALOG_HEIGHT_, args);
};


/**
 * Displays {@code referencedialog.html}, allowing the user to insert or update
 * a reference in the bibliography data store.
 * @param {string=} opt_id If present, the {@code ScriptDb} identifier of the
 *     existing reference to be updated. If absent, an empty dialog shall be
 *     shown, allowing the user to insert a new reference instead.
 */
Controller.prototype.showReferenceDialog = function(opt_id) {
  this.showDialog('referencedialog.html', Controller.REFERENCE_DIALOG_WIDTH_,
      Controller.REFERENCE_DIALOG_HEIGHT,
      opt_id ? this.dataStore_.loadReference(opt_id) : undefined);
};


/**
 * Displays {@code managereferencessidebar.html}, a live, formatted view of the
 * bibliography data store that appears adjacent to the Google Docs document.
 */
Controller.prototype.showManageReferenceSidebar = function() {
  this.showSidebar('managereferencessidebar.html',
      'Manage Bibliography Sources',
      Controller.MANAGE_REFERENCES_SIDEBAR_WIDTH_);
};


/**
 * Attempts to import reference data from an existing document bibliography into
 * the document's data store. The preexisting bibliography must be formatted
 * according to the currently selected citation format for this to have any
 * change of succeeding.
 */
Controller.prototype.importReferencesFromDocument = function() {
  var references = this.documentModel_.extractReferences(this.getBibStrategy());
  for (var i = 0; i < references.length; ++i) {
    this.dataStore_.insertOrUpdateReference(references[i]);
  }
};


/**
 * Displays {@code citationdialog.html}, allowing the user to insert an inline
 * citation at the current cursor location. If there are no references in the
 * data store, the user will be prompted to add a reference instead.
 */
Controller.prototype.showCitationDialog = function() {
  var referenceData = this.loadReferenceData();

  // Before showing the "insert citation" dialog, make sure the user has
  // actually put at least one reference into the data store. If no references
  // can be found, ask the user if they'd like to add a reference instead.
  if (!referenceData['references'].length) {
    var confirmation = DocumentApp.getUi().alert(
        'Google Apps Script and Google Docs demo: Bibstro',
        'This document does not currently have any sources to cite. Would you' +
            'like to add a source now?',
        DocumentApp.getUi().ButtonSet.YES_NO);
    if (confirmation == DocumentApp.getUi().Button.YES) {
      this.showReferenceDialog();
    }
    return;
  }

  this.showDialog('citationdialog.html',
      Controller.CITATION_DIALOG_WIDTH_, Controller.CITATION_DIALOG_HEIGHT_,
      referenceData);
};


/**
 * Returns the document's current bibliography strategy. It's a citation format
 * (e.g., MLA or APA), essentially.
 * @return {BibStrategy} The document's current bibliography strategy, or null
 *     if initial setup hasn't yet been performed.
 */
Controller.prototype.getBibStrategy = function() {
  var config = this.dataStore_.getConfig();
  return config ?
      new BibStrategy.Implementation[this.dataStore_.getConfig().bibStrategy].
          ctor() :
      null;
};


/**
 * Loads the full list of references from the data store, producing properly
 * formatted HTML bibliography entries for each.
 * @return {{bibStrategy: string,
 *           references: !Array.<{id: string, html: string}>,
 *           highlights: !Array.<string>}}
 */
Controller.prototype.loadReferenceData = function() {
  var references = this.dataStore_.loadReferences().
      sort(this.getBibStrategy().getReferenceComparator());

  var referenceDataList = [];
  for (var i = 0; i < references.length; ++i) {
    var reference = references[i];

    // Turn the structured reference data into a chunk of formatted HTML to send
    // down to the client.
    var referenceData = {};
    referenceData['id'] = reference.id;
    referenceData['html'] = this.getBibliographyEntryHtml(reference);
    referenceDataList.push(referenceData);
  }

  return {
    'references': referenceDataList,
    'highlights': this.dataStore_.getHighlights()
  };
};


/**
 * Formats a reference model object from the data store as HTML according to the
 * current bibliography strategy (citation format).
 * @param {!DataStore.Reference} reference The reference object to be rendered.
 * @return {string} HTML that can be rendered directly into an
 *     {@link HtmlTemplate} view.
 */
Controller.prototype.getBibliographyEntryHtml = function(reference) {
  return this.getBibStrategy().getBibliographyEntry(reference).
      map(function(bibEntryToken) {
        return bibEntryToken.publicationTitle ?
            '<i>' + escapeHtml(bibEntryToken.text) + '</i>' :
            escapeHtml(bibEntryToken.text);
      }).join('');
};


/**
 * Highlights or unhighlights a reference's citations in the document and marks
 * the reference as highlighted or not in the {@code ScriptDb} data store.
 * @param {string} id The {@code ScriptDb} identifier of the reference to
 *     highlight or unhighlight.
 * @param {boolean=} opt_unhighlight Whether to clear any existing highlights
 *     for this reference instead of setting new highlights.
 */
Controller.prototype.highlightReference = function(id, opt_unhighlight) {
  this.dataStore_.highlightReference(id, opt_unhighlight);
  this.documentModel_.highlightMatchingCitations(this.getBibStrategy(),
      this.dataStore_.loadReferences(), this.dataStore_.loadReference(id),
      opt_unhighlight);
};


/**
 * Deletes a reference from the {@code ScriptDb} data store.
 * @param {string} id The {@code ScriptDb} identifier of the reference to
 *     delete.
 */
Controller.prototype.deleteReference = function(id) {
  this.dataStore_.deleteReference(id);
  this.refreshLiveBibliography();
};


/**
 * Inserts of updates a reference in the {@code ScriptDb} data store.
 * @param {!DataStore.Reference} reference The reference model object to update
 * (if an {@code id} property is present) or insert (if no ID is present).
 */
Controller.prototype.saveReference = function(reference) {
  this.dataStore_.insertOrUpdateReference(reference);
  this.refreshLiveBibliography();
};


/**
 * Saves a configuration object containing app settings (e.g., the current
 * citation format) back to the data store.
 * @param {!DataStore.Config} config The configuration settings to save.
 */
Controller.prototype.saveConfig = function(config) {
  this.dataStore_.setConfig(config);
};


/**
 * Inserts an inline citation at the document cursor location using the
 * currently selected citation format.
 * @param {string} referenceId The {@code ScriptDb} identifier of the reference
 *     being cited.
 * @param {number} startPage The first page included in this citation.
 * @param {number} endPage The last page included in this citation.
 * @param {boolean} firstMention Whether or not this reference has been cited
 *     earlier in the document. For certain citation formats (e.g., APA), the
 *     first citation associated with a given reference must contain information
 *     that should be omitted in later citations.
 * @param {boolean} abbreviateCitation If true, the inserted inline citation
 *     will be abbreviated somehow. Exactly how depends on the specific citation
 *     format selected; however, in most formats the author(s) will be omitted
 *     and only the page number(s) will be included.
 */
Controller.prototype.insertCitation = function(referenceId, startPage, endPage,
    firstMention, abbreviateCitation) {
  this.documentModel_.insertCitationAtCursor(this.getBibStrategy(),
      this.dataStore_.loadReference(referenceId), startPage, endPage,
      firstMention, abbreviateCitation);
};


/**
 * Refreshes the contents of the active document's bibliography (e.g., "Works
 * Cited" list for MLA), appending a new bibliography if one doesn't already
 * exist.
 */
Controller.prototype.appendLiveBibliography = function() {
  this.documentModel_.appendOrUpdateBibliography(this.getBibStrategy(),
      this.dataStore_.loadReferences());
};


/**
 * Refreshes the contents of the active document's bibliography (e.g., "Works
 * Cited" list for MLA). If no live bibliography currently exists, then no
 * action will be taken.
 * @param {!BibStrategy=} opt_prevBibStrategy If set, the bibliography strategy
 *     that was active before a change in citation format. This is used to find
 *     the document's live bibliography using the previous citation format so
 *     that it can be updated to the new format.
 */
Controller.prototype.refreshLiveBibliography = function(opt_prevBibStrategy) {
  this.documentModel_.appendOrUpdateBibliography(this.getBibStrategy(),
      this.dataStore_.loadReferences(), true /* opt_updateOnly */,
      opt_prevBibStrategy);
}


/**
 * Renders an HTML file view in a dialog above the Google Docs document.
 * @param {string} fileName The file name of the template to evaluate.
 * @param {number} width The desired dialog width in pixels.
 * @param {number} height The desired dialog height in pixels.
 * @param {!Object=} opt_args If defined, an object whose properties shall be
 *     copied to the {@code HtmlTemplate} object before the template is
 *     evaluated.
 */
Controller.prototype.showDialog = function(fileName, width, height, opt_args) {
  DocumentApp.getUi().showDialog(
      this.evalTemplate(fileName, undefined, opt_args).
          setWidth(width).
          setHeight(height));
};


/**
 * Renders an HTML file view in the Google Docs sidebar.
 * @param {string} fileName The file name of the template to evaluate.
 * @param {string} title The title of the page, dialog, or sidebar in which the
 *     evaluated template will eventually be displayed.
 * @param {number} width The desired sidebar width in pixels.
 * @param {!Object=} opt_args If defined, an object whose properties shall be
 *     copied to the {@code HtmlTemplate} object before the template is
 *     evaluated.
 */
Controller.prototype.showSidebar = function(fileName, title, width, opt_args) {
  DocumentApp.getUi().showSidebar(this.evalTemplate(fileName, title, opt_args).
      setWidth(width));
};


/**
 * Evaluates an {@code HtmlService} template using the specified page title and
 * template arguments.
 * @param {string} fileName The file name of the template to evaluate.
 * @param {string=} opt_title The title of the page, dialog, or sidebar in which
 *     the evaluated template will eventually be displayed.
 * @param {!Object=} opt_args If defined, an object whose properties shall be
 *     copied to the {@code HtmlTemplate} object before the template is
 *     evaluated.
 * @return {!HtmlService.HtmlOutput}
 */
Controller.prototype.evalTemplate = function(fileName, opt_title, opt_args) {
  var template = HtmlService.createTemplateFromFile(fileName);
  var args = opt_args || {};
  for (var key in args) {
    if (args.hasOwnProperty(key)) {
      template[key] = args[key];
    }
  }

  var output = template.evaluate();
  output.setSandboxMode(HtmlService.SandboxMode.NATIVE);  // Enable Caja ES5.
  if (opt_title != undefined) {
    output.setTitle(opt_title);
  }
  return output;
};
