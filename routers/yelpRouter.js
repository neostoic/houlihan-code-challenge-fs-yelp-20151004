var _ = require('lodash');

var Router = require('koa-router');

var yr = module.exports = new Router();
var yelpCtrl = require('../controllers/yelpController.js');

yr.get('/mine-businesses', function* (next){
  console.log('START yelpRouter.js get to /mine-businesses');
  //Sherman county texas
  //bounds=36.055131,-101.623466|36.500684-101.623466

  var searchParams = {
    term: 'restaurants',
    category_filter: 'restaurants',
    //location: 'Austin',
    //bounds: '36.055131,-101.623466|36.500684,-101.623466',
    bounds: '36.055131,-102.163303|36.500684,-101.623466',
    //bounds: '37.900000,-122.500000|37.788022,-122.399797',
    limit: 3,
    offset: 0
  };

  //Use _.partial to turn this function into a thunk so that it plays nice with yield
  this.body = yield _.partial(yelpCtrl.mineYelpBusinesses, searchParams);

});