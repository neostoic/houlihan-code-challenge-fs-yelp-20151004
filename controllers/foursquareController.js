'use strict'

var conf = require('../config/config.js');

var request = require('co-request');
var url = require('url');

var _ = require('lodash');
var verror = require('verror');

var counties = require('../config/counties.js');
var FSV = require('../models/foursquareVenue.js');

var fsc = module.exports;



fsc.getAll = function* () {
  //Use _.partial to turn FSV.bind into a thunk.
  //Pass in {} as the first arg of FSV.find so that it returns all docs
  return yield _.partial(FSV.find.bind(FSV), {});
};


fsc.userlessVenueSearch = function* (county) {
  var countyCoords = counties.getCoordinates(county);
  var completeResults = yield venueSearchArea(countyCoords.swLat, countyCoords.swLng, countyCoords.neLat, countyCoords.neLng);
  return completeResults
};


function* venueSearchArea (swLat, swLng, neLat, neLng) {

  var ne = neLat + ',' + neLng;
  var sw = swLat + ',' + swLng;

  console.log('ne: ' + ne);
  console.log('sw: ' + sw);


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

  var response = yield request(reqUrl);

  try{
    var resBody = JSON.parse(response.body);
  } catch (e) {
    return new verror(e, 'Error parsing foursquare response body');
  }

  if (resBody.response.venues.length >= 50) {

    var halfLng = ((neLng - swLng) / 2);
    yield venueSearchArea(swLat, swLng, neLat, (neLng - halfLng));
    yield venueSearchArea(swLat, (swLng + halfLng), neLat, neLng);
    return;

  } else {

    yield resBody.response.venues.map(createFoursquareVenue);
    return;

  }

};



function* createFoursquareVenue (foursquareApiVenue) {

    var newFsVenue = new FSV();
    _.assign(newFsVenue, foursquareApiVenue);
    newFsVenue.foursquareVenueId = foursquareApiVenue.id;
    return yield _.partial(newFsVenue.save.bind(newFsVenue));

}



