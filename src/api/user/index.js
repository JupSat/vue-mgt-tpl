import request from '@/utils/http/request'

export const registerApi = (data) => {
  return request({
    url: 'api/user/register',
    method: 'post',
    data: data
  })
}

export const requestCaptchaApi = (data) => {
  return request({
    url: 'api/user/requestCaptcha',
    method: 'post',
    data: data
  })
}



