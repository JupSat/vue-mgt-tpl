import request from '@/utils/http/request'

export const asyncMenu = () => {
  return request({
    url: '/menu/getMenu',
    method: 'post'
  })
}
