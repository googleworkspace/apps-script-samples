// Copyright 2015 Google Inc. All Rights Reserved.
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

'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var shell = require('gulp-shell');
var minimist = require('minimist');
var rename = require('gulp-rename');
var debug = require('gulp-debug');
var del = require('del');

// minimist structure and defaults for this task configuration
var knownOptions = {
  string: ['env'],
  'default': {
    env: 'dev'
  }
};
var options = minimist(process.argv.slice(2), knownOptions);

// The root working directory where code is edited
var srcRoot = 'src';
// The root staging folder for gapps configurations
var dstRoot = 'build/' + options.env + '/src';

// Runs the copy-latest task, then calls gapps upload in the correct
// configuration directory based on the target environment
gulp.task('upload-latest', ['copy-latest'], shell.task(['gapps upload'],
    {cwd: 'build/' + options.env}));

// Copies all files based on the current target environment.
// Completion of "clean-deployment" is a prerequisite for starting the copy
// process.
gulp.task('copy-latest', ['clean-deployment'], function() {
  copyEnvironmentSpecific();
  copyServerCode();
  copyClientCode();
});

// Copies all .js that will be run by the Apps Script runtime
function copyServerCode() {
  return gulp.src([
    srcRoot + '/server/*.js',
    srcRoot + '/libs/*.js',
    srcRoot + '/ui/*.server.js'])
      .pipe(gulp.dest(dstRoot));
}

// Appends ".html" to any css, and any js that will be included in client code
// Then copies those .html files to the upload staging folder.
function copyClientCode() {
  return gulp.src([
    srcRoot + '/ui/*.html',
    srcRoot + '/ui/*.css',
    srcRoot + '/ui/*.client.js'])
      .pipe(
      rename(function(path) {
        if (path.extname !== '.html') {
          path.extname = path.extname + '.html';
        }
        return path;
      }))
      .pipe(gulp.dest(dstRoot));
}

// Does any environment specific work.
// the "lint" step is also here, as that is only done on "dev"
// targeted updates.
function copyEnvironmentSpecific() {
  // Do target environment specific work
  switch (options.env) {
    case 'dev':
      gulp.src(srcRoot + '/**/*.js')
          .pipe(jshint())
          .pipe(jshint.reporter('jshint-stylish'));
      break;

    case 'tst':
      //Copy test scripts, if target is "tst"
      gulp.src(srcRoot + '/tests/*.js')
          .pipe(gulp.dest(dstRoot));
      break;

    default:
      break;
  }

  return gulp.src(srcRoot + '/environments/' + options.env + '/*.js')
      .pipe(gulp.dest(dstRoot));
}

// Utility tasks
gulp.task('clean-deployment', function(cb) {
  return del([
    dstRoot + '/*.*'
  ]);
});

gulp.task('clean-deployments', function(cb) {
  return del([
    'build/dev/src/*.*',
    'build/tst/src/*.*' ,
    'build/prd/src/*.*'
  ]);
});

gulp.task('lint', function() {
  return gulp.src(srcRoot + '/**/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter('jshint-stylish'));
});


