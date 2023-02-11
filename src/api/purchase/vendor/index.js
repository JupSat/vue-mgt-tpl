/*
 * @Description:
 * @version:
 * @Author: JupSat
 * @email: jupsat@163.com
 * @Date: 2023-02-04 11:37:37
 * @LastEditors: JupSat
 * @LastEditTime: 2023-02-11 10:47:31
 */
import { rGet, rPost, rPut, rDelete } from '@/utils/http/function'

const prefix = 'api/supplier'

/**
 * @description 获取供应商
 * @return
 */
export const getVendors = (params) => rGet(`/${prefix}/findAll`, null, params)

/**
 * @description 添加供应商
 * @return
 */
export const addVendor = (data) => rPost(`/${prefix}/add`, data)

/**
 * @description 修改供应商
 * @return
 */
export const editVendor = (data) => rPut(`/${prefix}/update`, data)

/**
 * @description 删除供应商
 * @return
 */
export const delVendor = (params) => rDelete(`/${prefix}/delete`, null, params)
