# Apps Script Sample Development Guide

This guide outlines best practices for developing Google Apps Script projects, focusing on type safety and modern JavaScript features.

## Important

* For new sample directories, ensure the top-level folder is included in the [`test.yaml`](.github/workflows/test.yaml) GitHub workflow's matrix configuration.
* Do not move or delete snippet tags: `[END apps_script_... ]` or `[END apps_script_... ]`.

## Apps Script Code Best Practices

Apps Script supports the V8 runtime, which enables modern ECMAScript syntax. Using these features makes your code cleaner, more readable, and less error-prone.

### 1. `let` and `const`
Use `let` and `const` instead of `var` for block-scoped variables.

*   **`const`**: Use for values that should not be reassigned.
*   **`let`**: Use for values that will change.

```javascript
const PI = 3.14;
let count = 0;

if (true) {
  let local = "I exist only in this block";
}
// local is not accessible here
```

### 2. Arrow Functions
Use arrow functions for concise function expressions, especially for callbacks.

```javascript
const numbers = [1, 2, 3];
const squares = numbers.map(x => x * x); // [1, 4, 9]
```

### 3. Destructuring
Unpack values from arrays or properties from objects into distinct variables.

```javascript
const user = { name: "Alice", age: 30 };
const { name, age } = user;

const coords = [10, 20];
const [x, y] = coords;
```

### 4. Template Literals
Use template literals for string interpolation and multi-line strings.

```javascript
const name = "World";
const greeting = `Hello, ${name}!`;

const multiLine = `
  This is a
  multi-line string.
`;
```

### 5. Default Parameters
Specify default values for function parameters.

```javascript
function greet(name = "Guest") {
  console.log(`Hello, ${name}!`);
}

greet(); // "Hello, Guest!"
```

## Apps Script V8 Runtime

It's important to understand that the Apps Script V8 runtime is
not a standard Node.js or browser environment. This can lead to compatibility
issues when incorporating third-party libraries or adapting code examples
from other JavaScript environments.

### Unavailable APIs

The following standard JavaScript APIs are **NOT** available in the
Apps Script V8 runtime:

*   **Timers**: `setTimeout`, `setInterval`, `clearTimeout`, `clearInterval`
*   **Streams**: `ReadableStream`, `WritableStream`, `TextEncoder`,
    `TextDecoder`
*   **Web APIs**: `fetch`, `FormData`, `File`, `Blob`, `URL`, `URLSearchParams`,
    `DOMException`, `atob`, `btoa`
*   **Crypto**: `crypto`, `SubtleCrypto`
*   **Global Objects**: `window`, `navigator`, `performance`, `process`
    (Node.js)

Instead of the unavailable APIs, you can use the following
Apps Script APIs as alternatives:

