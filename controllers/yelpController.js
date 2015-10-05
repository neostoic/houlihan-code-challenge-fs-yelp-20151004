'use strict'

var log = require('../utilities/logger.js');

var _ = require('lodash');

var counties = require('../config/counties.js');
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




yc.mineYelpBusinesses = function (county, cb) {

  var countyCoords = counties.getCoordinates(county);

  var bounds = countyCoords.swLat + ',' + countyCoords.swLng + '|' + countyCoords.neLat + ',' + countyCoords.neLng;
  log.trace('bounds', bounds);

  var searchParams = {
    term: 'restaurants',
    category_filter: 'restaurants',
    //location: 'Austin',
    //bounds: '36.055131,-102.163303|36.500684,-101.623466', //Sherman county tx
    //bounds: '37.900000,-122.500000|37.788022,-122.399797', //Yelp example.  somewhere in SF
    bounds: bounds,
    limit: 20,
    offset: 0
  };

  cb(null, _mineYelpBusinesses(searchParams));
};




function _mineYelpBusinesses (searchParams, cb){

  log.debug('searchParams.offset is: %d', searchParams.offset);
  log.debug('searchParams.limit is: %d', searchParams.limit);

  yc.yelpSearch(searchParams)
  .then(function (apiResult){

    log.debug('apiResult.total is %d', apiResult.total);

    Promise.all(apiResult.businesses.map(createYelpBusiness))
    .then(function (newYelpBusinesses) {

      if (searchParams.offset + searchParams.limit < apiResult.total) {
        searchParams.offset += searchParams.limit;
        // Use setImmeidate so that if too many recursions are necesary, the call stack wont overflow
        setImmediate(_mineYelpBusinesses, searchParams, cb);
      } else {
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
  return yield _.partial(YB.find.bind(YB), {});
};

yc.getOne = function* (id) {
  return yield _.partial(YB.findById.bind(YB), {id: id});
};


function createYelpBusiness (yelpApiBusiness){
  return new Promise(function (resolve, reject){

    var newYelpBusiness = new YB();
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


