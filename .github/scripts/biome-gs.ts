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

import { exec } from "node:child_process";
import { readdirSync, renameSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { promisify } from "node:util";

const execAsync = promisify(exec);

async function findGsFiles(
  dir: string,
  fileList: string[] = [],
): Promise<string[]> {
  const files = readdirSync(dir);
  for (const file of files) {
    const filePath = join(dir, file);
    if (
      file === "node_modules" ||
      file === ".git" ||
      file === "dist" ||
      file === "target" ||
      file === "pkg"
    ) {
      continue;
    }
    const stat = statSync(filePath);
    if (stat.isDirectory()) {
      await findGsFiles(filePath, fileList);
    } else if (file.endsWith(".gs") && file !== "moment.gs") {
      fileList.push(filePath);
    }
  }
  return fileList;
}

async function main() {
  const command = process.argv[2]; // 'lint' or 'format'
  if (command !== "lint" && command !== "format") {
    console.error("Usage: tsx biome-gs.ts [lint|format]");
    process.exit(1);
  }

  const rootDir = resolve(".");
  const gsFiles = await findGsFiles(rootDir);
  const renamedFiles: { oldPath: string; newPath: string }[] = [];

  const restoreFiles = () => {
    for (const { oldPath, newPath } of renamedFiles) {
      try {
        renameSync(newPath, oldPath);
      } catch (e) {
        console.error(`Failed to restore ${newPath} to ${oldPath}:`, e);
      }
    }
    renamedFiles.length = 0;
  };

  process.on("SIGINT", () => {
    restoreFiles();
    process.exit(1);
  });
  process.on("SIGTERM", () => {
    restoreFiles();
    process.exit(1);
  });
  process.on("exit", restoreFiles);

  try {
    // 1. Rename .gs to .gs.js
    for (const gsFile of gsFiles) {
      const jsFile = `${gsFile}.js`;
      renameSync(gsFile, jsFile);
      renamedFiles.push({ oldPath: gsFile, newPath: jsFile });
    }

    // 2. Run Biome
    const biomeArgs =
      command === "format" ? "check --write --unsafe ." : "check .";
    console.log(`Running biome ${biomeArgs}...`);
    try {
      const { stdout, stderr } = await execAsync(
        `pnpm exec biome ${biomeArgs}`,
        { cwd: rootDir },
      );
      if (stdout) console.log(stdout.replace(/\.gs\.js/g, ".gs"));
      if (stderr) console.error(stderr.replace(/\.gs\.js/g, ".gs"));
    } catch (e: any) {
      if (e.stdout) console.log(e.stdout.replace(/\.gs\.js/g, ".gs"));
      if (e.stderr) console.error(e.stderr.replace(/\.gs\.js/g, ".gs"));
      // Don't exit yet, we need to restore files
    }
  } catch (err) {
    console.error("An error occurred:", err);
  } finally {
    restoreFiles();
    // Remove listeners to avoid double-running or issues on exit
    process.removeAllListeners("exit");
    process.removeAllListeners("SIGINT");
    process.removeAllListeners("SIGTERM");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
