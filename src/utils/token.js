/*
 * @Description: token相关
 * @version:
 * @Author: JupSat
 * @email: jupsat@163.com
 * @Date: 2023-01-10 19:48:03
 * @LastEditors: JupSat
 * @LastEditTime: 2023-01-17 10:34:54
 */

/**
 * @author JupSat
 * @description 设置token
 * @param {*}
 * @return
 */
export function setToken(token) {
  return sessionStorage.setItem('token', token)
}

/**
 * @author JupSat
 * @description 获取token
 * @param {*}
 * @return
 */
export function getToken() {
  return sessionStorage.getItem('token')
}

/**
 * @author JupSat
 * @description 清除token
 * @param {*}
 * @return
 */
export function clearToken() {
  return sessionStorage.clear('token')
}
