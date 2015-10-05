'use strict'

var mongoose = require('mongoose');


var userSchema = mongoose.Schema({
  foursquareOauthAccessToken: String,
  foursquareId: String,
  name: {
    familyName: String,
    givenName: String
  },
  emails: [],
  provider: String
}, {collection: 'users'});

module.exports = mongoose.model('User', userSchema);