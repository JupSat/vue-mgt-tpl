import { sendVerificationCodeApi } from '@/api/user'
import { ElMessage } from 'element-plus'

export const sendVerificationCodeToEmail = (email) => {
  const params = {
    email
  }

  sendVerificationCodeApi(params).then((res) => {
    if (res) {
      const { status = null, msg = '' } = res || {}
      if (status === 200) {
        ElMessage({
          message: res.msg,
          grouping: true,
          type: 'success',
          duration: 3000
        })
      } else {
        ElMessage({
          message: msg,
          grouping: true,
          type: 'warning',
          duration: 3000
        })
      }
    }
  })
}

export const checkEmail = (email) => {
  if (!email) {
    ElMessage({
      message: '邮箱不能为空',
      grouping: true,
      type: 'warning',
      duration: 2000
    })
    return false
  }

  const regEmail = /^([a-zA-Z0-9]+[-_\\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/

  if (!regEmail.test(email)) {
    ElMessage({
      message: '请输入正确的邮箱！',
      grouping: true,
      type: 'warning',
      duration: 2000
    })
    return false
  }

  return true
}
