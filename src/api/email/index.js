import { rPostByParams } from '@/utils/http/function'

const prefix = 'api'

export const sendVerificationCodeApi = (params) =>
  rPostByParams(`/${prefix}/user/sendVerificationCodeToEmail`, params)
