/*
Copyright 2024 Google LLC

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

/**
 * A generic hash function that takes a string and computes a hash using the
 * specified algorithm.
 *
 * @param {string} str - The string to hash.
 * @param {Utilities.DigestAlgorithm} algorithm - The algorithm to use to
 *  compute the hash. Defaults to MD5.
 * @returns {string} The base64 encoded hash of the string.
 */
function hash(str, algorithm = Utilities.DigestAlgorithm.MD5) {
  const digest = Utilities.computeDigest(algorithm, str);

  return Utilities.base64Encode(digest);
}

/**
 * Memoizes a function by caching its results based on the arguments passed.
 *
 * @param {Function} func - The function to be memoized.
 * @param {number} [ttl=600] - The time to live in seconds for the cached
 *  result. The maximum value is 600.
 * @param {Cache} [cache=CacheService.getScriptCache()] - The cache to store the
 *  memoized results.
 * @returns {Function} - The memoized function.
 *
 * @example
 *
 * const cached = memoize(myFunction);
 * cached(1, 2, 3); // The result will be cached
 * cached(1, 2, 3); // The cached result will be returned
 * cached(4, 5, 6); // A new result will be calculated and cached
 */
function memoize(func, ttl = 600, cache = CacheService.getScriptCache()) {
  return (...args) => {
    // consider a more robust input to the hash function to handler complex
    // types such as functions, dates, and regex
    const key = hash(JSON.stringify([func.toString(), ...args]));

    const cached = cache.get(key);

    if (cached != null) {
      return JSON.parse(cached);
    }
    const result = func(...args);
    cache.put(key, JSON.stringify(result), ttl);
    return result;
  };
}
