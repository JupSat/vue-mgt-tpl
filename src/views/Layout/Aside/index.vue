<template>
  <el-aside :width="isCollapse ? '64px' : '217.37px'">
    <el-scrollbar always>
      <el-menu
        :default-active="route.path"
        :router="true"
        :collapse="isCollapse"
        collapse-transition
        @open="handleOpen"
        @close="handleClose"
        active-text-color="#ffd04b"
        text-color="#fff"
      >
        <el-menu-item
          v-for="{ id, icon, path } in menuNoChild"
          :key="id"
          :index="path"
        >
          <el-icon>
            <component :is="icon" />
          </el-icon>
          <template #title>{{ $t(id) }}</template>
        </el-menu-item>
        <el-sub-menu
          v-for="{ id, icon, children, path } in menuHasChild"
          :key="id"
          :index="path"
          @open="handleOpen"
          @close="handleClose"
        >
          <template #title>
            <el-icon>
              <component :is="icon" />
            </el-icon>
            <span>{{ $t(id) }}</span>
          </template>

          <el-menu-item
            v-for="{ id, path } in children"
            :key="id"
            :index="path"
          >
            {{ $t(id) }}
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-scrollbar>
  </el-aside>
  <div class="collapse">
    <el-affix :offset="350">
      <el-icon size="23" :color="'#8f9bb3'" @click="isCollapse = !isCollapse"
        ><DArrowLeft v-if="!isCollapse" /><DArrowRight v-else
      /></el-icon>
    </el-affix>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import { useMenuStore } from '@/pinia/modules/menu'

export default {
  name: 'Aside',
  setup() {
    const state = reactive({
      isCollapse: false,
      menuNoChild: [],
      menuHasChild: []
    })

    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath)
    }
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath)
    }

    const selectMenu = (key, keyPath) => {
      console.log(key, keyPath)
    }

    const selectMenuItem = (key, keyPath) => {
      console.log(key, keyPath)
    }

    const setCollapse = () => {
      state.isCollapse = !state.isCollapse
    }

    const getMenu = async () => {
      const menuStore = useMenuStore()
      const menuList = menuStore.menuList
      state.menuNoChild = menuList.filter(
        (item) => !item.children || item.children.some((v) => v.hidden)
      )
      state.menuHasChild = menuList.filter(
        (item) => item.children && item.children.some((v) => !v.hidden)
      )
    }
    getMenu()

    const route = useRoute()

    return {
      ...toRefs(state),
      handleOpen,
      handleClose,
      selectMenu,
      selectMenuItem,
      setCollapse,
      route
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/switchTheme.scss';

.el-aside {
  @include bg_color('mainColor');
  box-shadow: 0 0.5rem 1rem 0 #1a1f33;
  @include font_color('fontColor');
  font-family: Open Sans, sans-serif;
  font-size: 0.9375rem;
  font-weight: 400;
  line-height: 1.25rem;
  :deep(.el-sub-menu) {
    @include font_color('fontColor');
  }

  :deep(.el-sub-menu__title) {
    @include bg_color('secondaryColor');
    border-bottom: 1px solid #151a30 !important;
    @include font_color('fontColor');

    &:hover {
      color: #598bff !important;
    }

    span {
      padding-right: 25px;
    }
  }

  :deep(.el-scrollbar__thumb) {
    @include bg_color('scrollbarColor');
    opacity: 1;
  }
}

.el-menu {
  border-right: none;
  @include bg_color('secondaryColor');
}

.el-menu-item-group {
  @include bg_color('secondaryColor');

  ul > .is-active {
    color: #598bff;
  }
}

:deep(.el-menu-item-group__title) {
  display: none;
}

.el-menu-item {
  @include font_color('fontColor');
  @include bg_color('secondaryColor');
  border-bottom: 1px solid #151a30;

  &:hover {
    color: #598bff !important;
  }
}

:deep(.el-menu-item.is-active) {
  color: #598bff !important;
}

:deep(.el-scrollbar__bar.is-vertical > div) {
  width: 65%;
  margin-left: 4px;
}

.collapse {
  position: relative;
  @include bg_color('mainBodyColor');
  .el-affix:hover {
    cursor: pointer;
    .el-icon {
      border-radius: 50px;
      background: rgba(2, 123, 190, 0.2);
      &:hover {
        color: #598bff;
      }
    }
  }
}
</style>
