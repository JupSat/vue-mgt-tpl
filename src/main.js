/*
 * @Description:
 * @version:
 * @Author: JupSat
 * @email: jupsat@163.com
 * @Date: 2022-11-13 22:42:20
 * @LastEditors: JupSat
 * @LastEditTime: 2023-03-23 22:26:03
 */
import './qiankun/public-path'
import { createApp } from 'vue'
import App from './App.vue'
// import router from './router'
import routes from './router'
import ElementPlus from 'element-plus'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import '@/styles/index.scss'
import 'element-plus/dist/index.css'
import '@/mock'
import i18n from '@/language'
import { store } from '@/pinia'
import * as Icons from '@element-plus/icons-vue'
import { createRouter, createWebHashHistory } from 'vue-router'

let instance = null
let router = null
function render() {
  const routerHistory = createWebHashHistory()

  router = createRouter({
    history: routerHistory,
    routes: routes
  })
  instance = createApp(App)
  for (const [key, component] of Object.entries(Icons)) {
    instance.component(key, component)
  }

  instance.use(router).use(store).use(ElementPlus, { locale: locale }).use(i18n).mount('#app')
  // 这里的app是在public/index.html里的div的id,和之前主应用了配置的无关
}

if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

export async function bootstrap() {
  console.log('Vue Child bootstraped')
}

export async function mount(props) {
  console.log('子组件 mount', props)
  render(props)
}

/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount() {
  console.log('Vue Child unmount')
  instance._container.innerHTML = ''
  instance.unmount()
  instance = null
  router = null
}
