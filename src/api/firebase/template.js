import { firestore } from './index'
import message from '@/utils/message'
const collection = firestore.collection('template')

export function get({ commit, state, rootGetters, rootState }, params) {
  return new Promise((resolve, reject) => {
    if (params && params.loading) rootState.$getLoading = true
    collection.orderBy('created_at', 'asc').get()
      .then(docs => {
        const items = []
        docs.forEach(function(doc) {
          // console.log(doc.id, ' => ', doc.data())
          items.push({ ...{ id: doc.id }, ...doc })
        })
        resolve(items)
      })
      .catch((err) => {
        message.error(err)
        reject(err)
      })
      .finally(() => {
        if (params && params.loading) rootState.$getLoading = true
      })
  })
}

export function getSnapshot({ commit, state, rootGetters, rootState }, params) {
  return new Promise((resolve, reject) => {
    if (params && params.loading) rootState.$getLoading = true
    collection.orderBy('created_at', 'asc')
      .onSnapshot((snapshot) => {
        const items = []
        snapshot.forEach((doc) => {
          items.push({ ...{ id: doc.id }, ...doc })
        })
        resolve(items)
      })
      .catch((err) => {
        message.error(err)
        reject(err)
      })
      .finally(() => {
        if (params && params.loading) rootState.$getLoading = true
      })
  })
}

export function add({ commit, state, rootGetters, rootState }, params) {
  return new Promise((resolve, reject) => {
    if (params && params.loading) rootState.$commitLoading = true
    collection.add(params.item)
      .then(doc => {
        message.success({ message: 'success.insert' })
        resolve(doc)
      })
      .catch((err) => {
        message.error(err)
        reject(err)
      })
      .finally(() => {
        if (params && params.loading) rootState.$commitLoading = true
      })
  })
}

export function edit({ commit, state, rootGetters, rootState }, params) {
  return new Promise((resolve, reject) => {
    if (params && params.loading) rootState.$commitLoading = true
    const data = { ...params.item }
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
      .finally(() => {
        if (params && params.loading) rootState.$commitLoading = true
      })
  })
}

export function trash({ commit, state, rootGetters, rootState }, params) {
  return new Promise((resolve, reject) => {
    if (params && params.loading) rootState.$commitLoading = true
    collection.doc(params.item.id).update(params.item)
      .then(doc => {
        message.success({ message: 'success.trash' })
        resolve(doc)
      })
      .catch((err) => {
        message.error(err)
        reject(err)
      })
      .finally(() => {
        if (params && params.loading) rootState.$commitLoading = true
      })
  })
}

export function del({ commit, state, rootGetters, rootState }, params) {
  new Promise((resolve, reject) => {
    if (params && params.loading) rootState.$commitLoading = true
    collection.doc(params.item.id).delete()
      .then(doc => {
        message.success({ message: 'success.trash' })
        resolve(doc)
      })
      .catch((err) => {
        message.error(err)
        reject(err)
      })
      .finally(() => {
        if (params && params.loading) rootState.$commitLoading = true
      })
  })
}
