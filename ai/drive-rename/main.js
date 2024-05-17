/*
Copyright 2024 Google LLC

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

/**
 * Main entry point for add-on when opened.
 * 
 * @param e - Add-on event context
 */
function onHomepageOpened(e) {
  const card = buildHomePage();

  return {
    action: {
      navigations: [
        {
          pushCard: card
        }
      ]
    }
  };
}

/**
 * Handles selection of a file in Google Drive.
 * 
 * @param e - Add-on event context
 */
function onDriveItemsSelected(e) {

  return {
    action: {
      navigations: [
        {
          pushCard: buildSelectionPage(e)
        }
      ]
    }
  }
}


/**
 * Handles the update of the card on demand.
 * 
 * @param e - (Modified) add-on event context
 */
function onCardUpdate(e) {

  return {
    action: {
      navigations: [
        {
          updateCard: buildSelectionPage(e)
        }
      ]
    }
  }
}
