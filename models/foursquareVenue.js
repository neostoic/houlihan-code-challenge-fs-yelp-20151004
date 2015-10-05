var mongoose = require('mongoose');

var foursquareVenueSchema = new mongoose.Schema({
  foursquareVenueId: String,
  name: String,
  location: {
    address: String,
    lat: Number,
    lng: Number,
    postalCode: String,
    cc: String,
    city: String,
    state: String,
    country: String,
    formattedAddress: []
  }
}, {collection: 'foursquareVenue'});


module.exports = mongoose.model('foursquareVenue', foursquareVenueSchema);

