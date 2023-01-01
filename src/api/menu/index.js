import request from '@/utils/http/request'

const prefix = 'api'

export const asyncMenu = () => {
  return request({
    url: `/${prefix}/menu/getMenu`,
    method: 'post'
  })
}
