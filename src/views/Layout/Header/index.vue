<template>
  <el-header>
    <div class="header-layout">
      <div class="header-container">
        <div class="logo-container">
          <div @click="setCollapse()" class="sidebar-toggle">
            <el-icon :size="22" color="#8f9bb3">
              <Fold />
            </el-icon>
          </div>
          <div class="logo" @click="navigateHome()">vue-mgt-tpl</div>
        </div>

        <div>
          <el-select @change="changeTheme" v-model="them">
            <el-option label="Dark" :value="0" />
            <el-option label="Light" :value="90" />
            <el-option label="Cosmic" :value="45" />
          </el-select>
        </div>
      </div>

      <div class="header-container-right">
        <div>
          <el-icon :size="22" color="#8f9bb3">
            <Search />
          </el-icon>
        </div>
        <div>
          <el-icon :size="22" color="#8f9bb3">
            <Message />
          </el-icon>
        </div>
        <div>
          <el-icon :size="22" color="#8f9bb3">
            <Bell />
          </el-icon>
        </div>
        <div class="user-info">
          <div>
            <img class="user-img" src="~@/assets/img/doge.jpg" alt="" />
            <span>JupSat</span>
          </div>
        </div>
      </div>
    </div>
  </el-header>
</template>

<script>
import {
  reactive,
  toRefs,
  onBeforeMount,
  onMounted,
} from "vue";

export default {
  name: "Header",
  components: {},
  emits: ['changeCollapse'],
  setup(props, { emit }) {
    const state = reactive({
      them: 0,
    });
    onBeforeMount(() => { });
    onMounted(() => { });

    const setCollapse = () => {
      emit("changeCollapse");
    };

    const changeTheme = () => {
      // to-do: 切换主题
    };

    const navigateHome = () => {
      // to-do: 首页导航
    };
    return {
      ...toRefs(state),
      setCollapse,
      changeTheme,
      navigateHome,
    };
  },
};
</script>
<style scoped lang="scss">
.el-header {
  position: fixed;
  width: 100%;
  height: 76px;
  padding: 0;
  z-index: 100;
}

.header-container {
  display: flex;
  align-items: center;
  width: auto;
  margin-left: 20px;

  .el-select {
    width: 105px;
    margin-left: 30px;
    // border: 1px solid #36f;
    // border-radius: 4px;
    background-color: #192038;
  }

  .sidebar-toggle {
    text-decoration: none;
  }

  .logo {
    padding: 0 2.25rem;
    font-size: 1.75rem;
    white-space: nowrap;
    text-decoration: none;
    color: #fff;
  }
}

.header-layout {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
  font-size: 12px;
  text-align: right;
  background-color: #222b45;
  color: var(--el-text-color-primary);
  box-shadow: 0 0.5rem 1rem 0 #1a1f33;
}

.header-container-right {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 380px;

  >div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 85px;
    border-left: 1px solid #151a30;
  }

  .user-info {
    width: 120px;
    font-size: 18px;
    color: #fff;

    >div {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    span {
      margin-left: 6px;
    }
  }
}

.logo-container {
  display: flex;
  align-items: center;
  //   width: calc(#{nb-theme(sidebar-width)} - #{nb-theme(header-padding)});
}

:deep(.el-input__wrapper) {
  padding: 0;

  .el-input__inner {
    border-color: #36f;
    border-radius: 3px;
    color: #fff;
    background-color: #192038;
    font-size: 0.9375rem;
    font-weight: 600;
    line-height: 1.5rem;
  }
}

:deep(#el-popper-container-621 > .el-popper) {
  background-color: #222b45;
}

:deep(.el-select__popper) {
  background-color: #222b45;

  .el-select-dropdown__item {
    font-size: 0.9375rem;
    font-weight: 600;
    line-height: 1.5rem;
    color: #fff;
  }
}

.user-img {
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 50%;
}
</style>
