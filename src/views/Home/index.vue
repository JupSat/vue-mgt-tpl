<template>
  <div class="home">
    <div class="home-container">
      <div class="home-left"></div>
      <Login v-if="showLogin" @toResetPwd="showLogin = !showLogin"></Login>
      <ResetPassword v-else @toLogin="showLogin = !showLogin"></ResetPassword>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import Login from "./../Login/index";
import ResetPassword from "./../ResetPwd/index";

export default {
  name: "Home",
  components: {
    ResetPassword,
    Login,
  },
  setup() {
    const state = reactive({
      showLogin: true,
    });

    return {
      ...toRefs(state),
    };
  },
};
</script>
<style lang="scss">
.home {
  height: 100vh;
  width: 100vw;
  background: url("~@/assets/background.jpg") no-repeat center;
  background-size: cover;

  .home-container {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    position: absolute;
    width: 100vw;
    height: 100vh;
    background-color: #151a30;

    .home-left {
      width: 40%;
      height: 49%;
      float: right !important;
      border-radius: 8px;
      background: url("~@/assets/work.webp") no-repeat center;
      background-size: cover;
    }
  }
}
</style>
