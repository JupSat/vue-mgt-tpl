import { defineStore } from 'pinia'
// import router from '@/router'
import { useRouter } from 'vue-router'
const router = useRouter()

export const useTabsStore = defineStore('tabs', {
  state: () => {
    return {
      activeTab: '',
      tabs: []
    }
  },
  getters: {},
  actions: {
    routeChange(route) {
      if (route) {
        const hasOne = this.tabs.find((t) => t.name === route.name)
        !hasOne && this.tabs.push({ name: route.name, path: route.path })
        this.activeTab = route.name
      }
    },
    setActiveTab(activeTab) {
      this.activeTab = activeTab
    },
    setTabs(tabs) {
      this.tabs = tabs
    },
    removeTab(targetName) {
      const tabs = this.tabs
      const activeName = this.getNextTab(targetName)
      this.setActiveTab(activeName)
      this.setTabs(tabs.filter((tab) => tab.name !== targetName))
      router.push({ name: activeName })
    },
    getNextTab(targetName) {
      const tabs = this.tabs
      let activeName = this.activeTab
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            const nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
            }
          }
        })
      }
      return activeName
    }
  }
})
