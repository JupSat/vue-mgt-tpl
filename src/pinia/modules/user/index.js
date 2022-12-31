import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  getters: {},
  actions: {
    setUserInfo(val) {
      Object.keys(this.user).forEach((key) => {
        this.user[key] = val[key]
      })
    },
    clearUserInfo() {
      Object.keys(this.user).forEach((key) => {
        this.user[key] = ''
      })
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'user', // 自定义key
        storage: sessionStorage, // 自定义存储方式，默认sessionStorage
        paths: ['user']
      }
    ]
  }
})
