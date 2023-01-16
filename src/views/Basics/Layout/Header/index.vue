<template>
  <el-header>
    <div class="header-layout">
      <div class="header-container">
        <div class="logo-container">
          <img class="logo" @click="navigateHome" src="~@/assets/img/jupiter.png" alt="" />
        </div>

        <div class="header-query">
          <el-select
            v-model="menuValue"
            filterable
            remote
            reserve-keyword
            :remote-method="remoteMethod"
            :placeholder="$t('plzEnterKeyword')"
            :loading="loading"
          >
            <el-option v-for="item in menuList" :key="item.id" :label="$t(item.id)" :value="item.id" />
          </el-select>
        </div>
      </div>

      <div class="header-container-right">
        <div>
          <Fullscreen class="search-icon" :style="{ cursor: 'pointer' }"></Fullscreen>
        </div>
        <div class="theme-select">
          <el-select @change="changeTheme" v-model="theme" popper-class="custom-select">
            <el-option v-for="(color, index) in colorList" :label="$t(color)" :value="color" :key="index" />
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
                <el-dropdown-item v-for="(item, index) in messagesList.splice(0, 4)" :key="index">
                  这是第{{ item }}个邮件
                </el-dropdown-item>
                <template v-if="list.length > 4">
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
                <el-dropdown-item v-for="(item, index) in emailsList.splice(0, 4)" :key="index">
                  <span>这是第{{ item }}条消息</span>
                </el-dropdown-item>
                <template v-if="list.length > 4">
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
                  {{ $t('resetPassword') }}
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
export default {
  name: 'Header'
}
</script>
<script setup>
import { reactive, toRefs, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import router from '@/router'
import { useMenuStore } from '@/pinia/modules/menu'
import { useCommonStore } from '@/pinia/modules/common'
import Fullscreen from '@/views/Basics/Layout/Fullscreen'
import { useUserStore } from '@/pinia/modules/user'

const tempList = [1, 2, 3, 4, 5, 6, 7, 8]
const data = reactive({
  theme: 'light',
  language: 'zh',
  color: '#8f9bb3',
  list: [1, 2, 3, 4, 5, 6, 7, 8],
  colorList: ['blue', 'light', 'dark', 'purple', 'yellow'],
  menuList: [],
  menuValue: '',
  loading: false,
  messagesList: tempList,
  emailsList: tempList
})

// 回到首页
const navigateHome = () => {
  router.push({ path: '/' })
}

// 退出
const signOut = () => {
  useUserStore().clearUserInfo()
  navigateHome()
}

// 语言切换
const { locale } = useI18n()
const commonStore = useCommonStore()
watch(
  () => data.language,
  () => {
    locale.value = data.language
    commonStore.setLanguage(data.language)
  }
)

const changeTheme = () => {
  commonStore.setTheme(data.theme)
  window.document.documentElement.setAttribute('data-theme', data.theme)
}

// 搜索菜单
const remoteMethod = (query) => {
  if (query) {
    data.loading = true
    const menuStore = useMenuStore()
    const menuList = menuStore.menuList.map((list) => list.children.flat()).flat()
    data.loading = false
    data.menuList = menuList.filter((item) => {
      return item.id.toLowerCase().includes(query.toLowerCase())
    })
  } else {
    data.menuList = []
  }
}

onMounted(() => {
  data.language = commonStore.language
  data.theme = commonStore.theme
  changeTheme()
})

const { theme, language, color, list, colorList, menuList, menuValue, loading, messagesList, emailsList } = toRefs(data)
</script>

<style scoped lang="scss">
@import '@/styles/switchTheme.scss';

.el-header {
  position: fixed;
  width: 100%;
  padding: 0;
  z-index: 100;
}

.header-layout {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 100%;
  height: 60px;
  font-size: 12px;
  text-align: right;
  color: var(--el-text-color-primary);
  @include bg_color('secondaryColor');
  @include box_shadow('boxShadowColor');

  :deep(.el-input__wrapper) {
    @include bg_color('mainColor');

    .el-input__inner {
      border-radius: 2px;
      border-color: #101426;
      @include font_color('fontColor');
      font-size: 14px;
      font-weight: 400;
    }
  }

  .header-container {
    display: flex;
    align-items: center;
    width: auto;
    margin-left: 6px;

    .el-select {
      width: 105px;
      margin-left: 30px;
      border-radius: 3px;
    }

    .header-query {
      width: 150px;

      .el-select {
        width: 140px;
        height: 45px;
        padding-top: 4px;
        margin-left: 0;
      }
    }

    .sidebar-toggle {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 30px;
      height: 30px;

      &:hover {
        padding: 4px;
        border-radius: 50px;
        background: rgba(2, 123, 190, 0.2);
        cursor: pointer;
        .el-icon {
          &:hover {
            color: #598bff;
          }
        }
      }
    }

    .logo {
      height: 3.5rem;
      width: 3.5rem;
      border-radius: 50%;
      cursor: pointer;
    }
  }

  .header-container-right {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin-right: 25px;

    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50px;
      margin: 0px 2px;

      .el-dropdown > .el-badge {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 26px;
        height: 26px;
      }

      &:hover .el-dropdown {
        padding: 4px;
        border-radius: 50px;
        background: rgba(2, 123, 190, 0.2);
        cursor: pointer;
        .el-icon {
          &:hover {
            color: #598bff;
          }
        }
      }
    }

    .theme-select {
      width: 95px;
    }

    .language {
      width: 105px;
      padding-left: 15px;

      .el-select {
        height: 45px;
        padding-top: 4px;
      }
    }

    .user-info-dropdown {
      width: 120px;
      margin-left: 12px;

      .el-dropdown {
        margin-left: 15px;
        border-radius: 50px;
        padding: 4px;
        background: rgba(2, 123, 190, 0.2);
      }

      .user-info {
        font-size: 16px;
        @include font_color('fontColor');

        > div {
          display: flex;
          justify-content: center;
          align-items: center;

          &:hover {
            cursor: pointer;
            color: #598bff;
          }
        }

        span {
          margin-left: 6px;
        }
      }
    }
  }
}

.view-more {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  .el-icon {
    right: -4px;
  }
}

.logo-container {
  display: flex;
  align-items: center;
}

.el-popper {
  @include bg_color('secondaryColor');
}

.user-img {
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 50%;
}

.el-dropdown__popper .el-dropdown-menu {
  @include bg_color('secondaryColor');

  :deep(.el-dropdown-menu__item) {
    border: 1px solid #151a30;
    @include border_color('borderColor');
    @include font_color('fontColor');
  }

  :deep(.el-dropdown-menu__item:not(.is-disabled):hover) {
    background-color: rgba(2, 123, 190, 0.2);
    color: #66b1ff;
  }
}

:deep(.is-light) {
  background: none;
  border: 0px solid #151a30;
}
</style>
