/*
 * @Description: 用户相关
 * @version:
 * @Author: JupSat
 * @email: jupsat@163.com
 * @Date: 2023-01-10 19:48:03
 * @LastEditors: JupSat
 * @LastEditTime: 2023-01-17 10:44:31
 */
import { defineStore } from 'pinia'
import { setToken, clearToken } from '@/utils/token'

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
      setToken(val.token || '')
    },
    clearUserInfo() {
      Object.keys(this.user).forEach((key) => {
        this.user[key] = ''
      })
      clearToken()
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
