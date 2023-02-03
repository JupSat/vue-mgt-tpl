/*
 * @Description:
 * @version:
 * @Author: JupSat
 * @email: jupsat@163.com
 * @Date: 2023-02-02 16:18:54
 * @LastEditors: JupSat
 * @LastEditTime: 2023-02-03 11:26:36
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
export const editCatalog = (data) => rPost(`/${prefix}/purchase/editCatalog`, data)

/**
 * @description 删除分类
 * @return
 */
export const delCatalog = (data) => rPost(`/${prefix}/purchase/deleteCatalog`, data)

/**
 * @description 通过catalogId获取食材
 * @return
 */
export const getFoodsCatalogId = (id) => rPost(`/${prefix}/purchase/getFoodsCatalogId`, id)

/**
 * @description 删除食材
 * @return
 */
export const delFood = (id) => rPost(`/${prefix}/purchase/deleteFood`, id)
