const firebase = require('../config/firebase');

// function listAllUsers(nextPageToken) {
//   // List batch of users, 1000 at a time.
//   firebase.admin.auth().listUsers(1000, nextPageToken).then((listUsersResult) => {
//     listUsersResult.users.forEach((userRecord) => {
//       console.log('user', userRecord.toJSON());
//     });
//     if (listUsersResult.pageToken) {
//       // List next batch of users.
//       listAllUsers(listUsersResult.pageToken);
//     }
//   }).catch((error) => {
//     console.log('Error listing users:', error);
//     return;
//   });
// }

const listAllUsers = async function(nextPageToken) {
  // List batch of users, 1000 at a time.
  const result = await firebase.admin.auth().listUsers(1000, nextPageToken).users;
  // firebase.admin.auth().listUsers(1000, nextPageToken).then((listUsersResult) => {
  //   console.log(listUsersResult)
  //   return;
  // }).catch(error => {
  //   console.log(error)
  //   return;
  // })
  // listUsersResult.users.forEach((userRecord) => {
  //   console.log('user', userRecord.toJSON());y
  // });
  // if (result.pageToken) {
  //   // List next batch of users.
  //   const _result = await listAllUsers(result.pageToken);
  //   result.push(_result);
  // }
  return result;
};
module.exports.getAll = () => {
  // firebase.admin.auth().listUsers(1000).then((userRecords) => {
  //   userRecords.users.forEach((user) => console.log(user.toJSON()));
  // }).catch((error) => console.log(error));
  return listAllUsers();
};

module.exports.getByUid = async (uid) => {
  return firebase.admin.auth().getUser(uid);
};

module.exports.getByEmail = async (email) => {
  return firebase.admin.auth().getUserByEmail(email);
};

module.exports.getByPhoneNumber = async (phone) => {
  return firebase.admin.auth().getUserByPhoneNumber(phone);
};

module.exports.create = async (data) => {
  // email: 'user@example.com',
  // emailVerified: false,
  // phoneNumber: '+11234567890',
  // password: 'secretPassword',
  // displayName: 'John Doe',
  // photoURL: 'http://www.example.com/12345678/photo.png',
  // disabled: false
  return firebase.admin.auth().createUser(data);
};

module.exports.update = async (uid, data) => {
  // email: 'user@example.com',
  // emailVerified: false,
  // phoneNumber: '+11234567890',
  // password: 'secretPassword',
  // displayName: 'John Doe',
  // photoURL: 'http://www.example.com/12345678/photo.png',
  // disabled: false
  return firebase.admin.auth().updateUser(uid, data);
};

module.exports.delete = async (uid) => {
  return firebase.admin.auth().deleteUser(uid);
};
