const firebase = require('../config/firebase');

module.exports.getEmail = async () => {
  const rs = await firebase.admin.auth().getUserByEmail('sfsaf@gmail.com');
  console.log(rs);
  firebase.admin.auth().getUserByEmail('minhtuan200990@gmail.com').then((x) => {
    console.log(x);
  }).catch(error => {
    console.log(error);
  })
};
