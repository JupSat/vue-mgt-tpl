import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/views/Layout'
import { useMenuStore } from "@/pinia/modules/menu";

let routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home'),
    meta: {
      title: '首页',
      id: 'home'
    },
  },
]

async function getDynamicRoutes() {
  const menuStore = useMenuStore()
  await menuStore.loadMenu()
  const menuList = menuStore.menuList
  const iterator = (list, parent) => {
    const menus = []
    list.forEach(el => {
      const item = {
        path: el.path,
        name: el.name,
        icon: el.icon,
        component: Layout,
        meta: {
          title: el.id,
          id: el.id
        },
      }

      if (parent && parent.name && (!el.children || el.children.length === 0)) {
        item.component = () => import(`@/components/${parent.name}/${el.name}`)
      }
      if (el.children && el.children.length > 0) {
        item.children = iterator(el.children, el)
        item.redirect = el.redirect
      }
      menus.push(item)
    });
    return menus
  }
  iterator(menuList, '').forEach(v => {
    router.addRoute(v)
  })
}

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  const menuStore = useMenuStore()
  if (menuStore.menuList.length === 0) {
    await getDynamicRoutes()

    // matched为空时，防止找不到路由
    if (to.matched.length == 0) {
      router.push(to.path);
      return
    } else {
      next({ ...to, replace: true })
    }
  } else {
    next()
  }
})

export default router
