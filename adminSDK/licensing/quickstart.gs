function listLicenseAssignments() {
  var customerId = 'YOUR_DOMAIN_NAME_HERE';
  var productId = 'Google-Apps';
  var optionalArgs = {
    maxResults: 10
  };
  var response = AdminLicenseManager.LicenseAssignments.listForProduct(productId,
      customerId, optionalArgs);
  var assignments = response.items;
  if (assignments && assignments.length > 0) {
    Logger.log('License assignments:');
    for (i = 0; i < assignments.length; i++) {
      var assignment = assignments[i];
      Logger.log('%s (%s)', assignment.userId, assignment.skuId);
    }
  } else {
    Logger.log('No license assignments found.');
  }
}
