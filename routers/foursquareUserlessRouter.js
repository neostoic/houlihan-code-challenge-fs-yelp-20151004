'use strict'


var counties = require('../config/counties.js');
var fsCtrl = require('../controllers/foursquareController.js');

var Router = require('koa-router');
var fsur = module.exports = new Router();


fsur.get('/mine-venues', function* (next) {

  if(!counties.isValid(this.query.county)) {
    this.status = 400;
    this.body = 'You must specify a valid county'
  } else {
    this.body = yield fsCtrl.userlessVenueSearch(this.query.county);
  }

});