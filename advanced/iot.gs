/**
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// [START iot_list_registries]
/**
 * Lists the registries for the configured project and region.
 */
function listRegistries() {
  Logger.log('Cloud IoT Core Apps Script sample');
  var projectId = 'your-project-id';
  var cloudRegion = 'us-central1';
  var parent = 'projects/' + projectId + '/locations/' + cloudRegion;
  Logger.log(parent);
  var response = CloudIoT.Projects.Locations.Registries.list(parent);
  Logger.log(response);
}
// [END iot_list_registries]

// [START iot_create_registry]
/**
 * Creates a registry.
 */
function createRegistry() {
  var cloudRegion = 'us-central1';
  var name = 'your-registry-name';
  var projectId = 'your-project-id';
  var topic = 'your-pubsub-topic';

  var pubsubTopic = 'projects/' + projectId + '/topics/' + topic;

  Logger.log('Creating registry: ' + name);

  var registry = {
    'eventNotificationConfigs': [{
      // From - https://console.cloud.google.com/cloudpubsub
      pubsubTopicName : pubsubTopic
    }],
    'id': name
  };
  var parent = 'projects/' + projectId + '/locations/' + cloudRegion;

  var response = CloudIoT.Projects.Locations.Registries.create(registry, parent)
  Logger.log(response);
}
// [END iot_create_registry]

// [START iot_get_registry]
/**
 * Describes a registry.
 */
function getRegistry() {
  Logger.log('Getting registry: ' + name);
  var projectId = 'your-project-id';
  var cloudRegion = 'us-central1';

  var parent = 'projects/' + projectId + '/locations/' + cloudRegion;
  var registryName = parent + '/registries/' + name;

  var response = CloudIoT.Projects.Locations.Registries.get(registryName)
  Logger.log(response);
}
// [END iot_get_registry]

// [START iot_delete_registry]
/**
 * Deletes a registry.
 */
function deleteRegistry() {
  var cloudRegion = 'us-central1';
  var name = 'your-registry-name';
  var projectId = 'your-project-id';

  Logger.log('Deleting registry: ' + name);

  var parent = 'projects/' + projectId + '/locations/' + cloudRegion;
  var registryName = parent + '/registries/' + name;

  var response = CloudIoT.Projects.Locations.Registries.remove(registryName)
  Logger.log(response);
}
// [END iot_delete_registry]

// [START iot_list_devices]
/**
 * Lists the devices in the given registry.
 */
function listDevicesForRegistry() {
  Logger.log('Listing devices for registry: ' + registryName);

  var cloudRegion = 'us-central1';
  var name = 'your-registry-name';
  var projectId = 'your-project-id';

  var parent = 'projects/' + projectId + '/locations/' + cloudRegion;
  var registryName = parent + '/registries/' + registryName;

  var response = CloudIoT.Projects.Locations.Registries.Devices.list(registryName);
  Logger.log(response);
}
// [END iot_list_devices]

// [START iot_create_unauth_device]
/**
 * Creates a device without credentials.
 */
function createDevice() {
  var cloudRegion = 'us-central1';
  var name = 'your-device-name';
  var projectId = 'your-project-id';
  var registry = 'your-registry-name';

  Logger.log('Creating device: ' + name + ' in Registry: ' + registry);
  var parent = 'projects/' + projectId + '/locations/' + cloudRegion + '/registries/' + registry;

  var device = {
    'id': name,
    'gatewayConfig': {
      'gatewayType': 'NON_GATEWAY',
      'gatewayAuthMethod': 'ASSOCIATION_ONLY'
    }
  };

  var response = CloudIoT.Projects.Locations.Registries.Devices.create(device, parent)
  Logger.log(response);
}
// [END iot_create_unauth_device]

// [START iot_create_rsa_device]
/**
 * Creates a device with RSA credentials.
 */