*   **Timers**: Use
    [`Utilities.sleep(milliseconds)`](https://developers.google.com/apps-script/reference/utilities/utilities#sleepmilliseconds)
    for synchronous pauses. Asynchronous timers are not supported.
*   **Fetch**: Use [`UrlFetchApp.fetch(url,
    params)`](https://developers.google.com/apps-script/reference/url-fetch/url-fetch-app) to make HTTP(S)
    requests.
*   **atob**: Use
    [`Utilities.base64Decode()`](https://developers.google.com/apps-script/reference/utilities/utilities#base64decodeencoded)
    to decode Base64-encoded strings.
*   **btoa**: Use
    [`Utilities.base64Encode()`](https://developers.google.com/apps-script/reference/utilities/utilities#base64encodedata)
    to encode strings in Base64.
*   **Crypto**: Use [`Utilities`](https://developers.google.com/apps-script/reference/utilities/utilities)
    for cryptographic functions like
    [`computeDigest()`](https://developers.google.com/apps-script/reference/utilities/utilities#computedigestalgorithm,-value),
    [`computeHmacSha256Signature()`](https://developers.google.com/apps-script/reference/utilities/utilities#computehmacsha256signaturevalue,-key),
    and
    [`computeRsaSha256Signature()`](https://developers.google.com/apps-script/reference/utilities/utilities#computersasha256signaturevalue,-key).

For some APIs, other workarounds might exist. For example, you might be able to
use a polyfill for `TextEncoder`.

### Asynchronous Limitations

The V8 runtime supports `async` and `await` syntax and the `Promise` object.
However, the Apps Script runtime environment is fundamentally
synchronous.

*   **Microtasks (Supported)**: The runtime processes the microtask queue (where
    `Promise.then()` callbacks and `await` resolutions occur) after the current
    call stack clears.
*   **Macrotasks (Not Supported)**: Apps Script does not have a
    standard event loop for macrotasks. Functions like `setTimeout()` and
    `setInterval()` are not available.
*   **WebAssembly Exception**: The WebAssembly API is the only built-in
    feature that operates in a non-blocking manner within the runtime, allowing
    for specific asynchronous compilation patterns (WebAssembly.instantiate).

All I/O operations, such as
[`UrlFetchApp.fetch()`](https://developers.google.com/apps-script/reference/url-fetch/url-fetch-app), are
blocking. To achieve parallel network requests, use
[`UrlFetchApp.fetchAll()`](https://developers.google.com/apps-script/reference/url-fetch/url-fetch-app#fetchallrequests).

### Class Limitations

The V8 runtime has specific limitations regarding modern ES6+ class features:

*   **Private Fields**: Private class fields (for example, `#field`) are not
    supported and cause parsing errors. Consider using closures or `WeakMap` for
    true encapsulation.
*   **Static Fields**: Direct static field declarations within the class body
    (for example, `static count = 0;`) are not supported. Assign static
    properties to the class after its definition (for example, `MyClass.count =
    0;`).

### Module Limitations

*   **ES6 Modules**: The V8 runtime does not support ES6 modules (`import` /
    `export`). To use libraries, you must either use the [
    Apps Script library mechanism](https://developers.google.com/apps-script/guides/libraries)
    or bundle your code and its dependencies into a single script file. ([Issue
    Tracker](https://issuetracker.google.com/issues/134627726))
*   **File Execution Order**: All script files in your project are executed in a
    global scope. It's best to avoid top-level code with side effects and ensure
    functions and classes are defined before being used across files. Explicitly
    order your files in the editor if dependencies exist between them.

## Type Checking with JSDoc

This project uses a type checker to validate `.gs` files for errors. Since `.gs` files are technically JavaScript, we use JSDoc comments to provide type information. This ensures your code is type-safe and well-documented.

### Running Checks

You can run the type checker from the root of the repository.

**Check all projects:**
```bash
pnpm run check
```

**Check a specific path:**
To check only projects within a specific directory (e.g., `solutions/automations`), pass the path as an argument:
```bash
pnpm run check solutions/automations
```

### Core Concepts

#### 1. Basic Types
Use `@param` and `@return` to define function inputs and outputs.

```javascript
/**
 * Adds two numbers.
 * @param {number} a The first number.
 * @param {number} b The second number.
 * @return {number} The sum.
 */
function add(a, b) {
  return a + b;
}
```

#### 2. Apps Script Types
You can reference global Apps Script types directly.

```javascript
/**
 * Gets the active sheet name.
 * @return {string} The name of the sheet.
 */
function getSheetName() {
  // Types like SpreadsheetApp, Sheet, Range are available globally
  const sheet = SpreadsheetApp.getActiveSheet();
  return sheet.getName();
}
```

#### 3. Optional Parameters
Use `[]` or `=` to denote optional parameters.

```javascript
/**
 * @param {string} name The name.
 * @param {number=} age Optional age.
 */
function greet(name, age) {
  if (age) { ... }
}
```

### Advanced Patterns

#### 4. Custom Objects (@typedef)
For complex objects, define a type using `@typedef`.

```javascript
/**
 * @typedef {Object} UserConfig
 * @property {string} username The user's name.
 * @property {boolean} isAdmin Whether the user is an admin.
 * @property {number} [retryCount] Optional retry attempts.
 */

/**
 * Processes a user configuration.
 * @param {UserConfig} config The configuration object.
 */
function processUser(config) {
  console.log(config.username);
}
```

#### 5. Type Casting
Sometimes the type checker cannot infer the type correctly. Use inline `@type` to cast.

```javascript
const data = JSON.parse(jsonString);

/** @type {UserConfig} */
const config = data;
```

#### 6. Arrays and Generics
Specify array contents clearly.

```javascript
/**
 * @param {string[]} names An array of strings.
 * @return {Array<number>} An array of numbers.
 */
function lengths(names) {
  return names.map(n => n.length);
}
```

#### 7. Handling `null` and `undefined`
Be explicit if a value can be null.

```javascript
/**
 * @param {string|null} id The ID, or null if not found.
 */
function find(id) { ... }
```

### Common Issues & Fixes

- **"Property 'x' does not exist on type 'Object'"**: This usually means you are accessing a property on a generic object. Define a `@typedef` for that object structure.
- **Implicit 'any'**: If you see "Parameter 'x' implicitly has an 'any' type", it means you forgot a JSDoc `@param` tag. Add it to fix the error.