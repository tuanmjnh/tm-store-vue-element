import variables from '@/styles/element-variables.scss'
import defaultSettings from '@/settings'
// collection
const collection = 'settings'
const { showSettings, tagsView, fixedHeader, sidebarLogo } = defaultSettings

const state = {
  user_seting: {},
  default_user_seting: {
    show_settings: true,
    layout: {
      tags_view: true,
      fixed_header: true,
      sidebar_logo: true,
      theme: '#1890ff'
    }
  },
  showSettings: showSettings,
  theme: variables.theme,
  tagsView: tagsView,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  },
  CHANGE_USER_SETTING: (state, data) => {
    state.user_seting = data
  },
  SET_USER_SETTING(state, data) {
    state.user_seting = data ? { ...state.default_user_seting, ...data } : { ...state.default_user_seting }
  }
}

const actions = {
  changeSetting({ commit, rootState }, data) {
    commit('CHANGE_SETTING', data)
  },
  changeUserSetting({ commit, state, rootState }, data) {
    // const _data = {
    //   user_id: rootState.user.id
    //   // layout: stri
    // }
    // rootState.firestore.collection(collection).add(data)
    // state.user_seting.filter((x) => { return x.user_id === rootState.user.id })
    // if (state.user_seting.user_id === rootState.user.id) {
    //   console.log(state.user_seting)
    // } else {
    //   rootState.firestore.collection(collection).add(_data)
    //   console.log(state.user_seting)
    // }
    if (data.theme) {
      state.user_seting.layout.theme = data.theme
    }
    const userSeting = rootState.firebase.fs.collection(collection).doc(rootState.user.id)
    userSeting.set(state.user_seting, { merge: true }).then(function() {
      console.log('Document successfully written!')
    }).catch(function(error) {
      console.error('Error writing document: ', error)
    })
  },
  async select({ commit, state, rootState }) {
    // state.default_user_seting.user_id = rootState.user.id
    commit('SET_USER_SETTING')
    await rootState.firebase.fs
      .collection(collection)
      // .where('user_id', '==', rootState.user.id)
      .doc(rootState.user.id)
      .get()
      .then(doc => {
        if (doc.exists) {
          commit('SET_USER_SETTING', doc.data())
        } // else {
        //   commit('SET_USER_SETTING')
        // }
      })
    // state.user_seting.user_id = rootState.user.id
    // console.log(state.user_seting)
    // console.log(rootState.user.id)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
