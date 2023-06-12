<!--
 * @Description: 主体内容
 * @version:
 * @Author: JupSat
 * @email: jupsat@163.com
 * @Date: 2022-11-15 19:48:03
 * @LastEditors: JupSat
 * @LastEditTime: 2023-06-12 12:29:04
-->
<template>
  <el-container>
    <el-main class="main-layout">
      <div class="fixed-views fixed-views-mb" :style="{ width: isCollapse ? '98vw' : '83vw' }">
        <Breadcrumb class="main-breadcrumb"></Breadcrumb>
        <Tabs></Tabs>
      </div>
      <el-scrollbar>
        <div class="main-body">
          <div class="main-container">
            <div class="main-content main-content-mb">
              <router-view v-slot="{ Component }">
                <keep-alive include="PurchaseRecords,SKU">
                  <component :is="Component" />
                </keep-alive>
              </router-view>
              <el-backtop target=".main-layout .el-scrollbar__wrap" :bottom="90">
                <el-icon><Top /></el-icon>
              </el-backtop>
            </div>
          </div>
        </div>
        <!-- <div class="put-on-record">
          <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44030602007395">
            <img src="~@/assets/img/beian.png" style="float: left" />
            <p>粤公网安备 44030602007395号</p>
          </a>
          <a href="https://beian.miit.gov.cn" target="_blank">粤ICP备2023004209号</a>
        </div> -->
      </el-scrollbar>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'Main'
}
</script>

<script setup>
import Breadcrumb from '@/views/Basics/Layout/Breadcrumb'
import Tabs from '@/views/Basics/Layout/Tabs'
import { useCommonStore } from '@/pinia/modules/common'
import { computed } from 'vue'
const commonStore = useCommonStore()
const isCollapse = computed(() => commonStore.isCollapse)
</script>
<style scoped lang="scss">
@import '@/styles/switchTheme.scss';
.main-layout {
  padding: 0;
  padding-top: 2px;
  @include bg_color('mainBodyColor');

  .fixed-views {
    position: fixed;
    z-index: 100;
    top: 62px;
    @include bg_color('mainBodyColor');

    .main-breadcrumb {
      width: 100%;
      height: 30px;
    }
  }

  @media screen and (min-width: 280px) and (max-width: 1024px) {
    .fixed-views-mb {
      top: 0;
    }

    .main-content-mb {
      margin: 85px 35px 0 11px;
    }
  }

  .main-body {
    display: flex;
    flex: 1;
    flex-direction: column;
    min-width: 0;
    @include bg_color('mainBodyColor');
    @include font_color('fontColor');
    font-family: Open Sans, sans-serif;
    font-size: 15px;
    font-weight: 400;
    line-height: 20px;

    .main-container {
      display: flex;
      flex: 1;
      flex-direction: row;
      width: 100%;

      .main-content {
        order: 1;
        flex: 1 0;
        margin: 98px 35px 0 11px;
      }
    }
  }

  .put-on-record {
    display: flex;
    justify-content: center;
    padding-top: 10px;
    font-size: 13px;
    @include bg_color('mainBodyColor');
    a:first-child {
      img {
        float: left;
      }
      p {
        float: left;
        height: 20px;
        margin-left: 5px;
      }
    }

    a:nth-child(2) {
      margin-left: 15px;
    }

    a:hover {
      color: rgb(90, 147, 255);
    }
  }

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
}
</style>
