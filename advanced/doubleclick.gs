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
// [START apps_script_doubleclick_list_user_profiles]
/**
 * Logs all of the user profiles available in the account.
 */
function listUserProfiles() {
  // Retrieve the list of available user profiles
  try {
    const profiles = DoubleClickCampaigns.UserProfiles.list();

    if (profiles.items) {
      // Print out the user ID and name of each
      for (let i = 0; i < profiles.items.length; i++) {
        const profile = profiles.items[i];
        console.log('Found profile with ID %s and name "%s".',
            profile.profileId, profile.userName);
      }
    }
  } catch (e) {
    // TODO (Developer) - Handle exception
    console.log('Failed with error: %s', e.error);
  }
}
// [END apps_script_doubleclick_list_user_profiles]

// [START apps_script_doubleclick_list_active_campaigns]
/**
 * Logs names and ID's of all active campaigns.
 * Note the use of paging tokens to retrieve the whole list.
 */
function listActiveCampaigns() {
  const profileId = '1234567'; // Replace with your profile ID.
  const fields = 'nextPageToken,campaigns(id,name)';
  let result;
  let pageToken;
  try {
    do {
      result = DoubleClickCampaigns.Campaigns.list(profileId, {
        'archived': false,
        'fields': fields,
        'pageToken': pageToken
      });
      if (result.campaigns) {
        for (let i = 0; i < result.campaigns.length; i++) {
          const campaign = result.campaigns[i];
          console.log('Found campaign with ID %s and name "%s".',
              campaign.id, campaign.name);
        }
      }
      pageToken = result.nextPageToken;
    } while (pageToken);
  } catch (e) {
    // TODO (Developer) - Handle exception
    console.log('Failed with error: %s', e.error);
  }
}
// [END apps_script_doubleclick_list_active_campaigns]

// [START apps_script_doubleclick_create_advertiser_and_campaign]
/**
 * Creates a new advertiser, and creates a new campaign with that advertiser.
 * The campaign is set to last for one month.
 */
function createAdvertiserAndCampaign() {
  const profileId = '1234567'; // Replace with your profile ID.

  const advertiser = {
    name: 'Example Advertiser',
    status: 'APPROVED'
  };

  try {
    const advertiserId = DoubleClickCampaigns.Advertisers
        .insert(advertiser, profileId).id;

    const landingPage = {
      advertiserId: advertiserId,
      archived: false,
      name: 'Example landing page',
      url: 'https://www.google.com'
    };
    const landingPageId = DoubleClickCampaigns.AdvertiserLandingPages
        .insert(landingPage, profileId).id;

    const campaignStart = new Date();
    // End campaign after 1 month.
    const campaignEnd = new Date();
    campaignEnd.setMonth(campaignEnd.getMonth() + 1);

    const campaign = {
      advertiserId: advertiserId,
      defaultLandingPageId: landingPageId,
      name: 'Example campaign',
      startDate: Utilities.formatDate(campaignStart, 'GMT', 'yyyy-MM-dd'),
      endDate: Utilities.formatDate(campaignEnd, 'GMT', 'yyyy-MM-dd')
    };
    DoubleClickCampaigns.Campaigns.insert(campaign, profileId);
  } catch (e) {
    // TODO (Developer) - Handle exception
    console.log('Failed with error: %s', e.error);
  }
}
// [END apps_script_doubleclick_create_advertiser_and_campaign]
