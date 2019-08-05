import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css
import moment from 'moment' // momentjs

import App from './App'
import store from './store'
import router from './router'
// firebase
import firebase from '@/api/firebase/index'
// internationalization
import i18n from './lang'
import './icons' // icon
import './utils/error-log' // error log
import * as directives from './directive' // global directive
import * as filters from './filters' // global filters
import './permission'
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
// import { mockXHR } from '../mock'
// if (process.env.NODE_ENV === 'production') {
//   mockXHR()
// }

// var os = require('os')

// var interfaces = os.networkInterfaces()
// var addresses = []
// for (var k in interfaces) {
//   for (var k2 in interfaces[k]) {
//     var address = interfaces[k][k2]
//     if (address.family === 'IPv4' && !address.internal) {
//       addresses.push(address.address)
//     }
//   }
// }
// console.log(interfaces)

//
Vue.prototype.$moment = moment

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

// register global utility directive
Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key])
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

let app
firebase.auth().onAuthStateChanged(async (user) => {
  await store.dispatch('roles/select')
  if (!app) {
    if (user) {
      await store.commit('auth/SET_AUTH', user)
      await store.dispatch('auth/getUser', { uid: user.uid })
      // const tokenid = await user.getIdToken()
      // console.log(user)
      // console.log(tokenid)
      // console.log(tokenid)
      // console.log(token)
      // console.log(user.uid)
      // console.log(user.currentUser)
    }
    app = new Vue({
      el: '#app',
      router,
      store,
      i18n,
      render: h => h(App)
    })
  }
})
