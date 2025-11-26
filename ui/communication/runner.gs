const myRunner = google.script.run.withFailureHandler(onFailure);
const myRunner1 = myRunner.withSuccessHandler(onSuccess);
const myRunner2 = myRunner.withSuccessHandler(onDifferentSuccess);

myRunner1.doSomething();
myRunner1.doSomethingElse();
myRunner2.doSomething();
