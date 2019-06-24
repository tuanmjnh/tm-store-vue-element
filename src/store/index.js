import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
// i18n lang
import i18n from '@/lang'
// Message
import { Message } from 'element-ui'
// firebase
import { auth, firestore } from '@/vendor/firebaseInit'
Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const store = new Vuex.Store({
  modules,
  getters,
  mutations: {
    MESSAGE: (state, item) => {
      Message({ message: i18n.t(item.message), type: item.type || null, showClose: item.showClose || true })
    },
    MESSAGE_SUCCESS: (state, item) => {
      Message({ message: i18n.t(item.message), type: 'success', showClose: item.showClose || true })
    },
    MESSAGE_WARNING: (state, item) => {
      Message({ message: i18n.t(item.message), type: 'warning', showClose: item.showClose || true })
    },
    MESSAGE_ERROR: (state, item) => {
      Message({ message: i18n.t(item.message), type: 'error', showClose: item.showClose || true })
    }
  },
  state: {
    $appLoading: true,
    $getLoading: false,
    $commitLoading: false,
    // $message: Message,
    $firebase: {
      auth: auth,
      fs: firestore
    }
  }
})

export default store
