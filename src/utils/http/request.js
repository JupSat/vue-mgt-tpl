/*
 * @Description: 请求服务创建、请求及响应拦截
 * @version:
 * @Author: JupSat
 * @email: jupsat@163.com
 * @Date: 2023-01-10 19:48:03
 * @LastEditors: JupSat
 * @LastEditTime: 2023-02-09 17:47:00
 */
import axios from 'axios'
import router from '@/router'
import Qs from 'qs'
import { getToken, clearToken } from '@/utils/token'
import { message } from '@/utils/message'

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
      ...config.headers,
      token: getToken() || ''
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
    const { status, data } = res
    if (status === 200) {
      if (!data) {
        clearToken()
        message('登录过期，请重新登录！', 'error')
        router.replace('/')
        return null
      }
      return res.data
    }
  },
  (error) => {
    removePendingRequest(error.config || {})
    if (error.response.status === 401) {
      message('请先登录', 'error')
      router.replace('/')
    } else if (error.response.status === 403) {
      message('没有权限!', 'error')
      router.push({ path: '/noAuth' })
    } else if (error.response.status === 404) {
      message('未找到！', 'error')
    } else if (error.response.status === 504) {
      message('网关超时！', 'error')
    } else {
      message('未知错误！', 'error')
    }
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
