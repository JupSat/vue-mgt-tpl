import { ElMessage } from 'element-plus'
import { apiCodeMap, ossPolicyApi, uploadFileToAliOss } from './services'

export const getUUID = () => {
  const rx = () => {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }

  return `${+new Date()}_${rx()}${rx()}`
}

export const getImgUrlList = async (fileList) => {
  const ossPolicyApiRes = await ossPolicyApi()
  return fileList.map(async (item) => {
    // 只能单个文件上传
    const { name: fileName } = item
    const uuidFileName = `${getUUID()}_${fileName}`
    const { host, accessid, dir } = ossPolicyApiRes
    const originObj = {
      ...ossPolicyApiRes,
      OSSAccessKeyId: accessid,
      key: `${dir}${uuidFileName}`
    }

    const formData = new FormData()
    Object.keys(originObj).forEach((key) => {
      formData.append(key, originObj[key])
    })
    const blobFile = new Blob([item.raw], { type: 'application/octet-stream' }, `${getUUID()}_${fileName}`)
    formData.append('file', blobFile)
    // 上传文件到aliOss
    return uploadFileToAliOss(host, formData)
      .then(() => `${host}/${dir}${uuidFileName}`)
      .catch((err) => {
        console.log('err', err)
        return ''
      })
  })
}

export const showCodeTip = (res) => {
  if (res?.code === apiCodeMap.SUCCESS) {
    ElMessage.success('操作成功')
    return
  }
  if (res?.code === apiCodeMap.Failed) {
    ElMessage.error('操作异常')
    return
  }
  ElMessage.error('操作异常')
}
