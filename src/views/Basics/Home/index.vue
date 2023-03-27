<template>
  <div class="home">
    <div class="init-loading" v-if="showLoading">
      <ul>
        <li v-for="item in 4" :key="item"></li>
      </ul>
    </div>
    <div class="home-container" v-else>
      <el-button @click="goToParent" style="position: absolute" v-if="isDependency">跳转到父项目</el-button>
      <div class="home-left"></div>
      <div class="home-right">
        <Login v-if="showLogin" @toResetPwd="showLogin = !showLogin"></Login>
        <ResetPassword v-else @toLogin="showLogin = !showLogin"></ResetPassword>
      </div>
      <div class="put-on-record">
        <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44030602007395">
          <img src="~@/assets/img/beian.png" />
          <p>粤公网安备 44030602007395号</p>
        </a>
        <a href="https://beian.miit.gov.cn" target="_blank">粤ICP备2023004209号</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>
<script setup>
import Login from './../Login'
import ResetPassword from './../ResetPwd'
import { reactive, toRefs, getCurrentInstance } from 'vue'

const { proxy } = getCurrentInstance()

const state = reactive({
  showLoading: true,
  showLogin: true,
  isDependency: false
})

state.isDependency = !!window.__POWERED_BY_QIANKUN__

setTimeout(() => {
  state.showLoading = false
}, 2000)

const goToParent = () => {
  console.log('主应用传来的router实例', proxy.$microRouter)
  if (window.__POWERED_BY_QIANKUN__) {
    proxy.$microRouter.push('/master-home')
  }
}
const { showLoading, showLogin, isDependency } = toRefs(state)
</script>
<style lang="scss" scoped>
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
    width: 100%;
    height: 100%;

    .home-left {
      width: 37%;
      height: 66%;
      margin-top: 104px;
      border-radius: 8px;
      background: url('~@/assets/img/astrocat.webp') no-repeat center;
      background-size: cover;
    }

    .put-on-record {
      position: absolute;
      bottom: 15px;
      font-size: 13px;

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
  }
}
</style>
