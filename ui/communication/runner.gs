var myRunner = google.script.run.withFailureHandler(onFailure);
var myRunner1 = myRunner.withSuccessHandler(onSuccess);
var myRunner2 = myRunner.withSuccessHandler(onDifferentSuccess);

myRunner1.doSomething();
myRunner1.doSomethingElse();
myRunner2.doSomething();
