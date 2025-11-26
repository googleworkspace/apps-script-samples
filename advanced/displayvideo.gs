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
// [START apps_script_dv360_list_partners]
/**
 * Logs all of the partners available in the account.
 */
function listPartners() {
  // Retrieve the list of available partners
  try {
    const partners = DisplayVideo.Partners.list();

    if (partners.partners) {
      // Print out the ID and name of each
      for (let i = 0; i < partners.partners.length; i++) {
        const partner = partners.partners[i];
        console.log(
          'Found partner with ID %s and name "%s".',
          partner.partnerId,
          partner.displayName,
        );
      }
    }
  } catch (e) {
    // TODO (Developer) - Handle exception
    console.log("Failed with error: %s", e.error);
  }
}
// [END apps_script_dv360_list_partners]

// [START apps_script_dv360_list_active_campaigns]
/**
 * Logs names and ID's of all active campaigns.
 * Note the use of paging tokens to retrieve the whole list.
 */
function listActiveCampaigns() {
  const advertiserId = "1234567"; // Replace with your advertiser ID.
  let result;
  let pageToken;
  try {
    do {
      result = DisplayVideo.Advertisers.Campaigns.list(advertiserId, {
        filter: 'entityStatus="ENTITY_STATUS_ACTIVE"',
        pageToken: pageToken,
      });
      if (result.campaigns) {
        for (let i = 0; i < result.campaigns.length; i++) {
          const campaign = result.campaigns[i];
          console.log(
            'Found campaign with ID %s and name "%s".',
            campaign.campaignId,
            campaign.displayName,
          );
        }
      }
      pageToken = result.nextPageToken;
    } while (pageToken);
  } catch (e) {
    // TODO (Developer) - Handle exception
    console.log("Failed with error: %s", e.error);
  }
}
// [END apps_script_dv360_list_active_campaigns]

// [START apps_script_dv360_update_line_item_name]
/**
 * Updates the display name of a line item
 */
function updateLineItemName() {
  const advertiserId = "1234567"; // Replace with your advertiser ID.
  const lineItemId = "123456789"; //Replace with your line item ID.
  const updateMask = "displayName";

  const lineItemDef = {
    displayName: "New Line Item Name (updated from Apps Script!)",
  };

  try {
    const lineItem = DisplayVideo.Advertisers.LineItems.patch(
      lineItemDef,
      advertiserId,
      lineItemId,
      { updateMask: updateMask },
    );
  } catch (e) {
    // TODO (Developer) - Handle exception
    console.log("Failed with error: %s", e.error);
  }
}
// [END apps_script_dv360_update_line_item_name]
