/*
 * @Description:
 * @version:
 * @Author: JupSat
 * @email: jupsat@163.com
 * @Date: 2023-02-08 18:03:20
 * @LastEditors: JupSat
 * @LastEditTime: 2023-02-08 18:05:52
 */
import { rPost } from '@/utils/http/function'

const prefix = 'api'

/**
 * @description 获取食材
 * @return
 */
export const getIngredientList = (data) => rPost(`/${prefix}/ingredients/find`, data)

/**
 * @description 添加食材
 * @return
 */
export const addIngredient = (data) => rPost(`/${prefix}/ingredients/add`, data)

/**
 * @description 修改食材
 * @return
 */
export const editIngredient = (data) => rPost(`/${prefix}/ingredients/update`, data)

/**
 * @description 删除食材
 * @return
 */
export const delIngredient = (id) => rPost(`/${prefix}/ingredients/delete`, id)
