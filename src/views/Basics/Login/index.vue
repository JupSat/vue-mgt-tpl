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
        <div class="captcha">
          <el-input v-model="formData.captcha" maxlength="6" :placeholder="$t('plzEnterCaptcha')" style="width: 60%" />
          <div class="captcha-img">
            <el-tooltip :content="'点击刷新'" placement="top" effect="light">
              <span v-loading="loading">
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
export default {
  name: 'Login'
}
</script>

<script setup>
import { reactive, defineEmits, ref, toRefs, onMounted } from 'vue'
// import router from '@/router'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { loginApi, getGraphCaptchaApi } from '@/api/user'
import { useUserStore } from '@/pinia/modules/user'
import Register from './../Register'
import Language from '@/components/Language'
import { regUserName, regLoginPwd, getValidator } from '@/utils/validate'
import { message } from '@/utils/message'
import microActions from '@/qiankun/qiankun-actions'

const router = useRouter()

const state = reactive({
  showLogin: true,
  loading: false
})

const formData = reactive({
  username: '',
  password: '',
  captcha: ''
})

const rules = reactive({
  username: [{ validator: regUserName, trigger: 'blur' }],
  password: [{ validator: regLoginPwd, trigger: 'blur' }],
  captcha: [getValidator('verificationCodeError')]
})

const captchaPicPath = ref('')
const getGraphCaptcha = () => {
  state.loading = true
  getGraphCaptchaApi()
    .then((res) => {
      if (res && res.code === 0) {
        const { captcha = '', captchaImgStr = '' } = res.data
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
      state.loading = false
    })
}

const refreshCaptcha = () => {
  getGraphCaptcha()
}

const loginRef = ref(null)
const { t } = useI18n()

const submitForm = () => {
  if (!loginRef.value) return
  loginRef.value.validate(async (valid) => {
    if (valid) {
      const res = await loginApi(formData)
      if (res) {
        const { code = null, data = '', msg = '' } = res || {}
        if (code === 0) {
          message(t('LoginSucJumping'))
          formData.token = data
          useUserStore().setUserInfo(formData)
          // 变更父项目参数token
          microActions.setGlobalState({ globalToken: data })

          let microPath = ''
          if (window.__POWERED_BY_QIANKUN__) {
            microPath = '/vue-mgt-tpl'
          }
          setTimeout(() => {
            router.push({ path: microPath + '/tenLine' })
          }, 2000)
        } else {
          if (msg === '验证码错误！') {
            message(t('captchaError'), 'warning')
            getGraphCaptcha()
          } else {
            message(t('accOrPwdAErr'), 'warning')
          }
          return false
        }
        //  else if (code === 2) {
        //   message(t('accOrPwdAErr'), 'warning')
        //   return false
        // } else if (code === 3) {
        //   message(t('captchaError'), 'warning')
        //   getGraphCaptcha()
        //   return false
        // }
      }
    } else {
      console.log('error submit!')
      getGraphCaptcha()
      return false
    }
  })
}

const emit = defineEmits(['toResetPwd'])
const forgetPwd = () => {
  emit('toResetPwd')
}

onMounted(() => {
  getGraphCaptcha()
  microActions.onGlobalStateChange((state, prevState) => {
    // state: 变更后的状态; prevState: 变更前的状态
    console.log('子应用观察者：状态改变', state, prevState)
  }, true)
})

const { showLogin, loading } = toRefs(state)
</script>
<style scoped lang="scss">
@import '@/styles/switchTheme.scss';

.login-content {
  width: 365px;
  height: 385px;
  background-color: #13152c;
  padding: 40px;
  margin-right: 30px;
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

  .captcha {
    display: flex;
    justify-content: space-between;
    width: 100%;

    .captcha-img {
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
