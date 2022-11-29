import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/views/Layout'
import { useMenuStore } from '@/pinia/modules/menu'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home'),
    meta: {
      title: '首页',
      id: 'home'
    }
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/Pages/404.vue'),
    meta: {
      title: '404',
      id: '404'
    }
  },
  {
    path: '/500',
    name: '500',
    component: () => import('@/views/Pages/500.vue'),
    meta: {
      title: '500',
      id: '500'
    }
  }
]

async function getDynamicRoutes() {
  const menuStore = useMenuStore()
  await menuStore.loadMenu()
  const menuList = menuStore.menuList

  const iterator = (list, parent) => {
    const menus = []
    list.forEach((el) => {
      const item = {
        path: el.path,
        name: el.name,
        icon: el.icon,
        component: Layout,
        meta: {
          title: el.id,
          id: el.id
        }
      }

      if (parent && parent.name && (!el.children || el.children.length === 0)) {
        item.component = () => import(`@/components/${parent.name}/${el.name}`)
      }
      if (el.children && el.children.length > 0) {
        item.children = iterator(el.children, el)
        item.redirect = el.redirect
      }
      menus.push(item)
    })
    return menus
  }
  const tempMenus = iterator(menuList, '')
  const menus = [...routes, ...tempMenus]

  menus.forEach((route) => {
    if (!router.hasRoute(route.name)) {
      router.addRoute(route)
    }
  })
}

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

function checkPath(subPath) {
  const filePaths = require.context('@/components/', true, /.vue$/).keys()
  const filePaths2 = require.context('@/views/', true, /.vue$/).keys()
  const paths = [...filePaths, ...filePaths2]
  const flag = paths.some((path) => {
    if (path.toLowerCase().includes(subPath.toLowerCase())) return true
    return false
  })
  return flag
}

router.beforeEach(async (to, from, next) => {
  const menuStore = useMenuStore()

  if (menuStore.menuList.length === 0) {
    await getDynamicRoutes()
    // matched为空时，防止找不到路由
    if (to.matched.length === 0) {
      router.push(to.path)
    } else {
      next()
    }
  } else {
    if (!checkPath(to.path) && to.path !== '/404') {
      next('/404')
    } else {
      next()
    }
  }
})
export default router
