/*
 * @Description:
 * @version:
 * @Author: JupSat
 * @email: jupsat@163.com
 * @Date: 2022-11-13 22:42:20
 * @LastEditors: JupSat
 * @LastEditTime: 2023-05-22 21:48:21
 */
import './qiankun/public-path'
import microActions from './qiankun/qiankun-actions'
import App from './App.vue'
import { createApp } from 'vue'
import { routes, getDynamicRoutes, checkPath } from './router'
import ElementPlus from 'element-plus'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import '@/styles/index.scss'
import 'element-plus/dist/index.css'
import '@/mock'
import i18n from '@/language'
import { store } from '@/pinia'
import * as Icons from '@element-plus/icons-vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserStoreWithOut } from '@/pinia/modules/user'
import { useMenuStore } from '@/pinia/modules/menu'
import { message } from '@/utils/message'
import { getToken } from '@/utils/token'
import wsPlugin from '@/plugins/wsPlugin'

const useUserStore = useUserStoreWithOut()
const qiankunPath = 'vue-mgt-tpl'
const microPath = window.__POWERED_BY_QIANKUN__ ? '/' + qiankunPath : ''

let instance = null
let router = null

function render(props = {}) {
  router = createRouter({
    history: createWebHashHistory(microPath),
    routes: routes.map((el) => {
      el.path = microPath + el.path
      return el
    })
  })

  instance = createApp(App)

  for (const [key, component] of Object.entries(Icons)) {
    instance.component(key, component)
  }

  if (window.__POWERED_BY_QIANKUN__) {
    // 注入 actions 实例
    props && microActions.setActions(props)
    instance.config.globalProperties.$microRouter = props.router

    props.onGlobalStateChange((state, prevState) => {
      // state: 变更后的状态; prev 变更前的状态
      console.log('通信状态发生改变xxx：', state, prevState)
      useUserStore.setTestVal(state.globalToken)
    }, true)
  }

  let firstLoad = true
  router.beforeEach(async (to, from, next) => {
    if (to.meta.title) {
      document.title = to.meta.title
    }

    const token = getToken()
    if (to.name !== 'Home' && !token) {
      message('请先登录！', 'warning')
      next(microPath + '/home')
    }
    const menuStore = useMenuStore()
    if ((!Array.isArray(menuStore.menuList) || !menuStore.menuList.length) && firstLoad) {
      firstLoad = false
      await getDynamicRoutes().then((menus) => {
        if (Array.isArray(menus)) {
          menus.forEach((route) => {
            if (!router.hasRoute(route.name)) {
              route.path = microPath + route.path
              route.redirect = microPath + route.redirect
              router.addRoute(route)
            }
          })
        }

        if (window.__POWERED_BY_QIANKUN__ && !to.path.includes(qiankunPath)) {
          to.path = microPath + to.path
        }
        console.log(router.getRoutes())
        next({ ...to, replace: true })
      })
    } else {
      if (window.__POWERED_BY_QIANKUN__ && !to.path.includes(qiankunPath)) {
        to.path = microPath + to.path
      }
      if (!checkPath(to.path)) {
        next(microPath + '/404')
      } else {
        next()
      }
    }
  })

  const { container } = props

  instance
    .use(router)
    .use(store)
    .use(ElementPlus, { locale: locale })
    .use(i18n)
    .use(wsPlugin)
    .mount(container ? container.querySelector('#app') : '#app')
  // 这里的app是在public/index.html里的div的id,和之前主应用了配置的无关
}

!window.__POWERED_BY_QIANKUN__ && render()

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
  instance.unmount()
  instance = null
  router = null
}
