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
 * @fileOverview Google Apps Script and Google Docs demo: Bibstro. Abstract
 * bibliography strategy class, together with concrete implementations for the
 * supported citation formats. Only the Modern Language Associations (MLA) and
 * American Psychological Association (APA) formats are supported in this demo;
 * however, support for other formats could be added without too much
 * difficulty.
 * @author Jonathan Rascher
 * @author Saurabh Gupta
 */

// "Abstract class" definition of the methods a bibliography strategy is
// expected to support. (JavaScript doesn't really have abstract classes, of
// course, and this code isn't being run through the Google Closure compiler
// before execution; however, following the Closure format anyway makes the
// code's intentions a little clearer.)



/**
 * Base class constructor for bibliography strategies. Currently does nothing.
 * @constructor
 */
var BibStrategy = function() {};


/**
 * Returns the internal name of this bibliography strategy. This should be a
 * short string like "mla", not a full, human-readable name like "Modern
 * Language Association".
 * @return {string}
 */
BibStrategy.prototype.getName = function() {
  throw new Error('Unimplemented abstract method getName');
};


/**
 * Returns a formatted bibliography entry for a given reference.
 * @param {!DataStore.Reference} reference The reference to format.
 * @return {!Array.<!BibStrategy.BibEntryToken>} A list of bibliography entry
 *     tokens that can either be written into the active Google Docs document or
 *     formatted as HTML.
 */
BibStrategy.prototype.getBibliographyEntry = function(reference) {
  throw new Error('Unimplemented abstract method getBibliographyEntry');
};


/**
 * Returns a reference given a formatted bibliography entry, if possible. The
 * returned reference is not guaranteed to be correct under all circumstances.
 * Garbage in, garbage out.
 * @param {!Array.<!BibStrategy.BibEntryToken>} tokens A list of bibliography
 *     entry tokens read from the active Google Docs document.
 * @return {DataStore.Reference} A reference model object containing data read
 *     from the formatted bibliography tokens, or null if the original reference
 *     contents could not be determined.
 */
BibStrategy.prototype.getReferenceForBibliographyEntry = function(tokens) {
  throw new Error(
      'Unimplemented abstract method getReferenceForBibliographyEntry');
};


/**
 * Gets the text of an inline citation for the specified reference.
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
 * @return {string}
 */
BibStrategy.prototype.getInlineCitationText = function(reference, startPage,
    endPage, firstMention, abbreviateCitation) {
  return new Error('Unimplemented abstract method getInlineCitationText');
};


/**
 * Attempts, using various heuristics, to determine whether or not the specified
 * inline citation is associated with the specified reference.
 * @param {!DataStore.Reference} reference The reference we're searching for.
 * @param {?string} prevAuthor The author mentioned most recently before the
 *     inline citation being tested or null if no authors have yet been
 *     mentioned.
 * @param {string} citationStr The plain text contents of the inline citation
 *     being tested.
 * @return {boolean} Whether or not the citation being tested appears to match
 *     the specified bibliography reference.
 */
