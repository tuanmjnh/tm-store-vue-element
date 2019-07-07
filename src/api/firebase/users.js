import firebase from './index'
import message from '@/utils/message'
import store from '@/store'
const collection = firebase.firestore().collection('users')

export function get(params) {
  return new Promise((resolve, reject) => {
    let qry = collection.where('flag', '==', params.flag) // .orderBy('created_at', 'desc')
    if (params.search) {
      qry = qry.where('name', '>=', 'test').where('name', '<=', 'test' + '\uf8ff')
    }
    qry.get().then(docs => {
      const items = []
      docs.forEach(function(doc) {
        // console.log(doc.id, ' => ', doc.data())
        items.push({ ...{ id: doc.id }, ...doc.data() })
      })
      resolve(items)
    })
      .catch((err) => {
        message.error(err)
        reject(err)
      })
      .finally(() => { })
  })
}

export function getSnapshot(params) {
  return new Promise((resolve, reject) => {
    collection.orderBy('created_at', 'asc')
      .onSnapshot((snapshot) => {
        const items = []
        snapshot.forEach((doc) => {
          items.push({ ...{ id: doc.id }, ...doc.data() })
        })
        resolve(items)
      })
      .catch((err) => {
        message.error(err)
        reject(err)
      })
      .finally(() => { })
  })
}

export function find(id) {
  return new Promise((resolve, reject) => {
    collection.doc(id).get().then(doc => {
      if (doc.exists) {
        resolve(doc.data())
      }
    })
      .catch((err) => {
        message.error(err)
        reject(err)
      })
      .finally(() => { })
  })
}

export function add(params) {
  return new Promise((resolve, reject) => {
    params.data.created_by = store.state.auth.uid
    params.data.created_at = firebase.firestore.FieldValue.serverTimestamp()
    params.data.created_ip = ''
    collection.add(params.data)
      .then(doc => {
        message.success({ message: 'success.insert' })
        resolve(doc)
      })
      .catch((err) => {
        message.error(err)
        reject(err)
      })
      .finally(() => { })
  })
}

export function edit(params) {
  return new Promise((resolve, reject) => {
    params.data.updated_by = store.state.auth.uid
    params.data.updated_at = firebase.firestore.FieldValue.serverTimestamp()
    params.data.updated_ip = ''
    collection.doc(params.id).update(params.data)
      .then(doc => {
        message.success({ message: 'success.update' })
        resolve(doc)
      })
      .catch((err) => {
        message.error(err)
        reject(err)
      })
      .finally(() => { })
  })
}

export function trash(params) {
  return new Promise(async (resolve, reject) => {
    const result = []
    try {
      for await (const item of params) {
        const data = {
          deleted_by: store.state.auth.uid,
          deleted_at: firebase.firestore.FieldValue.serverTimestamp(),
          deleted_ip: '',
          flag: item.flag === 0 ? 1 : 0
        }
        await collection.doc(item.id).update(data)
          .then(doc => {
            result.push({ ...{ id: item.id }, ...data })
          })
          .catch((err) => {
            throw err
          })
      }
      message.success({ message: 'success.trash' })
      resolve(result)
    } catch (err) {
      message.error(err)
      reject(err)
    }
  })
}

export function del(params) {
  new Promise((resolve, reject) => {
    collection.doc(params.item.id).delete()
      .then(doc => {
        message.success({ message: 'success.trash' })
        resolve(doc)
      })
      .catch((err) => {
        message.error(err)
        reject(err)
      })
      .finally(() => { })
  })
}
