'use strict'

var log = require('../utilities/logger.js');

var path = require('path');

var _ = require('lodash');

var Router = require('koa-router');
var yr = module.exports = new Router();

var yelpCtrl = require('../controllers/yelpController.js');

var counties = require('../config/counties.js');

yr.get('/mine-businesses', function* (next){
  console.log('START yelpRouter.js get to /mine-businesses');
  //Sherman county texas
  //bounds=36.055131,-101.623466|36.500684-101.623466

  var countyCoords = counties.getCoordinates('ochiltree');

  var bounds = countyCoords.swLat + ',' + countyCoords.swLng + '|' + countyCoords.neLat + ',' + countyCoords.neLng;
  log.trace('bounds', bounds);

  var searchParams = {
    term: 'restaurants',
    category_filter: 'restaurants',
    //location: 'Austin',
    //bounds: '36.055131,-102.163303|36.500684,-101.623466', //Sherman county tx
    //bounds: '37.900000,-122.500000|37.788022,-122.399797', //Yelp example.  somewhere in SF
    bounds: bounds,
    limit: 20,
    offset: 0
  };

  //Use _.partial to turn this function into a thunk so that it plays nice with yield
  this.body = yield _.partial(yelpCtrl.mineYelpBusinesses, searchParams);

});