function createRsaDevice() {
  // Create the RSA public/private keypair with the following OpenSSL command:
  //    openssl req -x509 -newkey rsa:2048 -days 3650 -keyout rsa_private.pem \
  //      -nodes -out rsa_cert.pem -subj "/CN=unused"
  var cert =
      '-----BEGIN CERTIFICATE-----\n' +
      'MIIDAzCCAeugAwIBAgIUa+57FEXLaGg3BEwNuWdWmHPWpkwwDQYJKoZIhvcNAQEL\n' +
      'BQAwETEPMA0GA1UEAwwGdW51c2VkMB4XDTE5MDYwNTIwMTIyMFoXDTI5MDYwMjIw\n' +
      'MTIyMFowETEPMA0GA1UEAwwGdW51c2VkMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A\n' +
      'MIIBCgKCAQEA3mJ+zDJHcP95u/9olC2e+wXz6z7WYQQbsYT8sFBaYEeLlU9SUaMf\n' +
      'uzmAkW+7vWkytobAc5HbWC93O5hp/8y+IIy48ezUX3px5TX5Jo+whLqeX5Jweesk\n' +
      'Vekl5REuLFpSGDwxjVtBA05xFtEGxihuYgB7TrJ+ikkoNpPUbvxxBDo68XSEbf9S\n' +
      'yGldeUCmG92bzJU6tepbjXN/Liw6kebhXmA4Bg5HStmIzyZQmZWR9X57LHWzGb3E\n' +
      '8DizezmYuqq/OsC7MbeJ48y9a8r575BNGe4pbXDpSblC7967WOYmMLrUlKpUoaNs\n' +
      '+bHCZzyviKTKomol7eKUgb+t62lFYcg1xwIDAQABo1MwUTAdBgNVHQ4EFgQU4Z8C\n' +
      'QesrPzkAJBJJcrIZp6moY1YwHwYDVR0jBBgwFoAU4Z8CQesrPzkAJBJJcrIZp6mo\n' +
      'Y1YwDwYDVR0TAQH/BAUwAwEB/zANBgkqhkiG9w0BAQsFAAOCAQEAaCSyX4Wlx+kg\n' +
      'uRQzGi55iMABSUuxoPPPWXZTOqehWFt52nJ3F7pZaTkNXyNPXT+niWwter6327MO\n' +
      'v+fQE9NWDHYID3HCxVg3FChh2PnrW0y7FZrDq6i3RKBDTzRZJ0LwAnyZ/0n9XB38\n' +
      'LU25vhYTsaYOOFQh665UaYWvGNWsXaHGSijfFrQQKGtnbCl9UE3Mgw/uxrfaSt/n\n' +
      '/HPo258rwe+fg4pqvVX/3Pi94o70FxLUEJGYoBXR53C/7YXx9BSoL1gqb3ST3Pg8\n' +
      'p120iBzjVTRTiDtHMYSr2klHNB9nhcNU7XQITkWSsWk9wqmYUNdgy894ygfikyvz\n' +
      'mfh8/cACfg==\n' +
      '-----END CERTIFICATE-----\n';
  var cloudRegion = 'us-central1';
  var projectId = 'your-project-id';
  var registry = 'your-registry-id';

  Logger.log('Creating device: ' + name + ' in Registry: ' + registry);

  var parent = 'projects/'+ projectId + '/locations/' + cloudRegion + '/registries/' + registry;
  var device = {
    'id': name,
    'gatewayConfig': {
      'gatewayType': 'NON_GATEWAY',
      'gatewayAuthMethod': 'ASSOCIATION_ONLY'
    }
  };

  var response = CloudIoT.Projects.Locations.Registries.Devices.create(device, parent);
  Logger.log(response);
}
// [END iot_create_rsa_device]

// [START iot_delete_device]
/**
 * Deletes a device from the given registry
 */
function deleteDevice() {

  var cloudRegion = 'us-central1';
  var name = 'your-device-name';
  var projectId = 'intense-wavelet-343';
  var registry = 'your-registry-name';

  Logger.log('Deleting device: ' + name + ' in Registry: ' + registry);

  var parent = 'projects/'+ projectId + '/locations/' + cloudRegion + '/registries/' + registry;
  var deviceName = parent + '/devices/' + name;

  var response = CloudIoT.Projects.Locations.Registries.Devices.remove(deviceName)
  Logger.log(response);
}
// [END iot_delete_device]
