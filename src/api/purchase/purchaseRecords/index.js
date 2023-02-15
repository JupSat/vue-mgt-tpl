/*
 * @Description:
 * @version:
 * @Author: JupSat
 * @email: jupsat@163.com
 * @Date: 2023-02-05 12:45:13
 * @LastEditors: JupSat
 * @LastEditTime: 2023-02-15 23:57:20
 */
import { rPost } from '@/utils/http/function'
import { downloadFile } from '@/utils/file'

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

/**
 * @description 导入采购记录
 * @return
 */
export const importPurchaseRecord = (data) => rPost(`/${prefix}/import`, data)

/**
 * @description 导出采购记录
 * @return
 */
export const exportPurchaseRecord = () => {
  return downloadFile(`/${prefix}/export`, null, '采购记录')
}
