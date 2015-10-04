var User = require('../models/userModel.js');









function createUser (profile, cb) {
  return new Promise(function (resolve, reject) {
    User.findOne({foursquareId: profile.id}, function (err, doc){
      if (err) {
        reject(err);
      } else {
        resolve(doc); //??resolve with profile or doc??
      }
    })
  });
}



