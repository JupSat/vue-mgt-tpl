/*
 * @Description:
 * @version:
 * @Author: JupSat
 * @email: jupsat@163.com
 * @Date: 2022-11-13 22:42:20
 * @LastEditors: JupSat
 * @LastEditTime: 2023-03-23 17:00:58
 */
import './qiankun/public-path'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import '@/styles/index.scss'
import 'element-plus/dist/index.css'
import '@/mock'
import i18n from '@/language'
import { store } from '@/pinia'
import * as Icons from '@element-plus/icons-vue'

let instance = null

function render(props = {}) {
  const { container } = props
  const instance = createApp(App)
  for (const [key, component] of Object.entries(Icons)) {
    instance.component(key, component)
  }

  instance
    .use(router)
    .use(store)
    .use(ElementPlus, { locale: locale })
    .use(i18n)
    .mount(container ? container.querySelector('#app') : '#app')
  // 这里的app是在public/index.html里的div的id,和之前主应用了配置的无关
}

if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

// 暴露生命周期的三个函数
export const bootstrap = async () => {
  console.log('%c ', 'color: green;', 'vue3.0 app bootstraped')
}

export const unmount = async () => {
  instance.unmount()
  instance._container.innerHTML = ''
  instance = null
}

export const mount = async (props) => {
  console.log('子应用加载')
  render(props)
}
