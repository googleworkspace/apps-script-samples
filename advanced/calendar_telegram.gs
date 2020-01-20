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
// [START calendar_telegram.gs]

/*
Your personal Calendar Bot
Description :
    Get notifications from Google Calendar via Telegram Bot
Instructions :
   1. Create a bot from [BotFather](https://telegram.me/BotFather) and replace `BOT_TOKEN` with token received from bot father
   2. Get your personal chat id from [get_id_bot](https://telegram.me/get_id_bot) and replace `CHAT_ID` with it
   3. Register your application with the [Google Developers Console](https://console.developers.google.com)
   4. Activate the Google Calendar API in the [Google Developers Console](https://console.developers.google.com)
   5. Under Credentials, create a new Public API access key and replace the `API_KEY` with it
   6. Find personal Calendar ID under `[Google Calendar] -> [Setting and Sharing] -> [Calendar Setting]` and add it into `calendar_id`
   8. Copy all content to the `Google Script Editor`
   9. Set a proper time to trigger it

*/
var key = "API_KEY";
var calendar_id = [
    ["XXXXXXXXXXXXXXXXXXXXXXXXXX@group.calendar.google.com"],
    ["YYYYYYYYYYYYYYYYYYYYYYYYYY@group.calendar.google.com"]
]
var token = 'BOT_TOKEN';
var chat_id = "CHAT_ID";
var url = "https://api.telegram.org/bot" + token;
var notif = "\*Calendar*\n";
function originalData(estring) {
    var payload = {
        "method": "sendMessage",
        "chat_id": chat_id,
        "text": estring,
        "parse_mode": "Markdown",
    };
    sendMsg(payload)
}

function sendMsg(payload) {
    var options = {
        'method': 'post',
        'payload': payload
    };

    UrlFetchApp.fetch(url + "/", options)
}

function getDateStr(dayCount) {
    if (null == dayCount) {
        dayCount = 0;
    }
    var dd = new Date();
    dd.setDate(dd.getDate() + dayCount);//设置日期
    var y = dd.getFullYear();
    var m = PrefixInteger(dd.getMonth() + 1, 2);//获取当前月份的日期
    var d = dd.getDate();
    return y + "-" + m + "-" + d;
}
function PrefixInteger(num, length) {
    return (Array(length).join('0') + num).slice(-length);
}


function launch() {
    for (var j in calendar_id) {
        var id = calendar_id[j][0];
        calendar(id)
    }
    notification();
}

function calendar(id) {
    var optionalArgs = {
    timeMin: (new Date()).toISOString(),
    showDeleted: false,
    singleEvents: true,
    maxResults: 20,
    orderBy: 'startTime'
  };
      var response = Calendar.Events.list(id,optionalArgs);
      if (!response) {
        originalData("Google Calendar: failed to fetch data!");
    } else {
      var today = (new Date()).toISOString();
      var events = JSON.parse(response).items;
      var date = new Date().toISOString();
      for(var i=0; i< events.length;i++)
      {
        if(events[i].status == "confirmed"&& events[i].start.dateTime >= getDateStr(0) && events[i].start.dateTime <= getDateStr(1)){
          var tmp;
          var summary = events[i].summary;
          var description = events[i].description;
          var location = events[i].location;
          var start = events[i].start.dateTime.replace(":00+08:00","").replace("T"," ").replace("2020-","");
          var end = events[i].end.dateTime.replace(":00+08:00","").replace("T"," ").replace("2020-","");
          if(description && location) tmp = summary + '\n'+description+ '@'+location+ '\n'+ start+' - '+ end +'\n\n';
          else if(description) tmp = summary + '\n'+description+ '\n'+ start+' - '+ end+'\n\b';
          else if(location) tmp = summary + '\n'+location+ '\n'+ start+' - '+ end+'\n\n';
          else tmp = summary + '\n'+ start+' - '+ end+'\n\n';
          //Logger.log(tmp);
          notif+= tmp;
        }
      }
      //originalData(notif)
      //if(notif != "\*Calendar*") originalData(notif);

    }
}
function notification(){
  if(notif != "\*Calendar*\n") originalData(notif);
  else originalData("\*Calendar*\nNothing to plan today!")
}

// [END calendar_telegram.gs]