<template>
  <div class="login-content" v-if="showLogin">
    <div class="title">
      <h1>{{ $t('signIn') }}</h1>
    </div>
    <el-form
      ref="loginRef"
      :model="formData"
      :rules="rules"
      @keyup.enter="submitForm"
      :validate-on-rule-change="false"
    >
      <el-form-item prop="username">
        <el-input
          v-model="formData.username"
          :placeholder="$t('plzEnterUsrNam')"
        >
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
        <el-input
          v-model="formData.password"
          :type="'password'"
          :placeholder="$t('plzEnterPwd')"
          show-password
        />
      </el-form-item>
      <el-form-item prop="captcha">
        <div class="captcha-item">
          <el-input
            v-model="formData.captcha"
            maxlength="6"
            :placeholder="$t('plzEnterCaptcha')"
            style="width: 60%"
          />
          <div class="img">
            <img
              v-if="captchaPicPath"
              :src="captchaPicPath"
              :alt="$t('plzEnterCaptcha')"
            />
          </div>
        </div>
      </el-form-item>
      <el-form-item>
        <div class="btn">
          <el-button type="primary" style="width: 100%" @click="submitForm">{{
            $t('signIn')
          }}</el-button>
        </div>
        <div class="operation">
          <div>
            <span class="free-register" @click="showLogin = !showLogin">{{
              $t('freeRegister')
            }}</span>
            <span class="forget-password" @click="forgetPwd">{{
              $t('forgotPassword')
            }}</span>
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

export default {
  name: 'Login',
  emits: ['toResetPwd'],
  components: {
    Register,
    Language
  },
  setup(props, { emit }) {
    const state = reactive({
      showLogin: true
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

    const getGraphCaptcha = async () => {
      const res = await getGraphCaptchaApi({})
      if (res) {
        rules.captcha.push({
          max: res.data.captchaLength,
          min: res.data.captchaLength,
          message: `请输入${res.data.captchaLength}位验证码`,
          trigger: 'blur'
        })
        captchaPicPath.value = res.data.picPath
        formData.captcha = res.data.captchaId
      }
    }

    const loginRef = ref(null)
    const submitForm = () => {
      if (!loginRef.value) return
      loginRef.value.validate(async (valid) => {
        if (valid) {
          console.log('submit!')
          const res = await loginApi(formData)
          if (res) {
            if (res.result.code === 1) {
              ElMessage({
                message: t('LoginSucJumping'),
                grouping: true,
                type: 'success',
                duration: 2000
              })

              setTimeout(() => {
                router.push({ path: '/overview' })
              }, 2000)
            } else {
              ElMessage({
                message: t('accOrPwdAErr'),
                grouping: true,
                type: 'warning',
                duration: 2000
              })
            }
          }
          // else if (res && res.status === 2) {
          //   ElMessage({
          //     message: t('accOrPwdAErr'),
          //     grouping: true,
          //     type: 'warning',
          //     duration: 2000
          //   })
          //   getGraphCaptcha()
          //   return false
          // } else if (res && res.status === 3) {
          //   ElMessage({
          //     message: t('captchaError'),
          //     grouping: true,
          //     type: 'warning',
          //     duration: 2000
          //   })
          //   getGraphCaptcha()
          //   return false
          // }
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
      forgetPwd
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

      img {
        width: 100%;
        height: 100%;
        vertical-align: middle;
      }
    }
  }
}
</style>
