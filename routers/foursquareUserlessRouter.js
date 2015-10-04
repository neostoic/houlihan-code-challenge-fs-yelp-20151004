
var Router = require('koa-router');

var fsur = module.exports = new Router();

var fsCtrl = require('../controllers/foursquareController.js');

fsur.get('/venues/search', function* (next) {

  this.body = yield fsCtrl.userlessVenueSearch('ochiltree');

});