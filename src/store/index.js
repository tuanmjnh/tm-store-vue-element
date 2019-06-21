import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
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
  state: {
    $appLoading: true,
    $getLoading: false,
    $commitLoading: false,
    $message: Message,
    $firebase: {
      auth: auth,
      fs: firestore
    }
  }
})

export default store
