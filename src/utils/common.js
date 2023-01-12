/**
 * @description 防抖
 * @param {*} fn 执行的方法
 * @param {*} delay 延时时长： 默认200ms
 * @returns
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
 * @returns
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
