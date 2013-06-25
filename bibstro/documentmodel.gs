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
 * @fileOverview Google Apps Script and Google Docs demo: Bibstro. Document
 * model class that abstracts away all direct interactions with Google Docs.
 * This class is responsible for inserting inline citations at the cursor
 * location, finding and updating the live list of references at the end of the
 * document, and importing existing references from a new document into
 * Bibstro's data store.
 * @author Jonathan Rascher
 * @author Saurabh Gupta
 */



/**
 * Constructs a new {@code DocumentModel} that wraps the specified Google Docs
 * document. (Generally, this will be the active document.)
 * @param {!DocumentApp.Document} doc
 * @constructor
 */
var DocumentModel = function(doc) {
  /**
   * The document to be read and written by the Bibstro app.
   * @type {!DocumentApp.Document}
   * @private
   */
  this.doc_ = doc;
};


/**
 * Inserts an inline citation at the document's current cursor location.
 * @param {!BibStrategy} bibStrategy The current bibliography strategy (citation
 *     format) used to construct the inline citation text for insertion.
 * @param {!DataStore.Reference} reference The reference to be cited.
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
DocumentModel.prototype.insertCitationAtCursor = function(bibStrategy,
    reference, startPage, endPage, firstMention, abbreviateCitation) {
  var cursor = this.doc_.getCursor();
  var insertedText;

  if (cursor) {
    // Determine the text of the new inline citation to insert.
    var citation = bibStrategy.getInlineCitationText(reference, startPage,
        endPage, firstMention, abbreviateCitation);

    var surroundingText = cursor.getSurroundingText().getText();
    var surroundingTextOffset = cursor.getSurroundingTextOffset();

    if (surroundingTextOffset > 0 &&
        surroundingText.charAt(surroundingTextOffset - 1) != ' ') {
      // If the cursor follows a non-space character, insert a space and then
      // the citation.
      insertedText = cursor.insertText(' ' + citation);
    } else {
      // Otherwise, just insert the citation.
      insertedText = cursor.insertText(citation);
    }
  }

  // Not all cursor locations allow text insertion. If we couldn't insert the
  // inline citation, throw an appropriate error.
  if (!insertedText) {
    throw new Error("Cannot insert text at the cursor location");
  }
};


/**
 * @param {!BibStrategy} The bibliography strategy to be used to determine
 *     matching references according to the current citation format.
 * @param {!Array<!DataStore.Reference>} All possible references in the
 *     document's bibliography.
 * @param {!DataStore.Reference} The particular reference we're looking for.
 * @param {boolean=} opt_unhighlight If true, matching citation highlights will
 *     be cleared rather than set.
 */
DocumentModel.prototype.highlightMatchingCitations = function(bibStrategy,
    references, reference, opt_unhighlight) {
  // Determine the correct background to apply to matching inline citations.
  var attrs = {};
  attrs[DocumentApp.Attribute.BACKGROUND_COLOR] = opt_unhighlight ?
      '#ffffff' /* white */ : '#ffff00' /* yellow */;

  // Determine all possible authors to search for before inline citations.
  var authors = [];
  for (var i = 0; i < references.length; ++i) {
    for (var j = 0; j < references[i].authors.length; ++j) {
      authors.push(references[i].authors[j]);
    }
  }

  // For each matching inline citation, apply the background color changes.
  this.forEachCitation_(
      bibStrategy.getBibliographyTitleText(),
      authors,
      function(bodyText, citationIndex, citationStr, prevAuthor) {
        if (bibStrategy.testInlineCitationMatch(reference, prevAuthor,
            citationStr)) {
          bodyText.setAttributes(citationIndex,
              citationIndex + citationStr.length - 1, attrs);
        }
      });
};


/**
 * Updates the content's of the document's bibliography with new references from
 * the data store, inserting a new bibliography first if necessary.
 * @param {!BibStrategy} bibStrategy The current bibliography strategy or
 *     citation format. This is used to identify the bibliography by looking for
 *     an appropriately titled header, and also to correctly format new
 *     bibliography entries.
 * @param {!Array.<!DataStore.Reference>} references All the references or
 *     sources current stored in the bibliography application's data store.
 * @param {boolean=} opt_updateOnly If true, a new bibliography will not be
 *     appended to the document if no existing bibliography can be found.
 * @param {!BibStrategy=} opt_prevBibStrategy The previous bibliography
 *     strategy, if the user saved configured changes. This is used to find and
 *     remove the old strategy's bibliography from the document before adding a
 *     new bibliography using the new strategy (citation format).
 */
