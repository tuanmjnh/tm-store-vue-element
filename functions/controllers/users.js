const dbapi = require('../db_apis/users');
// 
module.exports.getUser = (req, res, next) => {
  res.json({ data: req.user });
};

module.exports.get = (req, res, next) => {
  if (req.query.id) {
    if (req.query.by === 'email') {
      dbapi.getByEmail(req.query.id).then((rs) => {
        res.json({ data: rs });
        return;
      }).catch((error) => {
        res.status(500).json({ error: error });
        return;
      });
    } else if (req.query.by === 'phone') {
      dbapi.getByPhoneNumber(req.query.id).then((rs) => {
        res.json({ data: rs });
        return;
      }).catch((error) => {
        res.status(500).json({ error: error });
        return;
      });
    } else {
      dbapi.getByUid(req.query.id).then((rs) => {
        res.json({ data: rs });
        return;
      }).catch((error) => {
        res.status(500).json({ error: error });
        return;
      });
    }
  } else {
    // var allUsers = [];
    // return firebase.admin.auth(1000).listUsers().then((listUsersResult) => {
    //   listUsersResult.users.forEach((userRecord) => {
    //     // For each user
    //     var userData = userRecord.toJSON();
    //     allUsers.push(userData);
    //     if (listUsersResult.pageToken) {
    //       // List next batch of users.
    //       listAllUsers(listUsersResult.pageToken);
    //     }
    //   });
    //   res.status(200).json({ data: allUsers });
    //   return;
    // }).catch((error) => {
    //   console.log("Error listing users:", error);
    //   res.status(500).json({ error: error });
    //   return;
    // });

    dbapi.getAll().then((result) => {
      res.json({ data: result });
      return;
    }).catch((error) => {
      res.status(500).json({ error: error });
      return;
    });

    // firebase.admin.auth().listUsers(1000).then((xx) => {
    //   res.json({ data: xx.users });
    //   return;
    // }).catch((error) => {
    //   res.json({ error: error });
    //   return;
    // });

    // try {
    //   const result = await firebase.admin.auth().listUsers(1000);
    //   res.json({ data: result.users });
    //   // console.log(result);
    //   return;
    // } catch (error) {
    //   res.json({ error: error });
    //   return;
    // }
  }
};

module.exports.post = async (req, res, next) => {
  if (!req.body.data) {
    res.status(404).json({ error: 'exist', params: 'data' });
    return;
  }
  // email: 'user@example.com',
  // emailVerified: false,
  // phoneNumber: '+11234567890',
  // password: 'secretPassword',
  // displayName: 'John Doe',
  // photoURL: 'http://www.example.com/12345678/photo.png',
  // disabled: false
  // dbapi.create(req.body.data).then((rs) => {
  //   res.json({ data: rs });
  //   return;
  // }).catch((error) => {
  //   // next(error);
  //   res.status(500).json({ error: error });
  //   return;
  // });
  try {
    const auth = await dbapi.create(req.body.data);
    const user = await dbapi.createProfile(auth.uid, {
      roles: req.body.data.roles || [],
      note: req.body.data.note || '',
      phoneRegion: req.body.data.phoneRegion || '',
    });
    res.json({ data: { ...auth, ...req.body.data } });
    return;
  } catch (error) {
    res.status(500).json({ error: error });
    return;
  }

  // snapshots.forEach(snap => {
  //   console.log(snap)
  //   result = { ...result, ...snap }
  // }) // .catch((error) => {
  //   res.status(500).json({ error: error });
  //   return;
  // });
  // res.json({ data: result });
};

module.exports.put = async (req, res, next) => {
  if (!req.body.id) {
    res.status(404).json({ error: 'exist', params: 'id' });
    return;
  }
  if (!req.body.data) {
    res.status(404).json({ error: 'exist', params: 'data' });
    return;
  }
  try {
    const auth = await dbapi.update(req.body.id, req.body.data);
    const user = await dbapi.updateProfile(auth.uid, {
      roles: req.body.data.roles || [],
      note: req.body.data.note || '',
      phoneRegion: req.body.data.phoneRegion || '',
    });
    res.json({ data: { ...auth, ...req.body.data } });
  } catch (error) {
    res.status(500).json({ error: error });
    return;
  }
};

module.exports.delete = (req, res, next) => {
  if (!req.body.id) {
    res.status(404).json({ error: 'exist', params: 'id' });
    return;
  }
  dbapi.delete(req.body.id).then((rs) => {
    res.json({ data: rs });
    return;
  }).catch((error) => {
    res.status(500).json({ error: error });
    return;
  });
};

module.exports.getCollectionUser = (req, res, next) => {
  if (!req.query.id) {
    res.status(404).json({ error: 'exist', params: 'id' });
    return;
  }
  dbapi.getCollectionUser(req.query.id).then((rs) => {
    res.json({ data: rs });
    return;
  }).catch((error) => {
    res.status(500).json({ error: error });
    return;
  });
};
