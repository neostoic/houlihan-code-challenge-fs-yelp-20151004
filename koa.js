
var mount = require('koa-mount');

var authRouter = require('./routers/authRouter.js');

module.exports = function (app) {

  app.use(mount('/auth', authRouter.middleware()));

};