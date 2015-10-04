var request = require('co-request');
var url = require('url');


module.exports.userlessVenueSearch = function* (sw, ne) {
  console.log('START userlessVenueSearch');
  // Foursquare food category
  // "id": "4d4b7105d754a06374d81259",
  // "name": "Food",
  // "pluralName": "Food",
  // "shortName": "Food",


  var reqUrl = url.format({
    protocol: 'https',
    slashes: true,
    hostname: 'api.foursquare.com',
    pathname: '/v2/venues/search',
    query: {
      //ll: '40.7,-74',
      client_id: conf.foursquare.clientId,
      client_secret: conf.foursquare.clientSecret,
      v: conf.foursquare.apiVersion,
      m: 'foursquare',
      limit: 50,
      intent: 'browse',
      categoryId: '4d4b7105d754a06374d81259', //4d4b7105d754a06374d81259 = Foursquare "Food" category
      sw: sw,
      ne: ne
    }
  });

  console.log('userlessVenueSearch reqUrl is:');
  console.log(reqUrl);

  var response = yield request(reqUrl);
  console.log('response');
  console.log(response);

  try{
    return JSON.parse(response.body);
  } catch (e) {
    return e;
  }

};
