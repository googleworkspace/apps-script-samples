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
 * @fileOverview Google Apps Script and Google Docs demo: Bibstro. Data model
 * definitions and caching data store built on top of {@code ScriptDb}.
 * @author Jonathan Rascher
 * @author Saurabh Gupta
 */



/**
 * Constructs a new caching data store object. The data store is backed by
 * {@code ScriptDb}, a simple NoSQL database that holds JSON-compatible objects.
 * Since all {@code ScriptDb} records end up in the same namespace, we tag each
 * record with a {@code type} property determining whether the record represents
 * a configuration entry or a bibliography reference.
 * <p>
 * Additionally, since {@code ScriptDb} has quotas on how often a given script
 * can read from the database (i.e., a limit of queries per second or QPS), we
 * use a simple write-through cache based on Apps Script's {@code CacheService}.
 * @constructor
 */
var DataStore = function() {
  /**
   * The {@code ScriptDb} database for the active document.
   * @type {!ScriptDb.ScriptDbInstance}
   * @private
   */
  this.scriptDb_ = ScriptDb.getMyDb();


  /**
   * A simple memcache-style instance used as a write-through cache on top of
   * {@code ScriptDb}. We use the public cache since bibliography is scoped to
   * the document and is not user-specific in any way.
   * @type {!CacheService.Cache}
   * @private
   */
  this.cache_ = CacheService.getPublicCache();


  /**
   * The {@code ScriptDb} record representing Bibstro's current configuration,
   * or null if Bibstro has not yet been configured.
   * @type {ScriptDb.ScriptDbMap}
   * @private
   */
  this.configRecord_ = this.queryRecord_({'type': DataStore.Type_.CONFIG});
};


/**
 * Key of cache record containing a JSON-formatted array of the {@code ScriptDb}
 * identifiers of all references currently stored in the data store.
 * @type {string}
 */
DataStore.REFERENCE_LIST_CACHE_KEY = 'refList';


/**
 * Key of cache record containing a JSON-formatted array of the {@code ScriptDb}
 * identifiers of all references whose associated inline citations are currently
 * highlighted in the document.
 * @type {string}
 */
DataStore.HIGHLIGHT_LIST_CACHE_KEY = 'hglList';


/**
 * Unique prefix for the keys of cache records containing JSON-formatted
 * reference data.
 * @type {string}
 */
DataStore.REFERENCE_CACHE_KEY_PREFIX = 'ref_';


/**
 * Closure-style type definition documenting the model object representing
 * Bibstro's configuration.
 * @typedef {{bibStrategy: string}}
 */
DataStore.Config;


/**
 * Closure-style type definition documenting the model object representing a
 * single reference in Bibstro's bibliography backend. Note that this represents
 * the union of properties supported by all kinds of references. Not all will
 * apply under all circumstances; e.g., {@code publication} is valid for journal
 * and newspaper, articles but not for books.
 * <p>
 * The {@code kind} property determines what sort of reference a given model
 * object represents.
 * @typedef {{id: string|undefined,
 *            kind: DataStore.ReferenceKind,
 *            title: string,
 *            publicationYear: number,
 *            publication: string|undefined,
 *            journalVolume: string|undefined,
 *            journalIssue: string|undefined,
 *            startPage: number|undefined,
 *            endPage: number|undefined,
 *            edition: string|undefined,
 *            volume: string|undefined,
 *            publisher: string|undefined,
 *            publisherCity: string|undefined}}
 */
DataStore.Reference;


/**
 * A distinct kind of reference (book, journal article, etc.) currently
 * supported by Bibstro. Since this is only a demo app, there are not many
 * reference kinds supported.
 * @enum {string}
 */
DataStore.ReferenceKind = {
  ARTICLE: 'article',
  BOOK: 'book'
};


/**
 * The various sorts of data that Bibstro stores in {@code ScriptDb}.
 * @enum {string}
 * @private
 */
DataStore.Type_ = {
  CONFIG: 'cfg',
  REFERENCE: 'ref',
  HIGHLIGHT: 'hgl',
};


/**
 * Loads configuration settings from the data store.
 * @return {DataStore.Config} The current app configuration, or null if the app
 * hasn't yet been configured.
 */
DataStore.prototype.getConfig = function() {
  if (!this.configRecord_) {
    return null;
  }
  var config = {bibStrategy: this.configRecord_['bibStrategy']};
  return config;
};


/**
 * Saves a new or updated app configuration to the data store.
 * @param {!DataStore.Config} The new configuration model object to write out.
 */
