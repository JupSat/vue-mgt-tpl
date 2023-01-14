<template>
  <el-container>
    <el-main class="main-layout">
      <div class="fixed-views">
        <Breadcrumb class="main-breadcrumb"></Breadcrumb>
        <Tabs></Tabs>
      </div>
      <el-scrollbar>
        <div class="main-body">
          <div class="main-container">
            <div class="main-content">
              <router-view />
              <el-backtop target=".main-layout .el-scrollbar__wrap" :bottom="90">
                <el-icon><Top /></el-icon>
              </el-backtop>
            </div>
          </div>
        </div>
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
import Breadcrumb from '@/views/Layout/Breadcrumb'
import Tabs from '@/views/Layout/Tabs'
</script>
<style scoped lang="scss">
@import '@/styles/switchTheme.scss';
.main-layout {
  padding: 0;
  padding-top: 2px;

  .fixed-views {
    position: fixed;
    width: 100%;
    top: 62px;
    // left: 215px;
    z-index: 100;
    padding-left: 8px;
    @include bg_color('mainBodyColor');

    .main-breadcrumb {
      width: 100%;
      height: 30px;
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
        //  min-width: 0;
        margin: 98px 35px 0 11px;
      }
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
