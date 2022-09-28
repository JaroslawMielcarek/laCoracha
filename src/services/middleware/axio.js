import axios from 'axios'
import authHeader from '../auth/auth-header'
import store from '../../store/index'
import router from '../../router/index'
import { setNotification } from '../util/universal'

const API_URL = 'https://lacoracha-backend.azurewebsites.net/api/' 

export default function axio (url, data, headers = undefined) {
  return axios
    .post(API_URL + url, data, { headers: headers || authHeader() })
    .then(response => {
      // console.log('response', response.message, response.data)
      if (response.message) return response.message
      return response.data
    })
}

axios.interceptors.response.use(response => {
    // Not logged in or session expired
    if (response.data.code === '401') {
      console.log('data.code 401')
      // Redirect to login page
      store.dispatch('logout')
      router.replace({
        path: '/login',
        query: { redirect: router.currentRoute.fullPath }
      })
    }
    return response
  }, async error => {
    if (error.response && error.response.status === 403) {
      // Redirect to login page
      console.log('error code 403')
      store.dispatch('logout')
      router.replace({
        path: '/login',
        query: { redirect: router.currentRoute.fullPath }
      })
      // return Promise.reject(error)
      // console.log('token expired', error.response)
    }
    if (error.response && error.response.status === 429){
      console.log('error code 429')
      setNotification(
        {
          name: 'request error',
          text: 'You made too many requests, please wait a bit!',
          typeOfNotification: 'danger'
        }
      )
      return Promise.reject('Too many wrong attemps!')
    }
    console.log('error interceptor', error)
    return Promise.reject(error)
  })
