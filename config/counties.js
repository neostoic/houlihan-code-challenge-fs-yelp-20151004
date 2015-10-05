'use strict'

var log = require('../utilities/logger.js');

var counties = require('./counties.json');

module.exports.getCoordinates = function(county) {

  var countyCoords = counties[county];

  if(!countyCoords){
    log.warn('County %s is not valid', county);
    return null;
  };

  return countyCoords;

};