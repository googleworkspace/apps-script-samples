/**
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

globalThis.crypto = {
	getRandomValues: (array) => array.map(() => Math.floor(Math.random() * 256)),
};

/**
 * Wrapper function for hello
 * @param {string} name
 * @returns
 */
async function python_(source, ...args) {
	const wasm = await import("./pkg/example_bg.wasm");
	const { __wbg_set_wasm, python } = await import("./pkg/example_bg.js");

	__wbg_set_wasm(wasm);

	return await python(source, args);
}

globalThis.python_ = python_;
