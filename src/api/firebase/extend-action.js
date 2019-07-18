import db from './index'
import store from '@/store'
import localIP from '@/utils/local-ip'
const collectionLogs = 'logs'

// console.log(db.firestore.Timestamp.now().toDate(), db.firestore.FieldValue.serverTimestamp().toString())

const dataLog = async ({ cid, did, action }) => {
  return {
    uid: store.state.auth.uid, // User id
    cid: cid, // Collection id
    did: did, // Document id
    action: action, // Action name
    ip: await localIP(), // Local IP
    by: store.state.auth.profile.email, // Email or username
    at: db.firestore.FieldValue.serverTimestamp() // Server time
  }
}

function getDocumentId(batch) {
  return batch._mutations[0].key.path.segments[1]
}

function getLogId(batch) {
  return batch._mutations[1].key.path.segments[1]
}

export function getLogById(id) {
  return new Promise((resolve, reject) => {
    db.firestore().collection(collectionLogs).doc(id).get().then(async doc => {
      if (doc.exists) {
        resolve(doc.data())
      } else {
        resolve(null)
      }
    })
  })
}

export function getLogByUid(params) {
  let qry = db.firestore().collection(collectionLogs).where('flag', '==', params.flag) // .orderBy('created_at', 'desc')
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

export function getLogByDoc(params) {
  return db.firestore().collection(collectionLogs)
    .where('cid', '==', params.cid)
    .where('did', '==', params.did)
    .orderBy('at', 'desc')
    .get().then((docs) => {
      const items = []
      docs.forEach(function(doc) {
        items.push(doc.data())
      })
      return items
    })
}

export function addLog(data) {
  return new Promise(async (resolve, reject) => {
    db.firestore().collection(collectionLogs)
      .add(await dataLog({ cid: data.cid, did: data.did, action: data.action }))
      .then(docRef => {
        docRef.onSnapshot(doc => {
          if (doc.exists) resolve(doc.data())
          else resolve(null)
        })
      }).catch((err) => {
        reject(err)
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

export function add({ collection, data }) {
  return new Promise(async (resolve, reject) => {
    try {
      let result = {}
      await collection.add(data).then(async docs => {
        await docs.onSnapshot(async doc => {
          if (doc.exists) result = { ...{ id: doc.id }, ...doc.data() }
          if (store.getters.useLogs) {
            await db.firestore().collection(collectionLogs)
              .add(await dataLog({ cid: collection.id, did: result.id, action: 'insert' }))
              .then(async docs => {
                await docs.onSnapshot(doc => {
                  if (doc.exists) result.log = [{ ...{ id: doc.id }, ...doc.data() }]
                  resolve(result)
                })
              })
          }
        })
      })
    } catch (err) {
      reject(err)
    }
  })
}

export function update({ collection, id, data }) {
  return new Promise(async (resolve, reject) => {
    try {
      const _data = { ...data }
      if (_data.log) delete _data.log
      await collection.doc(id).update(_data)
      if (store.getters.useLogs) {
        db.firestore().collection(collectionLogs)
          .add(await dataLog({ cid: collection.id, did: id, action: 'update' }))
          .then(docRef => {
            docRef.onSnapshot(doc => {
              if (doc.exists) resolve(doc.data())
              else resolve(null)
            })
          })
      } else resolve(true)
    } catch (err) {
      reject(err)
    }
    // if (store.getters.useLogs) {
    //   // // Get a new write batch
    //   const batch = db.firestore().batch()
    //   // Update data
    //   batch.update(collection.doc(id), data)
    //   // Add Log
    //   batch.set(collectionLogs.doc(), await dataLog({ cid: collection.id, did: id, action: 'update' }))
    //   // Commit the batch
    //   batch.commit().then(async () => {
    //     // const result = await getDocumentById({ collection: collection, id: params.id })
    //     const log = await getLogById(getLogId(batch))
    //     resolve(log)
    //   }).catch((err) => {
    //     reject(err)
    //   })
    // } else {
    //   collection.doc(id).update(data)
    //   resolve(true)
    // }
  })
}

export function trash({ collection, id, data }) {
  return new Promise(async (resolve, reject) => {
    try {
      await collection.doc(id).update(data)
      if (store.getters.useLogs) {
        db.firestore().collection(collectionLogs)
          .add(await dataLog({ cid: collection.id, did: id, action: 'trash' }))
          .then(docRef => {
            docRef.onSnapshot(doc => {
              if (doc.exists) resolve(doc.data())
              else resolve(null)
            })
          })
      } else resolve(true)
    } catch (err) {
      reject(err)
    }
  })
}

export function recover({ collection, id, data }) {
  return new Promise(async (resolve, reject) => {
    try {
      await collection.doc(id).update(data)
      if (store.getters.useLogs) {
        db.firestore().collection(collectionLogs)
          .add(await dataLog({ cid: collection.id, did: id, action: 'recover' }))
          .then(docRef => {
            docRef.onSnapshot(doc => {
              if (doc.exists) resolve(doc.data())
              else resolve(null)
            })
          })
      } else resolve(true)
    } catch (err) {
      reject(err)
    }
  })
}

export function remove({ collection, id }) {
  return new Promise(async (resolve, reject) => {
    try {
      await collection.doc(id).delete()
      if (store.getters.useLogs) {
        db.firestore().collection(collectionLogs)
          .add(await dataLog({ cid: collection.id, did: id, action: 'delete' }))
          .then(docRef => {
            docRef.onSnapshot(doc => {
              if (doc.exists) resolve(doc.data())
              else resolve(null)
            })
          })
      } else resolve(true)
    } catch (err) {
      reject(err)
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
