import qs from 'qs'
import axios from 'axios'
import store from '@/store'
import { MessageBox, Message } from 'element-ui'

// eslint-disable-next-line no-unused-vars
let ajaxTimes = 0

axios.defaults.timeout = 120000
axios.defaults.headers.post['Content-Type'] = 'application/json'

// http request 拦截器
axios.interceptors.request.use(
  (config) => {
    if (store.state.user.token) {
      config.headers['Authorization'] = store.state.user.token
    }
    ajaxTimes++
    return config
  },
  (error) => {
    ajaxTimes--
    return Promise.reject(error)
  }
)

// http response 拦截器
axios.interceptors.response.use(
  (response) => {
    response = response.data
    ajaxTimes--
    if (response.code !== 1000) {
      if (response.code !== 7005) {
        Message({
          message: response.msg || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
      }
      if (response.code === 4001) {
        // to re-login
        MessageBox.confirm('您已被注销，您可以取消留在此页面，或再次登录', '确认退出登录', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(response)
    } else {
      return response
    }
  },
  (error) => {
    ajaxTimes--
    return Promise.reject(error)
  }
)
// get请求数据
export function get (url, params = {}) {
  const baseInfo = {
    sign: 'MOJrmc4hO6gB387l'
  }
  const resultInfo = Object.assign(baseInfo, params)
  const resultUrl = url + '?' + qs.stringify(resultInfo)
  return new Promise((resolve, reject) => {
    axios
      .get(resultUrl)
      .then((response) => {
        resolve(response)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
// post 请求数据
export function post (url, data = {}) {
  const baseInfo = {
    sign: 'MOJrmc4hO6gB387l'
  }
  const resultInfo = Object.assign(baseInfo, data)
  return new Promise((resolve, reject) => {
    axios.post(url, resultInfo).then(
      (response) => {
        resolve(response)
      },
      (err) => {
        reject(err)
      }
    )
      .catch((err) => {
        reject(err)
      })
  })
}
// upload 上传文件方法
export function upload (url, data = {}) {
  const baseInfo = {
    sign: 'MOJrmc4hO6gB387l'
  }
  const resultInfo = Object.assign(baseInfo, data)
  const formData = new FormData()
  for (const k in resultInfo) {
    formData.append(k, resultInfo[k])
  }
  const config = {
    headers: {
      // 添加请求头
      'Content-Type': 'multipart/form-data'
    }
  }
  return new Promise((resolve, reject) => {
    axios.post(url, formData, config).then(
      (response) => {
        resolve(response)
      },
      (err) => {
        reject(err)
      }
    )
  })
}
