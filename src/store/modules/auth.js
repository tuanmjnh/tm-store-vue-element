import { auth, firestore } from '@/api/firebase/index'
import { getToken, setToken, removeToken, getUserSetting, setUserSetting, removeUserSetting } from '@/utils/auth'
import message from '@/utils/message'
import router, { resetRouter } from '@/router'
const collection = firestore.collection('users')
const state = {
  uid: '',
  profile: {},
  roles: [],
  setting: {
    cookie: true,
    show: true,
    tags_view: true,
    fixed_header: true,
    sidebar_logo: true,
    theme: '#1890ff',
    language: 'vi'
  },
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
    state.profile = user.profile
    state.roles = user.roles
    if (user.setting.cookie) {
      state.setting = { ...state.setting, ...user.setting }
    } else {
      state.setting = { ...state.setting, ...getUserSetting() }
    }
    // console.log(getUserSetting())
  },
  CHANGE_SETTING(state, item) {
    state.setting[item.key] = item.value
  }
}

const actions = {
  login({ commit, rootState }, params) {
    return new Promise((resolve, reject) => {
      if (params && params.loading) rootState.$getLoading = true
      auth.signInWithEmailAndPassword(params.username, params.password)
        .then(doc => {
          commit('SET_UID', doc.user.uid)
          doc.user.getIdToken().then((token) => {
            commit('SET_TOKEN', token)
          })
          // commit('SET_TOKEN', doc.user.refreshToken)
          // dispatch('getUser', { uid: doc.user.uid })
          console.log(doc.user.uid)
          resolve(doc)
        })
        .catch((err) => {
          console.log(err)
          if (err.code === 'auth/invalid-email') err.message = 'login.auth_invalid_email'
          else if (err.code === 'auth/user-not-found') err.message = 'login.auth_user_not_found'
          else if (err.code === 'auth/wrong-password') err.message = 'login.auth_wrong_password'
          else if (err.code === 'auth/too-many-requests') err.message = 'login.auth_too_many_requests'
          else err.message = 'login.network_request_failed'
          message.error(err)
          reject(err)
        })
        .finally(() => { if (params && params.loading) rootState.$getLoading = false })
    })
  },
  getUser({ commit, rootState }, params) {
    return new Promise((resolve, reject) => {
      if (params && params.loading) rootState.$getLoading = true
      collection.doc(params.uid).get()
        .then(doc => {
          if (doc.exists) {
            commit('SET_USER', doc.data())
            // console.log(doc.data())
            resolve(doc.data())
          }
        })
        .catch((err) => {
          console.log(err)
          message.error(err)
          reject(err)
        })
        .finally(() => { if (params && params.loading) rootState.$getLoading = false })
    })
  },
  setUserID({ commit }, params) {
    return new Promise((resolve, reject) => {
      commit('SET_UID', params.uid)
      resolve(true)
    })
  },
  logout({ commit, rootState }, params) {
    return new Promise((resolve, reject) => {
      if (params && params.loading) rootState.$getLoading = true
      auth.signOut()
        .then(() => {
          commit('SET_TOKEN', '')
          removeToken()
          resetRouter()
          resolve(true)
        })
        .catch((err) => {
          console.log(err)
          // if (err.code === 'auth/invalid-email') err.message = 'login.auth_invalid_email'
          // else if (err.code === 'auth/user-not-found') err.message = 'login.auth_user_not_found'
          // else if (err.code === 'auth/wrong-password') err.message = 'login.auth_wrong_password'
          // else if (err.code === 'auth/too-many-requests') err.message = 'login.auth_too_many_requests'
          // commit('MESSAGE_ERROR', err, { root: true })
          message.error(err)
          reject(err)
        })
        .finally(() => { if (params && params.loading) rootState.$getLoading = false })
    })
  },
  changeSetting({ commit, state, rootState }, params) {
    return new Promise((resolve, reject) => {
      if (state.setting.cookie) {
        commit('CHANGE_SETTING', params)
        setUserSetting(state.setting)
      } else {
        const data = {}
        data[`setting.${params.key}`] = params.value
        if (params && params.loading) rootState.$commitLoading = true
        collection.doc(state.uid)
          .update(data)
          .then((doc) => {
            commit('CHANGE_SETTING', params)
            resolve(true)
          })
          .catch((err) => {
            console.log(err)
            message.error(err)
            reject(err)
          })
          .finally(() => { if (params && params.loading) rootState.$commitLoading = false })
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
