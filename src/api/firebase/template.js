import firebase from './index'
import * as actions from './extend-action'
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
  return collection.doc(id).get().then(async doc => {
    if (doc.exists) {
      const rs = doc.data()
      rs.start_date = rs.start_date ? rs.start_date.toDate() : null
      rs.end_date = rs.end_date ? rs.end_date.toDate() : null
      rs.log = await actions.getLogByDoc({ cid: id, collection: collection.id })
      return rs
    }
  })
}

export function add(params) {
  return actions.add({ collection: collection, data: params.data })
  // return collection.add(params.data)
  //   .then(doc => {
  //     logs.insertType({ coll: collection.id, cid: doc.id })
  //   })
}

export function edit(params) {
  return actions.update({ collection: collection, id: params.id, data: params.data })
  // await collection.doc(params.id).update(params.data)
  // return await logs.updateType({ coll: collection.id, cid: params.id })
}

export function trash(params) {
  return new Promise(async (resolve, reject) => {
    const result = []
    try {
      for (const item of params) {
        if (item.flag === 1) {
          actions.trash({ id: item.id, collection: collection, data: { flag: 0 } })
        } else {
          actions.recover({ id: item.id, collection: collection, data: { flag: 1 } })
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
