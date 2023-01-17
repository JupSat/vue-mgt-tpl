import { rPost } from '@/utils/http/function'

const prefix = 'api'

/**
 * @description 注册
 * @param {*} data 入参
 * @return
 */
export const registerApi = (data) => rPost(`/${prefix}/user/register`, data)

/**
 * @description 登录
 * @param {*} data 入参
 * @return
 */
export const loginApi = (data) => rPost(`/${prefix}/user/login`, data)

/**
 * @description 获取图片验证码
 * @return
 */
export const getGraphCaptchaApi = () => rPost(`/${prefix}/captcha/getCaptcha`, null)

/**
 * @description 密码重置
 * @param {*} data 入参
 * @return
 */
export const resetPwdApi = (data) => rPost(`/${prefix}/user/resetPwd`, data)
