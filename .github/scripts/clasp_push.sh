#! /bin/bash
# Copyright 2020 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

export LC_ALL=C.UTF-8
export LANG=C.UTF-8

function contains_changes() {
  [[ "${*:2}" = "" ]] && return 0
  for f in "${@:2}"; do
    case $(realpath "$f")/ in 
      $(realpath "$1")/*) return 0;;
    esac
  done
  return 1
}

changed_files=$(echo "${@:1}" | xargs realpath | xargs -I {} dirname {}| sort -u | uniq)
dirs=()

IFS=$'\n' read -r -d '' -a dirs < <( find . -name '.clasp.json' -exec dirname '{}' \; | sort -u | xargs realpath )

exit_code=0

for dir in "${dirs[@]}"; do
  pushd "${dir}" > /dev/null || exit
  contains_changes "$dir" "${changed_files[@]}" || continue
  echo "Publishing ${dir}"
  clasp push -f
  status=$?
  if [ $status -ne 0 ]; then
    exit_code=$status
  fi
  popd > /dev/null || exit
done

if [ $exit_code -ne 0 ]; then
  echo "Script push failed."
fi

exit $exit_code