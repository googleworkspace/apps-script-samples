/**
 * Copyright Google LLC
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

// [START events_create_subscription]
/**
 * Creates a subscription to receive events about a Google Workspace resource.
 * For a list of supported resources and event types, see the
 * [Google Workspace Events API Overview](https://developers.google.com/workspace/events#supported-events).
 * For additional information, see the
 * [subscriptions.create](https://developers.google.com/workspace/events/reference/rest/v1/subscriptions/create)
 * method reference.
 * @param {!string} targetResource The full resource name of the Google Workspace resource to subscribe to.
 * @param {!string|!Array<string>} eventTypes The types of events to receive about the resource.
 * @param {!string} pubsubTopic The resource name of the Pub/Sub topic that receives events from the subscription.
 */
function createSubscription(targetResource, eventTypes, pubsubTopic) {
  try {
    const operation = WorkspaceEvents.Subscriptions.create({
      targetResource: targetResource,
      eventTypes: eventTypes,
      notificationEndpoint: {
        pubsubTopic: pubsubTopic,
      },
    });
    console.log(operation);
  } catch (err) {
    // TODO (developer) - Handle exception
    console.log("Failed to create subscription with error %s", err.message);
  }
}
// [END events_create_subscription]

// [START events_list_subscriptions]
/**
 * Lists subscriptions created by the calling app filtered by one or more event types and optionally by a target resource.
 * For additional information, see the
 * [subscriptions.list](https://developers.google.com/workspace/events/reference/rest/v1/subscriptions/list)
 * method reference.
 * @param {!string} filter The query filter.
 */
function listSubscriptions(filter) {
  try {
    const response = WorkspaceEvents.Subscriptions.list({ filter });
    console.log(response);
  } catch (err) {
    // TODO (developer) - Handle exception
    console.log("Failed to list subscriptions with error %s", err.message);
  }
}
// [END events_list_subscriptions]

// [START events_get_subscription]
/**
 * Gets details about a subscription.
 * For additional information, see the
 * [subscriptions.get](https://developers.google.com/workspace/events/reference/rest/v1/subscriptions/get)
 * method reference.
 * @param {!string} name The resource name of the subscription.
 */
function getSubscription(name) {
  try {
    const subscription = WorkspaceEvents.Subscriptions.get(name);
    console.log(subscription);
  } catch (err) {
    // TODO (developer) - Handle exception
    console.log("Failed to get subscription with error %s", err.message);
  }
}
// [END events_get_subscription]

// [START events_patch_subscription]
/**
 * Updates an existing subscription.
 * This can be used to renew a subscription that is about to expire.
 * For additional information, see the
 * [subscriptions.patch](https://developers.google.com/workspace/events/reference/rest/v1/subscriptions/patch)
 * method reference.
 * @param {!string} name The resource name of the subscription.
 */
function patchSubscription(name) {
  try {
    const operation = WorkspaceEvents.Subscriptions.patch(
      {
        // Setting the TTL to 0 seconds extends the subscription to its maximum expiration time.
        ttl: "0s",
      },
      name,
    );
    console.log(operation);
  } catch (err) {
    // TODO (developer) - Handle exception
    console.log("Failed to update subscription with error %s", err.message);
  }
}
// [END events_patch_subscription]

// [START events_reactivate_subscription]
/**
 * Reactivates a suspended subscription.
 * Before reactivating, you must resolve any errors with the subscription.
 * For additional information, see the
 * [subscriptions.reactivate](https://developers.google.com/workspace/events/reference/rest/v1/subscriptions/reactivate)
 * method reference.
 * @param {!string} name The resource name of the subscription.
 */
function reactivateSubscription(name) {
  try {
    const operation = WorkspaceEvents.Subscriptions.reactivate({}, name);
    console.log(operation);
  } catch (err) {
    // TODO (developer) - Handle exception
    console.log("Failed to reactivate subscription with error %s", err.message);
  }
}
// [END events_reactivate_subscription]

// [START events_delete_subscription]
/**
 * Deletes a subscription.
 * For additional information, see the
 * [subscriptions.delete](https://developers.google.com/workspace/events/reference/rest/v1/subscriptions/delete)
 * method reference.
 * @param {!string} name The resource name of the subscription.
 */
function deleteSubscription(name) {
  try {
    const operation = WorkspaceEvents.Subscriptions.remove(name);
    console.log(operation);
  } catch (err) {
    // TODO (developer) - Handle exception
    console.log("Failed to delete subscription with error %s", err.message);
  }
}
// [END events_delete_subscription]

// [START events_get_operation]
/**
 * Gets details about an operation returned by one of the methods on the subscription
 * resource of the Google Workspace Events API.
 * For additional information, see the
 * [operations.get](https://developers.google.com/workspace/events/reference/rest/v1/operations/get)
 * method reference.
 * @param {!string} name The resource name of the operation.
 */
function getOperation(name) {
  try {
    const operation = WorkspaceEvents.Operations.get(name);
    console.log(operation);
  } catch (err) {
    // TODO (developer) - Handle exception
    console.log("Failed to get operation with error %s", err.message);
  }
}
// [END events_get_operation]
