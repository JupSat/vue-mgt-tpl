/*
 * @Description:
 * @version:
 * @Author: JupSat
 * @email: jupsat@163.com
 * @Date: 2023-02-10 16:20:00
 * @LastEditors: JupSat
 * @LastEditTime: 2023-02-10 16:22:39
 */
import { rPost, rGet } from '@/utils/http/function'

const prefix = 'api'

/**
 * @description 获取所有采购人信息
 * @return
 */
export const getPurchasers = (data) => rGet(`/${prefix}/purchaserInfo/findAll`, data)

/**
 * @description 添加采购人信息
 * @return
 */
export const addPurchaser = (data) => rPost(`/${prefix}/purchaserInfo/add`, data)
