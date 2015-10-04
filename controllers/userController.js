var User = require('../models/userModel.js');







module.exports.findOrUpateUser = function (profile, accessToken) {
  return new Promise(function (resolve, reject){

    var updatedDoc = {
      foursquareId: profile.id,
      name: {
        familyName: profile.name.familyName,
        givenName: profile.name.givenName
      },
      oauthAccessToken: accessToken
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

}




module.exports.createUser = function (profile) {
  return new Promise(function (resolve, reject) {

    var newUser = new User();

    newUser.foursquareId = profile.id;
    newUser.name = {
      familyName: profile.name.familyName,
      givenName: profile.name.givenName
    };
    newUser.oauthAccessToken = accessToken;
    newUser.emails.push(profile.emails[0]);

    newUser.save(function (err, doc){
      // console.log('START newUser.save CB.  doc is:');
      // console.log(doc);
      if (err) {
        // console.log('err');
        // console.log(err);
        reject(err);
      }
      //??Resolve with newUser or doc??does doc even get passed to the .save CB??
      resolve(doc);
    });

  });
};



