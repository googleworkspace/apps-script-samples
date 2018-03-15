function listSubscriptions() {
  var optionalArgs = {
    maxResults: 10
  };
  var response = AdminReseller.Subscriptions.list(optionalArgs);
  var subscriptions = response.subscriptions;
  if (subscriptions && subscriptions.length > 0) {
    Logger.log('Subscriptions:');
    for (i = 0; i < subscriptions.length; i++) {
      var subscription = subscriptions[i];
      Logger.log('%s (%s, %s)', subscription.customerId, subscription.skuId,
          subscription.plan.planName);
    }
  } else {
    Logger.log('No subscriptions found.');
  }
}