DocumentModel.prototype.appendOrUpdateBibliography = function(bibStrategy,
    references, opt_updateOnly, opt_prevBibStrategy) {
  var prevBibStrategy = opt_prevBibStrategy || bibStrategy;

  // Look for an existing bibliography to update so we don't append a second
  // set of bibliography elements in that case.
  var titleParagraph = this.findBibliography_(prevBibStrategy);

  if (!titleParagraph) {
    // If we didn't find an existing bibliography, either bail out without
    // changing the document, or append a new paragraph to serve as the live
    // bibliography in the future.
    if (opt_updateOnly) {
      return;
    }
    titleParagraph = this.doc_.
        getBody().
        appendParagraph(bibStrategy.getBibliographyTitleText()).
        setAlignment(DocumentApp.HorizontalAlignment.CENTER);
    titleParagraph.insertPageBreak(0);
  } else if (bibStrategy.getName() != prevBibStrategy.getName()) {
    // Otherwise, if we found an existing live bibliography and we've changed
    // citation formats, we might have to update the bibliography title.
    titleParagraph.setText(bibStrategy.getBibliographyTitleText());
    titleParagraph.insertPageBreak(0);
  }

  this.updateBibliography_(bibStrategy, references, titleParagraph);
};


/**
 * Attempts to import existing references by extracting them from the document's
 * bibliography using regular expressions and text manipulation. Naturally, this
 * is not guaranteed to successfully return data for all references.
 * @param {!BibStrategy} bibStrategy The current bibliography strategy or
 *     citation format. This is used to identify the bibliography by looking for
 *     an appropriately titled header, and also to determine which citation
 *     format to use when extracting bibliography entries.
 * @return {!Array.<!DataStore.Reference>} A list of all references that could
 *     be successfully extracted.
 */
DocumentModel.prototype.extractReferences = function(bibStrategy) {
  var referenceParagraph = this.findBibliography_(bibStrategy);

  // If we couldn't even find a reference list in the document, there's no way
  // we can import anything.
  if (!referenceParagraph) {
    return [];
  }

  // Otherwise, import whatever we can figure out.
  var references = [];

  while (referenceParagraph = referenceParagraph.getNextSibling()) {
    if (referenceParagraph.getType() != DocumentApp.ElementType.PARAGRAPH) {
      break;
    }

    var referenceTextElement = referenceParagraph.editAsText();
    var referenceText = referenceTextElement.getText();
    var referenceAttributeRuns = referenceTextElement.getTextAttributeIndices();

    var tokens = [];
    var prevToken = null;
    for (var i = 0; i < referenceAttributeRuns.length; ++i) {
      var start = referenceAttributeRuns[i];
      var end = (i + 1 < referenceAttributeRuns.length) ?
          referenceAttributeRuns[i + 1] : referenceText.length;

      // Ignore all style expect transitions between italic and roman text.
      var text = referenceText.substring(start, end);
      var publicationTitle = referenceTextElement.isItalic(start);

      if (prevToken && prevToken.publicationTitle == publicationTitle) {
        prevToken.text += text;
      } else {
        prevToken = {text: text, publicationTitle: publicationTitle};
        tokens.push(prevToken);
      }
    }

    var reference = bibStrategy.getReferenceForBibliographyEntry(tokens);
    if (reference) {
      references.push(reference);
    }
  }

  return references;
};


/**
 * Applies an operation to each inline citation found in the document.
 * @param {string} bibliographyTitleText The title of the bibliography, which
 *    indicates when to stop searching for citations.
 * @param {{lastName: string, firstName: string}} authors The list of all
 *     authors associated with bibliography references.
 * @param {function(!DocumentApp.Text, number, string, ?string)} callback The
 *     function to be invoked for each inline citation discovered in the
 *     document. The callback's function parameters are, in order, a
 *     {@code Text}-element view of the document's body, the index of the
 *     current citation in the body, the text of the current citation (including
 *     surrounding parentheses), and the most recently mentioned author name
 *     before the citation (which will be null if no authors have been mentioned
 *     yet).
 */
