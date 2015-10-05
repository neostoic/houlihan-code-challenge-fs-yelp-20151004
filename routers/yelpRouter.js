'use strict'

var log = require('../utilities/logger.js');

var path = require('path');

var _ = require('lodash');

var counties = require('../config/counties.js');
var yelpCtrl = require('../controllers/yelpController.js');



var Router = require('koa-router');
var yr = module.exports = new Router();



yr.get('/mine-yelp', function* (next){

  if(!counties.isValid(this.query.county)) {
    this.status = 400;
    this.body = 'You must specify a valid county'
  } else {
    //Use _.partial to turn this function into a thunk so that it plays nice with yield
    yield _.partial(yelpCtrl.mineYelpBusinesses, this.query.county);
    return this.body = 'Done mining yelp businesses';
  }

});