<template>
  <el-aside>
    <el-scrollbar always>
      <el-menu :default-openeds="defaultExpand" default-active="1" :collapse="isCollapse" collapse-transition
        @open="handleOpen" @close="handleClose">
        <el-menu-item index="11">
          <el-icon>
            <ShoppingCart />
          </el-icon>
          <template #title>E-commerce</template>
        </el-menu-item>
        <el-menu-item index="12">
          <el-icon>
            <HomeFilled />
          </el-icon>
          <template #title>IoT Dashboard</template>
        </el-menu-item>
        <el-sub-menu v-for="obj in subMenuList" :key="obj.id" :index="obj.id" @select="selectMenu" @open="handleOpen"
          @close="handleClose">
          <template #title>
            <el-icon>
              <Film v-if="obj.id === '1'" />
              <EditPen v-if="obj.id === '2'" />
              <Grid v-if="obj.id === '3'" />
              <Notebook v-if="obj.id === '4'" />
              <ChatDotRound v-if="obj.id === '5'" />
              <ZoomIn v-if="obj.id === '6'" />
              <PieChart v-if="obj.id === '7'" />
              <Edit v-if="obj.id === '8'" />
              <Menu v-if="obj.id === '9'" />
              <Switch v-if="obj.id === '10'" />
              <Lock v-if="obj.id === '11'" />
            </el-icon>
            <span>{{ obj.name }}</span>
          </template>
          <el-menu-item-group v-for="group in obj.menuItemGroup" :key="group.id" @select="selectMenuItem">
            <template #title>{{ group.title }}</template>
            <el-menu-item v-for="item in group.menuItem" :key="item.index" :index="`${obj.id}-${item.index}`"
              @click="clickMenuItem">{{ item.name }}</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu v-for="(child, k) in obj.children" :key="k" :index="`${obj.id}-${child.id}`" @select="selectMenu"
            @open="handleOpen" @close="handleClose">
            <template #title>{{ child.title }}</template>
            <el-menu-item v-for="(childItem, l) in child.menuItem" :key="l"
              :index="`${obj.id}-${child.id}-${childItem.index}`">{{ childItem.name }}</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script>
