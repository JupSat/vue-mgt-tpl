import { createI18n } from 'vue-i18n'
import ZH from './common/zh'
import EN from './common/en'

import summaryZh from './summary/zh'
import summaryEn from './summary/en'

const messages = {
  zh: { ...ZH, ...summaryZh },
  en: { ...EN, ...summaryEn }
}

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'zh',
  messages
})
export default i18n
