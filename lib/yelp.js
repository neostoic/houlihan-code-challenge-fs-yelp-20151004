var conf = require('../config/config.js');

var yelp = require('yelp');


var yelpClient = yelp.createClient({
  consumer_key: conf.yelp.consumerKey,
  consumer_secret: conf.yelp.consumerSecret,
  token: conf.yelp.token,
  token_secret: conf.yelp.tokenSecret
});


