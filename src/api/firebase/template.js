import firebase from './index'
import message from '@/utils/message'
import store from '@/store'
const collection = firebase.firestore().collection('template')

export function get(params) {
  return new Promise((resolve, reject) => {
    collection.where('flag', '==', params.flag).get()// .orderBy('created_at', 'asc').get()
      .then(docs => {
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

export function add(params) {
  return new Promise((resolve, reject) => {
    params.created_by = store.state.auth.uid
    params.created_at = firebase.firestore.FieldValue.serverTimestamp()
    params.created_ip = ''
    collection.add(params)
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
    const data = { ...params.item }
    data.updated_by = store.state.auth.uid
    data.updated_at = firebase.firestore.FieldValue.serverTimestamp()
    data.updated_ip = ''
    delete data.id
    collection.doc(params.item.id).update(data)
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
