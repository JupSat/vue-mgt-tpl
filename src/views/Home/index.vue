<template>
  <div class="home">
    <div class="init-loading" v-if="showLoading">
      <ul>
        <li v-for="item in 4" :key="item"></li>
      </ul>
    </div>
    <div class="home-container" v-else>
      <div class="home-left"></div>
      <div class="home-right">
        <Login v-if="showLogin" @toResetPwd="showLogin = !showLogin"></Login>
        <ResetPassword v-else @toLogin="showLogin = !showLogin"></ResetPassword>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import Login from './../Login'
import ResetPassword from './../ResetPwd'

export default {
  name: 'Home',
  components: {
    ResetPassword,
    Login
  }
}
</script>
<script setup>
const state = reactive({
  showLoading: true,
  showLogin: true
})

setTimeout(() => {
  state.showLoading = false
}, 2000)
const { showLoading, showLogin } = toRefs(state)
</script>
<style lang="scss">
.home {
  height: 100vh;
  width: 100vw;
  // background: url("~@/assets/background.jpg") no-repeat center;
  background: url('~@/assets/img/hero-bg.webp') no-repeat center;
  background-size: cover;

  .init-loading {
    width: 100%;
    height: 100%;
    background-color: #e8eaf6;
    > ul {
      list-style-type: none;
      li {
        position: absolute;
        width: 25px;
        height: 25px;
        top: 50%;
        left: 40%;
        margin: 10px 10px;
        border-radius: 100%;
        background-color: #3949ab;
        transform: translate3d(0px, -30px, 10px);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
        animation: loading 1.5s ease-in-out infinite alternate;
      }

      li:nth-child(2) {
        background-color: #e74c3c;
        left: 45%;
        animation: loading1 1.5s ease-in-out infinite alternate;
        animation-delay: 0.4s;
      }
      li:nth-child(3) {
        background-color: #f1c40f;
        left: 50%;
        animation: loading2 1.5s ease-in-out infinite alternate;
        animation-delay: 0.8s;
      }
      li:nth-child(4) {
        background-color: #2ecc71;
        left: 55%;
        animation: loading3 1.5s ease-in-out infinite alternate;
        animation-delay: 1.2s;
      }
      @keyframes loading {
        to {
          transform: translate3d(0, 30px, 10px);
          box-shadow: 10px 10px 30px #3498db, 0 10px 20px #3498db;
        }
      }
      @keyframes loading1 {
        to {
          transform: translate3d(0, 30px, 10px);
          box-shadow: 10px 10px 30px #bd081c, 0 10px 20px #bd081c;
        }
      }
      @keyframes loading2 {
        to {
          transform: translate3d(0, 30px, 10px);
          box-shadow: 10px 10px 30px #f39c12, 0 10px 20px #f39c12;
        }
      }
      @keyframes loading3 {
        to {
          transform: translate3d(0, 30px, 10px);
          box-shadow: 10px 10px 30px #27ae60, 0 10px 20px #27ae60;
        }
      }
    }
  }

  .home-container {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    position: absolute;
    width: 100%;
    height: 100%;

    .home-left {
      width: 37%;
      height: 66%;
      margin-top: 104px;
      float: right !important;
      border-radius: 8px;
      background: url('~@/assets/img/astrocat.webp') no-repeat center;
      background-size: cover;
    }
  }
}
</style>
