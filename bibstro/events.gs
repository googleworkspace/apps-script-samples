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
 * @fileOverview Google Apps Script and Google Docs demo: Bibstro. Event
 * dispatcher. The scripting infrastructure calls function in this file to
 * handle events like "document opened" or "menu item clicked", and this file
 * invokes the appropriate methods on the {@code Controller} class.
 * @author Jonathan Rascher
 * @author Saurabh Gupta
 */


// This application loosely follows the model-view-controller pattern. Requests
// from the client are dispatched into this file (events.gs) and funnelled into
// the Controller class. At that point, the following model classes into play:
//
// * DataStore: Stores bibliography references (called "sources" in the user
// interface) in the ScriptDb NoSQL database with a write-through cache based on
// CacheService.
//
// * BibStrategy: Represents the current bibliography strategy or citation
// format. This class encapsulates all logic for converting references between
// format-agnostic DataStore model objects and format-specific text entries.
//
// * DocumentModel: Encapsulates all code that directly interacts with the
// current Google Docs document. This class is responsible for maintaining the
// bibliography at the end of the document, adding and highlighting inline
// citations, etc.
//
// Some additional, shared functions live in common.gs. Finally, bibliography
// data and configuration are displayed and edited using the following view
// HtmlService templates:
//
// * configdialog.html: Configuration settings live here.
//
// * managereferencessidebar.html: This shows the user their current references
// (bibliography sources) according to the selected citation format, allows the
// user to add and edit references, etc.
//
// * referencedialog.html: Contains form fields and validation logic needed for
// adding new references and updating existing references.
//
// * citationdialog.html: This dialog lets the user insert an inline citation at
// the document's current cursor location.


/**
 * Handles application initialization when Google Docs is opened.
 */
function onOpen() {
  // Add some menu items to the Google Docs word processor. These menu items
  // call into the Apps Script handlers listed below when clicked.
  DocumentApp.getUi().createMenu('Bibstro').
      addItem('Add inline citation...', addCitationMenuItem_onClick.name).
      addItem('Refresh document bibliography',
          appendLiveBibMenuItem_onClick.name).
      addSeparator().
      addItem('Add new source...', addReferenceMenuItem_onClick.name).
      addItem('Manage sources', manageReferencesMenuItem_onClick.name).
      addItem('Import existing bibliography',
          importReferencesMenuItem_onClick.name).
      addSeparator().
      addSubMenu(DocumentApp.getUi().createMenu('Settings').
          addItem('Configure', configureMenuItem_onClick.name).
          addItem('Reset data store [debug]...',
              resetDataStoreMenuItem_onClick.name)).
      addItem('About Bibstro', aboutMenuItem_onClick.name).
      addToUi();
}


/**
 * Inserts an inline citation into the document at the current cursor location
 * using the bibliography reference and page numbers specified by the user.
 * @param {!Object.<string, string>} Populated form fields from {@code
 *     citationdialog.html}.
 */
function onInsertCitation(e) {
  new Controller().insertCitation(e['referenceId'], Number(e['startPage']),
      Number(e['endPage']), !!e['firstMention'], !!e['abbreviateCitation']);
}


/**
 * Shows a dialog allowing a user to insert a new reference into the
 * bibliography or to edit an existing reference.
 * @param {string=} opt_id If present, the {@code ScriptDb} identifier of the
 *     reference whose data should be fetched and entered into the reference
 *     dialog form for editing. If absent, then the form fields shall be left
 *     blank.
 */
function onReferenceShow(opt_id) {
  new Controller().showReferenceDialog(opt_id);
}


/**
 * Removes the reference with the specified ID from the underlying data store
 * when the user clicks the reference sidebar's "remove" button.
 * @param {string} id The {@code ScriptDb} identifier of the reference record to
 *     be removed.
 */
function onReferenceRemove(id) {
  new Controller().deleteReference(id);
}


/**
 * Toggles highlighting of inline citations in the document associated with the
 * specified reference.
 * @param {{id: string, unhighlight: boolean}} e An object identifying the
 *     reference in question and whether highlights of associated citations
 *     should be set or cleared.
 */
function onReferenceHighlight(e) {
  new Controller().highlightReference(e['id'], e['unhighlight']);
}


/**
 * Processes a form submission from the reference dialog, saving data entered by
 * the user into the bibliography backend's {@code ScriptDb} data store.
 * @param {!Object.<string, string>} e Form field values from
 *     {@code referencedialog.html}.
 */
function onReferenceSave(e) {
  var reference = {};
  if (e['id']) {
    reference.id = e['id'];
  }
  reference.kind = e['kind'];

  // Author fields have names like 'lastName[0]', 'firstName[0]', 'lastName[1]',
  // 'firstName[1]', etc. We need to convert these to an array of author objects
  // having keys named 'lastName' and 'firstName'. (If we named all our form
  // fields just 'lastName' and 'firstName', Apps Script would provide us with
  // two parallel arrays for free, but unfortunately the jQuery Validate plugin
  // does not support form fields with duplicate names.)
  var lastNames = extractArrayFields(e, 'lastName');
  var firstNames = extractArrayFields(e, 'firstName');

  reference.authors = [];
  for (var i = 0; i < lastNames.length; ++i) {
    // The arrays passed up from the client can have gaps in them if author rows
    // are removed from the form before it is submitted.
    if (lastNames[i] != undefined && firstNames[i] != undefined) {
      reference.authors.push({
        lastName: lastNames[i],
        firstName: firstNames[i]
      });
    }
  }

  reference.title = e['title'];
  reference.publicationYear = Number(e['publicationYear']);

  // We don't do any real server-side validation here; the client-side
  // validation code should prevent non-malicious/mischievous users from causing
  // trouble, and DataStore itself contains code to prevent saving objects that
  // violate the underlying data model.
  switch (e.kind) {
    case DataStore.ReferenceKind.ARTICLE:
      reference.publication = e['publication'];
      if (e['journalVolume']) {
        reference.journalVolume = e['journalVolume'];
      }
      if (e['journalIssue']) {
        reference.journalIssue = e['journalIssue'];
      }
      reference.startPage = Number(e['startPage']);
      reference.endPage = Number(e['endPage']);
      break;

    case DataStore.ReferenceKind.BOOK:
      if (e['edition']) {
        reference.edition = e['edition'];
      }
      if (e['volume']) {
        reference.volume = e['volume'];
      }
      reference.publisher = e['publisher'];
      reference.publisherCity = e['publisherCity'];
      break;
  }

  new Controller().saveReference(reference);
}


