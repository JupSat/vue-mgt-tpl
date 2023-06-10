/*
 * @Description:
 * @version:
 * @Author: JupSat
 * @email: jupsat@163.com
 * @Date: 2023-01-10 19:48:03
 * @LastEditors: JupSat
 * @LastEditTime: 2023-05-19 20:24:01
 */
import Layout from '@/views/Basics/Layout'
import { useMenuStore } from '@/pinia/modules/menu'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Basics/Home'),
    meta: {
      title: '首页',
      id: 'home'
    }
  },
  {
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ '@/views/Basics/Exceptions/404.vue'),
    meta: {
      title: '404',
      id: '404'
    }
  },
  {
    path: '/500',
    name: '500',
    component: () => import(/* webpackChunkName: "500" */ '@/views/Basics/Exceptions/500.vue'),
    meta: {
      title: '500',
      id: '500'
    }
  }
]

// 判断环境是否是微应用打开
const microPath = window.__POWERED_BY_QIANKUN__ ? '/vue-mgt-tpl' : ''

async function getDynamicRoutes() {
  const menuStore = useMenuStore()
  await menuStore.loadMenu()
  const menuList = menuStore.menuList

  if (!menuList || menuList.length === 0) {
    return routes
  }

  const iterator = (list, parent) => {
    const menus = []
    list &&
      list.forEach((el) => {
        const { path, name, icon, id } = el
        const item = {
          path,
          name,
          icon,
          component: Layout,
          meta: {
            title: id,
            id
          }
        }

        if (parent && parent.name && (!el.children || el.children.length === 0)) {
          item.component = () => import(`@/views/${parent.name}/${el.name}`)
        }
        if (Array.isArray(el.children) && el.children.length > 0) {
          item.children = iterator(el.children, el).map((item) => {
            item.path = microPath + item.path
            return item
          })
          item.redirect = el.redirect
        }
        menus.push(item)
      })
    return menus
  }
  const tempMenus = iterator(menuList, '')
  return [...tempMenus]
}

function checkPath(subPath) {
  const prefix = '/vue-mgt-tpl'
  let finalSubPath = ''
  if (microPath && subPath.includes(prefix)) {
    finalSubPath = subPath.split(prefix)[1]
  } else {
    finalSubPath = subPath
  }

  const componentPaths = require.context('@/components/', true, /.vue$/).keys()
  const viewPaths = require.context('@/views/', true, /.vue$/).keys()
  const paths = [...componentPaths, ...viewPaths]
  const flag = paths.some((path) => path.toLowerCase().includes(finalSubPath.toLowerCase()))
  return flag
}

export { routes, getDynamicRoutes, checkPath }
