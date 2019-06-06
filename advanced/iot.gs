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
// [START apps_script_iot_list_registries]
/**
 * Lists the registries for the configured project and region.
 */
function listRegistries() {
  Logger.log(response);
  const projectId = 'your-project-id';
  const cloudRegion = 'us-central1';
  const parent = 'projects/' + projectId + '/locations/' + cloudRegion;

  var response = CloudIoT.Projects.Locations.Registries.list(parent);
  if (response.deviceRegistries){
    response.deviceRegistries.forEach(
      function(registry){
        Logger.log(registry.id);
      });
  }
}
// [END apps_script_iot_list_registries]

// [START apps_script_iot_create_registry]
/**
 * Creates a registry.
 */
function createRegistry() {
  const cloudRegion = 'us-central1';
  const name = 'your-registry-name';
  const projectId = 'your-project-id';
  const topic = 'your-pubsub-topic';

  const pubsubTopic = 'projects/' + projectId + '/topics/' + topic;

  const registry = {
    eventNotificationConfigs: [{
      // From - https://console.cloud.google.com/cloudpubsub
      pubsubTopicName : pubsubTopic
    }],
    'id': name
  };
  const parent = 'projects/' + projectId + '/locations/' + cloudRegion;

  var response = CloudIoT.Projects.Locations.Registries.create(registry, parent)
  Logger.log('Created registry: ' + response.id);
}
// [END apps_script_iot_create_registry]

// [START apps_script_iot_get_registry]
/**
 * Describes a registry.
 */
function getRegistry() {
  const cloudRegion = 'us-central1';
  const name = 'your-registry-name';
  const projectId = 'your-project-id';

  const parent = 'projects/' + projectId + '/locations/' + cloudRegion;
  const registryName = parent + '/registries/' + name;

  var response = CloudIoT.Projects.Locations.Registries.get(registryName)
  Logger.log('Retrieved registry: ' + response.id);
}
// [END apps_script_iot_get_registry]

// [START apps_script_iot_delete_registry]
/**
 * Deletes a registry.
 */
function deleteRegistry() {
  const cloudRegion = 'us-central1';
  const name = 'your-registry-name';
  const projectId = 'your-project-id';

  const parent = 'projects/' + projectId + '/locations/' + cloudRegion;
  const registryName = parent + '/registries/' + name;

  var response = CloudIoT.Projects.Locations.Registries.remove(registryName)
  // Successfully removed registry if exception was not thrown.
  Logger.log('Deleted registry: ' + name);
}
// [END apps_script_iot_delete_registry]

// [START apps_script_iot_list_devices]
/**
 * Lists the devices in the given registry.
 */
function listDevicesForRegistry() {
  const cloudRegion = 'us-central1';
  const name = 'your-registry-name';
  const projectId = 'your-project-id';

  const parent = 'projects/' + projectId + '/locations/' + cloudRegion;
  const registryName = parent + '/registries/' + name;

  var response = CloudIoT.Projects.Locations.Registries.Devices.list(registryName);

  Logger.log('Registry contains the following devices: ');
  if (response.devices) {
    response.devices.forEach(
      function(device){
        Logger.log('\t' + device.id);
      });
  }
}
// [END apps_script_iot_list_devices]

// [START apps_script_iot_create_unauth_device]
/**
 * Creates a device without credentials.
 */
function createDevice() {
  const cloudRegion = 'us-central1';
  const name = 'your-device-name';
  const projectId = 'your-project-id';
  const registry = 'your-registry-name';

  Logger.log('Creating device: ' + name + ' in Registry: ' + registry);
  const parent = 'projects/' + projectId + '/locations/' + cloudRegion + '/registries/' + registry;

  const device = {
    id: name,
    gatewayConfig: {
      gatewayType: 'NON_GATEWAY',
      gatewayAuthMethod: 'ASSOCIATION_ONLY'
    }
  };

  var response = CloudIoT.Projects.Locations.Registries.Devices.create(device, parent)
  Logger.log('Created device:' + response.name);
}
// [END apps_script_iot_create_unauth_device]

// [START apps_script_iot_create_rsa_device]
/**
 * Creates a device with RSA credentials.
 */
function createRsaDevice() {
  // Create the RSA public/private keypair with the following OpenSSL command:
  //    openssl req -x509 -newkey rsa:2048 -days 3650 -keyout rsa_private.pem \
  //      -nodes -out rsa_cert.pem -subj "/CN=unused"
  //
  // **NOTE** Be sure to insert the newline charaters in the string constant.
  const cert =
      '-----BEGIN CERTIFICATE-----\n' +
      'your-PUBLIC-certificate-b64-bytes\n' +
      '...\n' +
      'more-PUBLIC-certificate-b64-bytes==\n' +
      '-----END CERTIFICATE-----\n';

  const cloudRegion = 'us-central1';
  const name = 'your-device-name';
  const projectId = 'your-project-id';
  const registry = 'your-registry-name';

  const parent = 'projects/' + projectId + '/locations/' + cloudRegion + '/registries/' + registry;
  const device = {
    id: name,
    gatewayConfig: {
      gatewayType: 'NON_GATEWAY',
      gatewayAuthMethod: 'ASSOCIATION_ONLY'
    },
    credentials: [{
      publicKey: {
        format: 'RSA_X509_PEM',
        key: cert
      }
    }],
  };

  var response = CloudIoT.Projects.Locations.Registries.Devices.create(device, parent);
  Logger.log('Created device:' + response.name);
}
// [END apps_script_iot_create_rsa_device]

// [START apps_script_iot_delete_device]
/**
 * Deletes a device from the given registry.
 */
function deleteDevice() {
  const cloudRegion = 'us-central1';
  const name = 'your-device-name';
  const projectId = 'your-project-id';
  const registry = 'your-registry-name';

  const parent = 'projects/' + projectId + '/locations/' + cloudRegion + '/registries/' + registry;
  const deviceName = parent + '/devices/' + name;

  var response = CloudIoT.Projects.Locations.Registries.Devices.remove(deviceName)
  // If no exception thrown, device was successfully removed
  Logger.log('Successfully deleted device: ' + deviceName);
}
// [END apps_script_iot_delete_device]

