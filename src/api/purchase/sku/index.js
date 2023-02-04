/*
 * @Description:
 * @version:
 * @Author: JupSat
 * @email: jupsat@163.com
 * @Date: 2023-02-04 18:26:13
 * @LastEditors: JupSat
 * @LastEditTime: 2023-02-04 18:27:29
 */
import { rPost } from '@/utils/http/function'

const prefix = 'api'

/**
 * @description 获取Sku信息
 * @return
 */
export const getSkuInfo = (data) => rPost(`/${prefix}/purchase/getSkuInfo`, data)

/**
 * @description 添加Sku信息
 * @return
 */
export const addSkuInfo = (data) => rPost(`/${prefix}/purchase/addSkuInfo`, data)

/**
 * @description 修改Sku信息
 * @return
 */
export const editSkuInfo = (data) => rPost(`/${prefix}/purchase/editSkuInfo`, data)

/**
 * @description 删除Sku信息
 * @return
 */
export const delSkuInfo = (id) => rPost(`/${prefix}/purchase/deleteSkuInfo`, id)
