// import { createRouter, createWebHashHistory } from 'vue-router'
// import Layout from '@/views/Basics/Layout'
// import { useMenuStore } from '@/pinia/modules/menu'
// import { message } from '@/utils/message'
// import { getToken } from '@/utils/token'

// 判断环境是否是微应用打开
let microPath = ''
if (window.__POWERED_BY_QIANKUN__) {
  microPath = '/vue-mgt-tpl'
}
const routes = [
  {
    path: microPath + '/',
    redirect: microPath + '/home'
  },
  {
    path: microPath + '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Basics/Home'),
    meta: {
      title: '首页',
      id: 'home'
    }
  },
  {
    path: microPath + '/404',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ '@/views/Basics/Exceptions/404.vue'),
    meta: {
      title: '404',
      id: '404'
    }
  },
  {
    path: microPath + '/500',
    name: '500',
    component: () => import(/* webpackChunkName: "500" */ '@/views/Basics/Exceptions/500.vue'),
    meta: {
      title: '500',
      id: '500'
    }
  }
]

// async function getDynamicRoutes() {
//   const menuStore = useMenuStore()
//   await menuStore.loadMenu()
//   const menuList = menuStore.menuList

//   if (!menuList || menuList.length === 0) {
//     return routes
//   }

//   const iterator = (list, parent) => {
//     const menus = []
//     list &&
//       list.forEach((el) => {
//         const item = {
//           path: el.path,
//           name: el.name,
//           icon: el.icon,
//           component: Layout,
//           meta: {
//             title: el.id,
//             id: el.id
//           }
//         }

//         if (parent && parent.name && (!el.children || el.children.length === 0)) {
//           item.component = () => import(`@/views/${parent.name}/${el.name}`)
//         }
//         if (el.children && el.children.length > 0) {
//           item.children = iterator(el.children, el)
//           item.redirect = el.redirect
//         }
//         menus.push(item)
//       })
//     return menus
//   }
//   const tempMenus = iterator(menuList, '')
//   return [...tempMenus]
// }

// const router = createRouter({
//   mode: 'history',
//   base: window.__POWERED_BY_QIANKUN__ ? '/vue-mgt-tpl' : '/',
//   history: createWebHashHistory('/vue-mgt-tpl'),
//   routes
// })

// function checkPath(subPath) {
//   const componentPaths = require.context('@/components/', true, /.vue$/).keys()
//   const viewPaths = require.context('@/views/', true, /.vue$/).keys()
//   const paths = [...componentPaths, ...viewPaths]
//   const flag = paths.some((path) => path.toLowerCase().includes(subPath.toLowerCase()))
//   return flag
// }

// let firstLoad = true

// router.beforeEach(async (to, from, next) => {
//   if (to.meta.title) {
//     document.title = to.meta.title
//   }

//   const token = getToken()
//   if (to.name !== 'Home' && !token) {
//     message('请先登录！', 'warning')
//     next({ name: 'Home', replace: true })
//   }

//   const menuStore = useMenuStore()
//   if ((!Array.isArray(menuStore.menuList) || !menuStore.menuList.length) && firstLoad) {
//     firstLoad = false
//     await getDynamicRoutes().then((menus) => {
//       Array.isArray(menus) &&
//         menus.forEach((route) => {
//           if (!router.hasRoute(route.name)) {
//             router.addRoute(route)
//           }
//         })
//       next({ ...to, replace: true })
//     })
//   } else {
//     if (!checkPath(to.path) && to.path !== '/404') {
//       next('/404')
//     } else {
//       next()
//     }
//   }
// })
// export default router
export default routes
