import request from '@/utils/http/request'

export const prefix = '/api'
export const getPrefixUrl = (url) => `${prefix}${url}`
export const apiCodeMap = {
  SUCCESS: 0,
  Failed: 1
}
export function getWellListApi() {
  return request({
    url: getPrefixUrl('/well/find'),
    method: 'post'
  }).then(({ data }) => {
    if (data?.length) {
      const formatData = data.map((item) => {
        const { wellId, nodeInfoList } = item
        const initNodeList = new Array(100).fill(1).map((_, index) => {
          return {
            nodeName: '',
            nodeId: '',
            nodeNum: index + 1,
            nodeState: 0,
            nodeType: 0
          }
        })
        if (wellId && nodeInfoList?.length === 0) {
          return {
            ...item,
            nodeInfoList: initNodeList
          }
        }
        if (wellId && nodeInfoList?.length) {
          return {
            ...item,
            nodeInfoList: initNodeList.map((ele) => {
              const matchNode = nodeInfoList.find(({ nodeNum }) => nodeNum === ele.nodeNum)
              return matchNode || ele
            })
          }
        }
        return item
      })
      return formatData
    }
    return data
  })
}

export const ossPolicyApi = () => {
  return request({
    url: getPrefixUrl('/oss/policy'),
    method: 'get'
  }).then(({ data }) => data)
}

export const uploadFileToAliOss = (url, data) => {
  return request({
    url,
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data
  })
}

export const nodeAddApi = (data) => {
  return request({
    url: getPrefixUrl('/node/add'),
    method: 'post',
    data
  })
}

export const nodeUpdateApi = (data) => {
  return request({
    url: getPrefixUrl('/node/update'),
    method: 'post',
    data
  })
}

export const nodeFindApi = (nodeId) => {
  return request({
    url: getPrefixUrl(`/node/find/${nodeId}`),
    method: 'get'
  }).then(({ data }) => {
    if (data) {
      return {
        ...data,
        fileList: data.nodePicture
          .split(',')
          .filter((url) => url)
          .map((url) => {
            const split1 = url?.split('/')
            const hashFileName = split1?.[split1.length - 1]
            const fileName = hashFileName
              ?.split('_')
              ?.filter((_, idx) => idx > 1)
              ?.join('')
            return {
              name: fileName || '',
              url,
              hasUploaded: true
            }
          })
      }
    }
    return {}
  })
}