/**
 * Shows a configuration dialog ({@code configdialog.html}) allowing the user to
 * set the current citation format.
 */
function onAppendLiveBibliography() {
  new Controller().appendLiveBibliography();
}


/**
 * Persists possibly updated configuration options back to the {@code ScriptDb}
 * data store.
 * @param {!Object.<string, string>} e Form field values from
 * {@code configdialog.html}.
 */
function onConfigSave(e) {
  var controller = new Controller();
  var prevBibStrategy = controller.getBibStrategy();

  controller.saveConfig(e);

  if (e['initialSetup']) {
    if (e['importReferences']) {
      controller.importReferencesFromDocument();
    }
  } else {
    controller.refreshLiveBibliography(prevBibStrategy || undefined);
  }
}


/**
 * Loads the full list of references from the data store, producing properly
 * formatted HTML bibliography entries for each.
 * @return {{bibStrategy: string,
 *           references: !Array.<{id: string, html: string}>,
 *           highlights: !Array.<string>}}
 */
function loadReferenceData() {
  return new Controller().loadReferenceData();
}


/**
 * Shows {@code citationdialog.html} in response to a menu item click.
 */
function addCitationMenuItem_onClick() {
  var controller = new Controller();
  if (controller.showInitialSetupDialog()) {
    return;
  }
  controller.showCitationDialog();
}


/**
 * Appends a live-updating, formatted bibliography to the Google Docs document
 * or forces an update of the existing bibliography if one already exists.
 */
function appendLiveBibMenuItem_onClick() {
  var controller = new Controller();
  if (controller.showInitialSetupDialog()) {
    return;
  }
  controller.appendLiveBibliography();
}


/**
 * Shows {@code referencedialog.html} in response to a menu item click.
 */
function addReferenceMenuItem_onClick() {
  var controller = new Controller();
  if (controller.showInitialSetupDialog()) {
    return;
  }
  controller.showReferenceDialog();
}


/**
 * Shows {@code managereferencessidebar.html} in response to a menu item click.
 */
function manageReferencesMenuItem_onClick() {
  var controller = new Controller();
  if (controller.showInitialSetupDialog()) {
    return;
  }
  controller.showManageReferenceSidebar();
}


/**
 * Attempts to import reference from an existing document bibliography into the
 * document's data store.
 */
function importReferencesMenuItem_onClick() {
  var controller = new Controller();
  if (controller.showInitialSetupDialog()) {
    return;
  }
  controller.importReferencesFromDocument();
}


/**
 * Shows {@code configdialog.html} in response to a menu item click.
 */
function configureMenuItem_onClick() {
  var controller = new Controller();
  if (controller.showInitialSetupDialog()) {
    return;
  }
  controller.showConfigDialog();
}


/**
 * Irreversibly removes all objects from {@code ScriptDb}. This is intended to
 * allow reseting the data store for debugging/development purposes. Since this
 * operation could lead to unwanted data loss, we ask the user for confirmation
 * before deleting anything.
 */
function resetDataStoreMenuItem_onClick() {
  var ui = DocumentApp.getUi();
  var confirmation = ui.alert(
      'Google Apps Script and Google Docs demo: Bibstro',
      'This will erase all sources and configuration! Are you sure?',
      ui.ButtonSet.YES_NO);

  if (confirmation == ui.Button.YES) {
    var scriptDb = ScriptDb.getMyDb();
    var cache = CacheService.getPublicCache();

    var results = scriptDb.query({});
    while (results.hasNext()) {
      var result = results.next();

      // Remove record from the data store and the write-through cache.
      scriptDb.remove(result);
      cache.remove(DataStore.REFERENCE_CACHE_KEY_PREFIX + result.getId());
    }

    // Clear out the write-through cache's list of active reference IDs.
    cache.remove(DataStore.REFERENCE_LIST_CACHE_KEY);

    // Clear out the write-through cache's list of highlighted reference IDs.
    cache.remove(DataStore.HIGHLIGHT_LIST_CACHE_KEY);

    ui.alert(
        'Google Apps Script and Google Docs demo: Bibstro',
        'All bibliography data has been erased. Please reload the document.',
        ui.ButtonSet.OK);
  }
}


/**
 * Shows a simple "about" dialog to the user.
 */
function aboutMenuItem_onClick() {
  DocumentApp.getUi().alert(
      'Google Apps Script and Google Docs demo: Bibstro',
      'Bibstro is a simple bibliography manager and citation formatting tool ' +
      'for Google Docs. Developed for Google I/O 2013, Bibstro is built ' +
      'in Google Apps Script. Bibstro is only a demo, but it attempts to ' +
      'show how developers can solve real-world problems using the Apps ' +
      'Script platform.',
      DocumentApp.getUi().ButtonSet.OK);
}
