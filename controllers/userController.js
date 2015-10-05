'use strict'

var User = require('../models/userModel.js');



module.exports.findOrUpdateUser = function (profile, accessToken) {
  return new Promise(function (resolve, reject){

    var updatedDoc = {
      foursquareId: profile.id,
      name: {
        familyName: profile.name.familyName,
        givenName: profile.name.givenName
      },
      foursquareOauthAccessToken: accessToken
    };
    //!!Revisit:  This will overwrite the existing emails array.
    updatedDoc.emails = [];
    updatedDoc.emails.push(profile.emails[0]);

    User.findOneAndUpdate({foursquareId: profile.id}, updatedDoc, function (err, doc){
      if (err) {
        reject(err);
      } else {
        resolve(doc);
      }
    });

  });

};




module.exports.createUser = function (profile, accessToken) {
  return new Promise(function (resolve, reject) {

    var newUser = new User();

    newUser.foursquareId = profile.id;
    newUser.name = {
      familyName: profile.name.familyName,
      givenName: profile.name.givenName
    };
    newUser.foursquareOauthAccessToken = accessToken;
    newUser.emails.push(profile.emails[0]);

    newUser.save(function (err, doc){
      if (err) {
        reject(err);
      } else {
        resolve(doc);
      }
    });

  });
};



