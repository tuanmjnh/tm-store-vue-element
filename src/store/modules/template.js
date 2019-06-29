import { firestore } from '@/api/firebase/index'
const collection = firestore.collection('template')

const state = {
  items: [],
  item: {},
  default: {}
}

const mutations = {
  SET_ITEMS: (state, items) => {
    state.items = items
  },
  SET_ITEM: (state, item) => {
    state.item = item
  }
}

const actions = {
  select({ commit, state, rootGetters, rootState }, params) {
    return new Promise((resolve, reject) => {
      if (params && params.loading) rootState.$getLoading = true
      collection.orderBy('created_at', 'asc').get()
        .then(docs => {
          const items = []
          docs.forEach(function(doc) {
            // console.log(doc.id, ' => ', doc.data())
            let item = state.default
            item = doc.data()
            item.id = doc.id
            items.push(item)
          })
          // commit('SET_ITEMS', items)
          resolve(items)
        })
        .catch((err) => {
          commit('MESSAGE_ERROR', err, { root: true })
          reject(err)
        })
        .finally(() => {
          if (params && params.loading) rootState.$getLoading = true
        })
    })
  },
  selectSnapshot({ commit, state, rootGetters, rootState }, params) {
    return new Promise((resolve, reject) => {
      if (params && params.loading) rootState.$getLoading = true
      collection.orderBy('created_at', 'asc')
        .onSnapshot((snapshot) => {
          const items = []
          snapshot.forEach((doc) => {
            items.push({ ...{ id: doc.id }, ...doc })
          })
          // commit('SET_ITEMS', items)
          resolve(items)
        })
        .catch((err) => {
          commit('MESSAGE_ERROR', err, { root: true })
          reject(err)
        })
        .finally(() => {
          if (params && params.loading) rootState.$getLoading = true
        })
    })
  },
  insert({ commit, state, rootGetters, rootState }, params) {
    return new Promise((resolve, reject) => {
      if (params && params.loading) rootState.$commitLoading = true
      collection.add(params.item)
        .then(doc => {
          commit('MESSAGE_SUCCESS', { message: 'success.insert' }, { root: true })
          resolve(doc)
        })
        .catch((err) => {
          commit('MESSAGE_ERROR', err, { root: true })
          reject(err)
        })
        .finally(() => {
          if (params && params.loading) rootState.$commitLoading = true
        })
    })
  },
  update({ commit, state, rootGetters, rootState }, params) {
    return new Promise((resolve, reject) => {
      if (params && params.loading) rootState.$commitLoading = true
      const data = { ...params.item }
      delete data.id
      collection.doc(params.item.id).update(data)
        .then(doc => {
          commit('MESSAGE_SUCCESS', { message: 'success.update' }, { root: true })
          resolve(doc)
        })
        .catch((error) => { commit('SET_CATCH', error, { root: true }) })
        .finally(() => {
          if (params && params.loading) rootState.$commitLoading = true
        })
    })
  },
  trash({ commit, state, rootGetters, rootState }, params) {
    return new Promise((resolve, reject) => {
      if (params && params.loading) rootState.$commitLoading = true
      collection.doc(params.item.id).update(params.item)
        .then(doc => {
          commit('MESSAGE_SUCCESS', { message: 'success.trash' }, { root: true })
          resolve(doc)
        })
        .catch((err) => {
          commit('MESSAGE_ERROR', err, { root: true })
          reject(err)
        })
        .finally(() => {
          if (params && params.loading) rootState.$commitLoading = true
        })
    })
  },
  delete({ commit, state, rootGetters, rootState }, params) {
    new Promise((resolve, reject) => {
      if (params && params.loading) rootState.$commitLoading = true
      collection.doc(params.item.id).delete()
        .then(doc => {
          commit('MESSAGE_SUCCESS', { message: 'success.delete' }, { root: true })
          resolve(doc)
        })
        .catch((err) => {
          commit('MESSAGE_ERROR', err, { root: true })
          reject(err)
        })
        .finally(() => {
          if (params && params.loading) rootState.$commitLoading = true
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
