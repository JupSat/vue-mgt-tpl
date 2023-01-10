import request from '@/utils/http/request'
import { ElMessage } from 'element-plus'
export const rGet = (url, data) => {
  return request({
    method: 'get',
    url,
    data
  })
}

export const rPost = (url, data) => {
  return request({
    method: 'post',
    url,
    data
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

export const rDelete = (url, data) => {
  return request({
    method: 'delete',
    url,
    data
  })
}

export const rPostByParams = (url, params) => {
  return request({
    method: 'post',
    url,
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
      ElMessage({
        message: '文件不存在！',
        type: 'error',
        duration: 2 * 1000
      })
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
