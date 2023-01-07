import request from '@/utils/http/request'

const prefix = 'api'

export const sendVerificationCodeApi = (params) => {
  return request({
    url: `/${prefix}/user/sendVerificationCodeToEmail`,
    method: 'post',
    params: params
  })
}
