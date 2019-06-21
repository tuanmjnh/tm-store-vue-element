const collection = 'settings'

const state = {
  items: [],
  item: {}
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
  async select({ commit, state, rootGetters, rootState }, params) {
    if (params.loading) rootState.$getLoading = true
    await rootState.$firebase.fs.collection(collection).orderBy('created_at', 'asc').get()
      .then(docs => {
        const items = []
        docs.forEach(function(doc) {
          // console.log(doc.id, ' => ', doc.data())
          let item = state.default
          item = doc.data()
          item.id = doc.id
          items.push(item)
        })
        commit('SET_ITEMS', items)
      })
      .catch((error) => { commit('SET_CATCH', error, { root: true }) })
      .finally(() => {
        if (params.loading) rootState.$getLoading = true
      })
  },
  async insert({ commit, state, rootGetters, rootState }, params) {
    if (params.loading) rootState.$getLoading = true
    await rootState.$firebase.fs.collection(collection).orderBy('created_at', 'asc').get()
      .then(docs => {
        const items = []
        docs.forEach(function(doc) {
          // console.log(doc.id, ' => ', doc.data())
          let item = state.default
          item = doc.data()
          item.id = doc.id
          items.push(item)
        })
        commit('SET_ITEMS', items)
      })
      .catch((error) => { commit('SET_CATCH', error, { root: true }) })
      .finally(() => {
        if (params.loading) rootState.$getLoading = true
      })
  },
  async update({ commit, state, rootGetters, rootState }, params) {
    if (params.loading) rootState.$getLoading = true
    await rootState.$firebase.fs.collection(collection).orderBy('created_at', 'asc').get()
      .then(docs => {
        const items = []
        docs.forEach(function(doc) {
          // console.log(doc.id, ' => ', doc.data())
          let item = state.default
          item = doc.data()
          item.id = doc.id
          items.push(item)
        })
        commit('SET_ITEMS', items)
      })
      .catch((error) => { commit('SET_CATCH', error, { root: true }) })
      .finally(() => {
        if (params.loading) rootState.$getLoading = true
      })
  },
  async delete({ commit, state, rootGetters, rootState }, params) {
    if (params.loading) rootState.$getLoading = true
    await rootState.$firebase.fs.collection(collection).orderBy('created_at', 'asc').get()
      .then(docs => {
        const items = []
        docs.forEach(function(doc) {
          // console.log(doc.id, ' => ', doc.data())
          let item = state.default
          item = doc.data()
          item.id = doc.id
          items.push(item)
        })
        commit('SET_ITEMS', items)
      })
      .catch((error) => { commit('SET_CATCH', error, { root: true }) })
      .finally(() => {
        if (params.loading) rootState.$getLoading = true
      })
  },
  async remove({ commit, state, rootGetters, rootState }, params) {
    if (params.loading) rootState.$getLoading = true
    await rootState.$firebase.fs.collection(collection).orderBy('created_at', 'asc').get()
      .then(docs => {
        const items = []
        docs.forEach(function(doc) {
          // console.log(doc.id, ' => ', doc.data())
          let item = state.default
          item = doc.data()
          item.id = doc.id
          items.push(item)
        })
        commit('SET_ITEMS', items)
      })
      .catch((error) => { commit('SET_CATCH', error, { root: true }) })
      .finally(() => {
        if (params.loading) rootState.$getLoading = true
      })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
