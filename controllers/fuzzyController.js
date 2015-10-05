'use strict'

var path = require('path');

var _ = require('lodash');
var cljFuzzy = require('clj-fuzzy');
var fs = require('co-fs');

var fsCtrl = require('../controllers/foursquareController.js');
var yelpCtrl = require('../controllers/yelpController.js');
var corrCtrl = require('../controllers/correlationController.js');

module.exports.doFuzzyMatch = function* () {

  var foursquareVenues = yield fsCtrl.getAll();

  var yelpBusinesses = yield yelpCtrl.getAll();

  for(let yelpBus of yelpBusinesses) {
    for(let fsVenue of foursquareVenues) {

      if( dice(yelpBus.location.address, fsVenue.location.address) > 0.5 &&
          dice(yelpBus.name, fsVenue.name) > 0.25 )
      {
        yield corrCtrl.create(yelpBus, fsVenue);
      }

    }
  }

  return 'correlations created';
}

function dice(a, b) {
  return (a && b) ? cljFuzzy.metrics.dice(a, b) : null;
}

