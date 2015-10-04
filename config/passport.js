var conf = require('./config.js');

var passport = require('koa-passport');
var FoursqaureStrategy = require('passport-foursquare').Strategy;

var foursquare = require('../lib/foursquare.js');



passport.use(new FoursqaureStrategy({
    clientID: conf.foursquare.clientId,
    clientSecret: conf.foursquare.clientSecret,
    callbackUrl: foursquare.oauthRedirectUrl;
  },
  function (accessToken, refreshToken, profile, done) {





  }

));


