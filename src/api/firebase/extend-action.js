import db from './index'
import store from '@/store'
import localIP from '@/utils/local-ip'
const collectionLogs = db.firestore().collection('logs')

const dataLog = async ({ coll, cid, action }) => {
  return {
    uid: store.state.auth.uid,
    by: store.state.auth.profile.email,
    at: db.firestore.FieldValue.serverTimestamp(),
    ip: await localIP(),
    coll: coll,
    cid: cid,
    action: action
  }
}

function getLogId(batch) {
  return batch._mutations[1].key.path.segments[1]
}

export function getLogById(id) {
  return new Promise((resolve, reject) => {
    collectionLogs.doc(id).get().then(async doc => {
      if (doc.exists) {
        resolve(doc.data())
      } else {
        resolve(null)
      }
    })
  })
}

export function getDocumentById({ collection, id }) {
  return new Promise((resolve, reject) => {
    collection.doc(id).get().then(async doc => {
      if (doc.exists) {
        resolve(doc.data())
      } else {
        resolve(null)
      }
    })
  })
}

export function getLogByUid(params) {
  let qry = collectionLogs.where('flag', '==', params.flag) // .orderBy('created_at', 'desc')
  if (params.search) {
    qry = qry.where('name', '>=', 'test').where('name', '<=', 'test' + '\uf8ff')
  }
  return qry.get().then((docs) => {
    const items = []
    docs.forEach(function (doc) {
      items.push({ ...{ id: doc.id }, ...doc.data() })
    })
    return items
  })
}

export function getLogByDoc(params) {
  return collectionLogs
    .where('cid', '==', params.cid)
    .where('coll', '==', params.coll)
    .orderBy('at', 'desc')
    .get().then((docs) => {
      const items = []
      docs.forEach(function (doc) {
        items.push(doc.data())
      })
      return items
    })
}

export function addLog(data) {
  return new Promise((resolve, reject) => {
    data.uid = store.state.auth.uid
    data.by = store.state.auth.profile.email
    data.at = db.firestore.FieldValue.serverTimestamp()
    data.ip = ''
    collectionLogs.add(data).then((docRef) => {
      docRef.get().then((doc) => {
        resolve(doc.data())
      })
    }).catch((err) => {
      resolve(null)
      console.log(err)
    })
  })
}
export async function addLogInsert(data) {
  data.action = 'insert'
  return await addLog(data)
}
export async function addLogUpdate(data) {
  data.action = 'update'
  return await addLog(data)
}
export async function addLogTrash(data) {
  data.action = 'trash'
  return await addLog(data)
}
export async function addLogRecover(data) {
  data.action = 'recover'
  return await addLog(data)
}

// console.log(store.getters.useLogs)
export function add({ collections, items, resolve, reject }) {

}

export function update({ collection, params }) {
  return new Promise(async (resolve, reject) => {
    if (store.getters.useLogs) {
      // // Get a new write batch
      const batch = db.firestore().batch()
      // Update data
      batch.update(collection.doc(params.id), params.data)
      // Add Log
      batch.set(collectionLogs.doc(), await dataLog({ coll: collection.id, cid: params.id, action: 'update' }))
      // Commit the batch
      batch.commit().then(async () => {
        const result = await getDocumentById({ collection: collection, id: params.id })
        const log = await getLogById(getLogId(batch))
        if (log) result.log.push(log)
        resolve(result)
      }).catch((err) => {
        reject(err)
      })
    } else {
      collection.doc(params.id).update(params.data)
    }
  })
}

// functions.firestore
//   .document('template')
//   .onWrite((change, context) => {
//     console.log(change, context)
//   })
// functions.firestore
//   .document('template')
//   .onUpdate((change, context) => {
//     console.log(change, context)
//   })
