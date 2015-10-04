
var Router = require('koa-router');

var fsur = module.exports = new Router();

var fsCtrl = require('../controllers/foursquareController.js');

fsur.get('/venues/search', function* (next) {
  console.log('START fsur.get /venues/search');
  // Shermain county, Texas
  // sw lat   , sw lng    | ne lat  , ne lng
  // 36.055131,-102.163303|36.500684,-101.623466
  var sw = '36.055131,-102.163303'
  var ne = '36.500684,-101.623466'

  this.body = yield fsCtrl.userlessVenueSearch(sw, ne);

});