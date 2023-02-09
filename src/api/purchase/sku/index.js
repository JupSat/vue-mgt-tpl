/*
 * @Description:
 * @version:
 * @Author: JupSat
 * @email: jupsat@163.com
 * @Date: 2023-02-04 18:26:13
 * @LastEditors: JupSat
 * @LastEditTime: 2023-02-09 15:48:27
 */
import { rPost } from '@/utils/http/function'

const prefix = 'api'

/**
 * @description 获取Sku信息
 * @return
 */
export const getSkuInfo = (data) => rPost(`/${prefix}/skuInfo/find`, data)

/**
 * @description 添加Sku信息
 * @return
 */
export const addSkuInfo = (data) => rPost(`/${prefix}/skuInfo/add`, data)

/**
 * @description 修改Sku信息
 * @return
 */
export const editSkuInfo = (data) => rPost(`/${prefix}/skuInfo/update`, data)

/**
 * @description 删除Sku信息
 * @return
 */
export const delSkuInfo = (data) => rPost(`/${prefix}/skuInfo/delete`, data)
