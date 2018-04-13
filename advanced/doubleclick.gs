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
// [START listUserProfiles]
/**
 * Logs all of the user profiles available in the account.
 */
function listUserProfiles() {
  // Retrieve the list of available user profiles
  var profiles = DoubleClickCampaigns.UserProfiles.list();

  if (profiles.items) {
    // Print out the user ID and name of each
    for (var i = 0; i < profiles.items.length; i++) {
    var profile = profiles.items[i];
    Logger.log('Found profile with ID %s and name "%s".',
        profile.profileId, profile.userName);
    }
  }
}
// [END listUserProfiles]

// [START listActiveCampaigns]
/**
 * Logs names and ID's of all active campaigns.
 * Note the use of paging tokens to retrieve the whole list.
 */
function listActiveCampaigns() {
  var profileId = '1234567'; // Replace with your profile ID.
  var fields = 'nextPageToken,campaigns(id,name)';
  var result;
  var pageToken;
  do {
    result = DoubleClickCampaigns.Campaigns.list(profileId, {
      'archived': false,
      'fields': fields,
      'pageToken': pageToken,
    });
    if (result.campaigns) {
      for (var i = 0; i < result.campaigns.length; i++) {
        var campaign = result.campaigns[i];
        Logger.log('Found campaign with ID %s and name "%s".',
            campaign.id, campaign.name);
      }
    }
    pageToken = result.nextPageToken;
  } while (pageToken);
}
// [END listActiveCampaigns]

// [START createAdvertiserAndCampaign]
/**
 * Creates a new advertiser, and creates a new campaign with that advertiser.
 * The campaign is set to last for one month.
 */
function createAdvertiserAndCampaign() {
  var profileId = '1234567'; // Replace with your profile ID.

  var advertiser = {
    name: 'Example Advertiser',
    status: 'APPROVED',
  };
  var advertiserId = DoubleClickCampaigns.Advertisers
      .insert(advertiser, profileId).id;

  var landingPage = {
    advertiserId: advertiserId,
    archived: false,
    name: 'Example landing page',
    url: 'https://www.google.com',
  };
  var landingPageId = DoubleClickCampaigns.AdvertiserLandingPages
      .insert(landingPage, profileId).id;

  var campaignStart = new Date();
  // End campaign after 1 month.
  var campaignEnd = new Date();
  campaignEnd.setMonth(campaignEnd.getMonth() + 1);

  var campaign = {
    advertiserId: advertiserId,
    defaultLandingPageId: landingPageId,
    name: 'Example campaign',
    startDate: Utilities.formatDate(campaignStart, 'GMT', 'yyyy-MM-dd'),
    endDate: Utilities.formatDate(campaignEnd, 'GMT', 'yyyy-MM-dd'),
  };
  DoubleClickCampaigns.Campaigns.insert(campaign, profileId);
}
// [END createAdvertiserAndCampaign]
