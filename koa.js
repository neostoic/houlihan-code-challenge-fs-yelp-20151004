'use strict'

var mount = require('koa-mount');

var authRouter = require('./routers/authRouter.js');
var yelpRouter = require('./routers/yelpRouter.js');
var foursquareUserlessRouter = require('./routers/foursquareUserlessRouter.js');
var fuzzyRouter = require('./routers/fuzzyRouter.js');

module.exports = function (app) {

  app.use(mount('/auth', authRouter.middleware()));

  app.use(mount('/yelp', yelpRouter.middleware()));

  app.use(mount('/fs/userless', foursquareUserlessRouter.middleware()));

  app.use(mount('/fuzzy', fuzzyRouter.middleware()));

};