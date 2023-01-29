/*
 * @Description: email相关方法
 * @version:
 * @Author: JupSat
 * @email: jupsat@163.com
 * @Date: 2023-01-12 22:07:21
 * @LastEditors: JupSat
 * @LastEditTime: 2023-01-29 22:36:34
 */
import { sendVerificationCodeApi } from '@/api/email'
import { message } from '@/utils/message'

/**
 * @author JupSat
 * @description 发送验证码到邮箱
 * @param {*} email 邮箱
 * @return
 */
export const sendVerificationCodeToEmail = (email) => {
  const params = {
    email
  }
  return sendVerificationCodeApi(params).then((res) => {
    if (res) {
      const { status = null, msg = '' } = res || {}
      if (status === 200) {
        message(msg)
        return 'succuss'
      } else {
        message(msg, 'warning')
        return 'failed'
      }
    }
    return 'failed'
  })
}

/**
 * @author JupSat
 * @description 检查邮箱
 * @param {*} email 邮箱
 * @return
 */

export const checkEmail = (email) => {
  if (!email) {
    message('邮箱不能为空', 'warning')
    return false
  }

  const regEmail = /^([a-zA-Z0-9]+[-_\\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/

  if (!regEmail.test(email)) {
    message('请输入正确的邮箱！', 'warning')
    return false
  }

  return true
}
