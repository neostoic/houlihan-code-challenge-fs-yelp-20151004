'use strict'

var log = require('../utilities/logger.js');

var _ = require('lodash');

var yelp = require('../lib/yelp.js');
var YB = require('../models/yelpBusiness.js');

var yc = module.exports;


yc.yelpSearch = function (searchParams) {
  console.log('START yc.yelpSearch');
  return new Promise(function (resolve, reject){

    yelp.search(searchParams, function(err, apiResult) {
      console.log('START yelp.search CB');
      console.log('apiResult');
      console.log(apiResult);
      if (err) {
        console.log('err');
        console.log(err);
        reject(err);
      } else {
        resolve(apiResult);
      }
    });

  });
};


yc.mineYelpBusinesses = function (searchParams, cb){

  console.log('START mineYelpBusinesses');
  log.debug('searchParams.offset is: %d', searchParams.offset);
  log.debug('searchParams.limit is: %d', searchParams.limit);

  yc.yelpSearch(searchParams)
  .then(function (apiResult){

    console.log('START yc.yelpSearch CB');
    log.debug('apiResult.total is %d', apiResult.total);
    Promise.all(apiResult.businesses.map(createYelpBusiness))
    .then(function (newYelpBusinesses) {

      if (searchParams.offset + searchParams.limit < /*apiResult.total*/ 7 ) { //!!Revisit:  Fix 7
        searchParams.offset += searchParams.limit;
        console.log('CONTINUE RECURSION');
        //Use setImmeidate so that if too many recursions are necesary, the call stack wont overflow
        setImmediate(yc.mineYelpBusinesses, searchParams, cb);
      } else {
        console.log('DONE WITH RECURSION');
        cb(null, apiResult);
      }

    });

  })
  .catch(function (reason) {
    var mineYelpError = new verror(reason, 'yelpController, mineYelpBusinesses error')

    log.error({mineYelpError: mineYelpError});

    cb(error);
  });



};



yc.getAll = function* () {
  //Use _.partial to turn FSV.bind into a thunk.
  //Pass in {} as the first arg of FSV.find so that it returns all docs
  return yield _.partial(YB.find.bind(YB), {});
};

yc.getOne = function* (id) {
  return yield _.partial(YB.findById.bind(YB), {id: id});
};


function createYelpBusiness (yelpApiBusiness){
  return new Promise(function (resolve, reject){

    var newYelpBusiness = new YB();

    log.trace({newYelpBusiness: newYelpBusiness});

    _.assign(newYelpBusiness, yelpApiBusiness);

    newYelpBusiness.yelpBusinessId = yelpApiBusiness.id;
    delete newYelpBusiness.id;

    console.log('newYelpBusiness');
    console.log(newYelpBusiness);

    newYelpBusiness.save(function (err, doc){
      if (err) {
        reject(err);
      } else {
        resolve(doc);
      }
    });

  });
}


