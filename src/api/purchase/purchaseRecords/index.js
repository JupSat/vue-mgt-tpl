/*
 * @Description:
 * @version:
 * @Author: JupSat
 * @email: jupsat@163.com
 * @Date: 2023-02-05 12:45:13
 * @LastEditors: JupSat
 * @LastEditTime: 2023-02-13 16:44:59
 */
import { rPost } from '@/utils/http/function'

const prefix = 'api/purchaseRecord'

/**
 * @description 获取采购记录
 * @return
 */
export const getPurchaseRecords = (data) => rPost(`/${prefix}/findByPage`, data)

/**
 * @description 添加采购记录
 * @return
 */
export const addPurchaseRecord = (data) => rPost(`/${prefix}/add`, data)

/**
 * @description 修改采购记录
 * @return
 */
export const editPurchaseRecord = (data) => rPost(`/${prefix}/update`, data)

/**
 * @description 删除采购记录
 * @return
 */
export const delPurchaseRecord = (params) => rPost(`/${prefix}/delete`, null, params)
