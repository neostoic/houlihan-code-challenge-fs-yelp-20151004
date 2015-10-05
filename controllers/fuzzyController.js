var _ = require('lodash');
var cljFuzzy = require('clj-fuzzy');

var fsCtrl = require('../controllers/foursquareController.js');
var yelpCtrl = require('../controllers/yelpController.js');

module.exports.doFuzzyMatch = function* () {

  var foursquareVenues = yield fsCtrl.getAll();

  var yelpBusinessess = yield yelpCtrl.getAll();

  console.log('foursquareVenues');
  console.log(foursquareVenues);

  console.log('yelpBusinessess');
  console.log(yelpBusinessess);

  return foursquareVenues;


}

