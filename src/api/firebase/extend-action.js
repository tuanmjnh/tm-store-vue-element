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
      batch.commit().then(function() {
        console.log(batch)
        resolve(true)
      })
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
