<template>
  <div class="home">
    <div class="home-container">
      <div class="home-left"></div>
      <div class="home-right">
        <Login v-if="showLogin" @toResetPwd="showLogin = !showLogin"></Login>
        <ResetPassword v-else @toLogin="showLogin = !showLogin"></ResetPassword>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import Login from "./../Login";
import ResetPassword from "./../ResetPwd";

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
  // background: url("~@/assets/background.jpg") no-repeat center;
  background: url("~@/assets/img/hero-bg.webp") no-repeat center;
  background-size: cover;

  .home-container {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    position: absolute;
    width: 100vw;
    height: 100vh;

    .home-left {
      width: 37%;
      height: 66%;
      margin-top: 104px;
      float: right !important;
      border-radius: 8px;
      background: url("~@/assets/img/astrocat.webp") no-repeat center;
      background-size: cover;
    }
  }
}
</style>
