var conf = require('../config/config.js');

var url = require('url');

var oauthRedirectUrl = url.format({
  protocol: "http",
  slashes: true,
  hostname: conf.thisServer.hostname,
  port: conf.thisServer.port,
  pathname: '/auth/foursquare' + conf.foursquare.oauthCallbackPath
});

console.log('oauthRedirectUrl');
console.log(oauthRedirectUrl);

var foursquare = require('node-foursquare')({
  secrets: {
    clientId: conf.foursquare.clientId,
    clientSecret: conf.foursquare.clientSecret,
    redirectUrl: oauthRedirectUrl
  },
  foursquare: {
    mode: 'foursquare',
    version: conf.foursquare.apiVersion,
    warnings: 'ERROR'
  },
  winston: {
    loggers: {
      core: {
        console: {
          level: 'warn'
        }
      },
      venues: {
        console: {
          level: 'debug'
        }
      }
    }
  }
});


foursquare.oauthRedirectUrl = oauthRedirectUrl;

module.exports = foursquare;