import axios from 'axios'
import store from '../store'
import router from '../router'
import common from '../assets/js/common.js'

axios.defaults.timeout = 180000
axios.defaults.baseURL = '/demo-weekly/back-end/api' // 接口域名
export const baseURL = axios.defaults.baseURL

axios.interceptors.request.use((config) => {
  if (config.method == 'post') {
    config.headers['Content-Type'] = 'application/json'
    config.headers['token'] = store.state.userInfo.token
    config.data = JSON.stringify(config.data)
    return config
  }
}, (error) => {
  let str = error
  return common.toast(str, 'error', false)
})

axios.interceptors.response.use(response => {
  let code = response.data.code
  if (code && typeof (code) !== 'undefined') {
    if (code == 20) {
      router.replace({
        path: '/'
      })
    } else if (code !== -2 && code !== 1) {
      common.toast(response.data.message, 'error', false)
    }
  }
  return response
}, err => {
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.message = '错误请求'
        common.toast(err.message, 'error', false)
        break
      case 403:
        err.message = '拒绝访问'
        common.toast(err.message, 'error', false)
        break
      case 404:
        err.message = '请求错误,未找到该资源'
        common.toast(err.message, 'error', false)
        break
      case 405:
        err.message = '请求方法未允许'
        common.toast(err.message, 'error', false)
        break
      case 408:
        err.message = '请求超时'
        common.toast(err.message, 'error', false)
        break
      case 502:
        err.message = '网络错误'
        common.toast(err.message, 'error', false)
        break
      case 504:
        err.message = '网络超时'
        common.toast(err.message, 'error', false)
        break
      default:
        err.message = '连接错误'
        common.toast(err.message, 'error', false)
    }
  } else {
    err.message = '连接到服务器失败'
    common.toast(err.message, 'error', false)
  }
  return Promise.resolve(err.response)
})

export function http (url, params, responseType) {
  return new Promise((resolve, reject) => {
    let userId = store.state.userInfo.id
    if (userId && userId > 0) {
      params.userId = parseInt(userId)
    } else {
      params.userId = 0
    }

    if (!responseType || typeof (responseType) == 'undefined') {
      // 普通post请求
      axios.post(url, params)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
    } else {
      // 导出下载文件
      axios.post(url, params, {
        responseType: responseType
      })
      .then(response => {
        resolve(response)
      }, err => {
        reject(err)
      })
    }
  })
}
