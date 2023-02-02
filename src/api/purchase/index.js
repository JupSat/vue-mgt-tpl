/*
 * @Description:
 * @version:
 * @Author: JupSat
 * @email: jupsat@163.com
 * @Date: 2023-02-02 16:18:54
 * @LastEditors: JupSat
 * @LastEditTime: 2023-02-02 17:55:29
 */
import { rPost } from '@/utils/http/function'

const prefix = 'api'

/**
 * @description 获取分类列表
 * @return
 */
export const getCatalog = () => rPost(`/${prefix}/purchase/getCatalog`, null)

/**
 * @description 获取添加分类
 * @return
 */
export const addCatalog = () => rPost(`/${prefix}/purchase/addCatalog`, null)

/**
 * @description 获取修改分类
 * @return
 */
export const editCatalog = () => rPost(`/${prefix}/purchase/editCatalog`, null)
