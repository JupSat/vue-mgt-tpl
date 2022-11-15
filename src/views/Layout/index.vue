<template>
  <el-container class="layout-container">
    <Header></Header>
    <Settings></Settings>
    <el-container class="body-container">
      <Aside></Aside>
      <Main></Main>
    </el-container>
  </el-container>
</template>

<script>
import Header from "./Header";
import Aside from "./Aside";
import Main from "./Main";
import Settings from "./Setting";
export default {
  name: "Layout",
  components: {
    Header,
    Aside,
    Main,
    Settings
  },
  setup() { },
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

  .body-container {
    height: 100vh;
    padding-top: 76px;
  }

}
</style>
