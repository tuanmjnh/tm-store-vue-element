import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
const collection = 'users'
const state = {
  uid: '',
  user: {},
  roles: [],
  token: getToken()
}

const mutations = {
  SET_UID: (state, uid) => {
    state.uid = uid
    // setToken(uid)
  },
  SET_TOKEN: (state, token) => {
    state.token = token
    setToken(token)
  },
  SET_USER: (state, user) => {
    state.user = user
  }
}

const actions = {
  async login({ commit, state, dispatch, rootGetters, rootState }, params) {
    if (params && params.loading) rootState.$getLoading = true
    await rootState.$firebase.auth.signInWithEmailAndPassword(params.username, params.password)
      .then(doc => {
        commit('SET_UID', doc.user.uid)
        commit('SET_TOKEN', doc.user.refreshToken)
        // dispatch('getUser', { uid: doc.user.uid })
        // console.log(doc.user.uid)
      })
      .catch((err) => {
        console.log(err)
        if (err.code === 'auth/invalid-email') err.message = 'login.auth_invalid_email'
        else if (err.code === 'auth/user-not-found') err.message = 'login.auth_user_not_found'
        else if (err.code === 'auth/wrong-password') err.message = 'login.auth_wrong_password'
        else if (err.code === 'auth/too-many-requests') err.message = 'login.auth_too_many_requests'
        commit('MESSAGE_ERROR', err, { root: true })
      })
      .finally(() => { if (params && params.loading) rootState.$getLoading = false })
  },
  async getUser({ commit, state, rootGetters, rootState }, params) {
    return new Promise((resolve, reject) => {
      if (params && params.loading) rootState.$getLoading = true
      rootState.$firebase.fs.collection(collection).doc(state.uid).get()
        .then(doc => {
          if (doc.exists) {
            commit('SET_USER', doc.data())
            console.log(doc.data())
            resolve(doc.data())
          }
        })
        .catch((err) => {
          console.log(err)
          commit('MESSAGE_ERROR', err, { root: true })
          reject(err)
        })
        .finally(() => { if (params && params.loading) rootState.$getLoading = false })
    })
  },
  async logout({ commit, state, rootGetters, rootState }, params) {
    if (params && params.loading) rootState.$getLoading = true
    await rootState.$firebase.auth.signOut()
      .then(() => {
        commit('SET_TOKEN', '')
        removeToken()
        resetRouter()
      })
      .catch((err) => {
        console.log(err)
        // if (err.code === 'auth/invalid-email') err.message = 'login.auth_invalid_email'
        // else if (err.code === 'auth/user-not-found') err.message = 'login.auth_user_not_found'
        // else if (err.code === 'auth/wrong-password') err.message = 'login.auth_wrong_password'
        // else if (err.code === 'auth/too-many-requests') err.message = 'login.auth_too_many_requests'
        // commit('MESSAGE_ERROR', err, { root: true })
      })
      .finally(() => { if (params && params.loading) rootState.$getLoading = false })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
