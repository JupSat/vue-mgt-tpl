import i18n from '@/language'

const $t = i18n.global.t

// 正则文件
const reg = {
  phone: /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/,
  password: /^[0-9A-Za-z_.]{6,40}$/,
  money: /^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/,
  address: /^[\u4e00-\u9fa5A-Za-z0-9_-]{5,100}$/,
  userName: /^[\u4e00-\u9fa5A-Za-z0-9_-]{2,20}$/,
  intNumber: /^(([1-9]\d{0,9})|0)?$/,
  email: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
}

/**
 * @description  获取校验对象
 * @param {*} s  提示文本(有语言配置时传单词)
 * @return { }
 */
export const getValidator = (s = 'required') => {
  return {
    required: true,
    message: $t(s), // 必填项
    trigger: 'blur'
  }
}

/**
 * @description 校验电话
 * @param {*} rule 规则
 * @param {*} value 值
 * @param {*} cb
 * @return
 */
export const regPhone = (rule, value, cb) => {
  if (reg.phone.test(value)) {
    return cb()
  }
  cb(new Error($t('plzEnterCorrectMobileNumber'))) // '请输入正确的手机号'
}

/**
 * @description 校验密码
 * @param {*} rule 规则
 * @param {*} value 值
 * @param {*} cb
 * @return
 */
export const regPwd = (rule, value, cb) => {
  if (reg.password.test(value)) {
    return cb()
  }
  cb(new Error($t('pwdRule'))) // '密码为6-40位数字字母“.” 和 “_”'
}

/**
 * @description 校验密码
 * @param {*} rule 规则
 * @param {*} value 值
 * @param {*} cb
 * @return
 */
export const regLoginPwd = (rule, value, cb) => {
  if (reg.password.test(value)) {
    return cb()
  }
  cb(new Error($t('plzEnterCorrectPwd')))
}

/**
 * @description 校验金额
 * @param {*} rule
 * @param {*} value
 * @param {*} cb
 * @return
 */
export const regMoney = (rule, value, cb) => {
  if (reg.money.test(value)) {
    return cb()
  }
  cb(new Error($t('XXX'))) // '请输入正确的金额'
}

/**
 * @description 校验地址
 * @param {*} rule
 * @param {*} value
 * @param {*} cb
 * @return
 */
export const regAddress = (rule, value, cb) => {
  if (reg.address.test(value)) {
    return cb()
  }
  cb(new Error($t('XXX'))) // '请输入正确的地址精确到门牌号'
}

/**
 * @description 校验用户名
 * @param {*} rule
 * @param {*} value
 * @param {*} cb
 * @return
 */
export const regUserName = (rule, value, cb) => {
  if (reg.userName.test(value)) {
    return cb()
  }
  cb(new Error($t('plzEnterCorrectUerNam'))) // '请输入正确的名称'
}

/**
 * @description 校验数字
 * @param {*} rule
 * @param {*} value
 * @param {*} cb
 * @return
 */
export const regIntNumber = (rule, value, cb) => {
  if (reg.intNumber.test(value)) {
    return cb()
  }
  cb(new Error($t('XXX'))) // '请输入整数'
}

/**
 * @description 校验邮箱
 * @param {*} rule
 * @param {*} value
 * @param {*} cb
 * @return
 */
export const regEmail = (rule, value, cb) => {
  if (reg.email.test(value)) {
    return cb()
  }
  cb(new Error($t('plzEnterCorrectEmail')))
}
