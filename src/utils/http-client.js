import firebase from '@/api/firebase/index'
import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
// import store from '@/store'
// import { getToken } from './auth'
import getLocalIP from './local-ip'

// create an axios instance
const vnptbkn = axios.create({
  uploadURL: process.env.VUE_APP_BASE_API_UPLOAD,
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
  // headers: {
  //   Authorization: storageAuth.GetToken() || '',
  //   Author: storageAuth.GetUid() || '',
  //   Remember: storageAuth.GetRemember(),
  //   LocalIP: document.getElementById('local-ip').value
  // }
})

// request interceptor
vnptbkn.interceptors.request.use(
  async config => {
    // do something before request is sent

    // if (store.state.auth.token) {
    // let each request carry token
    // ['X-Token'] is a custom headers key
    // please modify it according to the actual situation
    const authToken = await firebase.auth().currentUser.getIdToken(true)
    config.headers['authorization'] = `Bearer ${authToken}`
    config.headers['local-ip'] = await getLocalIP()
    // }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
vnptbkn.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // console.log(res)
    // if the custom code is not 20000, it is judged as an error.
    if (response.status !== 200 && response.status !== 201) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      // if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
      //   // to re-login
      //   MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
      //     confirmButtonText: 'Re-Login',
      //     cancelButtonText: 'Cancel',
      //     type: 'warning'
      //   }).then(() => {
      //     store.dispatch('user/resetToken').then(() => {
      //       location.reload()
      //     })
      //   })
      // }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.response.data.error && error.response.data.error.message ? error.response.data.error.message : error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default vnptbkn
