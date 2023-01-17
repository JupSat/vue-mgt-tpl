/*
 * @Description: 公共文件
 * @version:
 * @Author: JupSat
 * @email: jupsat@163.com
 * @Date: 2023-01-12 22:07:21
 * @LastEditors: JupSat
 * @LastEditTime: 2023-01-17 10:21:22
 */
/**
 * @author JupSat
 * @description 防抖
 * @param {*} fn 执行的方法
 * @param {*} delay 延时时长： 默认200ms
 * @return
 */
export function debounce(fn, delay = 200) {
  let timer
  return function () {
    const cxt = this
    const args = arguments
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(cxt, args)
    }, delay)
  }
}

/**
 * @description  节流
 * @param {*} fn 执行的方法
 * @param {*} delay 延时时长： 默认1000ms
 * @return
 */
export const throttle = (fn, delay = 1000) => {
  let valid = true
  return function () {
    const cxt = this
    const args = arguments
    if (!valid) return false
    valid = false
    setTimeout(() => {
      fn.apply(cxt, args)
      valid = true
    }, delay)
  }
}
