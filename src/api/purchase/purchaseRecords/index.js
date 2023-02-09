/*
 * @Description:
 * @version:
 * @Author: JupSat
 * @email: jupsat@163.com
 * @Date: 2023-02-05 12:45:13
 * @LastEditors: JupSat
 * @LastEditTime: 2023-02-06 19:43:25
 */
import { rPost } from '@/utils/http/function'

const prefix = 'api'

/**
 * @description 获取采购记录
 * @return
 */
export const getPurchaseRecords = (data) => rPost(`/${prefix}/purchaseRecord/find`, data)

/**
 * @description 添加采购记录
 * @return
 */
export const addPurchaseRecord = (data) => rPost(`/${prefix}/purchaseRecord/add`, data)

/**
 * @description 修改采购记录
 * @return
 */
export const editPurchaseRecord = (data) => rPost(`/${prefix}/purchaseRecord/update`, data)

/**
 * @description 删除采购记录
 * @return
 */
export const delPurchaseRecord = (data) => rPost(`/${prefix}/purchaseRecord/delete`, data)
