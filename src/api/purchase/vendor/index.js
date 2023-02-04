/*
 * @Description:
 * @version:
 * @Author: JupSat
 * @email: jupsat@163.com
 * @Date: 2023-02-04 11:37:37
 * @LastEditors: JupSat
 * @LastEditTime: 2023-02-04 18:27:20
 */
import { rPost } from '@/utils/http/function'

const prefix = 'api'

/**
 * @description 获取供应商
 * @return
 */
export const getVendors = (data) => rPost(`/${prefix}/purchase/getVendors`, data)

/**
 * @description 添加供应商
 * @return
 */
export const addVendor = (data) => rPost(`/${prefix}/purchase/addVendor`, data)

/**
 * @description 修改供应商
 * @return
 */
export const editVendor = (data) => rPost(`/${prefix}/purchase/editVendor`, data)

/**
 * @description 删除供应商
 * @return
 */
export const delVendor = (id) => rPost(`/${prefix}/purchase/deleteVendor`, id)
