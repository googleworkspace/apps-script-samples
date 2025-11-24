/**
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/// <reference types="node" />

import { exec } from "child_process";
import {
	copyFileSync,
	existsSync,
	mkdirSync,
	readdirSync,
	rmSync,
	statSync,
	writeFileSync,
} from "fs";
import { dirname, join, relative, resolve, sep } from "path";
import { promisify } from "util";

const execAsync = promisify(exec);
const TEMP_ROOT = ".tsc_check";

interface Project {
	files: string[];
	name: string;
	path: string;
}

interface CheckResult {
	name: string;
	success: boolean;
	output: string;
}

// Helper to recursively find all files with a specific extension
function findFiles(
	dir: string,
	extension: string,
	fileList: string[] = [],
): string[] {
	const files = readdirSync(dir);
	for (const file of files) {
		if (file.endsWith(".js")) continue;
		const filePath = join(dir, file);
		const stat = statSync(filePath);
		if (stat.isDirectory()) {
			if (file !== "node_modules" && file !== ".git" && file !== TEMP_ROOT) {
				findFiles(filePath, extension, fileList);
			}
		} else if (file.endsWith(extension)) {
			fileList.push(filePath);
		}
	}
	return fileList;
}

// Find all directories containing appsscript.json
function findProjectRoots(rootDir: string): string[] {
	return findFiles(rootDir, "appsscript.json").map((f) => dirname(f));
}

function createProjects(
	rootDir: string,
	projectRoots: string[],
	allGsFiles: string[],
): Project[] {
	// Holds files that belong to a formal Apps Script project (defined by the presence of appsscript.json).
	const projectGroups = new Map<string, string[]>();

	// Holds "orphan" files that do not belong to any defined Apps Script project (no appsscript.json found).
	const looseGroups = new Map<string, string[]>();

	// Initialize project groups
	for (const p of projectRoots) {
		projectGroups.set(p, []);
	}

	for (const file of allGsFiles) {
		let assigned = false;
		let currentDir = dirname(file);

		while (currentDir.startsWith(rootDir) && currentDir !== rootDir) {
			if (projectGroups.has(currentDir)) {
				projectGroups.get(currentDir)?.push(file);
				assigned = true;
				break;
			}
			currentDir = dirname(currentDir);
		}

		if (!assigned) {
			const dir = dirname(file);
			if (!looseGroups.has(dir)) {
				looseGroups.set(dir, []);
			}
			looseGroups.get(dir)?.push(file);
		}
	}

	const projects: Project[] = [];
	projectGroups.forEach((files, dir) => {
		if (files.length > 0) {
			projects.push({
				files,
				name: `Project: ${relative(rootDir, dir)}`,
				path: relative(rootDir, dir),
			});
		}
	});
	looseGroups.forEach((files, dir) => {
		if (files.length > 0) {
			projects.push({
				files,
				name: `Loose Project: ${relative(rootDir, dir)}`,
				path: relative(rootDir, dir),
			});
		}
	});

	return projects;
}

async function checkProject(
	project: Project,
	rootDir: string,
): Promise<CheckResult> {
	const projectNameSafe = project.name.replace(/[^a-zA-Z0-9]/g, "_");
	const projectTempDir = join(TEMP_ROOT, projectNameSafe);

	// Synchronous setup is fine as it's fast and avoids race conditions on mkdir if we were sharing dirs (we aren't)
	mkdirSync(projectTempDir, { recursive: true });

	for (const file of project.files) {
		const fileRelPath = relative(rootDir, file);
		const destPath = join(projectTempDir, fileRelPath.replace(/\.gs$/, ".js"));
		const destDir = dirname(destPath);
		mkdirSync(destDir, { recursive: true });
		copyFileSync(file, destPath);
	}

	const tsConfig = {
		extends: "../../tsconfig.json",
		compilerOptions: {
			noEmit: true,
			allowJs: true,
			checkJs: true,
			typeRoots: [resolve(rootDir, "node_modules/@types")],
		},
		include: ["**/*.js"],
	};

	writeFileSync(
		join(projectTempDir, "tsconfig.json"),
		JSON.stringify(tsConfig, null, 2),
	);

	try {
		await execAsync(`tsc -p "${projectTempDir}"`, { cwd: rootDir });
		return { name: project.name, success: true, output: "" };
	} catch (e: any) {
		const rawOutput = (e.stdout || "") + (e.stderr || "");

		const rewritten = rawOutput
			.split("\n")
			.map((line: string) => {
				if (line.includes(projectTempDir)) {
					let newLine = line.split(projectTempDir + sep).pop();
					if (!newLine) {
						return line;
					}
					newLine = newLine.replace(/\.js(:|\()/g, ".gs$1");
					return newLine;
				}
				return line;
			})
			.join("\n");

		return { name: project.name, success: false, output: rewritten };
	}
}

async function main() {
	try {
		const rootDir = resolve(".");
		const args = process.argv.slice(2);
		const searchArg = args.find((arg) => arg !== "--");

		// 1. Discovery
		const projectRoots = findProjectRoots(rootDir);
		const allGsFiles = findFiles(rootDir, ".gs");

		// 2. Grouping
		const projects = createProjects(rootDir, projectRoots, allGsFiles);

		// 3. Filtering
		const projectsToCheck = projects.filter((p) => {
			return !searchArg || p.path.startsWith(searchArg);
		});

		if (projectsToCheck.length === 0) {
			console.log("No projects found matching the search path.");
			return;
		}

		// 4. Setup
		if (existsSync(TEMP_ROOT)) {
			rmSync(TEMP_ROOT, { recursive: true, force: true });
		}
		mkdirSync(TEMP_ROOT);

		console.log(`Checking ${projectsToCheck.length} projects in parallel...`);

		// 5. Parallel Execution
		const results = await Promise.all(
			projectsToCheck.map((p) => checkProject(p, rootDir)),
		);

		// 6. Reporting
		let hasError = false;
		for (const result of results) {
			if (!result.success) {
				hasError = true;
				console.log(`\n--- Failed: ${result.name} ---`);
				console.log(result.output);
			}
		}

		if (hasError) {
			console.error("\nOne or more checks failed.");
			process.exit(1);
		} else {
			console.log("\nAll checks passed.");
		}
	} catch (err) {
		console.error("Unexpected error:", err);
		process.exit(1);
	} finally {
		if (existsSync(TEMP_ROOT)) {
			rmSync(TEMP_ROOT, { recursive: true, force: true });
		}
	}
}

main();
