
var mount = require('koa-mount');

var authRouter = require('./routers/authRouter.js');

modele.exports = function (app) {

  app.use(mount('/auth', authRouter.middleware()));



};