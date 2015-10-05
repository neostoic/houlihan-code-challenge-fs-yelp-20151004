'use strict'

var mongoose = require('mongoose');

var correlationSchema = new mongoose.Schema({
  yelpBusiness: { type: mongoose.Schema.Types.ObjectId, ref: 'YelpBusiness' },
  foursquareVenue: { type: mongoose.Schema.Types.ObjectId, ref: 'FoursquareVenue' }
}, {collection: 'correlation'});

module.exports = mongoose.model('Correlation', correlationSchema);