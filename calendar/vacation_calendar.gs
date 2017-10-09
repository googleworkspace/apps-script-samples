// [START calendar]
var TEAM_CALENDAR_ID = 'ENTER_TEAM_CALENDAR_ID_HERE';
var KEYWORDS = ['vacation', 'ooo', 'out of office'];
var MONTHS_IN_ADVANCE = 3;

// The maximum script run time under Apps Script Pro is 30 minutes; this setting
// will be used to report when the script is about to reach that limit.
var MAX_PRO_RUNTIME_MS = 29 * 60 * 1000;

/**
 * Look through the domain users' public calendars and add any
 * 'vacation' or 'out of office' events to the team calendar.
 */
function syncTeamVacationCalendar() {
  // Define the calendar event date range to search.
  var today = new Date();
  var futureDate = new Date();
  futureDate.setMonth(futureDate.getMonth() + MONTHS_IN_ADVANCE);
  var lastRun = PropertiesService.getScriptProperties().getProperty('lastRun');
  lastRun = lastRun ? new Date(lastRun) : null;

  // Get the list of users in the domain.
  var users = getDomainUsers();

  // For each user, find events having one or more of the keywords in the event
  // summary in the specified date range. Import each of those to the team
  // calendar.
  var count = 0;
  var timeout = false;
  for (var i = 0; i < users.length; i++) {
    if (isTimeUp(today, new Date())) {
      timeout = true;
      break;
    }
    var user = users[i];
    var username = user.split('@')[0];
    KEYWORDS.forEach(function(keyword) {
      var events = findEvents(user, keyword, today, futureDate, lastRun);
      events.forEach(function(event) {
        event.summary = '[' + username + '] ' + event.summary;
        event.organizer = {
          id: TEAM_CALENDAR_ID
        };
        event.attendees = [];
        Logger.log('Importing: %s', event.summary);
        try {
          Calendar.Events.import(event, TEAM_CALENDAR_ID);
          count++;
        } catch (e) {
          Logger.log(
                'Error attempting to import event: %s. Skipping.', e.toString());
        }
      });
    });
  }
  PropertiesService.getScriptProperties().setProperty('lastRun', today);
  Logger.log('Imported ' + count + ' events');
  if (timeout) {
    Logger.log('Execution time about to hit quota limit; execution stopped.');
  }
  var executionTime = ((new Date()).getTime() - today.getTime()) / 1000.0;
  Logger.log('Total execution time (s) : ' + executionTime);;
}

/**
 * In a given user's calendar, look for occurrences of the given keyword
 * in events within the specified date range and return any such events
 * found.
 * @param user the user's primary email String.
 * @param keyword the keyword String to look for.
 * @param start the starting Date of the range to examine.
 * @param end the ending Date of the range to examine.
 * @param opt_since a Date indicating the last time this script was run.
 * @return an array of calendar event Objects.
 */
function findEvents(user, keyword, start, end, opt_since) {
  var params = {
    q: keyword,
    timeMin: formatDate(start),
    timeMax: formatDate(end),
    showDeleted: true
  };
  if (opt_since) {
    // This prevents the script from examining events that have not been
    // modified since the specified date (that is, the last time the
    // script was run).
    params['updatedMin'] = formatDate(opt_since);
  }
  var results = [];
  try {
    var response = Calendar.Events.list(user, params);
    results = response.items.filter(function(item) {
      // Filter out events where the keyword did not appear in the summary
      // (that is, the keyword appeared in a different field, and are thus
      // is not likely to be relevant).
      if (item.summary.toLowerCase().indexOf(keyword) < 0) {
        return false;
      }
      // If the event was created by someone other than the user, only include
      // it if the user has marked it as 'accepted'.
      if (item.organizer && item.organizer.email != user) {
        if (!item.attendees) {
          return false;
        }
        var matching = item.attendees.filter(function(attendee) {
          return attendee.self;
        });
        return matching.length > 0 && matching[0].status == 'accepted';
      }
      return true;
    });
  } catch (e) {
    Logger.log('Error retriving events for %s, %s: %s; skipping',
        user, keyword, e.toString());
    results = [];
  }
  return results;
}

/**
 * Return a list of the primary emails of users in this domain.
 * @return array of user email Strings.
 */
function getDomainUsers() {
  var pageToken, page;
  var userEmails = [];
  do {
    page = AdminDirectory.Users.list({
      customer: 'my_customer',
      orderBy: 'givenName',
      maxResults: 100,
      pageToken: pageToken,
      viewType: 'domain_public'
    });
    var users = page.users;
    if (users) {
      userEmails = userEmails.concat(users.map(function(user) {
        return user.primaryEmail;
      }));
    } else {
      Logger.log('No domain users found.');
    }
    pageToken = page.nextPageToken;
  } while (pageToken);
  return userEmails;
}

/**
 * Return an RFC3339 formated date String corresponding to the given
 * Date object.
 * @param date a Date.
 * @return a formatted date string.
 */
function formatDate(date) {
  return Utilities.formatDate(date, 'UTC', 'yyyy-MM-dd\'T\'HH:mm:ssZ');
}

/**
 * Compares two Date objects and returns true if the difference
 * between them is more than the maximum specified run time.
 *
 * @param start the first Date object.
 * @param now the (later) Date object.
 * @returns true if the time difference is greater than
 *     MAX_PROP_RUNTIME_MS (in milliseconds).
 */
function isTimeUp(start, now) {
  return now.getTime() - start.getTime() > MAX_PRO_RUNTIME_MS;
}
// [END calendar]
