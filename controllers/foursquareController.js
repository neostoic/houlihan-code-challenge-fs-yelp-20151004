var request = require('co-request');
var url = require('url');

var _ = require('lodash');
var verror = require('verror');

var counties = require('../config/counties.js');
var FSV = require('../models/foursquareVenue.js');

module.exports.userlessVenueSearch = function* (county) {
  console.log('START userlessVenueSearch');
  // Foursquare food category
  // "id": "4d4b7105d754a06374d81259",
  // "name": "Food",
  // "pluralName": "Food",
  // "shortName": "Food",

  var countyCoords = counties.getCoordinates(county);

  // Shermain county, Texas
  // sw lat   , sw lng    | ne lat  , ne lng
  // 36.055131,-102.163303|36.500684,-101.623466
  // var sw = '36.055131,-102.163303'
  // var ne = '36.500684,-101.623466'

  var sw = countyCoords.swLat + ',' + countyCoords.swLng
  var ne = countyCoords.neLat + ',' + countyCoords.neLng

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
  // console.log('response');
  // console.log(response);

  try{
    var resBody = JSON.parse(response.body);
  } catch (e) {
    return new verror(e, 'Error parsing foursquare response body');
  }

  var mappedYield = yield resBody.response.venues.map(createFoursquareVenue);

  console.log('mappedYield');
  console.log(mappedYield);

  return mappedYield;

};



function* createFoursquareVenue (foursquareApiVenue) {

    var newFsVenue = new FSV();

    _.assign(newFsVenue, foursquareApiVenue);

    newFsVenue.foursquareVenueId = foursquareApiVenue.id;

    return yield _.partial(newFsVenue.save.bind(newFsVenue));

}


// function createFoursquareVenue_promise (foursquareApiVenue) {
//   console.log('START createFoursquareVenue_promise');
//   return new Promise(function (resolve, reject) {
//     console.log('START createFoursquareVenue_promise CB');

//     var newFsVenue = new FSV();

//     _.assign(newFsVenue, foursquareApiVenue);

//     newFsVenue.foursquareVenueId = foursquareApiVenue.id;

//     newFsVenue.save(function (err, doc) {
//       if (err) {
//         reject(err);
//       } else {
//         resolve (doc);
//       }
//     });

//   });

// }

module.exports.getAll = function* () {
  //Use _.partial to turn FSV.bind into a thunk.
  //Pass in {} as the first arg of FSV.find so that it returns all docs
  return yield _.partial(FSV.find.bind(FSV), {});
};



// module.exports.getAll_promise = function () {
//   return new Promise(function (resolve, reject) {

//     FSV.find({}, function (err, docs) {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(docs);
//       }
//     });

//   });
// };




