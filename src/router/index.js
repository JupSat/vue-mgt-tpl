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

  if (!menuList || menuList.length === 0) {
    return routes
  }

  const iterator = (list, parent) => {
    const menus = []
    list &&
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

        if (
          parent &&
          parent.name &&
          (!el.children || el.children.length === 0)
        ) {
          item.component = () =>
            import(`@/components/${parent.name}/${el.name}`)
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
  return [...tempMenus]
}

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

function checkPath(subPath) {
  const componentPaths = require.context('@/components/', true, /.vue$/).keys()
  const viewPaths = require.context('@/views/', true, /.vue$/).keys()
  const paths = [...componentPaths, ...viewPaths]
  const flag = paths.some((path) =>
    path.toLowerCase().includes(subPath.toLowerCase())
  )
  return flag
}

let firstLoad = true

router.beforeEach(async (to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }

  const menuStore = useMenuStore()
  if (
    (!Array.isArray(menuStore.menuList) || !menuStore.menuList.length) &&
    firstLoad
  ) {
    firstLoad = false
    await getDynamicRoutes().then((menus) => {
      Array.isArray(menus) &&
        menus.forEach((route) => {
          if (!router.hasRoute(route.name)) {
            router.addRoute(route)
          }
        })
      next({ ...to, replace: true })
    })
  } else {
    if (!checkPath(to.path) && to.path !== '/404') {
      next('/404')
    } else {
      next()
    }
  }
})
export default router
