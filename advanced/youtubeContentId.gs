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
// [START apps_script_youtube_claim]
/**
 * This function creates a partner-uploaded claim on a video with the specified
 * asset and policy rules.
 * @see https://developers.google.com/youtube/partner/docs/v1/claims/insert
 */
function claimYourVideoWithMonetizePolicy() {
  // The ID of the content owner that you are acting on behalf of.
  const onBehalfOfContentOwner = 'replaceWithYourContentOwnerID';
  // A YouTube video ID to claim. In this example, the video must be uploaded
  // to one of your onBehalfOfContentOwner's linked channels.
  const videoId = 'replaceWithYourVideoID';
  const assetId = 'replaceWithYourAssetID';
  const claimToInsert = {
    'videoId': videoId,
    'assetId': assetId,
    'contentType': 'audiovisual',
    // Set the claim policy to monetize. You can also specify a policy ID here
    // instead of policy rules.
    // For details, please refer to the YouTube Content ID API Policies
    // documentation:
    // https://developers.google.com/youtube/partner/docs/v1/policies
    'policy': {'rules': [{'action': 'monetize'}]}
  };
  try {
    const claimInserted = YouTubeContentId.Claims.insert(claimToInsert,
        {'onBehalfOfContentOwner': onBehalfOfContentOwner});
    console.log('Claim created on video %s: %s', videoId, claimInserted);
  } catch (e) {
    console.log('Failed to create claim on video %s, error: %s',
        videoId, e.message);
  }
}
// [END apps_script_youtube_claim]

// [START apps_script_youtube_update_asset_ownership]
/**
 * This function updates your onBehalfOfContentOwner's ownership on an existing
 * asset.
 * @see https://developers.google.com/youtube/partner/docs/v1/ownership/update
 */
function updateAssetOwnership() {
  // The ID of the content owner that you are acting on behalf of.
  const onBehalfOfContentOwner = 'replaceWithYourContentOwnerID';
  // Replace values with your asset id
  const assetId = 'replaceWithYourAssetID';
  // The new ownership here would replace your existing ownership on the asset.
  const myAssetOwnership = {
    'general': [
      {
        'ratio': 100,
        'owner': onBehalfOfContentOwner,
        'type': 'include',
        'territories': [
          'US',
          'CA'
        ]
      }
    ]
  };
  try {
    const updatedOwnership = YouTubeContentId.Ownership.update(myAssetOwnership,
        assetId, {'onBehalfOfContentOwner': onBehalfOfContentOwner});
    console.log('Ownership updated on asset %s: %s', assetId, updatedOwnership);
  } catch (e) {
    console.log('Ownership update failed on asset %s, error: %s',
        assetId, e.message);
  }
}
// [END apps_script_youtube_update_asset_ownership]

// [START apps_script_youtube_release_claim]
/**
 * This function releases an existing claim your onBehalfOfContentOwner has
 * on a video.
 * @see https://developers.google.com/youtube/partner/docs/v1/claims/patch
 */
function releaseClaim() {
  // The ID of the content owner that you are acting on behalf of.
  const onBehalfOfContentOwner = 'replaceWithYourContentOwnerID';
  // The ID of the claim to be released.
  const claimId = 'replaceWithYourClaimID';
  // To release the claim, change the resource's status to inactive.
  const claimToBeReleased = {
    'status': 'inactive'
  };
  try {
    const claimReleased = YouTubeContentId.Claims.patch(claimToBeReleased,
        claimId, {'onBehalfOfContentOwner': onBehalfOfContentOwner});
    console.log('Claim %s was released: %s', claimId, claimReleased);
  } catch (e) {
    console.log('Failed to release claim %s, error: %s', claimId, e.message);
  }
}
// [END apps_script_youtube_release_claim]
