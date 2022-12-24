import axios from 'axios'
import Qs from 'qs'

// 创建axios实例
const service = axios.create({
  timeout: 10000
})

// 请求头信息
service.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    removePendingRequest(config)
    addPendingRequest(config)
    // console.log('req', config)
    config.headers = {
      'Content-Type': 'application/json',
      ...config.headers
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (res) => {
    removePendingRequest(res.config)
    return res.data
  },
  (error) => {
    removePendingRequest(error.config || {})
    return Promise.reject(error)
  }
)

// CancelToken 防止重复请求（防抖）
// 创建pendingRequest
const pendingRequest = new Map()
// 创建请求键值
function createRequestKey(config) {
  const { method, url, params, data } = config
  return [method, url, Qs.stringify(params), Qs.stringify(data)].join('&')
}

// 把当前请求添加到pendingRequest对象中
function addPendingRequest(config) {
  const requestKey = createRequestKey(config)
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel) => {
      if (!pendingRequest.has(requestKey)) {
        pendingRequest.set(requestKey, cancel)
      }
    })
}

// 检查是否存在重复请求，若存在则取消已发的请求
function removePendingRequest(config) {
  const requestKey = createRequestKey(config)
  if (pendingRequest.has(requestKey)) {
    const cancel = pendingRequest.get(requestKey)
    cancel(requestKey)
    pendingRequest.delete(requestKey)
  }
}

export default service
