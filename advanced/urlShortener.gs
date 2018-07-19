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
// [START apps_script_url_shortener_shorten]
/**
 * Shortens a long URL. Logs this URL.
 */
function shortenUrl() {
  var url = UrlShortener.Url.insert({
    longUrl: 'http://www.example.com',
  });
  Logger.log('Shortened URL is "%s".', url.id);
}
// [END apps_script_url_shortener_shorten]

// [START apps_script_url_shortener_get_clicks]
/**
 * Logs the number of clicks to a short URL over the last week.
 * @param  {string} shortUrl The short URL.
 */
function getClicks(shortUrl) {
  var url = UrlShortener.Url.get(shortUrl, {
    projection: 'ANALYTICS_CLICKS',
  });
  Logger.log('The URL received %s clicks this week.', url.analytics.week.shortUrlClicks);
}
// [END apps_script_url_shortener_get_clicks]
