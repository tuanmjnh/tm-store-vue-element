const functions = require('firebase-functions');
const admin = require('firebase-admin');
// const admin = require('firebase-admin');

// function getAccessToken() {
//   return new Promise(function(resolve, reject) {
//       var key = require('./service-account.json');
//       var jwtClient = new google.auth.JWT(
//           key.client_email,
//           null,
//           key.private_key,
//           SCOPES,
//           null
//       );
//   })
// }

// admin.initializeApp({
//   credential: admin.credential.applicationDefault(),
// });

admin.initializeApp(functions.config().firebase);

module.exports.functions = functions;
module.exports.admin = admin;
