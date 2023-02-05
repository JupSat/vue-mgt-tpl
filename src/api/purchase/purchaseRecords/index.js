/*
 * @Description:
 * @version:
 * @Author: JupSat
 * @email: jupsat@163.com
 * @Date: 2023-02-05 12:45:13
 * @LastEditors: JupSat
 * @LastEditTime: 2023-02-05 12:45:26
 */
import { rPost } from '@/utils/http/function'

const prefix = 'api'

/**
 * @description 获取采购记录
 * @return
 */
export const getPurchaseRecords = (data) => rPost(`/${prefix}/purchase/getPurchaseRecords`, data)

/**
 * @description 添加采购记录
 * @return
 */
export const addPurchaseRecords = (data) => rPost(`/${prefix}/purchase/addPurchaseRecords`, data)

/**
 * @description 修改采购记录
 * @return
 */
export const editPurchaseRecords = (data) => rPost(`/${prefix}/purchase/editPurchaseRecords`, data)

/**
 * @description 删除采购记录
 * @return
 */
export const delPurchaseRecords = (id) => rPost(`/${prefix}/purchase/deletePurchaseRecords`, id)
