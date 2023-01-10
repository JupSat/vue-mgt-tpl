import i18n from '@/language'

// 正则文件
const reg = {
  phone: /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/,
  password: /^[0-9A-Za-z_.]{6,40}$/,
  money: /^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/,
  address: /^[\u4e00-\u9fa5A-Za-z0-9_-]{5,100}$/,
  userName: /^[\u4e00-\u9fa5A-Za-z0-9_-]{2,20}$/,
  intNumber: /^(([1-9]\d{0,9})|0)?$/
}

export const isRequired = (s = 'required') => {
  return {
    required: true,
    message: i18n.global.t(s), // 必填项
    trigger: 'blur'
  }
}

export const regPhone = (rule, value, cb) => {
  if (reg.phone.test(value)) {
    return cb()
  }
  cb(new Error(i18n.global.t('XXX'))) // '请输入正确的手机号'
}

export const regPwd = (rule, value, cb) => {
  if (reg.password.test(value)) {
    return cb()
  }
  cb(new Error(i18n.global.t('pwdRule'))) // '密码为6-40位数字字母“.” 和 “_”'
}

export const regMoney = (rule, value, cb) => {
  if (reg.money.test(value)) {
    return cb()
  }
  cb(new Error(i18n.global.t('XXX'))) // '请输入正确的金额'
}

export const regAddress = (rule, value, cb) => {
  if (reg.address.test(value)) {
    return cb()
  }
  cb(new Error(i18n.global.t('XXX'))) // '请输入正确的地址精确到门牌号'
}

export const regUserName = (rule, value, cb) => {
  if (reg.userName.test(value)) {
    return cb()
  }
  cb(new Error(i18n.global.t('XXX'))) // '请输入正确的名称'
}

export const regIntNumber = (rule, value, cb) => {
  if (reg.intNumber.test(value)) {
    return cb()
  }
  cb(new Error(i18n.global.t('XXX'))) // '请输入整数'
}
