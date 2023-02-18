/*
 * @Description:
 * @version:
 * @Author: JupSat
 * @email: jupsat@163.com
 * @Date: 2023-01-10 19:48:03
 * @LastEditors: JupSat
 * @LastEditTime: 2023-02-15 17:05:09
 */
import { defineStore } from 'pinia'

export const useCommonStore = defineStore('common', {
  state: () => {
    return {
      language: 'zh',
      theme: 'light',
      isCollapse: false
    }
  },
  getters: {},
  actions: {
    setLanguage(language) {
      this.language = language
    },
    setTheme(theme) {
      this.theme = theme
    },
    setCollapse(param) {
      this.isCollapse = param
    }
  }
})
