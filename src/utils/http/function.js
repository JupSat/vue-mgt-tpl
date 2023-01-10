import request from '@/utils/http/request'

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
