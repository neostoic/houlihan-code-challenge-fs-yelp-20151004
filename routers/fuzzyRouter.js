'use strict'

var Router = require('koa-router');

var fr = module.exports = new Router();

var fuzzyCtrl = require('../controllers/fuzzyController.js');

fr.get('/run', function* (next) {

  this.body = yield fuzzyCtrl.doFuzzyMatch();

});