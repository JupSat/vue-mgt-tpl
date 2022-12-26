<template>
  <div class="register-content">
    <div class="title">
      <h1>{{ $t('signUp') }}</h1>
    </div>
    <el-form
      ref="registerRef"
      :model="formData"
      :rules="rules"
      @keyup.enter="submitForm"
    >
      <el-form-item prop="email">
        <el-input v-model="formData.email" :placeholder="$t('plzEnterEmail')">
          <template #append>
            <el-button
              :disabled="sendingCode"
              :loading="loading"
              @click="sendCodeToEmail"
              type="primary"
              class="captcha"
              >{{ $t('getCaptcha') }}
            </el-button>
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
        >
          <template #suffix>
            <span class="input-icon">
              <el-icon>
                <Lock />
              </el-icon>
            </span>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input
          v-model="formData.checkPass"
          :type="'password'"
          :placeholder="$t('plzEnterPwdAgain')"
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
import { registerApi, sendCodeToEmailApi } from '@/api/user'
import { ElMessage } from 'element-plus'
import Language from '@/components/Language'

export default {
  name: 'Register',
  components: {
    Language
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
    const checkUsername = (rule, value, callback) => {
      if (value.length < 5) {
        return callback(new Error(t('usrNamDonLessLen5')))
      } else {
        callback()
      }
    }

    const checkPassword = (rule, value, callback) => {
      if (value.length < 6) {
        return callback(new Error(t('pwdDonLessLen6')))
      } else {
        callback()
      }
    }

    const validatePwdAgain = (rule, value, callback) => {
      if (!value) {
        callback(new Error(t('plzEnterPwdAgain')))
      } else if (value !== formData.password) {
        callback(new Error(t('pwdInconsistent')))
      } else {
        callback()
      }
    }

    const validatePwd = (rule, value, callback) => {
      if (!value) {
        callback(new Error(t('plzEnterPwd')))
      } else {
        if (formData.checkPass) {
          registerRef.value.validateField('checkPass')
        }
        callback()
      }
    }

    const rules = {
      email: [
        { required: true, message: t('plzEnterEmail'), trigger: 'change' },
        {
          type: 'email',
          message: t('plzEnterCorrectEmail'),
          trigger: ['blur', 'change']
        }
      ],
      validCod: [
        { required: true, message: t('plzEnterCaptcha'), trigger: 'blur' }
      ],
      username: [
        { required: true, message: t('plzEnterUsrNam'), trigger: 'blur' }
      ],
      password: [
        { validator: validatePwd, trigger: 'blur' },
        { min: 6, max: 10, message: t('pwdLenIn6To10'), trigger: 'blur' }
      ],
      checkPass: [{ validator: validatePwdAgain, trigger: 'blur' }]
    }

    const submitForm = () => {
      if (!registerRef.value) return
      registerRef.value.validate(async (valid) => {
        if (valid) {
          console.log('submit!')
          const res = await registerApi(formData)
          if (res) {
            if (res.result.code === 1) {
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
                message: res.result.msg,
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

    const sendCodeToEmail = async () => {
      state.sendingCode = true
      state.loading = true

      const res = await sendCodeToEmailApi(formData.email)
      if (res && res.success) {
        state.sendingCode = false
        state.loading = false
        ElMessage({
          message: '验证码已发送到邮箱，请查收！',
          grouping: true,
          type: 'success',
          duration: 3000
        })
      }
    }

    const goLogin = () => {
      emit('toLogin')
    }

    return {
      ...toRefs(state),
      registerRef,
      formData,
      checkUsername,
      checkPassword,
      rules,
      submitForm,
      goLogin,
      sendCodeToEmail
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

  .captcha {
    background: #409eff;
    color: #fff;
    margin-right: -21px;
  }

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
