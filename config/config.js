var log = require('../utilities/logger.js');

conf = require('./index.json')[process.env.NODE_ENV];

if(!conf){
  log.fatal('You must specify a valid process.env.NODE_ENV');
  process.exit(13);
  return;
};

module.exports = conf;