import { rPost } from '@/utils/http/function'

const prefix = 'api'

export const asyncMenu = () => rPost(`/${prefix}/menu/getMenu`, null)
