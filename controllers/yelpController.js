var log = require('../utilities/logger.js');

var _ = require('lodash');

var yelp = require('../lib/yelp.js');
var YB = require('../models/yelpBusiness.js');

var yc = module.exports;


yc.yelpSearch = function (searchParams) {
  return new Promise(function (resolve, reject){

    yelp.search(searchParams, function(err, apiResult) {
      if (err) {
        reject(err);
      } else {
        resolve(apiResult);
      }
    });

  });
};


yc.mineYelpBusinesses = function (searchParams, cb){

  yc.yelpSearch(function (apiResult){

    Promise.all(apiResult.businesses.map(createYelpBusiness))

    .then(function (newYelpBusinesses) {

      if (searchParams.offset + searchParams.limit < /*searchResults.total*/ 7 ) { //!!Revisit:  Fix 7
        searchParams.offset += searchParams.limit;

        //Use setImmeidate so that if too many recursions are necesary, the call stack wont overflow
        setImmediate(yc.mineYelpBusinesses, searchParams, cb);
      } else {
        cb(null, 'Yelp business data mine complete');
      }

    });

  })
  .catch(function (reason) {
    var mineYelpError = new verror(reason, 'yelpController, mineYelpBusinesses error')

    log.error({mineYelpError: mineYelpError});

    cb(error);
  });



};



function createYelpBusiness (yelpApiBusiness){
  return new Promise(function (resolve, reject){

    var newYelpBusiness = new YB();

    log.trace({newYelpBusiness: newYelpBusiness});

    _.assign(newYelpBusiness, yelpApiBusiness);

    newYelpBusiness.yelpBusinessId = yelpApiBusiness.id;
    delete newYelpBusiness.id;

    newYelpBusiness.save(function (err, doc){
      if (err) {
        reject(err);
      } else {
        resolve(doc);
      }
    });

  });
}