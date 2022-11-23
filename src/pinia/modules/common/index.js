import { defineStore } from 'pinia'

export const useCommonStore = defineStore('common', {
  state: () => {
    return {
      language: ''
    }
  },
  getters: {

  },
  actions: {
    setLanguage(language) {
      this.language = language
    }
  }
})
