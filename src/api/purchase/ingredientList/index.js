/*
 * @Description:
 * @version:
 * @Author: JupSat
 * @email: jupsat@163.com
 * @Date: 2023-02-08 18:03:20
 * @LastEditors: JupSat
 * @LastEditTime: 2023-02-11 10:42:54
 */
import { rPost } from '@/utils/http/function'

const prefix = 'api/ingredient'

/**
 * @description 获取食材
 * @return
 */
export const getIngredientList = (data) => rPost(`/${prefix}/find`, data)

/**
 * @description 添加食材
 * @return
 */
export const addIngredient = (data) => rPost(`/${prefix}/add`, data)

/**
 * @description 修改食材
 * @return
 */
export const editIngredient = (data) => rPost(`/${prefix}/update`, data)

/**
 * @description 删除食材
 * @return
 */
export const delIngredient = (params) => rPost(`/${prefix}/delete`, null, params)
