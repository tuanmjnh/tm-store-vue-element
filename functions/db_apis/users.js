const firebase = require('../config/firebase');
// const collection = firebase.functions.firestore;
const collection = firebase.admin.firestore().collection('users');

function listAllUsers(nextPageToken) {
  const result = [];
  // List batch of users, 1000 at a time.
  return firebase.admin.auth().listUsers(1000, nextPageToken).then((listUsersResult) => {
    // for await (userRecord of listUsersResult) {
    //   const user = userRecord.toJSON();
    //   // const _user = await collection.doc(user.uid).get();
    //   // // if (_user.exists) 
    //   // user.extras = _user.data();
    //   result.push(user);
    //   // console.log('user', userRecord.toJSON());
    // }
    listUsersResult.users.forEach(async (userRecord) => {
      const user = userRecord.toJSON();
      result.push(user);
      // const _user = await collection.doc(user.uid).get();
      // console.log(_user);
      // if (snap.exists) user.extras = _user.data();
      // console.log('user', userRecord.toJSON());
    });
    if (listUsersResult.pageToken) {
      // List next batch of users.
      listAllUsers(listUsersResult.pageToken);
    }
    return result;
  }).catch((error) => {
    console.log('Error listing users:', error);
    return;
  });
}

// const listAllUsers = async function(nextPageToken) {
//   // List batch of users, 1000 at a time.
//   const result = await firebase.admin.auth().listUsers(1000, nextPageToken).users;
//   // firebase.admin.auth().listUsers(1000, nextPageToken).then((listUsersResult) => {
//   //   console.log(listUsersResult)
//   //   return;
//   // }).catch(error => {
//   //   console.log(error)
//   //   return;
//   // })
//   // listUsersResult.users.forEach((userRecord) => {
//   //   console.log('user', userRecord.toJSON());y
//   // });
//   // if (result.pageToken) {
//   //   // List next batch of users.
//   //   const _result = await listAllUsers(result.pageToken);
//   //   result.push(_result);
//   // }
//   return result;
// };
module.exports.getAll = async () => {
  // firebase.admin.auth().listUsers(1000).then((userRecords) => {
  //   userRecords.users.forEach((user) => console.log(user.toJSON()));
  // }).catch((error) => console.log(error));
  const result = await firebase.admin.auth().listUsers();
  const users = result.users;
  // const promises = [];
  // users.forEach(e => {
  //   const p = collection.doc(e.uid).get();
  //   promises.push(p);
  // });
  // const snapshots = await Promise.all(promises);
  // snapshots.forEach(snap => {
  //   users.extras = snap.data();
  // })
  return users;
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

module.exports.create = (data) => {
  // email: 'user@example.com',
  // emailVerified: false,
  // phoneNumber: '+11234567890',
  // password: 'secretPassword',
  // displayName: 'John Doe',
  // photoURL: 'http://www.example.com/12345678/photo.png',
  // disabled: false
  return firebase.admin.auth().createUser(data);
};

module.exports.createProfile = (id, data) => {
  return collection.doc(id).set(data);
};

module.exports.update = async (uid, data) => {
  return firebase.admin.auth().updateUser(uid, data);
};

module.exports.delete = async (uid) => {
  return firebase.admin.auth().deleteUser(uid);
};

// const test = async () => {
//   const rs = await firebase.admin.firestore().collection('users').doc('NEjrbAZ3IXYpkS1UzcjcGlN8sOs1').get();
//   console.log(rs);
// };
// test();

module.exports.getCollectionUser = async (uid) => {
  const result = await collection.doc(uid).get();
  return result.data();
};
