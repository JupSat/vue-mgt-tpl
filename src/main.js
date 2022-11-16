import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import locale from 'element-plus/lib/locale/lang/zh-cn';
import '@/styles/index.scss';
import 'element-plus/lib/theme-chalk/index.css';
import '@/mock';

import * as Icons from "@element-plus/icons-vue";
const app = createApp(App)
for (const name in Icons) {
  app.component(name, (Icons)[name])
}
app.use(router).use(ElementPlus, { locale: locale }).mount('#app')
