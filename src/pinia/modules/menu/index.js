/*
 * @Description:
 * @version:
 * @Author: JupSat
 * @email: jupsat@163.com
 * @Date: 2023-01-10 19:48:03
 * @LastEditors: JupSat
 * @LastEditTime: 2023-06-13 19:01:52
 */
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
      // 临时过滤，后续需修改
      const menus = res.data.menuList.filter((el) => el.key === 'tenLine')
      this.menuList = menus
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
