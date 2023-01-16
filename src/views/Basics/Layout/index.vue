<template>
  <el-container class="layout-container">
    <Header @changeCollapse="setCollapse"></Header>
    <Settings></Settings>
    <el-container class="body-container">
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
import Settings from './Setting'

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
}
</style>
