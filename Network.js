import { AsyncStorage, Platform } from 'react-native'
import axios from 'axios'

class Network {
  static getFullURL (route = '') {
    if (route.indexOf('http') > -1) {
      return route
    }
    return `https://www.test.w.keytradebank.be/node/backend/release-react-native${route}`
  }

  static async basicHeaders () {
    const headers = {}

    headers['accept'] = 'application/vnd.keytrade.rn_poc.v1+json'
    headers['content-type'] = 'application/json'

    // TODO: Check if ios header is correct
    headers['X-REMOTEAPP-NAME'] = Platform.OS === 'ios' ? 'IOS-PHONE' : 'ANDROID-PHONE'
    headers['User-Argent'] = 'be.keytradebank.kbapp/0.1'

    const token = await AsyncStorage.getItem('ACCESS_TOKEN')
    if (token && token !== 'undefined') {
      headers['x-authentication'] = token
    }
    return headers
  }

  static async errorHandler (error) {
    if (error.response) {
      throw {
        error: true,
        errors: error.response.data.errors
      }
    } else if (error.request) {
      // The request was made but no response was received
      throw {
        error: true,
        errors: [{ code: '0', status: 500, title: 'Unknown error', meta: error.request }]
      }
    } else {
      // Something happened in setting up the request that triggered an Error
      throw {
        error: true,
        errors: [{ code: '0', status: 500, title: 'Unknown error', meta: error.message }]
      }
    }
  }

  static async get (route) {
    try {
      const headers = await this.basicHeaders()
      const result = await axios.get(this.getFullURL(route), { headers })
      return result.data
    } catch (err) {
      this.errorHandler(err)
    }
  }

  static async put (route, body = {}) {
    try {
      const headers = await this.basicHeaders()
      const result = await axios.put(this.getFullURL(route), body, { headers })
      return result.data
    } catch (err) {
      this.errorHandler(err)
    }
  }

  static async post (route, body = {}) {
    try {
      const headers = await this.basicHeaders()
      const result = await axios.post(this.getFullURL(route), body, { headers })
      return result.data
    } catch (err) {
      this.errorHandler(err)
    }
  }

  static async delete (route) {
    try {
      const headers = await this.basicHeaders()
      const result = await axios.delete(this.getFullURL(route), { headers })
      return result.data || true
    } catch (err) {
      this.errorHandler(err)
    }
  }
}

export default Network
