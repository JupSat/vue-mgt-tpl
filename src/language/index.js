/*
 * @Description:
 * @version:
 * @Author: JupSat
 * @email: jupsat@163.com
 * @Date: 2023-01-10 19:48:02
 * @LastEditors: JupSat
 * @LastEditTime: 2023-02-01 22:31:55
 */
import { createI18n } from 'vue-i18n'
import ZH from './common/zh'
import EN from './common/en'

import summaryZh from './summary/zh'
import summaryEn from './summary/en'

import purchaseZh from './purchase/zh'
import purchaseEn from './purchase/en'
const messages = {
  zh: { ...ZH, ...summaryZh, ...purchaseZh },
  en: { ...EN, ...summaryEn, ...purchaseEn }
}

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'zh',
  messages
})
export default i18n
