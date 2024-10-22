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
 * Callback for initiating the sentiment analysis.
 * @return {CardService.Card} The card to show to the user.
 */

function analyzeSentiment(){
  emailSentiment();
  return buildCard_GmailHome(true);
}

/**
 * Gets the last 10 threads in the inbox and the corresponding messages.
 * Fetches the label that should be applied to negative messages.
 * The processSentiment is called on each message 
 * and tested with RegExp to check for a negative answer from the model
 */

function emailSentiment() {
  const threads = GmailApp.getInboxThreads(0, 10);
  const msgs = GmailApp.getMessagesForThreads(threads);
  const label_upset = GmailApp.getUserLabelByName("UPSET TONE 😡");
  let currentPrediction;

  for (let i = 0 ; i < msgs.length; i++) {
    for (let j = 0; j < msgs[i].length; j++) {
      let emailText = msgs[i][j].getPlainBody();
      currentPrediction = processSentiment(emailText);
      if(currentPrediction === true){
        console.log("In condition:", currentPrediction)
        label_upset.addToThread(msgs[i][j].getThread());
      }
    }
  }
}