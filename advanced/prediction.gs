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
// [START apps_script_prediction_query_hosted_model]
/**
 * Runs sentiment analysis across a sentence.
 * Prints the sentiment label.
 */
function queryHostedModel() {
  // When querying hosted models you must always use this
  // specific project number.
  const projectNumber = '414649711441';
  const hostedModelName = 'sample.sentiment';
  try {
    // Query the hosted model with a positive statement.
    let predictionString = 'Want to go to the park this weekend?';
    let prediction = Prediction.Hostedmodels.predict(
        {
          input: {
            csvInstance: [predictionString]
          }
        },
        projectNumber,
        hostedModelName);
    // Logs Sentiment: positive.
    Logger.log('Sentiment: ' + prediction.outputLabel);

    // Now query the hosted model with a negative statement.
    predictionString = 'You are not very nice!';
    prediction = Prediction.Hostedmodels.predict(
        {
          input: {
            csvInstance: [predictionString]
          }
        },
        projectNumber,
        hostedModelName);
    // Logs Sentiment: negative.
    Logger.log('Sentiment: ' + prediction.outputLabel);
  } catch (err) {
    // TODO (developer)- Handle exception from the  API
    Logger.log('Failed with error %s', err.message);
  }
}
// [END apps_script_prediction_query_hosted_model]

// [START apps_script_prediction_create_new_model]
/**
 * Creates a new prediction model.
 */
function createNewModel() {
  // Replace this value with the project number listed in the Google
  // APIs Console project.
  const projectNumber = 'XXXXXXXX';
  const id = 'mylanguageidmodel';
  const storageDataLocation = 'languageidsample/language_id.txt';
  try {
    // Returns immediately. Training happens asynchronously.
    const result = Prediction.Trainedmodels.insert(
        {
          id: id,
          storageDataLocation: storageDataLocation
        },
        projectNumber);
    Logger.log(result);
  } catch (err) {
    // TODO (developer)- Handle exception from the  API
    Logger.log('Failed with error %s', err.message);
  }
}
// [END apps_script_prediction_create_new_model]

// [START apps_script_prediction_query_training_status]
/**
 * Gets the training status from a prediction model.
 * Logs the status.
 */
function queryTrainingStatus() {
  // Replace this value with the project number listed in the Google
  // APIs Console project.
  const projectNumber = 'XXXXXXXX';
  const id = 'mylanguageidmodel';
  try {
    const result = Prediction.Trainedmodels.get(projectNumber, id);
    Logger.log(result.trainingStatus);
  } catch (err) {
    // TODO (developer)- Handle exception from the  API
    Logger.log('Failed with error %s', err.message);
  }
}
// [END apps_script_prediction_query_training_status]

// [START apps_script_prediction_query_trailed_model]
/**
 * Gets the language from a trained language model.
 * Logs the language of the sentence.
 */
function queryTrainedModel() {
  // Replace this value with the project number listed in the Google
  // APIs Console project.
  const projectNumber = 'XXXXXXXX';
  const id = 'mylanguageidmodel';
  const query = 'Este es un mensaje de prueba de ejemplo';
  try {
    const prediction = Prediction.Trainedmodels.predict(
        {
          input:
          {
            csvInstance: [query]
          }
        },
        projectNumber,
        id);
    // Logs Language: Spanish.
    Logger.log('Language: ' + prediction.outputLabel);
  } catch (err) {
    // TODO (developer)- Handle exception from the  API
    Logger.log('Failed with error %s', err.message);
  }
}
// [END apps_script_prediction_query_trailed_model]