DataStore.prototype.setConfig = function(config) {
  var newConfigRecord = this.configRecord_ || {};
  newConfigRecord['type'] = DataStore.Type_.CONFIG;
  newConfigRecord['bibStrategy'] = config.bibStrategy;
  this.configRecord_ = this.scriptDb_.save(newConfigRecord);
};


/**
 * Loads data on all references in the bibliography, trying the cache first and
 * the database backend second. The references are not guaranteed to be returned
 * in any particular order since the sort order could depend on the current
 * bibliography strategy (citation format).
 * @return {!Array.<DataStore.Reference>} The (possibly empty) list of
 *     references.
 */
DataStore.prototype.loadReferences = function() {
  // First, try and read references from the cache. To make sure we don't miss
  // out on some references (e.g., because their cache entries have been garbage
  // collected), we also read in the full list of reference IDs from the cache.
  // If the list of reference IDs is missing, or if we can't find data for a
  // reference, then we give up and do a ScriptDb query instead.
  var cachedReferenceIds =
      JSON.parse(this.cache_.get(DataStore.REFERENCE_LIST_CACHE_KEY));
  if (cachedReferenceIds) {
    var cachedReferences = [];

    for (var i = 0; i < cachedReferenceIds.length; ++i) {
      var cachedReference =
          JSON.parse(this.cache_.get(DataStore.REFERENCE_CACHE_KEY_PREFIX +
              cachedReferenceIds[i]));
      if (!cachedReference) {
        break;
      }
      cachedReferences.push(cachedReference);
    }

    if (cachedReferences.length == cachedReferenceIds.length) {
      return cachedReferences;  // Successfully loaded all data from the cache!
    }
  }

  // We aren't certain that we could load all data from the cache, so we play it
  // safe and query ScriptDb instead.
  var referenceRecords =
      this.queryRecords_({'type': DataStore.Type_.REFERENCE});

  // Convert raw ScriptDbMap records into reference objects that we can safely
  // pass outside this class. Also, as we go, insert reference model objects
  // into the cache so the next read will (mostly likely) have to hit ScriptDb.
  var references = [];
  var referenceIds = [];
  for (var i = 0; i < referenceRecords.length; ++i) {
    var referenceRecord = referenceRecords[i];
    var reference = this.createModelForReferenceRecord_(referenceRecord);

    references.push(reference);
    referenceIds.push(reference.id);

    this.cache_.put(DataStore.REFERENCE_CACHE_KEY_PREFIX + reference.id,
        JSON.stringify(reference));
  }

  this.cache_.put(DataStore.REFERENCE_LIST_CACHE_KEY,
      JSON.stringify(referenceIds));

  return references;
};


/**
 * Loads a single reference from the cache (if possible) or the database
 * backend.
 * @param {string} id The {@code ScriptDb} identifier of the reference in
 *     question.
 * @return {DataStore.Reference} The reference requested, or null if no
 *     reference with the specified ID could be found.
 */
DataStore.prototype.loadReference = function(id) {
  // First, try to read from the cache. The cache is a consistent storage layer,
  // so cached data is guaranteed not to be stale; however, it's entirely
  // possible that given record has been completely purged from the cache.
  var cachedReference =
      JSON.parse(this.cache_.get(DataStore.REFERENCE_CACHE_KEY_PREFIX + id));
  if (cachedReference) {
    return cachedReference;
  }

  // If we didn't find data for this reference in the cache, try and look up the
  // record with the specified ID in ScriptDb, noting such a record might not
  // exist.
  var referenceRecord = this.scriptDb_.load(id);
  return referenceRecord ?
      this.createModelForReferenceRecord_(referenceRecord) : null;
};


/**
 * Deletes a single reference from the cache and the database backend.
 * @param {string} id The {@code ScriptDb} identifier of the reference in
 *     question.
 */
DataStore.prototype.deleteReference = function(id) {
  this.scriptDb_.remove(this.scriptDb_.load(id));
  this.cache_.remove(DataStore.REFERENCE_CACHE_KEY_PREFIX + id);

  // If the reference was highlighted, we need to remove the reference ID from
  // the highlight list in the database and in the cache.
  this.highlightReference(id, true /* opt_unhighlight */);

  // If a full read of all references has been cached, then we also need to
  // remove the reference ID from the cache's list of known references.
  var cachedReferenceList =
      JSON.parse(this.cache_.get(DataStore.REFERENCE_LIST_CACHE_KEY));
  if (cachedReferenceList) {
    var cachedReferenceListIndex = cachedReferenceList.indexOf(id);
    if (cachedReferenceListIndex != -1) {
      cachedReferenceList.splice(cachedReferenceListIndex, 1);
      this.cache_.put(DataStore.REFERENCE_LIST_CACHE_KEY,
          JSON.stringify(cachedReferenceList));
    }
  }
};


