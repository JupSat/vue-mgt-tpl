import { defineStore } from 'pinia'
import { asyncMenu } from '@/api/menu'

export const useMenuStore = defineStore('menu', {
  state: () => {
    return {
      menuList: []
    }
  },
  getters: {},
  actions: {
    async loadMenu() {
      const res = await asyncMenu()
      this.menuList = res.data.menuList
    },
    addMenu(menu) {
      if (Array.isArray(menu)) {
        menu.forEach((item) => {
          this.menuList.push(item)
        })
      } else {
        this.menuList.push(menu)
      }
    }
  },
  persist: {
    enabled: false,
    strategies: [
      {
        // 自定义key
        key: 'menu',
        // 自定义存储方式，默认sessionStorage
        storage: localStorage,
        paths: ['menuList']
      }
    ]
  }
})
