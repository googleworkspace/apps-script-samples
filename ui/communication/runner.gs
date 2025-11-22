/* eslint-disable no-unused-vars */

/**
 * @typedef {Object} GoogleScriptRun
 * @property {function():void} doSomething
 * @property {function():void} doSomethingElse
 * @property {function(function(string):void):GoogleScriptRun} withSuccessHandler
 * @property {function(function(Error):void):GoogleScriptRun} withFailureHandler
 */

/**
 * @type {{script: {run: GoogleScriptRun}}}
 */
var google = {
  script: {
    run: {
      doSomething: function() {},
      doSomethingElse: function() {},
      withSuccessHandler: function() {
        return this;
      },
      withFailureHandler: function() {
        return this;
      },
    },
  },
};

/**
 * @param {Error} error
 */
function onFailure(error) {
  console.log(error.message);
}

/**
 * @param {string} result
 */
function onSuccess(result) {
  console.log(result);
}

/**
 * @param {string} result
 */
function onDifferentSuccess(result) {
  console.log(result);
}

var myRunner = google.script.run.withFailureHandler(onFailure);
var myRunner1 = myRunner.withSuccessHandler(onSuccess);
var myRunner2 = myRunner.withSuccessHandler(onDifferentSuccess);

myRunner1.doSomething();
myRunner1.doSomethingElse();
myRunner2.doSomething();
