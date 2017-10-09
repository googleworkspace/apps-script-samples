/**
 * This function creates a partner-uploaded claim on a video with the specified
 * asset and policy rules.
 */
// [START claimYourVideoWithMonetizePolicy]
function claimYourVideoWithMonetizePolicy() {
  // The ID of the content owner that you are acting on behalf of.
  var onBehalfOfContentOwner = 'replaceWithYourContentOwnerID';
  // A YouTube video ID to claim. In this example, the video must be uploaded
  // to one of your onBehalfOfContentOwner's linked channels.
  var videoId = 'replaceWithYourVideoID';
  var assetId = 'replaceWithYourAssetID';
  var claimToInsert = {
    'videoId': videoId,
    'assetId': assetId,
    'contentType': 'audiovisual',
    // Set the claim policy to monetize. You can also specify a policy ID here
    // instead of policy rules.
    // For details, please refer to the YouTube Content ID API Policies
    // documentation:
    // https://developers.google.com/youtube/partner/docs/v1/policies
    'policy': {'rules': [{'action': 'monetize'}]},
  };
  try {
    var claimInserted = YoutubeContentId.Claims.insert(claimToInsert,
        {'onBehalfOfContentOwner': onBehalfOfContentOwner});
    Logger.log('Claim created on video %s: %s', videoId, claimInserted);
  } catch (e) {
    Logger.log('Failed to create claim on video %s, error: %s',
               videoId, e.message);
  }
}
// [END claimYourVideoWithMonetizePolicy]

/**
 * This function updates your onBehalfOfContentOwner's ownership on an existing
 * asset.
 */
// [START updateAssetOwnership]
function updateAssetOwnership() {
  var onBehalfOfContentOwner = 'replaceWithYourContentOwnerID';
  var assetId = 'replaceWithYourAssetID';
  // The new ownership here would replace your existing ownership on the asset.
  var myAssetOwnership = {
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
    var updatedOwnership = YoutubeContentId.Ownership.update(myAssetOwnership,
        assetId, {'onBehalfOfContentOwner': onBehalfOfContentOwner});
    Logger.log('Ownership updated on asset %s: %s', assetId, updatedOwnership);
  } catch (e) {
    Logger.log('Ownership update failed on asset %s, error: %s',
               assetId, e.message);
  }
}
// [END updateAssetOwnership]

/**
 * This function releases an existing claim your onBehalfOfContentOwner has
 * on a video.
 */
// [START releaseClaim]
function releaseClaim() {
  var onBehalfOfContentOwner = 'replaceWithYourContentOwnerID';
  // The ID of the claim to be released.
  var claimId = 'replaceWithYourClaimID';
  // To release the claim, change the resource's status to inactive.
  var claimToBeReleased = {
    'status': 'inactive'
  };
  try {
    var claimReleased = YoutubeContentId.Claims.patch(claimToBeReleased,
        claimId, {'onBehalfOfContentOwner': onBehalfOfContentOwner});
    Logger.log('Claim %s was released: %s', claimId, claimReleased);
  } catch (e) {
    Logger.log('Failed to release claim %s, error: %s', claimId, e.message);
  }
}
// [END releaseClaim]
