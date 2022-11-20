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

        <div class="header-select">
          <el-select @change="changeTheme" v-model="theme" popper-class="custom-select">
            <el-option :label="$t('dark')" value="dark" />
            <el-option :label="$t('light')" value="light" />
          </el-select>
        </div>
      </div>

      <div class="header-container-right">
        <div class="search">
          <el-select v-model="menuValue" filterable remote reserve-keyword :remote-method="remoteMethod"
            :placeholder="$t('plzEnterKeyword')" :loading="loading">
            <el-option v-for="item in menuList" :key="item.id" :label="$t(item.id)" :value="item.id" />
          </el-select>
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
                <el-dropdown-item v-for="item in getShowList">
                  这是第{{ item }}个邮件
                </el-dropdown-item>
                <template v-show="list.length > 4">
                  <el-dropdown-item>
                    <div class="view-more">
                      查看更多
                      <el-icon :size="14">
                        <ArrowRight />
                      </el-icon>
                    </div>
                  </el-dropdown-item>
                </template>
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
                <el-dropdown-item v-for="item in getShowList">
                  <span>这是第{{ item }}条消息</span>
                </el-dropdown-item>
                <template v-show="list.length > 4">
                  <el-dropdown-item>
                    <div class="view-more">
                      查看更多
                      <el-icon :size="14">
                        <ArrowRight />
                      </el-icon>
                    </div>
                  </el-dropdown-item>
                </template>
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
                <el-dropdown-item @click="signOut">
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
  ref,
  watch,
  computed
} from "vue";
import { useI18n } from 'vue-i18n'
// import { useCssVar } from '@vueuse/core'
import request from "@/utils/http/request";
import { useRouter } from 'vue-router'
import { useMenuStore } from "@/pinia/modules/menu";

export default {
  name: "Header",
  components: {},
  emits: ['changeCollapse', 'switchTheme'],
  setup(props, { emit }) {
    const state = reactive({
      theme: 'dark',
      language: 'zh',
      color: '#8f9bb3',
      list: [1, 2, 3, 4, 5, 6, 7, 8],
      menuList: [],
      menuValue: '',
      loading: false
    });

    // 菜单展开(或折叠)
    const setCollapse = () => {
      emit("changeCollapse");
    };

    const changeTheme = () => {
      emit("switchTheme", state.theme);
    };

    const router = useRouter()
    // 回到首页
    const navigateHome = () => {
      router.push({ path: '/' })
    };

    // 退出
    const signOut = () => {
      navigateHome()
    };

    // 语言切换
    const { locale } = useI18n()
    watch(() => state.language, () => {
      locale.value = state.language
    })

    const tempList = state.list
    const getShowList = computed({
      get() {
        return tempList.splice(0, 4)
      },
    })

    // 搜索菜单
    const remoteMethod = (query) => {
      if (query) {
        state.loading = true
        const menuStore = useMenuStore()
        const menuList = menuStore.menuList.map(list => list.children.flat()).flat()
        state.loading = false
        state.menuList = menuList.filter((item) => {
          return item.id.toLowerCase().includes(query.toLowerCase())
        })
      } else {
        state.menuList = []
      }
    }

    return {
      ...toRefs(state),
      setCollapse,
      changeTheme,
      navigateHome,
      getShowList,
      remoteMethod,
      signOut,
    };
  },
};
</script>
<style scoped lang="scss">
@import "@/styles/switchTheme.scss";

.el-header {
  position: fixed;
  width: 100%;
  height: 76px;
  padding: 0;
  z-index: 100;
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
  color: var(--el-text-color-primary);
  @include bg_color("secondaryColor");
  @include box_shadow("boxShadowColor");

  :deep(.el-input__wrapper) {
    padding: 0;

    .el-input__inner {
      border-radius: 3px;
      border-color: #101426;
      @include font_color("fontColor");
      @include bg_color("mainColor");
      font-size: 14px;
      font-weight: 400;
    }
  }

  .header-container {
    display: flex;
    align-items: center;
    width: auto;
    margin-left: 20px;

    .el-select {
      width: 105px;
      margin-left: 30px;
      @include bg_color("mainColor");
    }

    .sidebar-toggle {
      text-decoration: none;
    }

    .logo {
      padding: 0 2.25rem;
      font-size: 1.75rem;
      white-space: nowrap;
      text-decoration: none;
      @include font_color("fontColor");
    }
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

    >div:nth-child(1) {
      border-left: none;
    }

    .search {
      width: 128px;

      .el-select {
        height: 45px;
        padding-top: 4px;
      }
    }


    .language {
      width: 128px;
      padding-left: 22px;

      .el-select {
        height: 45px;
        padding-top: 4px;
      }
    }

    .user-info-dropdown {
      width: 120px;
      margin-left: 20px;

      .el-dropdown {
        margin-left: 20px;
        margin-right: 0
      }

      .user-info {
        font-size: 18px;
        @include font_color("fontColor");

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
}



.view-more {
  position: relative;
  width: 100%;
  margin-left: -4px;
  text-align: center;

  .el-icon {
    position: absolute;
    top: 11px;
    right: -4px;
  }
}

.logo-container {
  display: flex;
  align-items: center;
}

.el-popper {
  @include bg_color("secondaryColor");
}

.user-img {
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 50%;
}

.el-dropdown__popper .el-dropdown-menu {
  @include bg_color("secondaryColor");

  :deep(.el-dropdown-menu__item) {
    border: 1px solid #151a30;
    @include border_color("borderColor");
    @include font_color("fontColor");
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