import { rPostByParams } from '@/utils/http/function'

const prefix = 'api'

/**
 * @description 发送验证码
 * @param {*} params
 * @returns
 */
export const sendVerificationCodeApi = (params) => rPostByParams(`/${prefix}/user/sendVerificationCodeToEmail`, params)
