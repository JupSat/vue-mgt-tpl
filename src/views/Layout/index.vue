<template>
  <el-container class="layout-container">
    <Header @changeCollapse="setCollapse"></Header>
    <Settings></Settings>
    <el-container class="body-container">
      <Aside @goView="switchView" ref="asideRef"></Aside>
      <Main ref="mainRef"></Main>
    </el-container>
  </el-container>
</template>

<script>
import { ref } from 'vue'
import Header from './Header'
import Aside from './Aside'
import Main from './Main'
import Settings from './Setting'

export default {
  name: 'Layout',
  components: {
    Header,
    Aside,
    Main,
    Settings
  },
  setup() {
    const mainRef = ref(null)
    const asideRef = ref(null)

    const switchView = (name) => {
      mainRef.value.switchView(name)
    }
    const setCollapse = () => {
      asideRef.value.setCollapse()
    }

    return {
      mainRef,
      asideRef,
      switchView,
      setCollapse
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/switchTheme.scss';

.layout-container {
  text-align: left;
  @include bg_color('mainColor');

  .body-container {
    height: 100vh;
    padding-top: 76px;
  }
}
</style>
