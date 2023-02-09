/*
 * @Description:
 * @version:
 * @Author: JupSat
 * @email: jupsat@163.com
 * @Date: 2023-02-04 11:38:43
 * @LastEditors: JupSat
 * @LastEditTime: 2023-02-08 18:06:36
 */
import { rPost } from '@/utils/http/function'

const prefix = 'api'

/**
 * @description 获取分类列表
 * @return
 */
export const getCatalog = (data) => rPost(`/${prefix}/food/find`, data)

/**
 * @description 添加分类
 * @return
 */
export const addCatalog = (data) => rPost(`/${prefix}/food/add`, data)

/**
 * @description 修改分类
 * @return
 */
export const editCatalog = (data) => rPost(`/${prefix}/food/update`, data)

/**
 * @description 删除分类
 * @return
 */
export const delCatalog = (data) => rPost(`/${prefix}/food/delete`, data)

/**
 * @description 通过catalogId获取食材
 * @return
 */
export const getFoodsCatalogId = (id) => rPost(`/${prefix}/food/getFoodsCatalogId`, id)
