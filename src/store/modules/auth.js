import { getToken, setToken, removeToken } from '@/utils/auth'
const collection = 'users'
const state = {
  uid: '',
  user: {},
  roles: ['admin']
}

const mutations = {
  SET_UID: (state, uid) => {
    state.uid = uid
    setToken(uid)
  },
  SET_USER: (state, user) => {
    state.user = user
  }
}

const actions = {
  async login({ commit, dispatch, rootGetters, rootState }, params) {
    if (params.loading) rootState.$getLoading = true
    await rootState.$firebase.auth.signInWithEmailAndPassword(params.username, params.password)
      .then(doc => {
        commit('SET_UID', doc.user.uid)
        // dispatch('getUser', { uid: doc.user.uid })
        console.log(doc.user.uid)
      })
      .catch((err) => {
        console.log(err)
        if (err.code === 'auth/invalid-email') err.message = 'login.auth_invalid_email'
        else if (err.code === 'auth/user-not-found') err.message = 'login.auth_user_not_found'
        else if (err.code === 'auth/wrong-password') err.message = 'login.auth_wrong_password'
        else if (err.code === 'auth/too-many-requests') err.message = 'login.auth_too_many_requests'
        commit('MESSAGE_ERROR', err, { root: true })
      })
      .finally(() => { if (params.loading) rootState.$getLoading = false })
  },
  async getUser({ commit, rootGetters, rootState }, params) {
    if (params.loading) rootState.$getLoading = true
    await rootState.$firebase.fs.collection(collection).doc(params.uid).get()
      .then(doc => {
        // console.log(doc)
        if (doc.exists) {
          commit('SET_USER', doc)
        }
      })
      .catch((err) => {
        console.log(err)
        commit('MESSAGE_ERROR', err, { root: true })
      })
      .finally(() => { if (params.loading) rootState.$getLoading = false })
  },
  async logout({ commit, state, rootGetters, rootState }, params) {
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
