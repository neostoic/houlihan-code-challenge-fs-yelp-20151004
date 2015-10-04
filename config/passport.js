var conf = require('./config.js');

var passport = require('koa-passport');
var FoursqaureStrategy = require('passport-foursquare').Strategy;

var foursquare = require('../lib/foursquare.js');

var User = require('../models/userModel.js');
var userCtrl = require('../controllers/userController.js');


passport.serializeUser(function (dbUser, done){
  done(null, dbUser.id);
});

passport.deserializeUser(function (sessionUserId, done){
  User.findOne({foursquareId: sessionUserId}, function (err, doc){
    if (err) {
      return done(new verror(err, 'passport.deserializeUser, User.findOne error'));
    }
    return done(null, doc);
  });


});


passport.use(new FoursqaureStrategy({
    clientID: conf.foursquare.clientId,
    clientSecret: conf.foursquare.clientSecret,
    callbackUrl: foursquare.oauthRedirectUrl;
  },
  function (accessToken, refreshToken, profile, done) {

    //Try of find and update the user

    //If no user found, create one


    userCtrl.findOrUpdateUser(profile, accessToken)
    .then(function(user){
      if (!user) {
        return userCtrl.createUser(profile);
      } else {
        return Promise.resolve(user);
      }
    })
    .then(function (user){
      //user here could come from either userCtrl.findOrUpdateUser or userCtrl.createUser
      done(null, user);
    })
    .catch(function (reason){
      done(reason);
    });

  }

));


