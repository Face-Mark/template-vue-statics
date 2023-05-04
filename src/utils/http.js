import qs from 'qs'
import axios from 'axios'

// eslint-disable-next-line no-unused-vars
axios.defaults.timeout = 60000
axios.defaults.headers.post['Content-Type'] = 'application/json'

// http response 拦截器
axios.interceptors.response.use(
  (response) => {
    response = response.data
    if (response.code !== 1000) {
      return Promise.reject(response)
    } else {
      return response
    }
  },
  (error) => {
    return Promise.reject(error)
  }
)
// get请求数据
export function get (url, params = {}) {
  const baseInfo = {
    // sign: 'MOJrmc4hO6gB387l'
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
    // sign: 'MOJrmc4hO6gB387l'
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
    // sign: 'MOJrmc4hO6gB387l'
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
