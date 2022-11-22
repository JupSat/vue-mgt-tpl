import request from '@/utils/http/request'

export const asyncMenu = () => {
  return request({
    url: 'api/menu/getMenu',
    method: 'post'
  })
}
