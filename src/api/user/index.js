import request from '@/utils/http/request'

const prefix = 'api'
// const prefix = 'debug'

export const registerApi = (data) => {
  return request({
    url: `/${prefix}/user/register`,
    method: 'post',
    data: data
  })
}

export const sendCodeToEmailApi = (data) => {
  return request({
    url: `/${prefix}/user/sendCodeToEmail`,
    method: 'post',
    data: data
  })
}

export const loginApi = (data) => {
  return request({
    url: `/${prefix}/user/login`,
    method: 'post',
    data: data
  })
}

export const getGraphCaptchaApi = (data) => {
  return request({
    url: `/${prefix}/captcha/getCaptcha`,
    method: 'post',
    data: data
  })
}

export const resetPwdApi = (data) => {
  return request({
    url: `/${prefix}/user/resetPwd`,
    method: 'post',
    data: data
  })
}
