<!--
 * @Description:
 * @version:
 * @Author: JupSat
 * @email: jupsat@163.com
 * @Date: 2023-01-10 19:48:03
 * @LastEditors: JupSat
 * @LastEditTime: 2023-02-20 22:22:32
-->
<template>
  <el-container class="layout-container">
    <Header @changeCollapse="setCollapse" class="header-mb"></Header>
    <!-- <Settings></Settings> -->
    <el-container class="body-container body-container-mb">
      <Aside ref="asideRef"></Aside>
      <Main></Main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Layout'
}
</script>
<script setup>
import { ref } from 'vue'
import Header from './Header'
import Aside from './Aside'
import Main from './Main'
// import Settings from './Setting'

const asideRef = ref(null)
const setCollapse = () => {
  asideRef.value.setCollapse()
}
</script>

<style scoped lang="scss">
@import '@/styles/switchTheme.scss';

.layout-container {
  text-align: left;
  @include bg_color('mainColor');

  .body-container {
    height: 100vh;
    padding-top: 60px;
  }

  @media screen and (min-width: 280px) and (max-width: 1024px) {
    .header-mb {
      display: none;
    }
    .body-container-mb {
      padding-top: 0;
    }
  }
}
</style>
