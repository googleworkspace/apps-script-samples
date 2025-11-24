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

import fs from "node:fs";
import path from "node:path";
import esbuild from "esbuild";
import { wasmLoader } from "esbuild-plugin-wasm";

const outdir = "dist";
const sourceRoot = "src";

await esbuild.build({
	entryPoints: ["./src/wasm.js"],
	bundle: true,
	outdir,
	sourceRoot,
	platform: "neutral",
	format: "esm",
	plugins: [wasmLoader({ mode: "embedded" })],
	inject: ["polyfill.js"],
	minify: true,
	banner: { js: "// Generated code DO NOT EDIT\n" },
});

const passThroughFiles = ["main.js", "test.js", "appsscript.json", "add-on.js"];

await Promise.all(
	passThroughFiles.map(async (file) =>
		fs.promises.copyFile(path.join(sourceRoot, file), path.join(outdir, file)),
	),
);