/**
 * Determines what references in the bibliography ought to have their inline
 * citations highlighted in the active Google Docs document.
 * @return {!Array.<string>} The {@code ScriptDb} identifiers of all currently
 *     highlighted references.
 */
DataStore.prototype.getHighlights = function() {
  // First, try to read from the cache.
  var cachedHighlightList =
      JSON.parse(this.cache_.get(DataStore.HIGHLIGHT_LIST_CACHE_KEY));
  if (cachedHighlightList) {
    return cachedHighlightList;
  }

  // Otherwise, fall through to ScriptDb.
  var highlightListRecord =
      this.queryRecord_({'type': DataStore.Type_.HIGHLIGHT});
  return highlightListRecord ? highlightListRecord['ids'] : [];
};


/**
 * Marks a reference as highlighted or not in the {@code ScriptDb} data store.
 * @param {string} id The {@code ScriptDb} identifier of the reference to
 *     highlight or unhighlight.
 * @param {boolean=} opt_unhighlight Whether to clear the highlight mark instead
 *     of setting it.
 */
DataStore.prototype.highlightReference = function(id, opt_unhighlight) {
  var highlightListRecord =
      this.queryRecord_({'type': DataStore.Type_.HIGHLIGHT}) ||
      {'type': DataStore.Type_.HIGHLIGHT, 'ids': []};
  if (opt_unhighlight) {
    var highlightListIndex = highlightListRecord['ids'].indexOf(id);
    if (highlightListIndex != -1) {
      highlightListRecord['ids'].splice(highlightListIndex, 1);
    }
  } else {
    if (highlightListRecord['ids'].indexOf(id) == -1) {
      highlightListRecord['ids'].push(id);
    }
  }
  this.scriptDb_.save(highlightListRecord);
  this.cache_.put(DataStore.HIGHLIGHT_LIST_CACHE_KEY,
      JSON.stringify(highlightListRecord['ids']));
};


/**
 * Inserts a new reference into the cache and database backend, or updates an
 * existing reference.
 * @param {!DataStore.Reference} reference The reference model object to be
 *     inserted (if the {@code id} property is undefined) or updated (if the
 *     {@code id} property is defined) in the data store.
 * @return {string} The identifier of the inserted or updated data store record.
 */
DataStore.prototype.insertOrUpdateReference = function(reference) {
  if (!this.validateReferenceModel_(reference)) {
    throw new Error('Invalid reference model: ' + JSON.stringify(reference));
  }

  // For insert, simply create a new, empty record object. For update, retrieve
  // the existing reference record so we can overwrite it. (ScriptDb doesn't
  // allow replacing an object by ID for some reason.)
  var referenceRecord = {};
  if (reference.id) {
    referenceRecord = this.scriptDb_.load(reference.id);
    if (!referenceRecord) {
      throw new Error('Could not find reference in data store for update: ' +
          reference.id);
    }
  }

  // Remove all properties from the record. This is required when updating
  // existing records, as we may be changing the record type, and so some fields
  // might not need to be set anymore. (For example, if we're changing the type
  // from BOOK to JOURNAL, the 'publisherCity' field should no longer be set.)
  for (var key in referenceRecord) {
    if (referenceRecord.hasOwnProperty(key)) {
      delete referenceRecord[key];
    }
  }

  // Make sure we can look the record up by type later of.
  referenceRecord['type'] = DataStore.Type_.REFERENCE;

  // Copy fields from the model object to the underlying ScriptDb record. At the
  // moment, this only removes the ID, but it might perform fancier conversions
  // in the future.
  for (var key in reference) {
    if (key != 'id' && reference[key] !== undefined &&
        reference.hasOwnProperty(key)) {
      referenceRecord[key] = reference[key];
    }
  }

  // We use CacheService as a write-through cache on top of ScriptDb for
  // performance and quota reasons, so do two writes: one to the underlying data
  // store and one to the cache.
  var id = this.scriptDb_.save(referenceRecord).getId();

  if (!reference.id) {
    reference.id = id;

    // The cached reference list may not exist (either because it expired or
    // simply because it hasn't been computed yet). In that case, we don't
    // need to update the list. However, if the list does exist, we need to
    // append the new reference ID.
    var cachedReferenceList =
        JSON.parse(this.cache_.get(DataStore.REFERENCE_LIST_CACHE_KEY));
    if (cachedReferenceList) {
      cachedReferenceList.push(id);
      this.cache_.put(DataStore.REFERENCE_LIST_CACHE_KEY,
          JSON.stringify(cachedReferenceList));
    }
  }

  this.cache_.put(DataStore.REFERENCE_CACHE_KEY_PREFIX + id,
      JSON.stringify(reference));

  return id;
};


