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

/**
 * Execute Python code and return the result.
 * @param {string} code
 * @param {...*} args - Arguments to pass to the Python code. Accessible as
 *   `args` in the Python code.
 *
 * @customfunction
 */
async function PYTHON(code = "args", ...args) {
  const result = await python_(`${code}`, ...args);

  if (result instanceof Error) {
    throw result;
  }

  return result;
}
