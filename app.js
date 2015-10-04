'use strict'

var log = require('../utilities/logger.js');

process.on('exit', function(){
  //Use console.log because the node.js documentation says everything in this
  //callback must be synchronous and console.log is synchronous (when the destination
  //is a terminal), whereas a logger library may not be.
  console.log('process.on "exit" event handler: process.exitCode is');
  console.log(process.exitCode);
});

process.on('uncaughtException', function(err){
  log.fatal(err, 'process.on uncaughtException: err is:');
  //!!! WARNING WARNING WARNING WARNING WARNING WARNING WARNING WARNING !!!
  //DO NOT REMOVE THE LINE: process.exit(1);
  //The presence of process.on('uncaughtException') prevents Node.js from its default
  //behavior, which is to print the uncaught exception and exit. If you do not
  //exit now, ANYTHING could happen.
  //Note: Use process.exit(1) because this is an uncaughtException.  See Node.js docs.
  //!!! WARNING WARNING WARNING WARNING WARNING WARNING WARNING WARNING !!!
  process.exit(1);
});

var conf = require('./config/config.js');


var url = require('url');


// 'mongodb://localhost:3000/houlihanYelpFs/'
var mongoConnUrl = url.format({
  protocol: 'mongodb',
  slashes: true,
  hostname: conf.mongo.hostname,
  port: conf.mongo.port,
  pathname: conf.mongo.dbName
});



var mongoose = require('mongoose');

mongoose.connect(mongoConnUrl);

mongoose.connection.once('open', function (err){
  if (err) {
    log.fatal(err, 'Connection open to MongoDB %s, but there was an err:');
    return process.exit(13);
  }
  console.log('Connection open to MongoDB %s', mongoConnUrl);
});

mongoose.connection.on('error', function (err){
  log.error(err, 'MongoDB on error event. err is:');
});







var koa = require('koa');







require('../koa.js')(app);


app.listen(conf.thisServer.port, function (err){
  if(err){
    log.fatal(err, 'Error starting server on port %s', conf.thisServer.port);
    return process.exit(13);
  }
  console.log('app listening on port ' + port);
});
