import { defineStore } from 'pinia'

export const useTabsStore = defineStore('tabs', {
  state: () => {
    return {
      activeTab: '',
      tabs: []
    }
  },
  getters: {

  },
  actions: {
    routeChange(route) {
      if (route) {
        const hasOne = this.tabs.find(t => t.name === route.name)
        !hasOne && this.tabs.push({ name: route.name, path: route.path })
        this.activeTab = route.name
      }
    },
    setActiveTab(activeTab) {
      this.activeTab = activeTab
    },
    setTabs(tabs) {
      this.tabs = tabs
    }
  },
})
