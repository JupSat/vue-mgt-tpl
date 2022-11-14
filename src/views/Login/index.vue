<template>
  <div class="login_content" v-if="showLogin">
    <div class="title">
      <h1>vue-mgt-tpl</h1>
    </div>
    <el-form ref="loginRef" :model="formData" :rules="rules" @keyup.enter="submitForm">
      <el-form-item prop="username">
        <el-input v-model="formData.username" placeholder="请输入用户名">
          <template #suffix>
            <span class="input-icon">
              <el-icon>
                <User />
              </el-icon>
            </span>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="formData.password" :type="'password'" placeholder="请输入密码">
          <template #suffix>
            <span class="input-icon">
              <el-icon>
                <Lock />
              </el-icon>
            </span>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="captcha">
        <div class="captcha-item">
          <el-input v-model="formData.captcha" placeholder="请输入验证码" style="width: 60%" />
          <div class="img">
            <img v-if="picPath" :src="picPath" alt="请输入验证码" />
          </div>
        </div>
      </el-form-item>
      <el-form-item>
        <div class="btn-login">
          <el-button type="primary" style="width: 100%" @click="submitForm">登录</el-button>
        </div>
        <div class="operation">
          <span class="free-register" @click="showLogin = !showLogin">免费注册</span>
          <span class="forget-password" @click="forgetPsw">忘记密码</span>
        </div>
      </el-form-item>
    </el-form>
  </div>

  <Register v-else @toLogin="showLogin = !showLogin"></Register>
</template>

<script>
import { reactive, ref, toRefs } from "vue";
import Register from "./../Register/index";

export default {
  name: "Login",
  emits: ["toResetPwd"],
  components: {
    Register
  },
  setup(props, { emit }) {
    const state = reactive({
      showLogin: true,
      sendingCode: false,
    });
    const picPath = ref("");

    const loginRef = ref(null);
    const formData = reactive({
      username: "admin",
      password: "123456",
      captcha: "",
    });

    const checkUsername = (rule, value, callback) => {
      if (value.length < 5) {
        return callback(new Error("请输入正确的用户名"));
      } else {
        callback();
      }
    };

    const checkPassword = (rule, value, callback) => {
      if (value.length < 6) {
        return callback(new Error("请输入正确的密码"));
      } else {
        callback();
      }
    };

    const rules = reactive({
      username: [{ validator: checkUsername, trigger: "blur" }],
      password: [{ validator: checkPassword, trigger: "blur" }],
      captcha: [
        {
          required: true,
          message: "验证码格式不正确",
          trigger: "blur",
        },
      ],
    });

    const validatePsd = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入密码"));
      } else {
        if (registerFormData.checkPass) {
          registerForm.value.validateField("checkPass");
        }
        callback();
      }
    };

    const getVerificationCode = () => { };

    const submitForm = () => { };

    const forgetPsw = () => {
      emit("toResetPwd");
    };

    return {
      loginRef,
      formData,
      submitForm,
      rules,
      picPath,
      getVerificationCode,
      ...toRefs(state),
      validatePsd,
      forgetPsw,
    };
  },
};
</script>
<style scoped lang="scss">
.login_content {
  width: 375px;
  background-color: #13152C;
  padding: 40px;
  border-radius: 10px;

  .title {
    color: #fff;
    margin-bottom: 20px;
  }

  .input-icon {
    margin-right: 10px;
  }

  :deep(.el-input__wrapper) {
    all: unset;
  }

  .operation {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    font-size: 12px;
    cursor: pointer;

    .free-register {
      margin-right: 5px;
      color: #2878ff;
    }

    .forget-password {
      color: #9fa2a8;
    }
  }

  .captcha-item {
    display: flex;
    justify-content: space-between;
    width: 100%;

    .img {
      width: 33%;
      background: #ccc;

      img {
        width: 100%;
        height: 100%;
        vertical-align: middle;
      }
    }
  }

  .btn-login {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
  }
}
</style>
