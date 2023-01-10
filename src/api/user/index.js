import { rPost } from '@/utils/http/function'

const prefix = 'api'

export const registerApi = (data) => rPost(`/${prefix}/user/register`, data)

export const loginApi = (data) => rPost(`/${prefix}/user/login`, data)

export const getGraphCaptchaApi = (data) =>
  rPost(`/${prefix}/captcha/getCaptcha`, data)

export const resetPwdApi = (data) => rPost(`/${prefix}/user/resetPwd`, data)
