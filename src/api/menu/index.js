import { rPost } from '@/utils/http/function'

const prefix = 'api'

/**
 * @description 获取菜单
 * @return
 */
export const asyncMenu = () => rPost(`/${prefix}/menu/getMenu`, null)