import { reactive, toRefs } from "vue";
export default {
  name: "Aside",
  setup() {
    const state = reactive({
      defaultExpand: ["1"],
      isCollapse: false,
      subMenuList: [
        {
          id: "1",
          name: "Layout",
          menuItemGroup: [
            {
              id: "1",
              title: "Group1",
              menuItem: [
                { name: "Stepper", index: "1" },
                { name: "List", index: "2" },
                { name: "Infinite List", index: "3" },
                { name: "Accordion", index: "4" },
                { name: "Tabs", index: "5" },
              ],
            },
            // {
            //   id: "2",
            //   title: "E-commerce Group2",
            //   menuItem: [{ name: "E-commerce Option3", index: "3" }],
            // },
          ],
          // children: [
          //   {
          //     id: "4",
          //     title: "E-commerce Option4",
          //     menuItem: [{ name: "E-commerce Option4-1", index: "1" }],
          //   },
          // ],
        },
        {
          id: "2",
          name: "Forms",
          menuItemGroup: [
            {
              id: "1",
              title: "Group 1",
              menuItem: [
                { name: "Form Inputs", index: "1" },
                { name: "Form Layouts", index: "2" },
                { name: "Form Inputs", index: "3" },
                { name: "Buttons", index: "4" },
                { name: "Datepicker", index: "5" },
              ],
            },
          ],
        },
        {
          id: "3",
          name: "UI Features",
          menuItemGroup: [
            {
              id: "1",
              title: "Group 1",
              menuItem: [
                { name: "Grid", index: "1" },
                { name: "Icons", index: "2" },
                { name: "Typography", index: "3" },
                { name: "Animated", index: "4" },
              ],
            },
          ],
        },
        {
          id: "4",
          name: "Modal & Overlays",
          menuItemGroup: [
            {
              id: "1",
              title: "Group 1",
              menuItem: [
                { name: "Dialog", index: "1" },
                { name: "Window", index: "2" },
                { name: "Popover", index: "3" },
                { name: "Toastr", index: "4" },
                { name: "Tooltip", index: "5" },
              ],
            },
          ],
        },
        {
          id: "5",
          name: "Extra Components",
          menuItemGroup: [
            {
              id: "1",
              title: "Group 1",
              menuItem: [
                { name: "Calendar", index: "1" },
                { name: "Progress Bar", index: "2" },
                { name: "Spinner", index: "3" },
                { name: "Alert", index: "4" },
                { name: "Calendar Kit", index: "5" },
                { name: "Chat", index: "6" },
              ],
            },
          ],
        },
        {
          id: "6",
          name: "Maps",
          menuItemGroup: [
            {
              id: "1",
              title: "Group 1",
              menuItem: [
                { name: "Google Maps", index: "1" },
                { name: "Leaflet Maps", index: "2" },
                { name: "Bubble Maps", index: "3" },
                { name: "Alert", index: "4" },
                { name: "Search Maps", index: "5" },
              ],
            },
          ],
        },
        {
          id: "7",
          name: "Charts",
          menuItemGroup: [
            {
              id: "1",
              title: "Group 1",
              menuItem: [
                { name: "Echarts", index: "1" },
                { name: "Chart.js", index: "2" },
                { name: "D3", index: "3" },
              ],
            },
          ],
        },
        {
          id: "8",
          name: "Editors",
          menuItemGroup: [
            {
              id: "1",
              title: "Group 1",
              menuItem: [
                { name: "TinyMCE", index: "1" },
                { name: "CKEditor", index: "2" },
              ],
            },
          ],
        },
        {
          id: "9",
          name: "Tables & Data",
          menuItemGroup: [
            {
              id: "1",
              title: "Group 1",
              menuItem: [
                { name: "Smart Table", index: "1" },
                { name: "Tree Grid", index: "2" },
              ],
            },
          ],
        },
        {
          id: "10",
          name: "Miscellaneous",
          menuItemGroup: [
            {
              id: "1",
              title: "Group 1",
              menuItem: [
                { name: "404", index: "1" },
                { name: "Tree Grid", index: "2" },
              ],
            },
          ],
        },
        {
          id: "11",
          name: "Auth",
          menuItemGroup: [
            {
              id: "1",
              title: "Group 1",
              menuItem: [
                { name: "Login", index: "1" },
                { name: "Register", index: "2" },
                { name: "Request Password", index: "3" },
                { name: "Reset Password", index: "4" },
              ],
            },
          ],
        },
      ],
    });

    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath);
    };
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath);
    };

    const selectMenu = (key, keyPath) => {
      console.log(key, keyPath);
    };

    const selectMenuItem = (key, keyPath) => {
      console.log(key, keyPath);
    };

    const clickMenuItem = (key, keyPath) => {
      console.log(key, keyPath);
    };

    const setCollapse = () => {
      state.isCollapse = !state.isCollapse;
    };

    return {
      ...toRefs(state),
      handleOpen,
      handleClose,
      selectMenu,
      selectMenuItem,
      clickMenuItem,
      setCollapse
    };
  },
};
</script>

<style scoped lang="scss">
.layout-container {
  text-align: left;
  background: #151a30;

  .toggle-settings {
    position: fixed;
    top: 50%;
    right: 0;
    border-radius: 0.25rem;
    box-shadow: none;
    transition: transform .3s ease;
    z-index: 998;

    >.el-button {
      background: #fff;
      box-shadow: none;
      border: none;
      height: 3rem;
      width: 3rem;
      padding: 0;
      text-align: center;
    }
  }
}

:deep(.el-popper-container-1717) {
  .is-light {
    background: none;
    border: none;
  }
}


.el-menu {
  border-right: none;
  margin-right: 5px;
}

.el-main {
  padding: 0;
}

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

.el-menu-item-group {
  background-color: #222b45;

  ul>.is-active {
    color: #598bff;
  }
}

:deep(.el-menu-item-group__title) {
  // border-bottom: 1px solid #151a30;
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
