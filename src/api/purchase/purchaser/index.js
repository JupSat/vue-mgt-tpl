/*
 * @Description:
 * @version:
 * @Author: JupSat
 * @email: jupsat@163.com
 * @Date: 2023-02-10 16:20:00
 * @LastEditors: JupSat
 * @LastEditTime: 2023-02-11 10:46:36
 */
import { rPost, rGet } from '@/utils/http/function'

const prefix = 'api/purchaserInfo'

/**
 * @description 获取所有采购人信息
 * @return
 */
export const getPurchasers = (data) => rGet(`/${prefix}/findAll`, data)

/**
 * @description 添加采购人信息
 * @return
 */
export const addPurchaser = (data) => rPost(`/${prefix}/add`, data)
