// import variables from '@/styles/element-variables.scss'
// import defaultSettings from '@/settings'
// collection
const collection = 'settings'
// const { showSettings, tagsView, fixedHeader, sidebarLogo } = defaultSettings

const state = {
  user_setting: {},
  default_user_setting: {
    show_settings: true,
    layout: {
      tags_view: true,
      fixed_header: true,
      sidebar_logo: true,
      theme: '#1890ff'
    }
  }
  // showSettings: showSettings,
  // theme: variables.theme,
  // tagsView: tagsView,
  // fixedHeader: fixedHeader,
  // sidebarLogo: sidebarLogo
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  },
  CHANGE_USER_SETTING: (state, data) => {
    state.user_setting = data
  },
  SET_USER_SETTING(state, data) {
    state.user_setting = data ? { ...state.default_user_setting, ...data } : { ...state.default_user_setting }
    console.log(state.user_setting)
  }
}

const actions = {
  changeSetting({ commit, rootState }, data) {
    commit('CHANGE_SETTING', data)
  },
  changeUserSetting({ commit, state, rootState }, data) {
    // if (data.theme) {
    //   state.user_setting.layout.theme = data.theme
    // }
    const userSeting = rootState.$firebase.fs.collection(collection).doc(rootState.auth.uid)
    userSeting.set(state.user_setting, { merge: true }).then(function() {
      console.log('Document successfully written!')
    }).catch(function(error) {
      console.error('Error writing document: ', error)
    })
  },
  async select({ commit, rootState }, params) {
    // state.default_user_setting.user_id = rootState.user.id
    if (params && params.loading) rootState.$appLoading = true
    commit('SET_USER_SETTING')
    await rootState.$firebase.fs
      .collection(collection)
      // .where('user_id', '==', rootState.user.id)
      .doc(rootState.auth.uid)
      .get()
      .then(doc => {
        if (doc.exists) {
          commit('SET_USER_SETTING', doc.data())
        } // else {
        //   commit('SET_USER_SETTING')
        // }
      }).catch((err) => {
        commit('MESSAGE_ERROR', err, { root: true })
      })
      .finally(() => {
        if (params && params.loading) rootState.$appLoading = false
      })
    // state.user_setting.user_id = rootState.user.id
    // console.log(state.user_setting)
    // console.log(rootState.user.id)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
