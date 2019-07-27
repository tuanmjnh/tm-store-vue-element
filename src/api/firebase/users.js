import db from './index'
// import * as admin from 'firebase-admin'
import * as actions from './extend-action'
import http from '@/utils/http-client'
const collection = 'users'

export async function getAll(params) {
  const res = await http.get(`/${collection}`)
  const users = []
  for await (const user of res.data) {
    const _user = await db.firestore().collection(collection).doc(user.uid).get()
    if (_user.exists) users.push({ ...user, ..._user.data() })
  }
  return users
}

export async function getPagination(params) {
  let qry = db.firestore().collection(collection)// .orderBy('profile', 'asc')// .orderBy('created_at', 'desc')
  // Filter data
  if (params.conditions && params.conditions.length > 0) {
    params.conditions.forEach(e => { qry = qry.where(e.key, e.operation, e.value) })
  }
  // Search data
  if (params.search) qry = qry.where('email', '>=', params.search).where('email', '<=', params.search + '\uf8ff')
  // if (params.start_date) qry = qry.where('start_date', '>=', db.firestore.Timestamp.fromDate(params.start_date))
  // if (params.end_date) qry = qry.where('end_date', '<=', db.firestore.Timestamp.fromDate(params.end_date))
  // Get all documents
  const documentSnapshots = await qry.get()
  const offset = documentSnapshots.docs[params.pageSize * (params.currentPage - 1)]
  params.totalItems = documentSnapshots.docs.length
  // Return data
  if (offset) {
    return qry.startAt(offset).limit(params.pageSize).get().then((rs) => {
      // console.log(rs.docs[0].data())
      const items = []
      rs.forEach(doc => { items.push({ ...{ id: doc.id }, ...doc.data() }) })
      return items
    })
  } else return []
}

export function getSnapshot(params) {
  return db.firestore().collection(collection).orderBy('profile', 'asc')
    .onSnapshot((snapshot) => {
      const items = []
      snapshot.forEach((doc) => {
        items.push({ ...{ id: doc.id }, ...doc.data() })
      })
      return items
    })
}

export function find({ id, by }) {
  return http.get(`/${collection}`, { params: { id: id, by: by } })
  // return collection.doc(id).get().then(async doc => {
  //   if (doc.exists) {
  //     const rs = doc.data()
  //     rs.start_date = rs.start_date ? rs.start_date.toDate() : null
  //     rs.end_date = rs.end_date ? rs.end_date.toDate() : null
  //     rs.log = await actions.getLogByDoc({ cid: collection.id, did: id })
  //     return rs
  //   }
  // })
}

export function add(params) {
  const _collection = db.firestore().collection(collection)
  const data = { ...params }
  data.photoURL = data.photoURL ? data.photoURL : 'https://lh3.googleusercontent.com/PxrebWCfpWSe_5ZhUrLyTquHd0zkhOVjL8Ghmu9OHw_-z8QEyQqfnSTt3-VDCTruqJPE_R56RitsCsi0dfDsIOHD6Gm0tAjW2RA7i6hkRsA0MNaZ9EuJmDq8CD37oNaCK4lYI3_cEQ=s200-p-k'
  data.displayName = `${data.fname} ${data.lname}`
  data.phoneNumber = `+84${data.phoneNumber}`
  return new Promise((resolve, reject) => {
    http.post(`/${collection}`, { data: data }).then((x) => {
      resolve(x.data)
    }).catch(err => {
      reject(err)
    })
    // http.post(`/${collection}`, { data: data }).then(async (x) => {
    //   actions.set({ collection: _collection, id: x.data.uid, data: params }).then((xx) => {
    //     resolve({ ...x.data, ...xx })
    //   }).catch(err => {
    //     reject(err)
    //   })
    // }).catch(err => {
    //   reject(err)
    // })
    // delete params.password
    // const data = await actions.set({ collection: _collection, id: auth.user.uid, data: params })
    // resolve({ user: auth.user, data: data })
  })
  // return new Promise(async (resolve, reject) => {
  //   try {
  //     // params.data.created_at = db.firestore.FieldValue.serverTimestamp()
  //     const auth = await db.auth().createUserWithEmailAndPassword(params.email, params.password)
  //     delete params.password
  //     const data = await actions.set({ collection: collection, id: auth.user.uid, data: params })
  //     resolve({ user: auth.user, data: data })
  //   } catch (err) {
  //     reject(err)
  //   }
  // })
}

export function edit(params) {
  const _collection = db.firestore().collection(collection)
  return actions.update({ collection: _collection, id: params.id, data: params.data })
  // await collection.doc(params.id).update(params.data)
  // return await logs.updateType({ coll: collection.id, cid: params.id })
}

export function trash(params) {
  const _collection = db.firestore().collection(collection)
  return new Promise(async (resolve, reject) => {
    const result = []
    try {
      for (const item of params) {
        if (item.flag === 1) {
          actions.trash({ id: item.id, collection: _collection, data: { flag: 0 } })
        } else {
          actions.recover({ id: item.id, collection: _collection, data: { flag: 1 } })
        }
        result.push(item)
        // await collection.doc(item.id).update({ flag: item.flag === 0 ? 1 : 0 })
        //   .then(async doc => {
        //     if (item.flag === 1) {
        //       await logs.trashType({ coll: collection.id, cid: item.id })
        //     } else {
        //       await logs.recoverType({ coll: collection.id, cid: item.id })
        //     }
        //     result.push(item)
        //   })
        //   .catch((err) => {
        //     throw err
        //   })
      }
      resolve(result)
    } catch (err) {
      reject(err)
    }
  })
}

export function remove(params) {
  const _collection = db.firestore().collection(collection)
  return new Promise(async (resolve, reject) => {
    const result = []
    try {
      for (const item of params) {
        actions.remove({ id: item.id, collection: _collection })
        result.push(item)
      }
      resolve(result)
    } catch (err) {
      reject(err)
    }
  })
}

export function getLog(id) {
  const _collection = db.firestore().collection(collection)
  return actions.getLogByDoc({ cid: _collection.id, did: id })
}

export function test() {
  // return new Promise(async (resolve, reject) => {
  //   resolve(db.functions().httpsCallable('api/user')({ text: 'abc' }))
  // })
  return new Promise(async (resolve, reject) => {
    http.get('/user').then((x) => {
      resolve(x)
    })
    // http.get('/user', { params: { id: 'Od1BT0R7NtVylCIt16HvzDS0wEB2', by: 'uid' } }).then((x) => {
    //   resolve(x)
    // })
  })
}
