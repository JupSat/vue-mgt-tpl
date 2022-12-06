<template>
  <div class="reset-pwd">
    <div class="title">
      <h3>{{ $t('resetPassword') }}</h3>
    </div>
    <el-form
      ref="resetPwdRef"
      :model="formData"
      status-icon
      :hide-required-asterisk="true"
      :rules="rules"
      @keyup.enter="submitForm"
    >
      <el-form-item prop="email">
        <el-input
          v-model="formData.email"
          autocomplete="off"
          :placeholder="$t('plzEnterEmail')"
        >
          <template #append>
            <el-button
              :disabled="sendingCode"
              :loading="loading"
              @click="sendCodeToEmail"
              class="captcha"
              >{{ $t('getCaptcha') }}
            </el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="validCod">
        <el-input
          v-model.number="formData.validCod"
          maxlength="6"
          autocomplete="off"
          :placeholder="$t('plzEnterCaptcha')"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="formData.password"
          type="password"
          autocomplete="off"
          :placeholder="$t('plzEnterPwd')"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input
          v-model="formData.checkPass"
          type="password"
          autocomplete="off"
          :placeholder="$t('plzEnterPwdAgain')"
        >
        </el-input>
      </el-form-item>

      <el-form-item>
        <div class="btn-reset">
          <el-button type="primary" style="width: 100%" @click="submitForm">{{
            $t('confirmReset')
          }}</el-button>
        </div>
        <div class="go-login">
          <span class="to-login" @click="toLogin"
            ><em>{{ $t('signIn') }}</em></span
          >
          <Language />
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { reactive, toRefs, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { resetPwdApi, sendCodeToEmailApi } from '@/api/user'
import { ElMessage } from 'element-plus'
import Language from '@/components/Language'

export default {
  name: 'ResetPassword',
  components: {
    Language
  },
  emits: ['toLogin'],
  setup(props, { emit }) {
    const resetPwdRef = ref()
    const state = reactive({
      loading: false,
      sendingCode: false
    })

    const formData = reactive({
      email: '12@163.com',
      validCod: '222222',
      password: '111111',
      checkPass: '111111'
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

    const validatePwd = (rule, value, callback) => {
      if (!value) {
        callback(new Error(t('plzEnterPwd')))
      } else {
        if (!formData.checkPass) {
          resetPwdRef.value.validateField('checkPass')
        }
        callback()
      }
    }

    const rules = {
      password: [
        { validator: validatePwd, trigger: 'blur' },
        { min: 6, max: 10, message: t('pwdLenIn6To10'), trigger: 'blur' }
      ],
      checkPass: [{ validator: validatePwdAgain, trigger: 'blur' }],
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
      ]
    }

    const sendingCode = ref(false)
    const sendCodeToEmail = async () => {
      if (!formData.email) {
        ElMessage({
          message: t('plzEnterEmail'),
          grouping: true,
          type: 'warning',
          duration: 3000
        })
        return
      }

      state.sendingCode = true
      state.loading = true

      const res = await sendCodeToEmailApi(formData.email)
      if (res && res.success) {
        state.sendingCode = false
        state.loading = false
        // formData.validCod = res.data.code
        ElMessage({
          message: '验证码已发送到邮箱，请查收！',
          grouping: true,
          type: 'success',
          duration: 3000
        })
      }
    }

    const submitForm = () => {
      if (!resetPwdRef.value) return
      resetPwdRef.value.validate(async (valid) => {
        if (valid) {
          console.log('submit!')
          const res = await resetPwdApi(formData)
          if (res && res.success) {
            ElMessage({
              message: '重置密码成功！即将跳转到登录界面',
              grouping: true,
              type: 'success',
              duration: 3000
            })
            toLogin()
          }
        } else {
          console.log('error submit!')
          return false
        }
      })
    }

    const toLogin = () => {
      emit('toLogin')
    }

    return {
      ...toRefs(state),
      rules,
      sendingCode,
      toLogin,
      sendCodeToEmail,
      submitForm,
      formData,
      resetPwdRef
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/switchTheme.scss';

.reset-pwd {
  width: 375px;
  background-color: #13152c;
  padding: 40px;
  border-radius: 10px;

  .title {
    color: #fff;
    margin-bottom: 20px;
  }

  .captcha {
    background: #409eff;
    color: #fff;
    margin-right: -21px;
  }

  .btn-reset {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
  }

  .go-login {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-size: 12px;
    cursor: pointer;

    .to-login {
      color: #9fa2a8;

      em {
        color: #2878ff;
        margin-left: 5px;
      }
    }
  }
}
</style>