DocumentModel.prototype.forEachCitation_ = function(bibliographyTitleText,
    authors, callback) {
  // Extract the plain text contents of the current document's body.
  var bodyText = this.doc_.getBody().editAsText();
  var bodyStr = bodyText.getText();

  // Determine the start of the bibliography in the document so we know where to
  // stop looking for inline citations.
  var bibliographyTitleIndex =
      bodyStr.indexOf('\n' + bibliographyTitleText + '\n');
  if (bibliographyTitleIndex == -1) {
    bibliographyTitleIndex = bodyStr.length;
  }

  // Build up a regular expression matching the last name of any author
  // currently associated with any bibliography reference.
  var authorRegExp = RegExp(authors.map(function(author) {
    return escapeRegExp(author.lastName);
  }).join('|'), 'g');

  // Determine the last names and locations of all author references in the
  // document.
  var authorMatches = [];
  var authorMatch;
  while (authorMatch = authorRegExp.exec(bodyStr)) {
    authorMatches.push(authorMatch);
  }

  // Keep track of the last author preceding the current citation.
  var prevAuthorMatch = null;
  var nextAuthorMatchNumber = 0;

  // Iterate over all parenthesized portions of the document, testing if they're
  // inline citations.
  var citationRegExp = RegExp('\\([^)]+\\)', 'g');
  var citationMatch;

  // If we've already advanced past the start of the document's bibliography,
  // stop searching. This avoids giving false positives for parenthesized text
  // in bibliography entries (e.g., years for MLA format or issues in APA
  // format.)
  while ((citationMatch = citationRegExp.exec(bodyStr)) &&
      citationMatch.index < bibliographyTitleIndex) {
    // Find the last author preceding the current citation, if any. This will be
    // used to guess the appropriate reference if the current citation doesn't
    // directly contain the author's name.
    while ((prevAuthorMatch == null ||
            prevAuthorMatch.index < citationMatch.index) &&
        nextAuthorMatchNumber < authorMatches.length &&
        authorMatches[nextAuthorMatchNumber].index < citationMatch.index) {
      prevAuthorMatch = authorMatches[nextAuthorMatchNumber++];
    }

    // Invoke the callback function for the current inline citation.
    callback(bodyText, citationMatch.index, citationMatch[0],
        prevAuthorMatch ? prevAuthorMatch[0] : null);
  }
};


/**
 * Finds the bibliography at the end of the current document.
 * @param {!BibStrategy} bibStrategy The current bibliography strategy or
 *     citation format. This is used to identify the bibliography by looking for
 *     an appropriately titled header like "Works Cited".
 * @return {DocumentApp.Paragraph} The paragraph containing the bibliography
 *     title text. The actual bibliography entries will follow this title
 *     paragraph. The return value will be null if no bibliography is found in
 *     the document at this time.
 */
DocumentModel.prototype.findBibliography_ = function(bibStrategy) {
  var titleParagraph = null;

  var body = this.doc_.getBody();
  var searchResult = null;
  while (searchResult = body.findElement(DocumentApp.ElementType.PARAGRAPH,
          searchResult)) {
    var paragraph = searchResult.getElement().asParagraph();
    if (paragraph.editAsText().getText() ==
        bibStrategy.getBibliographyTitleText()) {
      titleParagraph = paragraph;
      break;
    }
  }

  return titleParagraph;
};


/**
 * Updates the content's of the document's bibliography with new references from
 * the app's data store.
 * @param {!BibStrategy} bibStrategy The current bibliography strategy or
 *     citation format. This is used to identify the bibliography by looking for
 *     an appropriately titled header, and also to correctly format new
 *     bibliography entries.
 * @param {!Array.<!DataStore.Reference>} references All the references or
 *     sources current stored in the bibliography application's data store.
 * @param {!DocumentApp.Paragraph} titleParagraph The bibliography's title
 *     paragraph found, as determined by {@code findBibliography_}.
 * @private
 */
DocumentModel.prototype.updateBibliography_ = function(bibStrategy, references,
    titleParagraph) {
  // Remove all references from the document's bibliography.
  var referenceParagraph;
  while (referenceParagraph = titleParagraph.getNextSibling()) {
    if (referenceParagraph.getType() != DocumentApp.ElementType.PARAGRAPH) {
      break;
    }
    // While there are still bibliography entry paragraphs after the bibliograpy
    // title, remove the next entry's content and merge the title into the (now
    // empty) paragraph. We also need to reset the bibliography title's style
    // attributes post-merge.
    referenceParagraph.
        clear().
        setAlignment(DocumentApp.HorizontalAlignment.CENTER).
        setIndentStart(0).
        merge();
  }

  // Add the latest reference data to the document's bibliography.
  references.sort(bibStrategy.getReferenceComparator());

  var bibParent = titleParagraph.getParent();
  var nextIndex = bibParent.getChildIndex(titleParagraph);
  for (var i = 0; i < references.length; ++i) {
    // For each bibliography entry, append a new paragraph with a half-inch
    // hanging indent.
    referenceParagraph = bibParent.insertParagraph(++nextIndex, '').
        setIndentStart(36 /* pt, or 0.5 in */).
        setIndentFirstLine(0);

    // Next, get the formatted bibliography entry as an array of
    // BibStrategy.BibEntryToken objects; then append the tokens' contents to
    // the current reference paragraph. Each token can have a different style;
    // for example, tokens representing book or journal titles will be
    // italicized when added to the document.
    var tokens = bibStrategy.getBibliographyEntry(references[i]);
    for (var j = 0; j < tokens.length; ++j) {
      var token = tokens[j];
      var tokenText = referenceParagraph.appendText(token.text);
      tokenText.setItalic(token.publicationTitle);
    }
  }
};
