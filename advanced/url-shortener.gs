// [START shortenUrl]
function shortenUrl() {
  var url = UrlShortener.Url.insert({
    longUrl: 'http://www.example.com'
  });
  Logger.log('Shortened URL is "%s".', url.id);
}
// [END shortenUrl]

// [START getClicks]
function getClicks(shortUrl) {
  var url = UrlShortener.Url.get(shortUrl, {
    projection: 'ANALYTICS_CLICKS'
  });
  Logger.log('The URL received %s clicks this week.', url.analytics.week.shortUrlClicks);
}
// [END getClicks]
