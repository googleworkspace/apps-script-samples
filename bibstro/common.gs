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
 * @fileOverview Google Apps Script and Google Docs demo: Bibstro. Utility
 * functions.
 * @author Jonathan Rascher
 * @author Saurabh Gupta
 */


/**
 * This is a slightly simplified version of Closure's {@code goog.inherits}
 * function. It sets up the prototype of the first constructor so that the first
 * class acts as a subclass of the second class.
 * @param {!Function} childCtor The subclass's constructor function.
 * @param {!Function} parentCtor The superclass's constructor function.
 */
function inherits(childCtor, parentCtor) {
  /** @constructor */ function childPrototypeCtor() {}
  childPrototypeCtor.prototype = parentCtor.prototype;
  childCtor.prototype = new childPrototypeCtor();
  childCtor.prototype.constructor = parentCtor;  // Make instanceof work.
}


/**
 * Takes an object like {@code {'foo[0]': 'a', 'foo[1]': 'b', 'foo[2]': 'c'}}
 * and turns it into an array like {@code ['a', 'b', 'c']}.
 * @param {!Object} obj The object containing the array key/value pairs (and
 *     possibly other properties as well.
 * @param {string} prefix The portion of the array key names before the square
 *     brackets (e.g., {@code foo} in the example above).
 * @return {!Array} The array extracted from the original object.
 */
function extractArrayFields(obj, prefix) {
  var arrayIndicies = Object.keys(obj).map(function(key) {
    if (key.indexOf(prefix) != 0) {
      return null;
    }
    var arrayIndexStr = key.substring(prefix.length);
    var matchResults = /^\[([0-9]+)\]$/.exec(arrayIndexStr);
    return matchResults ? Number(matchResults[1]) : null;
  }).filter(function(index) {
    return index != null;
  }).sort();

  var ret = [];
  for (var i = 0; i < arrayIndicies.length; ++i) {
    ret[i] = obj[prefix + '[' + i + ']'];
  }
  return ret;
}


/**
 * Escapes HTML special characters.
 * @param {string} unescapedStr A string that might contain unescaped HTML tags
 *     or entities.
 * @return {string} The same string with characters having special meaning in
 *     HTML properly escaped.
 */
function escapeHtml(unescapedStr) {
  var template = HtmlService.createTemplate('<?= unescaped ?>');
  template.unescaped = unescapedStr;
  return template.evaluate().getContent();
}


/**
 * Escapes RegExp special characters.
 * @param {string} unescapedStr A string that might contain unescaped regular
 *     expression metacharacters.
 * @return {string} The same string with characters having special meaning in
 *     JavaScript regular expressions properly escaped.
 * @see <a href="http://stackoverflow.com/a/6969486/152208">StackOverflow</a>
 */
function escapeRegExp(unescapedStr) {
  return unescapedStr.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}
