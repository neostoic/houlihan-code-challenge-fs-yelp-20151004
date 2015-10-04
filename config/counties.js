var log = require('../utilities/logger.js');

var counties = require('./config.json');

module.exports.getCoordinates(county) = function(county) {

  var county = counties[county];

  if(!county){
    log.warn('County %s is not a valid', county);
    return null;
  };

  return county;

};