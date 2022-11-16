import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home')
  },
  {
    path: '/layout',
    name: 'Layout',
    component: () => import(/* webpackChunkName: "layout" */ '@/views/Layout'),
    children: [
      {
        path: '/eCommerce',
        name: 'ECommerce',
        component: () => import(/* webpackChunkName: "eCommerce" */ '@/components/ECommerce')
      },
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/components/Dashboard'),
        children: [
          {
            path: '/workflow',
            name: 'Workflow',
            component: () => import(/* webpackChunkName: "workflow" */ '@/components/Dashboard/Workflow')
          },
        ]
      },
    ]
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
