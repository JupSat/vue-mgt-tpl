import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/views/Layout'

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
  // {
  //   path: '/layout',
  //   name: 'Layout',
  //   component: Layout,
  //   meta: {
  //     title: '布局',
  //     id: 'layout'
  //   },
  // },
  {
    path: '/eCommerce',
    name: 'ECommerce',
    // component: () => import(/* webpackChunkName: "eCommerce" */ '@/components/ECommerce'),
    component: Layout,
    redirect: '/eCommerce/overview',
    meta: {
      title: '概览',
      id: 'ECommerce'
    },
    children: [
      {
        path: '/eCommerce/overview',
        name: 'Overview',
        component: () => import(/* webpackChunkName: "eCommerce" */ '@/components/ECommerce'),
        meta: {
          title: '概览',
          id: 'ECommerce'
        },
      }]
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Layout,
    redirect: '/dashboard/workplace',
    meta: {
      title: '仪表盘',
      id: 'dashboard'
    },
    children: [
      {
        path: '/dashboard/workplace',
        name: 'workplace',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/components/Dashboard'),
        meta: {
          title: '工作台',
          id: 'workplace'
        },
      },
      {
        path: '/dashboard/workflow',
        name: 'Workflow',
        component: () => import(/* webpackChunkName: "workflow" */ '@/components/Dashboard/Workflow'),
        meta: {
          title: '工作流',
          id: 'workflow'
        },
      },
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