/**
 * Helper method that creates a generic JavaScript object from a
 * {@code ScriptDbMap}. We preform this seemingly unnecessary conversion so all
 * {@code ScriptDb} objects (which could otherwise be used to mutate the
 * datastore directly, potentially causing an inconsistent cache state) are
 * confined to the {@code DataStore} class.
 * @param {!ScriptDb.ScriptDbMap} referenceRecord The raw {@code ScriptDb}
 *     record.
 * @return {!DataStore.Reference} A plain old JavaScript object containing the
 *     same properties as the {@code ScriptDb}, and also having its {@code id}
 *     property set to the original record's {@code ScriptDb} identifier.
 * @private
 */
DataStore.prototype.createModelForReferenceRecord_ = function(referenceRecord) {
  // Copy the properties from the reference record to a new model object
  // because we don't want to leak the underlying ScriptDbMap outside this
  // class. All modification of raw ScriptDb objects should be done inside
  // DataStore.
  var reference = {id: referenceRecord.getId()};
  for (var key in referenceRecord) {
    if (referenceRecord.hasOwnProperty(key)) {
      reference[key] = referenceRecord[key];
    }
  }
  return reference;
};


/**
 * Determines whether or not the given object represents a valid reference
 * model. This is the last line of against corrupt data ending up in the data
 * store (e.g., because a mischievous user handcrafted a
 * {@code google.script.run} call to bypass client-side form validation).
 * @param {!DataStore.Reference} reference The reference object to validate.
 * @return {boolean} True if the reference is valid and can be stored, false
 *     otherwise.
 * @private
 */
DataStore.prototype.validateReferenceModel_ = function(reference) {
  if (!(reference['authors'] instanceof Array)) {
    return false;
  }
  var authors = reference['authors'];
  for (var i = 0; i < authors.length; ++i) {
    var author = authors[i];
    if (typeof author['lastName'] != 'string' ||
        typeof author['firstName'] != 'string') {
      return false;
    }
  }

  return (reference['kind'] == DataStore.ReferenceKind.ARTICLE ||
          reference['kind'] == DataStore.ReferenceKind.BOOK) &&
      typeof reference['title'] == 'string' &&
      reference['title'] != '' &&
      typeof reference['publicationYear'] == 'number' &&
      reference['publicationYear'] > 0 &&
      (reference['publication'] === undefined ||
          typeof reference['publication'] == 'string') &&
      (reference['journalVolume'] === undefined ||
          typeof reference['journalVolume'] == 'string') &&
      (reference['journalIssue'] === undefined ||
          typeof reference['journalIssue'] == 'string') &&
      (reference['startPage'] === undefined ||
          typeof reference['startPage'] == 'number') &&
      (reference['endPage'] === undefined ||
          typeof reference['endPage'] == 'number') &&
      (reference['edition'] === undefined ||
          typeof reference['edition'] == 'string') &&
      (reference['volume'] === undefined ||
          typeof reference['volume'] == 'string') &&
      (reference['publisher'] === undefined ||
          typeof reference['publisher'] == 'string') &&
      (reference['publication'] === undefined ||
          typeof reference['publication'] == 'string');
};


/**
 * Internal helper method to load a list of records from the database backend.
 * @param {!Object} query The {@code ScriptDb} query to execute. This is a
 *     partially complete template object whose defined fields will be compared
 *     with the complete objects in the data store. Please see the
 *     {@code ScriptDb} documentation online for some examples.
 * @return {!Array.<ScriptDb.ScriptDbMap>} A list of all {@code ScriptDb}
 *     records matching the specified query.
 * @private
 */
DataStore.prototype.queryRecords_ = function(query) {
  var records = [];
  var results = this.scriptDb_.query(query);
  while (results.hasNext()) {
    records.push(results.next());
  }
  return records;
};


/**
 * Internal helper method that loads a single record from the database backend.
 * This method will throw an exception if more than one record matches that
 * query.
 * @param {!Object} query The {@code ScriptDb} query to execute. This is a
 *     partially complete template object whose defined fields will be compared
 *     with the complete objects in the data store. Please see the
 *     {@code ScriptDb} documentation online for some examples.
 * @return {ScriptDb.ScriptDbMap} The single {@code ScriptDb} record matching
 *     the specified query, or null if no records matched the query.
 * @private
 */
DataStore.prototype.queryRecord_ = function(query) {
  var results = this.scriptDb_.query(query);
  if (results.getSize() > 1) {
    throw new Error(Utilities.formatString(
        'Expected at most one record for query %s, got %d',
        JSON.stringify(query), results.getSize()));
  }
  return results.hasNext() ? results.next() : null;
};
