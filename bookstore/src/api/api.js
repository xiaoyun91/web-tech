import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/json'

const service = axios.create({
  baseURL: 'https://www.googleapis.com/books/v1',
  timeout: 10000
})
const localService = axios.create({
  baseURL: 'http://localhost:5001',
  timeout: 10000
})

service.interceptors.request.use(
  config => {
    // token
    // if (!config.headers.Authorization) {
    //   const token = localStorage.getItem('token')
    //   if (token) {
    //     config.headers.Authorization = `Bearer ${token}`
    //   }
    // }
    return config
  },
  error => {
    Promise.reject(error)
  }
)

localService.interceptors.request.use(
  config => {
    return config
  },
  error => {
    Promise.reject(error)
  }
)

// 拦截器
service.interceptors.response.use(
  response => {
    const { status} = response
    if (status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    let message = error.message
    if (error.response && error.response.data) {
      const errData = error.response.data
      message = errData.msg || '未知错误'
    }
    return Promise.reject(new Error(message))
  }
)
localService.interceptors.response.use(
  response => {
    const { status} = response
    if (status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    let message = error.message
    if (error.response && error.response.data) {
      const errData = error.response.data
      message = errData.msg || '未知错误'
    }
    return Promise.reject(new Error(message))
  }
)
/**
 * get
 * @param {string} url
 * @param {object} params 
 */
export function get(url, params = {}) {
  return service.get(url, {
    params
  })
}
export function localGet(url, params = {}) {
  return localService.get(url, {
    params
  })
}
/**
 * post请求
 * @param {string} url 
 * @param {object} data 
 */
export function post(url, data = {}) {
  return service.post(url, data)
}
export function localPost(url, data = {}) {
  return localService.post(url, data)
}