BibStrategy.prototype.testInlineCitationMatch = function(reference, prevAuthor,
    citationStr) {
  // For simplicity's sake, we assume an inline citation consists of either a a
  // list of authors, some numeric data (page numbers, publication year, etc.),
  // or both. This isn't completely accurate, but it's good enough for a demo.
  var citationFields = citationStr.match(/\((\D+)/);
  for (var i = 0; i < reference.authors.length; ++i) {
    if (citationFields) {
      // If the citation has author information, use that to determine if the
      // citation matches the reference. This code is rather simplistic, and it
      // can give false positives if many reference share one author. A real app
      // (rather than a demo) would want to do something fancier here.
      if (citationFields[1].indexOf(reference.authors[i].lastName) != -1) {
        return true;
      }
    } else {
      // Otherwise, if it citation doesn't contain an author, defer to the
      // superclass implementation, which will check if the previous author
      // mentioned in the document matches any of this reference's authors.
      // Again, this may give false positives if multiple references share one
      // or more authors.
      if (reference.authors[i].lastName == prevAuthor) {
        return true;
      }
    }
  }
  return false;
};


/**
 * Returns the heading text of this citation format's list of references. This
 * is used to find and maintain a live-updating bibliography at the end of the
 * Google Docs document.
 * @return {string}
 */
BibStrategy.prototype.getBibliographyTitleText = function() {
  return new Error('Unimplemented abstract method getBibliographyTitleText');
};


/**
 * Returns a custom comparator for sorting references. A default comparator is
 * provided that happens to work reasonably well for both MLA and APA.
 * @return {function(!DataStore.Reference, !DataStore.Reference): number} A
 *     function that can be used to compare references when sorting arrays.
 */
BibStrategy.prototype.getReferenceComparator = function() {
  return function(lhs, rhs) {
    var numCommonAuthors = Math.min(lhs.authors.length, rhs.authors.length);
    for (var i = 0; i < numCommonAuthors; ++i) {
      var lhsAuthor = lhs.authors[i];
      var rhsAuthor = rhs.authors[i];

      var lastNameCmp = lhsAuthor.lastName.localeCompare(rhsAuthor.lastName);
      if (lastNameCmp != 0) {
        return lastNameCmp;
      }

      var firstNameCmp = lhsAuthor.firstName.localeCompare(rhsAuthor.firstName);
      if (firstNameCmp != 0) {
        return firstNameCmp;
      }
    }

    var numAuthorsDiff = lhs.authors.length - rhs.authors.length;
    if (numAuthorsDiff != 0) {
      return numAuthorsDiff;
    }

    return lhs.title.localeCompare(rhs.title);
  };
};


// MLA format implementation logic:



/**
 * Constructs a new bibliography strategy for formatting citations in the Modern
 * Language Association (MLA) format.
 * @constructor
 * @extends {BibStrategy}
 */
var MlaBibStrategy = function() {
  BibStrategy.call(this);
};
inherits(MlaBibStrategy, BibStrategy);


/** @override */
MlaBibStrategy.prototype.getName = function() {
  return 'mla';
};


/** @override */
MlaBibStrategy.prototype.getBibliographyEntry = function(reference) {
  var tokens = [];

  var firstAuthor = reference.authors[0];
  tokens.push({
    text: firstAuthor.lastName + ', ' + firstAuthor.firstName,
    publicationTitle: false
  });

  if (reference.authors.length > 3) {
    tokens.push({text: ', et al', publicationTitle: false});
  } else {
    for (var i = 1; i < reference.authors.length; ++i) {
      var author = reference.authors[i];
      tokens.push({
        text: ((i == reference.authors.length - 1) ? ', and ' : ', ') +
            author.firstName + ' ' + author.lastName,
        publicationTitle: false
      });
    }
  }
  tokens.push({text: '. ', publicationTitle: false});

  switch (reference.kind) {
    case DataStore.ReferenceKind.ARTICLE:
      tokens.push({
        text: '"' + reference.title + '." ',
        publicationTitle: false
      });
      tokens.push({text: reference.publication, publicationTitle: true});
      if (reference.journalVolume && reference.journalIssue) {
        tokens.push({
          text: ' ' + reference.journalVolume + '.' + reference.journalIssue,
          publicationTitle: false
        });
      } else if (reference.journalIssue) {
        tokens.push({text: reference.journalIssue, publicationTitle: false});
      }
      tokens.push({
        text: ' (' + reference.publicationYear + '). ' +
            reference.startPage + '\u2013' /* en dash */ +
            reference.endPage + '.',
        publicationTitle: false
      });
      break;

    case DataStore.ReferenceKind.BOOK:
      tokens.push({text: reference.title, publicationTitle: true});
      tokens.push({text: '.', publicationTitle: false});
      if (reference.edition) {
        tokens.push({
          text: ' ' + reference.edition + ' ed.',
          publicationTitle: false
        });
      }
      if (reference.volume) {
        tokens.push({
          text: ' Vol. ' + reference.volume + '.',
          publicationTitle: false
        });
      }
      tokens.push({
        text: ' ' + reference.publisherCity + ': ' + reference.publisher +
            ', ' + reference.publicationYear + '.',
        publicationTitle: false
      });
      break;
  }

  return tokens;
};


/** @override */
MlaBibStrategy.prototype.getReferenceForBibliographyEntry = function(tokens) {
  // Note: If this were a real app instead of just a simple demo, we'd do this
  // using a full-fledged parser rather than all this ugly regex code.
  var reference = {};

  if (tokens.length != 3 || tokens[0].publicationTitle ||
      !tokens[1].publicationTitle || tokens[2].publicationTitle) {
    return null;
  }

  // The first token contains the author information. For books, the title will
  // be formatted in italics (and hence in the second token); however, for
  // articles, the first token will also contain the non-italic article title.
  var initialFields = tokens[0].text.match(
      /([^,.]+), ([^,.]+)((?:, [^,.]+)*?)(?:, et al)?\. (.*)/);
  if (!initialFields) {
    return null;
  }

  // The first author's name is special: The first last name comes first. :P
  reference.authors =
      [{lastName: initialFields[1], firstName: initialFields[2]}];

  // Remaining authors names' are listed with the first name coming first.
  var remainingAuthorRegExp = RegExp(', (?:and )?([^,.]+) ([^,.]+)', 'g');
  var remainingAuthorFields;
  while (remainingAuthorFields = remainingAuthorRegExp.exec(initialFields[3])) {
    reference.authors.push({
      lastName: remainingAuthorFields[2],
      firstName: remainingAuthorFields[1]
    });
  }

  // Article have non-italic titles immediately following the list of authors.
  var articleTitle = initialFields[4].match(/"([^.]+)\."/);
  if (articleTitle) {
    reference.kind = DataStore.ReferenceKind.ARTICLE;
    reference.title = articleTitle[1];
  } else {
    reference.kind = DataStore.ReferenceKind.BOOK;
  }

  // The second token contains either the journal name or the book name, and the
  // third token contains all remaining information.
  if (reference.kind == DataStore.ReferenceKind.ARTICLE) {
    reference.publication = tokens[1].text;

    var remainingFields = tokens[2].text.match(
        / (?:(\d+)\.)?(\d+)? \((\d+)\)\. (\d+)(?:\u2013|-)(\d+)/);
    if (!remainingFields) {
      return null;
    }

    // If present, parse out journal volume and issue.
    if (remainingFields[1]) {
      reference.journalVolume = remainingFields[1];
    }
    if (remainingFields[2]) {
      reference.journalIssue = remainingFields[2];
    }

    // Parse out the article's publication year and page numbers.
    reference.publicationYear = Number(remainingFields[3]);
    reference.startPage = Number(remainingFields[4]);
    reference.endPage = Number(remainingFields[5]);
  } else if (reference.kind == DataStore.ReferenceKind.BOOK) {
    reference.title = tokens[1].text;

    var remainingFields = tokens[2].text.match(
        /.(?: ([^ ]+) ed\.)?(?: Vol\. ([^ ]+).)? ([^:]+): ([^,]+), ([^.]+)\./);
    if (!remainingFields) {
      return null;
    }

    // If present, parse out the book's edition and volume.
    if (remainingFields[1]) {
      reference.edition = remainingFields[1];
    }
    if (remainingFields[2]) {
      reference.volume = remainingFields[2];
    }

    // Parse out the book's city of publication, publisher, and publication
    // year.
    reference.publisherCity = remainingFields[3];
    reference.publisher = remainingFields[4];
    reference.publicationYear = Number(remainingFields[5]);
  }

  return reference;
};


/** @override */
MlaBibStrategy.prototype.getInlineCitationText = function(reference, startPage,
    endPage, firstMention, abbreviateCitation) {
  var authors = reference.authors;

  var authorPrefix = '';
  if (!abbreviateCitation) {
    authorPrefix = authors[0].lastName;
    switch (authors.length) {
      case 1:
        break;
      case 2:
        authorPrefix += ' and ' + authors[1].lastName;
        break;
      case 3:
        authorPrefix += ', ' + authors[1].lastName + ', and ' +
            authors[2].lastName;
        break;
      default:
        authorPrefix += ' et al.';
    }
    authorPrefix += ' ';
  }

  return ['(', authorPrefix, startPage, '\u2013', endPage, ')'].join('');
};


/** @override */
MlaBibStrategy.prototype.getBibliographyTitleText = function() {
  return 'Works Cited';
};


// APA format implementation logic:



/**
 * Constructs a new bibliography strategy for formatting citations in the
 * American Psychological Association (APA) format.
 * @constructor
 * @extends {BibStrategy}
 */
var ApaBibStrategy = function() {
  BibStrategy.call(this);
};
inherits(ApaBibStrategy, BibStrategy);


/** @override */
ApaBibStrategy.prototype.getName = function() {
  return 'apa';
};


/** @override */
ApaBibStrategy.prototype.getBibliographyEntry = function(reference) {
  var tokens = [];

  var firstAuthor = reference.authors[0];
  var middleAuthors;
  var lastAuthor;
  if (reference.authors.length == 1) {
    middleAuthors = [];
    lastAuthor = null;
  } else if (reference.authors.length > 1 && reference.authors.length < 8) {
    middleAuthors = reference.authors.slice(1, reference.authors.length - 1);
    lastAuthor = reference.authors[reference.authors.length - 1];
  } else {
    middleAuthors = reference.authors.slice(1, 6);
    lastAuthor = reference.authors[reference.authors.length - 1];
  }

  tokens.push({
    text: firstAuthor.lastName + ', ' + firstAuthor.firstName.charAt(0) + '.',
    publicationTitle: false
  });
  for (var i = 0; i < middleAuthors.length; ++i) {
    var author = middleAuthors[i];
    tokens.push({
      text: ', ' + author.lastName + ', ' + author.firstName.charAt(0) + '.',
      publicationTitle: false
    });
  }
  if (lastAuthor) {
    if (reference.authors.length < 8) {
      tokens.push({
        text: ', & ' + lastAuthor.lastName + ', ' +
            lastAuthor.firstName.charAt(0) + '.',
        publicationTitle: false
      });
    } else {
      tokens.push({
        text: ', . . . ' + lastAuthor.lastName + ', ' +
            lastAuthor.firstName.charAt(0) + '.',
        publicationTitle: false
      });
    }
  }

  tokens.push({
    text: ' (' + reference.publicationYear + ').',
    publicationTitle: false
  });

  switch (reference.kind) {
    case DataStore.ReferenceKind.ARTICLE:
      tokens.push({
        text: ' ' + reference.title + '. ',
        publicationTitle: false
      });
      tokens.push({text: reference.publication, publicationTitle: true});
      if (reference.journalVolume || reference.journalIssue) {
        tokens.push({text: ', ', publicationTitle: false});
      }
      if (reference.journalVolume) {
        tokens.push({text: reference.journalVolume, publicationTitle: true});
      }
      if (reference.journalIssue) {
        tokens.push({
          text: '(' + reference.journalIssue + ')',
          publicationTitle: false
        });
      }
      tokens.push({
        text: ', ' + reference.startPage + '\u2013' /* en dash */ +
            reference.endPage + '.',
        publicationTitle: false
      });
      break;

    case DataStore.ReferenceKind.BOOK:
      tokens.push({text: ' ', publicationTitle: false});
      tokens.push({text: reference.title, publicationTitle: true});
      var additionalBookInfo = [];
      if (reference.edition) {
        additionalBookInfo.push(reference.edition + ' ed.');
      }
      if (reference.edition && reference.volume) {
        additionalBookInfo.push(' ');
      }
      if (reference.volume) {
        additionalBookInfo.push('Vol. ' + reference.volume);
      }
      if (additionalBookInfo.length) {
        tokens.push({
          text: ' (' + additionalBookInfo.join('') + ')',
          publicationTitle: false
        });
      }
      tokens.push({text: '.', publicationTitle: false});
      tokens.push({
        text: ' ' + reference.publisherCity + ': ' + reference.publisher + '.',
        publicationTitle: false
      });
      break;
  }

  return tokens;
};


/** @override */
ApaBibStrategy.prototype.getReferenceForBibliographyEntry = function(tokens) {
  // Note: If this were a real app instead of just a simple demo, we'd do this
  // using a full-fledged parser rather than all this ugly regex code.
  var reference = {};

  if (tokens.length != 3 && tokens.length != 5 ||
      tokens[0].publicationTitle ||
      !tokens[1].publicationTitle ||
      tokens[2].publicationTitle ||
      tokens.length == 5 && !tokens[3].publicationTitle ||
      tokens.length == 5 && tokens[4].publicationTitle) {
    return null;
  }

  // The first token contains information of the reference's author(s) and
  // publication year. For articles, the first token will also contain the
  // non-italic article title.
  var initialFields = tokens[0].text.match(
      '([^,]+), ([^,.]+)\\.((?:, (?:& |\\. \\. \\. |)[^,]+, [^,.]+\\.)*) ' +
          '\\((\\d+)\\)\\.(?: ([^.]+)\\.)?');
  if (!initialFields) {
    return null;
  }

  // Extract the first author's name. Unfortunately APA format only uses
  // initials for first names, so we can't actually import the full name.
  reference.authors =
      [{lastName: initialFields[1], firstName: initialFields[2]}];

  // Extract the names of any authors after the first. Note that an APA
  // bibliography entry will list no more than seven authors, so we might not
  // have enough information to import everything.
  var remainingAuthorRegExp = RegExp(', (?:& |. . . |)([^,]+), ([^,.]+)\.',
      'g');
  var remainingAuthorFields;
  while (remainingAuthorFields = remainingAuthorRegExp.exec(initialFields[3])) {
    reference.authors.push({
      lastName: remainingAuthorFields[1],
      firstName: remainingAuthorFields[2]
    });
  }

  // Extract the publication year from the penultimate field in the first token.
  reference.publicationYear = Number(initialFields[4]);

  // If the final field from the first token is filled, this reference
  // represents an article rather than a book, and the final field contains the
  // article's title.
  var articleTitle = initialFields[5];
  if (articleTitle) {
    reference.kind = DataStore.ReferenceKind.ARTICLE;
    reference.title = articleTitle;
  } else {
    reference.kind = DataStore.ReferenceKind.BOOK;
  }

  // The second token contains either a journal name or a book name, while the
  // third (and fourth, if present) tokens contain additional information.
  if (reference.kind == DataStore.ReferenceKind.ARTICLE) {
    reference.publication = tokens[1].text;

    // If there's a second italicized token, it contains the volume number.
    if (tokens.length == 5) {
      reference.journalVolume = tokens[3].text;
    }

    // Now, pull out the issue number (if present) and page numbers.
    var remainingFields = tokens[tokens.length - 1].text.match(
        /(?:\((\d+)\), )?(\d+)(?:\u2013|-)(\d+)/);
    if (!remainingFields) {
      return null;
    }

    if (remainingFields[1]) {
      reference.journalIssue = remainingFields[1];
    }

    reference.startPage = Number(remainingFields[2]);
    reference.endPage = Number(remainingFields[3]);
  } else if (reference.kind == DataStore.ReferenceKind.BOOK) {
    if (tokens.length != 3) {
      return null;
    }

    reference.title = tokens[1].text;

    var remainingFields = tokens[2].text.match(
        /(?: \((?:([^ ]+) ed\.)? ?(?:Vol\. ([^ ]+))?\))?\. ([^:]+): ([^.]+)\./);
    if (!remainingFields) {
      return null;
    }

    // If present, parse out the book's edition and volume.
    if (remainingFields[1]) {
      reference.edition = remainingFields[1];
    }
    if (remainingFields[2]) {
      reference.volume = remainingFields[2];
    }

    // Parse out the book's city of publication and publisher.
    reference.publisherCity = remainingFields[3];
    reference.publisher = remainingFields[4];
  }

  return reference;
};


/** @override */
ApaBibStrategy.prototype.getInlineCitationText = function(reference, startPage,
    endPage, firstMention, abbreviateCitation) {
  var authors = reference.authors;

  var authorPrefix = '';
  if (!abbreviateCitation) {
    authorPrefix = authors[0].lastName;
    if (authors.length == 2) {
      authorPrefix += ' & ' + authors[1].lastName;
    } else if (authors.length > 2 && authors.length < 5 && firstMention) {
      for (var i = 1; i < authors.length - 1; ++i) {
        authorPrefix += ', ' + authors[i].lastName;
      }
      authorPrefix += ', & ' + authors[authors.length - 1].lastName;
    } else if (authors.length > 5 || authors.length > 1 && !firstMention) {
      authorPrefix += ' et al.';
    }
    authorPrefix += ', ';
  }

  var pageSuffix = (startPage != endPage) ?
      ', pp. ' + startPage + '\u2013' /* en dash */ + endPage :
      ', p. ' + startPage;

  return ['(', authorPrefix, reference.publicationYear, pageSuffix, ')'].
      join('');
};


/** @override */
ApaBibStrategy.prototype.getBibliographyTitleText = function() {
  return 'References';
};


/**
 * The bibliography strategy constructors for each supported citation format.
 * @type {!Object.<String, {description: string, ctor: Function}>}
 * @const
 */
BibStrategy.Implementation = {
  'mla': {
    description: 'Modern Language Association',
    ctor: MlaBibStrategy
  },
  'apa': {
    description: 'American Psychological Association',
    ctor: ApaBibStrategy
  }
};


/**
 * Closure-style type definition for a bibliography entry token. This is an
 * abstract version of a formatted run of text (right now, either italicized as
 * a publication title or in roman text otherwise) that can either be written
 * into the active document or converted to HTML for rendering the sidebar.
 * @typedef {{text: string, publicationTitle: boolean}}
 */
BibStrategy.BibEntryToken;
