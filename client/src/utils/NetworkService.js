import axios from 'axios'
import {
  UNAUTH_USER
} from '../actions/types'
import Auth from './Auth';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default {
  setInterceptors: store => {
    // Add a request interceptor
    axios.interceptors.request.use(function(config) {
      console.log(`REQUEST[${config.method.toUpperCase()}] ->`, config.url, config)
      let token = Auth.getToken()
      if (token) {
        // Add auth token before request is sent
        config.headers = Object.assign({}, config.headers, {
          'x-auth':token
        })

      }
      return config
    })

    // Add a response interceptor
    axios.interceptors.response.use(function(response) {
      console.log(`<- RESPONSE[${response.status}]`, response.config.url, response)
      return response
    }, function(error) {
      console.error(`<- RESPONSE[${error.response ? error.response.status : 'UNKNOWN'}]`, error.config ? error.config.url : 'no url', error.response)
      // catches if the session ended!
      if (error.response && (error.response.data.message === 'Token has expired')) {
        localStorage.clear()
        store.dispatch({
          type: UNAUTH_USER
        })
      }
      return Promise.reject(error)
    })
  },

  setBaseUrl: base => {
    axios.defaults.baseURL = base
  }
}
