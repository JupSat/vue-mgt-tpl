/*
 * @Description:
 * @version:
 * @Author: JupSat
 * @email: jupsat@163.com
 * @Date: 2023-02-04 11:38:43
 * @LastEditors: JupSat
 * @LastEditTime: 2023-02-05 18:00:21
 */
import { rPost } from '@/utils/http/function'

const prefix = 'api'

/**
 * @description 获取分类列表
 * @return
 */
export const getCatalog = (data) => rPost(`/${prefix}/purchase/getCatalog`, data)

/**
 * @description 添加分类
 * @return
 */
export const addCatalog = (data) => rPost(`/${prefix}/purchase/addCatalog`, data)

/**
 * @description 修改分类
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
 * @description 添加食材
 * @return
 */
export const addFood = (data) => rPost(`/${prefix}/purchase/addFood`, data)

/**
 * @description 修改食材
 * @return
 */
export const editFood = (data) => rPost(`/${prefix}/purchase/editFood`, data)

/**
 * @description 删除食材
 * @return
 */
export const delFood = (id) => rPost(`/${prefix}/purchase/deleteFood`, id)
