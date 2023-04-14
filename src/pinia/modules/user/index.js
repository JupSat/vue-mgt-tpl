/*
 * @Description: 用户相关
 * @version:
 * @Author: JupSat
 * @email: jupsat@163.com
 * @Date: 2023-01-10 19:48:03
 * @LastEditors: JupSat
 * @LastEditTime: 2023-03-28 21:59:10
 */
import { defineStore } from 'pinia'
import { setToken, clearToken } from '@/utils/token'
import { store } from '@/pinia'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user: {
        username: '',
        password: ''
      },
      testVal: ''
    }
  },
  getters: {},
  actions: {
    setTestVal(val) {
      this.testVal = val
    },
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

// 防止提示安装pinia
export function useUserStoreWithOut() {
  return useUserStore(store)
}
