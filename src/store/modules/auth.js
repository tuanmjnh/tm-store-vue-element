import firebase from '@/api/firebase/index'
import { getToken, setToken, removeToken, getUserSetting, setUserSetting, removeUserSetting } from '@/utils/auth'
import message from '@/utils/message'
import { pushIfNotExist } from '@/utils'
import router, { resetRouter } from '@/router'
const collection = 'users'

const state = {
  user: {},
  roles: [],
  routes: [],
  setting: {
    cookie: true,
    show: true,
    tags_view: true,
    fixed_header: true,
    sidebar_logo: true,
    theme: '#1890ff',
    language: 'vi'
  },
  token: getToken(),
  guest: 'guest'
}

const mutations = {
  SET_AUTH: (state, user) => {
    if (user) {
      state.user = {
        uid: user.uid,
        email: user.email,
        emailVerified: user.emailVerified,
        phoneNumber: user.phoneNumber,
        displayName: user.displayName,
        photoURL: user.photoURL,
        disabled: user.disabled,
        metadata: user.metadata,
        providerData: user.providerData,
        refreshToken: user.refreshToken
        // roles: ['admin']
      }
    } else state.user = {}
  },
  SET_ROLES: (state, roles) => {
    if (roles) {
      if (state.user.roles === state.guest) {
        state.user.roles = roles.filter(x => x.key === state.user.roles).map(x => x.id)
      }
      if (state.user && state.user.roles && state.user.roles.length > 0) {
        state.routes = []
        state.roles = roles.filter(x => {
          if (state.user.roles.includes(x.id)) {
            pushIfNotExist(state.routes, x.routes)
            return x
          }
        })
      }
    } else {
      state.routes = []
      state.roles = []
    }
    // console.log(state.roles)
    // console.log(state.routes)
  },
  SET_TOKEN: (state, token) => {
    if (token) {
      state.token = token
      setToken(token)
    } else {
      state.token = ''
      removeToken()
      resetRouter()
    }
  },
  SET_USER: (state, user) => {
    state.user = { ...state.user, ...user }
    if (!state.user.setting) state.user.setting = { ...state.setting }
    if (state.user.setting.cookie) {
      state.user.setting = { ...state.user.setting, ...getUserSetting() }
    } else {
      state.user.setting = { ...state.user.setting, ...user.setting }
    }
    // console.log(state.user)
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
      firebase.auth().signInWithEmailAndPassword(params.username, params.password)
        .then(doc => {
          commit('SET_AUTH', doc.user)
          doc.user.getIdToken().then((token) => {
            commit('SET_TOKEN', token)
          })
          // commit('SET_TOKEN', doc.user.refreshToken)
          // dispatch('getUser', { uid: doc.user.uid })
          // console.log(doc.user.uid)
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
  loginProvider({ commit, rootState }, params) {
    return new Promise((resolve, reject) => {
      if (params && params.loading) rootState.$getLoading = true
      firebase.auth().signInWithPopup(params.provider).then(result => {
        commit('SET_TOKEN', result.credential.accessToken)
        commit('SET_AUTH', result.user)
        resolve(result)
        // guest
      }).catch((err) => {
        console.log(err)
        if (err.code === 'auth/invalid-email') err.message = 'login.auth_invalid_email'
        else if (err.code === 'auth/user-not-found') err.message = 'login.auth_user_not_found'
        else if (err.code === 'auth/wrong-password') err.message = 'login.auth_wrong_password'
        else if (err.code === 'auth/too-many-requests') err.message = 'login.auth_too_many_requests'
        else err.message = 'login.network_request_failed'
        message.error(err)
        reject(err)
      }).finally(() => { if (params && params.loading) rootState.$getLoading = false })
    })
  },
  getUser({ commit, rootState }, params) {
    return new Promise((resolve, reject) => {
      if (params && params.loading) rootState.$getLoading = true
      firebase.firestore().collection(collection).doc(params.uid).get()
        .then(doc => {
          if (doc.exists) {
            commit('SET_USER', doc.data())
            commit('SET_ROLES', rootState.roles.items)
            // console.log(doc.data())
            resolve(doc.data())
          } else {
            commit('SET_USER', { roles: state.guest })
            commit('SET_ROLES', rootState.roles.items)
            resolve(state.guest)
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
      firebase.auth().signOut()
        .then(() => {
          commit('SET_AUTH')
          commit('SET_ROLES')
          commit('SET_TOKEN')
          commit('permission/SET_ADD_ROUTES', true, { root: true })
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
        firebase.firestore().collection(collection).doc(state.uid)
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
