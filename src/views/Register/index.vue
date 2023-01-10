<template>
  <div class="register-content">
    <div class="title">
      <h1>{{ $t('signUp') }}</h1>
    </div>
    <el-form
      ref="registerRef"
      :model="formData"
      :rules="rules"
      status-icon
      @keyup.enter="submitForm"
    >
      <el-form-item prop="email">
        <el-input
          v-model="formData.email"
          :placeholder="$t('plzEnterEmail')"
          autocomplete="off"
        >
          <template #append>
            <Captcha :email="formData.email"></Captcha>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="validCod">
        <el-input
          maxlength="6"
          v-model="formData.validCod"
          :placeholder="$t('plzEnterCaptcha')"
        />
      </el-form-item>
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
      <el-form-item prop="checkPass">
        <el-input
          v-model="formData.checkPass"
          :type="'password'"
          :placeholder="$t('plzEnterPwdAgain')"
          show-password
        >
        </el-input>
      </el-form-item>

      <el-form-item>
        <div class="btn">
          <el-button type="primary" style="width: 100%" @click="submitForm">{{
            $t('signUp')
          }}</el-button>
        </div>
        <div class="go-login">
          <span class="to-login"
            >{{ $t('haveAccount')
            }}<em @click="goLogin">{{ $t('signIn') }}</em></span
          >
          <Language />
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from 'vue'
import { useI18n } from 'vue-i18n'
import { registerApi } from '@/api/user'
import { ElMessage } from 'element-plus'
import Language from '@/components/Language'
import Captcha from '@/components/Captcha'
import { regPwd, isRequired } from '@/utils/validate'

export default {
  name: 'Register',
  components: {
    Language,
    Captcha
  },
  emits: ['toLogin'],
  setup(props, { emit }) {
    const state = reactive({
      sendingCode: false,
      loading: false
    })

    const registerRef = ref(null)
    const formData = reactive({
      email: '',
      validCod: '',
      username: '',
      password: '',
      checkPass: ''
    })

    const { t } = useI18n()
    const validatePwdAgain = (rule, value, callback) => {
      if (!value) {
        callback(new Error(t('plzEnterPwdAgain')))
      } else if (value !== formData.password) {
        callback(new Error(t('pwdInconsistent')))
      } else {
        callback()
      }
    }

    const rules = reactive({
      email: [
        isRequired('plzEnterEmail'),
        {
          type: 'email',
          message: t('plzEnterCorrectEmail'),
          trigger: ['blur', 'change']
        }
      ],
      validCod: [isRequired('plzEnterCaptcha')],
      username: [isRequired('plzEnterUsrNam')],
      password: [
        isRequired('pwdLenIn6To10'),
        { validator: regPwd, trigger: 'blur' }
      ],
      checkPass: [{ validator: validatePwdAgain, trigger: 'blur' }]
    })

    const submitForm = () => {
      if (!registerRef.value) return
      registerRef.value.validate(async (valid) => {
        if (valid) {
          console.log('submit!')
          const res = await registerApi(formData)
          if (res) {
            const { code = null } = res.result || {}
            if (code === 1) {
              ElMessage({
                message: '注册成功！即将跳转到登录界面',
                grouping: true,
                type: 'success',
                duration: 3000
              })
              setTimeout(() => {
                goLogin()
              }, 2000)
            } else {
              ElMessage({
                message: res.msg,
                grouping: true,
                type: 'warning',
                duration: 2000
              })
            }
          }
        } else {
          console.log('error submit!')
          return false
        }
      })
    }

    const goLogin = () => {
      emit('toLogin')
    }

    return {
      ...toRefs(state),
      registerRef,
      formData,
      rules,
      submitForm,
      goLogin
    }
  }
}
</script>
<style scoped lang="scss">
@import '@/styles/switchTheme.scss';

.register-content {
  width: 365px;
  padding: 40px;
  background-color: #13152c;
  border-radius: 10px;
  .go-login {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-size: 12px;
    .to-login {
      color: #9fa2a8;
      em {
        margin-left: 5px;
        color: #2878ff;
        cursor: pointer;
      }
    }
  }
}
</style>
