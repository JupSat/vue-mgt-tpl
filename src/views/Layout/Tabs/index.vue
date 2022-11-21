<template>
  <div class="tabs">
    <el-tabs v-model="activeTab" type="card" class="menu-tabs" closable @tab-click="clickTab" @tab-remove="removeTab">
      <el-tab-pane v-for="item in tabs" :key="item.name" :label="item.name" :name="item.name"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { computed, watch, reactive, toRefs } from 'vue'
import { useTabsStore } from "@/pinia/modules/tabs";
import { useRoute, useRouter } from 'vue-router'

export default {
  name: "Tabs",
  setup() {
    const data = reactive({
      activeTab: '',
      tabs: []
    })

    const tabsStore = useTabsStore()
    const router = useRouter()
    const clickTab = ({ index }) => {
      const tab = data.tabs[+index]
      router.push({
        name: tab.name,
      })
    }

    const removeTab = (targetName) => {
      const tabs = data.tabs
      let activeName = data.activeTab
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
      tabsStore.setActiveTab(activeName)
      tabsStore.setTabs(tabs.filter((tab) => tab.name !== targetName))
    }

    data.tabs = computed(() => tabsStore.tabs)
    data.activeTab = computed(() => tabsStore.activeTab)

    const route = useRoute()
    watch(route, () => {
      tabsStore.routeChange(route)
    })

    return {
      ...toRefs(data),
      clickTab,
      removeTab,
      tabsStore,
      router
    }
  }
}
</script>

<style scoped lang="scss">
.tabs {
  padding: 8px 35px;

  :deep(.el-tabs__item) {
    color: #8f9bb3;
  }

  :deep(.el-tabs__item:hover) {
    color: #409EFF;
  }
}

.el-tabs {
  --el-tabs-header-height: none;
}

.menu-tabs>.el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
