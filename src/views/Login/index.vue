<template>
  <div class="login-content" v-if="showLogin">
    <div class="title">
      <h1>{{ $t('signIn') }}</h1>
    </div>
    <el-form ref="loginRef" :model="formData" :rules="rules" @keyup.enter="submitForm" :validate-on-rule-change="false">
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
        <el-input v-model="formData.password" :type="'password'" :placeholder="$t('plzEnterPwd')" show-password />
      </el-form-item>
      <el-form-item prop="captcha">
        <div class="captcha-item">
          <el-input v-model="formData.captcha" maxlength="6" :placeholder="$t('plzEnterCaptcha')" style="width: 60%" />
          <div class="img">
            <el-tooltip :content="'点击刷新'" placement="top" effect="light">
              <span v-loading="doneLoading">
                <img v-if="captchaPicPath" :src="captchaPicPath" :alt="$t('plzEnterCaptcha')" @click="refreshCaptcha" />
              </span>
            </el-tooltip>
          </div>
        </div>
      </el-form-item>
      <el-form-item>
        <div class="btn">
          <el-button type="primary" style="width: 100%" @click="submitForm">{{ $t('signIn') }}</el-button>
        </div>
        <div class="operation">
          <div>
            <span class="free-register" @click="showLogin = !showLogin">{{ $t('freeRegister') }}</span>
            <span class="forget-password" @click="forgetPwd">{{ $t('forgotPassword') }}</span>
          </div>
          <Language />
        </div>
      </el-form-item>
    </el-form>
  </div>

  <Register v-else @toLogin="showLogin = !showLogin"></Register>
</template>

<script>
import { reactive, ref, toRefs, onMounted } from 'vue'
import Register from './../Register'
import router from '@/router'
import { useI18n } from 'vue-i18n'
import { loginApi, getGraphCaptchaApi } from '@/api/user'
import { ElMessage } from 'element-plus'
import Language from '@/components/Language'
import { useUserStore } from '@/pinia/modules/user'

export default {
  name: 'Login',
  emits: ['toResetPwd'],
  components: {
    Register,
    Language
  },
  setup(props, { emit }) {
    const state = reactive({
      showLogin: true,
      doneLoading: false
    })

    const data = reactive({
      language: 'zh'
    })

    const formData = reactive({
      username: 'admin',
      password: '123456',
      captcha: ''
    })

    const { t } = useI18n()
    const checkUsername = (rule, value, callback) => {
      if (value.length < 5) {
        return callback(new Error(t('plzEnterCorrectUerNam')))
      } else {
        callback()
      }
    }

    const checkPassword = (rule, value, callback) => {
      if (value.length < 6) {
        return callback(new Error(t('plzEnterCorrectPwd')))
      } else {
        callback()
      }
    }

    const rules = reactive({
      username: [{ validator: checkUsername, trigger: 'blur' }],
      password: [{ validator: checkPassword, trigger: 'blur' }],
      captcha: [
        {
          required: true,
          message: t('verificationCodeError'),
          trigger: 'blur'
        }
      ]
    })

    const validatePwd = (rule, value, callback) => {
      if (!value) {
        callback(new Error(t('plzEnterPwd')))
      } else {
        callback()
      }
    }

    const captchaPicPath = ref('')
    const getGraphCaptcha = () => {
      state.doneLoading = true
      getGraphCaptchaApi()
        .then((res) => {
          if (res) {
            const { captcha = '', captchaImgStr = '' } = res.result
            const len = captcha.length
            rules.captcha.push({
              max: len,
              min: len,
              message: `请输入${len}位验证码`,
              trigger: 'blur'
            })
            captchaPicPath.value = captchaImgStr
          }
        })
        .finally(() => {
          state.doneLoading = false
        })
    }

    const refreshCaptcha = () => {
      getGraphCaptcha()
    }

    const loginRef = ref(null)
    const submitForm = () => {
      if (!loginRef.value) return
      loginRef.value.validate(async (valid) => {
        if (valid) {
          const res = await loginApi(formData)
          if (res) {
            const { code = null } = res.result || {}
            if (code === 1) {
              ElMessage({
                message: t('LoginSucJumping'),
                grouping: true,
                type: 'success',
                duration: 2000
              })

              useUserStore().setUserInfo(formData)

              setTimeout(() => {
                router.push({ path: '/overview' })
              }, 2000)
            } else if (code === 2) {
              ElMessage({
                message: t('accOrPwdAErr'),
                grouping: true,
                type: 'warning',
                duration: 2000
              })
              return false
            } else if (code === 3) {
              ElMessage({
                message: t('captchaError'),
                grouping: true,
                type: 'warning',
                duration: 2000
              })
              getGraphCaptcha()
              return false
            }
          }
        } else {
          console.log('error submit!')
          getGraphCaptcha()
          return false
        }
      })
    }

    const forgetPwd = () => {
      emit('toResetPwd')
    }

    onMounted(() => {
      getGraphCaptcha()
    })

    return {
      loginRef,
      formData,
      submitForm,
      rules,
      captchaPicPath,
      getGraphCaptcha,
      ...toRefs(state),
      ...toRefs(data),
      validatePwd,
      forgetPwd,
      refreshCaptcha
    }
  }
}
</script>
<style scoped lang="scss">
@import '@/styles/switchTheme.scss';

.login-content {
  width: 365px;
  height: 385px;
  background-color: #13152c;
  padding: 40px;
  border-radius: 10px;

  .operation {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    font-size: 12px;
    cursor: pointer;

    .free-register {
      margin-right: 5px;
      color: #2878ff;
    }

    .forget-password {
      color: #9fa2a8;
      &:hover {
        color: #2878ff;
      }
    }
  }

  .captcha-item {
    display: flex;
    justify-content: space-between;
    width: 100%;

    .img {
      width: 33%;
      background: #ccc;
      cursor: pointer;

      img {
        width: 100%;
        height: 100%;
        vertical-align: middle;
      }
    }
  }
}
</style>
