
/**
 * Copyright 2022 Google LLC
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

function sendEmailToMyself() {
  // You can use this method to test the welcome email.
  sendEmailWithInlineImage(Session.getActiveUser().getEmail());
}

function sendEmailWithInlineImage(toAddress) {
  const options = {};
  const imageName = 'cat_emoji';
  // The URL "cid:cat_emoji" means that the inline attachment named "cat_emoji" would be used.
  options['htmlBody'] = 'Welcome! <img src="cid:' + imageName + '" alt="Cat Emoji" />';
  options['inlineImages'] = {[imageName]: Utilities.newBlob(getImageBinary(), 'image/png', imageName)};
  GmailApp.sendEmail(toAddress, 'Welcome!', 'Welcome!', options);
}

function getImageBinary() {
  // Cat Face Emoji from https://github.com/googlefonts/noto-emoji/blob/main/png/32/emoji_u1f431.png, Base64 encoded.
  const catPngBase64 = 'iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA+BJREFUeNrsV01ME1EQnpaltPK3iAT0oAsxMSYmlIOaGBO2etCDMTVq8CYl3jRBvehBI0YPehIPxhvFkxo1gHpQE9P15+KtROJFI6sxhEKwW6FY27o6s/vabpd9tPUn8eAkj8e+nTffzDez814B/kX5oXT4/7A9GceAk12Xg/IkThIOFUfIJb9XfgNYxCmMI8iWNLTXZNVx2zYEGTiwOUKe/wZ4xAJOIhIbXAdQuo2/dacB6i8gP7X0dA43hSsEJ+eJST9UtZv2fIdyr5d1wMyRsMkcBSd6y2WCRT5C0RrgZKN6K4C3x1FfcFw1QSFvYP4sWk4SE1F426gyRyVo/mbqzdUgiK6BoEcBkv35yAsBcEUoGRIZ8uwA+PYAQHeNgPsHzUv1MjYyfT0lwZ1S4Cz6DNNG8LoMX8+XLfz/9XZhXwUOaMUJTQJ8OYnRvSqs1VpAyCEaTu++T5p7aa7AgXGTzlfmRsq93cCKbHHE1qjt7FAAORvZidyqwm1E7BuNlORtoRoNou8iK0INi1DQ+emhWqBhpqQdm5HKK8JoWTVhB8o5wv02k+bA7moFX5ICfKmV7cQfErdDBys6MNTpLAzeS4AynirLoLagQ+jyLOw7G3PaI9lbsT0FQfuOwMkpwwmS8KkW6N1Vv6wDJ67NwfDjebPaxr9C/L5kV5GthWj/Cjrt2jlwkrGXiyUZUGPZIjYcWOgeGhrqxSHnGaAFKqVE5rq/sXqOa1ysK923pFahSF/u9Oaf3yS2wJsvm/2szhRrCuhBfjGzV6xyZ6Gr6Tm0eT8YLwYON8HAjbhhrH9/Y97Y+eE4KFEzOqlNgCvHmg2dK0ebjci1pI76DXn9d/OdkNa9sGdNOOrbOXGC1wciC1lRTus1sNIT40ZJwIHjU0VrkcE1IPu93D2f063wMbkB4ukWTU1uJAbUvr6+kAvpP44PhyllDdWfJcGVkbauepJngCehS7Mw/MgsNtnvg5GLrcumiBjwuFPgqUopq3dHAjwG6Mw/xzPStEeF8OkWCG6vNWhuP/TRmOMPJQM8x8zkrbVGWqzyNHYQ6oQELGbrFWTgKhGJDGh5LWLi5ofFbtEzC6sxej/WwZICQ6P7zsSMiNXpjAFO0nXkE/jX18DoyyTOniXgJDtb78B0ah281raNsV5DTU9xMXCR9QAl1HExbL82WT8rKr7ou7Tx3H+gASOvgqt3E8Y7azHyyge7baDUrbi8A+nXpAsdiC57IWHX8PN/ATxkB3dkoNyCrEA0Bj5a0ZUMN5ADAfsFokLgQXb+j3JxKrjnB9nvBpFTpLmjnM77ZzhG2fH+X/5t+SnAAE+HjvApIyOGAAAAAElFTkSuQmCC';
  return Utilities.base64Decode(catPngBase64);
}
