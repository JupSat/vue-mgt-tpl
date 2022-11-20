<template>
  <div class="login_content" v-if="showLogin">
    <div class="title">
      <h1>vue-mgt-tpl</h1>
    </div>
    <el-form ref="loginRef" :model="formData" :rules="rules" @keyup.enter="submitForm">
      <el-form-item prop="username">
        <el-input v-model="formData.username" :placeholder="$t('plzEnterUsrNam')">
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
        <el-input v-model="formData.password" :type="'password'" :placeholder="$t('plzEnterPwd')">
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
          <el-input v-model="formData.captcha" :placeholder="$t('plzEnterCaptcha')" style="width: 60%" />
          <div class="img">
            <img v-if="picPath" :src="picPath" :alt="$t('plzEnterCaptcha')" />
          </div>
        </div>
      </el-form-item>
      <el-form-item>
        <div class="btn-login">
          <el-button type="primary" style="width: 100%" @click="submitForm">{{ $t('signIn') }}</el-button>
        </div>
        <div class="operation">
          <span class="free-register" @click="showLogin = !showLogin">{{ $t('freeRegister') }}</span>
          <span class="forget-password" @click="forgetPsw">{{ $t('forgotPassword') }}</span>
          <span class="to-other-page" @click="goOtherPage">{{ $t('test') }}</span>
        </div>
      </el-form-item>
    </el-form>
  </div>

  <Register v-else @toLogin="showLogin = !showLogin"></Register>
</template>

<script>
import { reactive, ref, toRefs } from "vue";
import Register from "./../Register";
import { useRouter } from "vue-router";
import { useI18n } from 'vue-i18n'

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

    const { t } = useI18n();
    const checkUsername = (rule, value, callback) => {
      if (value.length < 5) {
        return callback(new Error(t("plzEnterCorrectUerNam")));
      } else {
        callback();
      }
    };

    const checkPassword = (rule, value, callback) => {
      if (value.length < 6) {
        return callback(new Error(t("plzEnterCorrectPwd")));
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
          message: t("verificationCodeError"),
          trigger: "blur",
        },
      ],
    });

    const validatePsd = (rule, value, callback) => {
      if (!value) {
        callback(new Error(t("plzEnterPwd")));
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

    const router = useRouter();
    const goOtherPage = () => {
      router.push({ path: '/eCommerce' });
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
      goOtherPage
    };
  },
};
</script>
<style scoped lang="scss">
@import "@/styles/switchTheme.scss";

.login_content {
  width: 375px;
  background-color: #13152C;
  padding: 40px;
  border-radius: 10px;

  .title {
    @include font_color("fontColor");
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

    .to-other-page {
      margin-left: 5px;
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