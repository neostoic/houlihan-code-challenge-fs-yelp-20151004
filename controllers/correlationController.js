'use strict'

var _ = require('lodash');

var Corr = require('../models/correlation.js');

var yelpCtrl = require('../controllers/yelpController.js');

module.exports.create = function* (yelpBus, fsVenue) {
  var newCorr = new Corr();
  newCorr.yelpBusiness = yelpBus;
  newCorr.foursquareVenue = fsVenue;
  return yield _.partial(newCorr.save.bind(newCorr));
};

module.exports.getAll = function* () {
  return yield getEm();
};

function getEm () {
  return new Promise(function (resolve, reject) {
    Corr.find().populate('yelpBusiness').populate('foursquareVenue').exec(function (err, docs){
      if (err) {
        reject(err);
      } else {
        resolve(docs);
      }
    });
  });
}