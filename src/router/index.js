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
      let path = parent.id ? `/${parent.id}/${el.id}` : `/${el.id}`
      const item = {
        path,
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
        el.id && (item.redirect = `/${el.id}/${el.children[0].id}`)
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
  await getDynamicRoutes()
  next()
})

export default router
