/*
 * @Description:
 * @version:
 * @Author: JupSat
 * @email: jupsat@163.com
 * @Date: 2023-01-10 19:48:03
 * @LastEditors: JupSat
 * @LastEditTime: 2023-01-20 16:28:09
 */
import { defineStore } from 'pinia'

export const useCommonStore = defineStore('common', {
  state: () => {
    return {
      language: 'zh',
      theme: 'blue'
    }
  },
  getters: {},
  actions: {
    setLanguage(language) {
      this.language = language
    },
    setTheme(theme) {
      this.theme = theme
    }
  }
})
