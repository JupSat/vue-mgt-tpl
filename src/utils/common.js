/*
 * @Description: 公共文件
 * @version:
 * @Author: JupSat
 * @email: jupsat@163.com
 * @Date: 2023-01-12 22:07:21
 * @LastEditors: JupSat
 * @LastEditTime: 2023-02-13 11:13:04
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

/**
 * @description 下拉参数翻译
 * @param {*} list
 * @param {*} val
 * @return
 */
export const translateParam = (list = [], val) => {
  if (!Array.isArray(list)) return val
  const item = list.find((el) => el.value === val)
  return item ? item.label : val
}

/**
 * @description 判断是否为手机端
 * @param { }
 * @return
 */
export const isMobileTerminal = () => {
  return navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  )
}

/**
 * @description 合计
 * @param { }
 * @return
 */
export const doSummaries = (param, excludes) => {
  const { columns, data } = param
  const sums = []
  columns.forEach((column, index) => {
    if (index === 0) {
      sums[index] = '合计'
      return
    }
    if (!excludes.includes(column.property)) {
      sums[index] = ''
      return
    }
    const values = data.map((item) => Number(item[column.property]))
    if (!values.every((value) => Number.isNaN(value))) {
      const tempTotal = `${values.reduce((prev, curr) => {
        const value = Number(curr)
        if (!Number.isNaN(value)) {
          return prev + curr
        } else {
          return prev
        }
      }, 0)}`
      sums[index] = Number(tempTotal).toFixed(2)
    } else {
      sums[index] = ''
    }
  })

  return sums
}
