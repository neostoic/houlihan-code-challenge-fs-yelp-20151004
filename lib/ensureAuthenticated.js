'use strict'

module.exports.ensureAuthenticated = function* (next) {
  if(this.isAuthenticated()) {
    yield next;
  } else {
    this.redirect('/loginpage.html');
  }
};