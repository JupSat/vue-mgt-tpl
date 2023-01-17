/*
 * @Description: 请求服务创建、请求及响应拦截
 * @version:
 * @Author: JupSat
 * @email: jupsat@163.com
 * @Date: 2023-01-10 19:48:03
 * @LastEditors: JupSat
 * @LastEditTime: 2023-01-17 10:47:54
 */
import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '@/router'
import Qs from 'qs'
import { getToken } from '@/utils/token'

const message = (message) => {
  ElMessage.closeAll()
  ElMessage({
    message,
    type: 'error',
    duration: 3 * 1000
  })
}

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
    if (res.status === 200) {
      return res.data
    }
  },
  (error) => {
    removePendingRequest(error.config || {})
    if (error.response.status === 401) {
      message.error({ message: '请先登录' })
      router.replace('/')
    } else if (error.response.status === 403) {
      message.error({ message: '没有权限!' })
      router.push({ path: '/noAuth' })
    } else if (error.response.status === 404) {
      message.error('未找到！')
    } else if (error.response.status === 504) {
      message.error('网关超时！')
    } else {
      message.error({ message: '未知错误' })
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
