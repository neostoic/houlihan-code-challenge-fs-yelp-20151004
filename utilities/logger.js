'use strict'

var _ = require('lodash');
var bunyan = require('bunyan');

var bunyanLogLevels = ['trace', 'debug', 'info', 'warn', 'error', 'fatal'];

if(process.env.LOG_LEVEL && !_.includes(bunyanLogLevels, process.env.LOG_LEVEL)){
  console.log('process.env.LOG_LEVEL ' + process.env.LOG_LEVEL + ' is invalid.  If you specify this environment variable, it must be a valid log level: trace, debug, info, warn, error, or fatal.  If you do not specify this environment variable, it will be set to info by default');
  process.exit(13);
  return;
}

var logLevel = process.env.LOG_LEVEL || bunyan.INFO;

var log = bunyan.createLogger({
  name: 'hart1prep1',
  serializers: bunyan.stdSerializers,
  streams: [
    {
      level: logLevel,
      stream: process.stdout
    }
  ]
});

module.exports = log;