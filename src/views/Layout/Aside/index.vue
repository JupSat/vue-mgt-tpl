<template>
  <el-aside>
    <el-scrollbar always>
      <el-menu :default-openeds="defaultExpand" default-active="1" :collapse="isCollapse" collapse-transition
        @open="handleOpen" @close="handleClose">
        <el-menu-item v-for="{ id, icon } in menuList" :key="id" :index="id" @click="clickMenu(id)">
          <el-icon>
            <component :is="icon" />
          </el-icon>
          <template #title>{{ $t(id) }}</template>
        </el-menu-item>
        <el-sub-menu v-for="{ id, icon, menuItemGroup } in subMenuList" :key="id" :index="id" @select="clickMenu"
          @open="handleOpen" @close="handleClose">
          <template #title>
            <el-icon>
              <component :is="icon" />
            </el-icon>
            <span>{{ $t(id) }}</span>
          </template>
          <el-menu-item-group v-for="group in  menuItemGroup" :key="group.id" @select="selectMenuItem">
            <template #title>{{ group.title }}</template>
            <el-menu-item v-for="item in group.menuItem" :key="item.index" @click="clickMenu(item.id)">{{ $t(item.id) }}
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script>
import { reactive, toRefs } from "vue";
import axios from 'axios'
export default {
  name: "Aside",
  emits: ['goView'],
  setup(props, { emit }) {
    const state = reactive({
      defaultExpand: ["1"],
      isCollapse: false,
      menuList: null,
      subMenuList: null
    });

    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath);
    };
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath);
    };

    const clickMenu = (path) => {
      emit('goView', path)
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

    const getMenu = () => {
      axios.post('/menu/getMenu')
        .then(res => {
          state.menuList = res.data.data.menuList
          state.subMenuList = res.data.data.subMenuList
        })
    }
    getMenu()

    return {
      ...toRefs(state),
      handleOpen,
      handleClose,
      clickMenu,
      selectMenu,
      selectMenuItem,
      setCollapse
    };
  },
};
</script>

<style scoped lang="scss">
.el-aside {
  background-color: #151a30;
  box-shadow: 0 0.5rem 1rem 0 #1a1f33;
  color: #fff;
  font-family: Open Sans, sans-serif;
  font-size: 0.9375rem;
  font-weight: 400;
  line-height: 1.25rem;
  width: auto;
}

.el-menu {
  border-right: none;
}

:deep(.el-sub-menu__title) {
  background-color: #222b45;
  border-bottom: 1px solid #151a30 !important;
  color: #fff;

  span {
    padding-right: 25px;
  }
}

:deep(.el-sub-menu__title:hover) {
  color: #598bff;
}

:deep(.el-menu-item) {
  min-width: 217.37px;
}

.el-menu-item-group {
  background-color: #222b45;

  ul>.is-active {
    color: #598bff;
  }
}

:deep(.el-menu-item-group__title) {
  display: none;
}

.el-menu-item {
  background-color: #222b45;
  border-bottom: 1px solid #151a30;
  color: #fff;
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

:deep(.el-scrollbar__thumb) {
  background-color: #101426;
  opacity: 1;
}
</style>
