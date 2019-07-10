import firebase from './index'
import store from '@/store'
import * as logs from './logs'
const collection = firebase.firestore().collection('template')

export function get(params) {
  let qry = collection.where('flag', '==', params.flag) // .orderBy('created_at', 'desc')
  if (params.search) {
    qry = qry.where('name', '>=', 'test').where('name', '<=', 'test' + '\uf8ff')
  }
  return qry.get().then((docs) => {
    const items = []
    docs.forEach(function(doc) {
      items.push({ ...{ id: doc.id }, ...doc.data() })
    })
    return items
  })
}

export function getSnapshot(params) {
  return collection.orderBy('created_at', 'asc')
    .onSnapshot((snapshot) => {
      const items = []
      snapshot.forEach((doc) => {
        items.push({ ...{ id: doc.id }, ...doc.data() })
      })
      return items
    })
}
export function find(id) {
  // return new Promise((resolve, reject) => {
  return collection.doc(id).get().then(async doc => {
    if (doc.exists) {
      const rs = doc.data()
      rs.start_date = rs.start_date ? rs.start_date.toDate() : null
      rs.end_date = rs.end_date ? rs.end_date.toDate() : null
      rs.log = await logs.getByDoc({ cid: id, coll: collection.id })
      return rs
      // resolve(doc.data())
    }
  })
  // .catch((err) => {
  // message.error(err)
  // reject(err)
  // })
  // .finally(() => { })
  // })
}

export function add(params) {
  return collection.add(params.data)
    .then(doc => {
      logs.insertType({ coll: collection.id, cid: doc.id })
    })
}

export async function edit(params) {
  // Get a new write batch
  var batch = db.batch();

  // Set the value of 'NYC'
  var nycRef = db.collection("cities").doc("NYC");
  batch.set(nycRef, { name: "New York City" });

  // Update the population of 'SF'
  var sfRef = db.collection("cities").doc("SF");
  batch.update(sfRef, { "population": 1000000 });

  // Delete the city 'LA'
  var laRef = db.collection("cities").doc("LA");
  batch.delete(laRef);

  // Commit the batch
  batch.commit().then(function() {
    // ...
  });
  await collection.doc(params.id).update(params.data)
  return await logs.updateType({ coll: collection.id, cid: params.id })
}

export function trash(params) {
  return new Promise(async (resolve, reject) => {
    const result = []
    try {
      for await (const item of params) {
        await collection.doc(item.id).update({ flag: item.flag === 0 ? 1 : 0 })
          .then(doc => {
            result.push(item)
            logs.trashType({ coll: collection.id, cid: item.id })
          })
          .catch((err) => {
            throw err
          })
      }
      resolve(result)
    } catch (err) {
      reject(err)
    }
  })
}

export function del(params) {
  new Promise((resolve, reject) => {
    collection.doc(params.item.id).delete()
      .then(doc => {
        // message.success({ message: 'success.trash' })
        resolve(doc)
      })
      .catch((err) => {
        // message.error(err)
        reject(err)
      })
      .finally(() => { })
  })
}
