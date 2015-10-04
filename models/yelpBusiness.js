var mongoose = require('mongoose');

var yelpBusinessSchema = new mongoose.Schema({
  yelpBusinessId: String,
  name: String,
  rating: Number,
  phone: String,
  display_phone: String,
  location: {
    cross_streets: String,
    city: String,
    display_address: [],
    geo_accuracy: Number,
    neighborhoods: [],
    postal_code: String,
    country_code: String,
    address: String,
    coordinate: {
      latitude: Number,
      longitude: Number
    },
    state_code: String
  }
}, {collection: 'yelpBusiness'});


module.exports = mongoose.model('YelpBusiness', yelpBusinessSchema);