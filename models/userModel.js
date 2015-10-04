var mongoose = require('mongoose');


var userSchema = mongoose.Schema({
  foursquareOauthAccessToken: String,
  foursquareId: Number,
  name: {
    familyName: String,
    givenName: String
  },
  emails: [],
  provider: String
}, {collection: 'users'});

module.exports = mongoose.model('User', userSchema);