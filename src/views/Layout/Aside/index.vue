<template>
  <el-aside>
    <el-scrollbar always>
      <el-menu :default-active="route.path" :collapse="isCollapse" collapse-transition @open="handleOpen"
        @close="handleClose">
        <el-menu-item v-for="{ id, icon, name } in menuNoChild" :key="id" :index="id" @click="clickMenu(name)">
          <el-icon>
            <component :is="icon" />
          </el-icon>
          <template #title>{{ $t(id) }}</template>
        </el-menu-item>
        <el-sub-menu v-for="{ id, icon, children } in menuHasChild" :key="id" :index="id" @open="handleOpen"
          @close="handleClose">
          <template #title>
            <el-icon>
              <component :is="icon" />
            </el-icon>
            <span>{{ $t(id) }}</span>
          </template>

          <el-menu-item v-for="item in children" :key="item.id" :index="item.id" @click="clickMenu(item.name)">
            {{ $t(item.id) }}
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useRoute } from 'vue-router'
import { useMenuStore } from "@/pinia/modules/menu";

export default {
  name: "Aside",
  emits: ['goView'],
  setup(props, { emit }) {
    const state = reactive({
      isCollapse: false,
      menuNoChild: [],
      menuHasChild: []
    });

    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath);
    };
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath);
    };

    const clickMenu = (name) => {
      emit('goView', name)
    };

    const selectMenu = (key, keyPath) => {
      console.log(key, keyPath);
    };

    const selectMenuItem = (key, keyPath) => {
      console.log(key, keyPath);
    };

    const setCollapse = () => {
      state.isCollapse = !state.isCollapse;
    };

    const getMenu = async () => {
      const menuStore = useMenuStore()
      const menuList = menuStore.menuList
      state.menuNoChild = menuList.filter(item => !item.children || item.children.some(v => v.hidden))
      state.menuHasChild = menuList.filter(item => item.children && item.children.some(v => !v.hidden))
    }
    getMenu()

    const route = useRoute();

    return {
      ...toRefs(state),
      handleOpen,
      handleClose,
      clickMenu,
      selectMenu,
      selectMenuItem,
      setCollapse,
      route,
    };
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/switchTheme.scss";

.el-aside {
  @include bg_color("mainColor");
  box-shadow: 0 0.5rem 1rem 0 #1a1f33;
  @include font_color("fontColor");
  font-family: Open Sans, sans-serif;
  font-size: 0.9375rem;
  font-weight: 400;
  line-height: 1.25rem;
  width: auto;

  :deep(.el-sub-menu) {
    min-width: 217.37px;
    @include font_color("fontColor");
  }

  :deep(.el-sub-menu__title) {
    @include bg_color("secondaryColor");
    border-bottom: 1px solid #151a30 !important;
    @include font_color("fontColor");

    span {
      padding-right: 25px;
    }
  }

  :deep(.el-scrollbar__thumb) {
    @include bg_color("scrollbarColor");
    opacity: 1;
  }
}

.el-menu {
  border-right: none;
  @include bg_color("secondaryColor");
}

:deep(.el-sub-menu__title:hover) {
  color: #598bff;
}

.el-menu-item-group {
  @include bg_color("secondaryColor");

  ul>.is-active {
    color: #598bff;
  }
}

:deep(.el-menu-item-group__title) {
  display: none;
}

.el-menu-item {
  @include font_color("fontColor");
  @include bg_color("secondaryColor");
  border-bottom: 1px solid #151a30;
}

.el-menu-item:hover {
  color: #598bff;
}

.el-menu>.is-active {
  color: #598bff;
}

:deep(.el-scrollbar__bar.is-vertical > div) {
  width: 65%;
  margin-left: 4px;
}
</style>
