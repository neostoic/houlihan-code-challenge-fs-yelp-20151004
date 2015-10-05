'use strict'


var conf = require('../config/config.js');

var passport = require('koa-passport');

var Router = require('koa-router');

var authRouter = module.exports = new Router();



authRouter.get('/foursquare', passport.authenticate('foursquare'));


authRouter.get('/foursquare' + conf.foursquare.oauthCallbackPath,
  passport.authenticate('foursquare', {
    successRedirect: '/loginsuccess.html',
    failureRedirect: '/loginfailure.html'
  })
);
