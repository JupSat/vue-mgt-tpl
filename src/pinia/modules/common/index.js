import { defineStore } from 'pinia'

export const useCommonStore = defineStore('common', {
  state: () => {
    return {
      language: 'zh',
      theme: 'light'
    }
  },
  getters: {

  },
  actions: {
    setLanguage(language) {
      this.language = language
    },
    setTheme(theme) {
      this.theme = theme
    }
  }
})
