'use strict'

var Router = require('koa-router');

var fr = module.exports = new Router();

var fuzzyCtrl = require('../controllers/fuzzyController.js');
var corrCtrl = require('../controllers/correlationController.js');

fr.get('/correlate-data', function* (next) {
  this.body = yield fuzzyCtrl.doFuzzyMatch();
});

fr.get('/get-correlations', function* (next) {
  this.body = yield corrCtrl.getAll();
});

// fr.get('/test', function* (next) {
//   this.body = yield fuzzyCtrl.fuzzyTest();
// });

