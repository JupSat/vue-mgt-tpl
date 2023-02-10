/*
 * @Description: 接口基础请求方法
 * @version:
 * @Author: JupSat
 * @email: jupsat@163.com
 * @Date: 2023-01-10 19:49:10
 * @LastEditors: JupSat
 * @LastEditTime: 2023-02-09 16:03:02
 */
import request from '@/utils/http/request'
import { message } from '@/utils/message'

export const rGet = (url, data = {}, params = {}) => {
  return request({
    method: 'get',
    url,
    data,
    params
  })
}

export const rPost = (url, data = {}, params = {}) => {
  return request({
    method: 'post',
    url,
    data,
    params
  })
}

export const rGetBlob = (url, data) => {
  return request({
    method: 'get',
    url,
    responseType: 'blob',
    data
  })
}

export const rPut = (url, data) => {
  return request({
    method: 'put',
    url,
    data
  })
}

export const rDelete = (url, data = {}, params = {}) => {
  return request({
    method: 'delete',
    url,
    data,
    params
  })
}

export const rDownloadFile = (url, data, filename, method = 'get') => {
  const reqParams = {
    method,
    url,
    responseType: 'blob',
    timeout: 5 * 60 * 1000
  }
  method === 'get' ? (reqParams.params = data) : (reqParams.data = data)
  return request(reqParams).then((res) => {
    if (!res) {
      message('文件不存在！', 'error')
      return
    }
    const blob = new Blob([res.data], { type: res.type })
    const href = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.style.display = 'none'
    link.setAttribute('download', filename)
    link.href = href
    link.click()
    document.body.removeChild(link)
  })
}
