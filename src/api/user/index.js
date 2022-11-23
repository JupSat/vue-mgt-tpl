import request from '@/utils/http/request'

export const registerApi = (data) => {
  return request({
    url: '/api/user/register',
    method: 'post',
    data: data
  })
}

export const sendCodeToEmailApi = (data) => {
  return request({
    url: '/api/user/sendCodeToEmail',
    method: 'post',
    data: data
  })
}

export const loginApi = (data) => {
  return request({
    url: '/api/user/login',
    method: 'post',
    data: data
  })
}

export const getGraphCaptchaApi = (data) => {
  return request({
    url: '/api/base/captcha', // 借用接口
    method: 'post',
    data: data
  })
}

export const resetPwdApi = (data) => {
  return request({
    url: '/api/user/resetPassword',
    method: 'post',
    data: data
  })
}
