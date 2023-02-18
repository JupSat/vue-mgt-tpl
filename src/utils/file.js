import request from '@/utils/http/request'
import { message } from '@/utils/message'

/**
 * 数据导出
 * @param {*} url
 * @param {*} data
 * @param {*} filename
 * @param {*} method
 * @returns
 */
export const downloadFile = (url, data, filename, method = 'get') => {
  const reqParams = {
    method,
    url,
    responseType: 'blob',
    timeout: 5 * 60 * 1000
  }
  method === 'get' ? (reqParams.params = data) : (reqParams.data = data)
  return request(reqParams).then((res) => {
    if (!res) {
      message('导出失败！', 'error')
      return
    }
    const blob = new Blob([res.data], { type: res.headers['content-type'] })
    const href = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.style.display = 'none'
    link.setAttribute('download', filename)
    link.href = href
    link.click()
    window.URL.revokeObjectURL(href)
  })
}
