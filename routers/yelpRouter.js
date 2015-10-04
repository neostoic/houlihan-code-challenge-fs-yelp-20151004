var Router = require('koa-router');

var yr = module.exports = new Router();
var yelpCtrl = require('../controllers/yelpController.js');

yr.use('/getBusinesses', function* (next){

  //Sherman county texas
  //bounds=36.055131,-101.623466|36.500684-101.623466

  var searchParams = {
    term: 'restaurant',
    category_filter: 'restaurant',
    location: 'Austin',
    limit: 3,
    offset: 0
  };

  //Use _.partial to turn this function into a thunk so that it plays nice with yield
  this.body = yield _.partial(yelpCtrl.mineYelpBusinesses, searchParams);

});