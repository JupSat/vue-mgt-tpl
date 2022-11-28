<template>
  <div class="tabs">
    <el-tabs
      :model-value="activeTab"
      type="card"
      class="menu-tabs"
      @tab-click="clickTab"
      @tab-remove="removeTab"
    >
      <el-tab-pane
        v-for="item in tabs"
        :key="item.name"
        :name="item.name"
        :label="$t(firstCharChange(item))"
        :closable="tabs.length > 1"
      >
      </el-tab-pane>
    </el-tabs>
    <el-dropdown trigger="click" class="operate">
      <el-icon :size="20">
        <ArrowDown />
      </el-icon>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="(item, index) in dropdownMenuList"
            :key="index"
            :disabled="item.disabled"
            @click="tabsClose(item.key)"
          >
            {{ item.label }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
import { computed, watch, reactive, toRefs, onMounted } from 'vue'
import { useTabsStore } from '@/pinia/modules/tabs'
import { useRoute } from 'vue-router'
import router from '@/router'

export default {
  name: 'Tabs',
  setup() {
    const data = reactive({
      activeTab: '',
      tabs: [],
      dropdownMenuList: [
        {
          key: 'current',
          label: '关闭当前标签页',
          disabled: true
        },
        {
          key: 'left',
          label: '关闭左侧标签页',
          disabled: true
        },
        {
          key: 'right',
          label: '关闭右侧标签页',
          disabled: true
        },
        {
          key: 'other',
          label: '关闭其他标签页',
          disabled: true
        }
      ]
    })

    const tabsStore = useTabsStore()

    const clickTab = ({ index }) => {
      const tab = data.tabs[+index]
      router.push({
        name: tab.name
      })
    }

    const removeTab = (targetName) => tabsStore.removeTab(targetName)

    const setDisabledTabPane = () => {
      data.tabs.length >= 1 &&
        data.dropdownMenuList.map((menu, index) => {
          if (data.tabs.length === 1) {
            menu.disabled = true
            return menu
          }

          let flag = true
          const tabIndex = data.tabs.findIndex(
            (item) => item.name === data.activeTab
          )
          if (index === 0 || index === 3) {
            flag = !(data.tabs.length > 1)
          } else if (index === 1) {
            flag = !(tabIndex > 0 && tabIndex <= data.tabs.length - 1)
          } else if (index === 2) {
            flag = !(
              tabIndex !== data.tabs.length - 1 && tabIndex < data.tabs.length
            )
          }
          menu.disabled = flag
          return menu
        })
    }

    data.tabs = computed(() => tabsStore.tabs)
    data.activeTab = computed(() => tabsStore.activeTab)

    const route = useRoute()
    watch(
      route,
      () => {
        tabsStore.routeChange(route)
        setDisabledTabPane()
      },
      {
        immediate: true
      }
    )

    watch(
      data.tabs,
      () => {
        setDisabledTabPane()
      },
      {
        immediate: true
      }
    )

    onMounted(() => {
      tabsStore.routeChange(route)
    })

    const firstCharChange = (item) => {
      const [char] = item.name
      return item.name.replace(char, char.toLowerCase())
    }

    const tabsClose = (key) => {
      const tempActiveTab = data.activeTab
      const tempTabs = data.tabs
      const index = tempTabs.findIndex((item) => item.name === tempActiveTab)

      if (key === 'current') {
        tabsStore.removeTab(tempActiveTab)
      } else if (key === 'left' && index > 0) {
        tabsStore.setTabs(tempTabs.slice(index))
      } else if (key === 'right' && index < tempTabs.length) {
        tabsStore.setTabs(tempTabs.slice(0, index + 1))
      } else if (key === 'other') {
        tabsStore.setTabs(tempTabs.filter((tab) => tab.name === tempActiveTab))
      }

      setDisabledTabPane()
    }

    return {
      ...toRefs(data),
      clickTab,
      removeTab,
      tabsStore,
      router,
      firstCharChange,
      tabsClose,
      setDisabledTabPane
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/switchTheme.scss';

.el-tabs {
  :deep(.el-tabs--card > .el-tabs__header) {
    border-bottom: none;
  }

  :deep(.el-tabs__header) {
    @include bg_color('secondaryColor');
    border-radius: 4px;
    border-bottom: none;

    .el-tabs__nav {
      border: none;
      border-radius: unset;
    }

    .el-tabs__item {
      border: none;
      @include borderRight('borderRightColor');
    }
  }
}

.tabs {
  position: relative;
  padding: 8px 35px;

  .menu-tabs > .el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
  }

  :deep(.el-tabs__item) {
    color: #8f9bb3;
  }

  :deep(.el-tabs__item:hover) {
    color: #409eff;
  }

  :deep(.el-tabs__item.is-active) {
    color: #409eff;
  }

  .operate {
    display: inline-block;
    position: absolute;
    right: 45px;
    top: 20px;

    .el-icon {
      color: #fff;

      &:hover {
        cursor: pointer;
        color: #409eff;
      }
    }
  }
}

.el-popper {
  @include bg_color('secondaryColor');
}

.el-dropdown__popper .el-dropdown-menu {
  @include bg_color('secondaryColor');

  :deep(.el-dropdown-menu__item) {
    border: 1px solid #151a30;
    color: #fff;
    @include border_color('borderColor');
  }

  :deep(.is-disabled) {
    cursor: not-allowed;
    color: #bbb;
  }

  :deep(.el-dropdown-menu__item:not(.is-disabled):hover) {
    background-color: #598bff;
    color: #66b1ff;
  }
}
</style>
