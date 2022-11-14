import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home/index')
  },
  // {
  //   path: '/login',
  //   name: 'Login',
  //   component: () => import('@/views/login/index.vue')
  // },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
