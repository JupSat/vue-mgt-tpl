import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import '@/styles/index.scss'
import 'element-plus/lib/theme-chalk/index.css'
import '@/mock'
import i18n from '@/language'
import { store } from '@/pinia'

import * as Icons from '@element-plus/icons-vue'
const app = createApp(App)
for (const [key, component] of Object.entries(Icons)) {
  app.component(key, component)
}

app
  .use(router)
  .use(store)
  .use(ElementPlus, { locale: locale })
  .use(i18n)
  .mount('#app')
