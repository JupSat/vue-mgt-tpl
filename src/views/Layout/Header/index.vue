<template>
  <el-header>
    <div class="header-layout">
      <div class="header-container">
        <div class="logo-container">
          <div @click="setCollapse()" class="sidebar-toggle">
            <el-icon :size="22" :color="color">
              <Fold />
            </el-icon>
          </div>
          <div class="logo" @click="navigateHome()">vue-mgt-tpl</div>
        </div>

        <div>
          <el-select @change="changeTheme" v-model="theme" popper-class="custom-select">
            <el-option :label="$t('dark')" :value="0" />
            <el-option :label="$t('light')" :value="90" />
            <el-option :label="$t('cosmic')" :value="45" />
          </el-select>
        </div>
      </div>

      <div class="header-container-right">
        <div>
          <el-icon :size="23" :color="color">
            <Search />
          </el-icon>
        </div>
        <div>
          <el-dropdown trigger="click">
            <el-badge :value="99" class="item">
              <el-icon :size="23" :color="color">
                <Message />
              </el-icon>
            </el-badge>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-for="item in [1, 2, 3, 4, 5]">
                  这是第{{ item }}个邮件
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <div>
          <el-dropdown trigger="click">
            <el-badge :value="66" class="item" type="primary">
              <el-icon :size="23" :color="color">
                <Bell />
              </el-icon>
            </el-badge>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-for="item in [1, 2, 3, 4, 5]">
                  这是第{{ item }}条消息
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>

        <div class="language">
          <el-select v-model="language" popper-class="custom-select">
            <el-option :label="$t('langZh')" value="zh" />
            <el-option :label="$t('langEn')" value="en" />
          </el-select>
        </div>

        <div class="user-info-dropdown">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <div class="user-info">
                <div>
                  <img class="user-img" src="~@/assets/img/doge.jpg" alt="" />
                  <span>JupSat</span>
                  <el-icon class="el-icon--right">
                    <caret-bottom />
                  </el-icon>
                </div>
              </div>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  {{ $t('profile') }}
                </el-dropdown-item>
                <el-dropdown-item>
                  {{ $t('forgotPassword') }}
                </el-dropdown-item>
                <el-dropdown-item>
                  {{ $t('settings') }}
                </el-dropdown-item>
                <el-dropdown-item>
                  {{ $t('signOut') }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
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
  watch
} from "vue";
import { useI18n } from 'vue-i18n'

export default {
  name: "Header",
  components: {},
  emits: ['changeCollapse'],
  setup(props, { emit }) {
    const state = reactive({
      theme: 0,
      language: 'zh',
      color: '#8f9bb3'
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

    const { locale } = useI18n()
    watch(() => state.language, () => {
      locale.value = state.language
    })

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
  margin-right: 25px;

  >div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    margin: 0px 2px;
    border-left: 1px solid #151a30;
  }

  .language {
    width: 102px;

    .el-select {
      height: 45px;
      padding-top: 4px;
    }
  }

  .user-info-dropdown {
    width: 120px;
    margin-left: 20px;

    .el-dropdown {
      margin-right: 0
    }

    .user-info {
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

}

.logo-container {
  display: flex;
  align-items: center;
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

.el-popper {
  background-color: #222b45;
}

.user-img {
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 50%;
}

.el-dropdown {
  // margin-left: 50px;
}

.el-dropdown__popper .el-dropdown-menu {
  background-color: #222b45;

  :deep(.el-dropdown-menu__item) {
    border: 1px solid #151a30;
    color: #fff !important
  }

  :deep(.el-dropdown-menu__item:not(.is-disabled):hover) {
    background-color: #598bff;
    color: #66b1ff;
  }
}

:deep(.is-light) {
  background: none;
  border: 0px solid #151a30;
}
</style>
