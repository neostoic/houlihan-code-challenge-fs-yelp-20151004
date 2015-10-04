
var mount = require('koa-mount');

var authRouter = require('./routers/authRouter.js');
var yelpRouter = require('./routers/yelpRouter.js');
var foursquareUserlessRouter = require('./routers/foursquareUserlessRouter.js');

module.exports = function (app) {

  app.use(mount('/auth', authRouter.middleware()));

  app.use(mount('/yelp', yelpRouter.middleware()));

  app.use(mount('/fs/userless', foursquareUserlessRouter.middleware()));
};